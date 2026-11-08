import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { QueryClient } from '@tanstack/react-query';

class MemoryStorage {
  values = new Map();
  getItem(key) {
    return this.values.get(key) ?? null;
  }
  setItem(key, value) {
    this.values.set(key, String(value));
  }
  removeItem(key) {
    this.values.delete(key);
  }
}

globalThis.sessionStorage = new MemoryStorage();
globalThis.localStorage = new MemoryStorage();
globalThis.window = Object.assign(new EventTarget(), { location: { search: '?demo=1' } });
globalThis.fetch = () => {
  throw new Error('Demo must never send a network request');
};
sessionStorage.setItem('accessToken', 'real-token-untouched');

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
});
const queries = new QueryClient({ defaultOptions: { queries: { retry: false } } });
try {
  const load = (path) => server.ssrLoadModule(`/src/${path}`);
  const api = await load('shared/api/client.ts');
  const problems = await load('domains/problem/infrastructure/problemApi.ts');
  const submissions = await load('domains/submission/infrastructure/solutionApi.ts');
  const social = await load('domains/social/infrastructure/friendApi.ts');
  const activity = await load('domains/activity/infrastructure/activityApi.ts');
  const ranking = await load('domains/ranking/application/getLeaderboard.ts');
  const { getMyRank } = await load('domains/ranking/application/getMyRank.ts');
  const customProfile = {
    userId: 42,
    name: '테스트 사용자',
    score: 3200,
    solvedCount: 87,
    rank: '금죽',
  };
  const personalRank = getMyRank(customProfile, 7);
  assert.equal(personalRank.name, customProfile.name);
  assert.equal(personalRank.id, String(customProfile.userId));
  assert.equal(personalRank.xp, customProfile.score);
  assert.equal(personalRank.solved, customProfile.solvedCount);
  assert.equal(personalRank.tier, 'gold');
  assert.equal(personalRank.streak, 7);
  assert.equal(personalRank.position, undefined);
  assert.equal(getMyRank({ ...customProfile, score: 50, rank: '죽순' }).tier, 'sprout');
  const catalogue = await queries.fetchQuery(problems.problemCatalogueOptions());
  assert.ok(catalogue.length > 10);
  for (const problem of catalogue) {
    const detail = await queries.fetchQuery(problems.problemDetailOptions(problem.id));
    assert.equal(detail.id, problem.id);
    assert.equal(detail.title, problem.title);
    assert.ok(detail.examples.length);
  }
  for (const period of ['weekly', 'monthly', 'all']) {
    const board = ranking.getLeaderboard(period, 'xp');
    assert.equal(board.podium.length, 3);
    assert.ok(board.rows.length);
    assert.equal(board.me, undefined);
  }
  for (const verdict of ['ACCEPTED', 'WRONG_ANSWER']) {
    const response = await submissions.submitSolution(1000, 'python', 'print(3)', verdict);
    const id = submissions.solutionIdFromLocation(response);
    assert.ok(id > 10002);
    assert.equal((await api.apiJson(`/solutions/${id}`)).status, 'PENDING');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    assert.equal((await api.apiJson(`/solutions/${id}`)).status, verdict);
    const history = await queries.fetchQuery(
      submissions.solutionHistoryOptions(1000, 'minseo@school.ac.kr', 1),
    );
    assert.ok(history.solutions.some((solution) => solution.solutionId === id));
    queries.removeQueries({ queryKey: ['solutions'] });
    assert.ok(
      JSON.parse(sessionStorage.getItem('demoSolutions')).some(
        (solution) => solution.solutionId === id,
      ),
    );
  }
  assert.ok((await queries.fetchQuery(social.friendsOptions())).length);
  assert.ok((await queries.fetchQuery(social.receivedRequestsOptions())).length);
  assert.equal((await queries.fetchQuery(activity.growthOptions())).activityDays.length, 365);
  const profile = await api.apiJson('/users/me', { authenticated: true });
  const streak = await queries.fetchQuery(activity.streakOptions());
  const myRank = getMyRank(profile, streak.currentStreak, 184);
  assert.equal(myRank.xp, 1260);
  assert.equal(myRank.solved, 62);
  assert.equal(myRank.streak, 13);
  api.clearSession();
  assert.equal(api.getAccessToken(), null);
  assert.equal(sessionStorage.getItem('accessToken'), 'real-token-untouched');
  await assert.rejects(api.apiJson('/users/me', { authenticated: true }), { status: 401 });
  api.saveSession({ accessToken: 'demo-session', refreshToken: 'demo-refresh' });
  assert.equal(sessionStorage.getItem('accessToken'), 'real-token-untouched');
  await assert.rejects(api.apiJson('/unimplemented'), { status: 404 });
  console.log(
    `Demo verified: ${catalogue.length} problems, rankings, both verdicts, history, friends, growth and network isolation.`,
  );
} finally {
  queries.clear();
  await server.close();
}
