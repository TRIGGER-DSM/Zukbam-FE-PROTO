import { ApiError } from '../api/client';
import { getDemoToken } from './mode';
import { friendFixtureRepository } from '../../domains/social/infrastructure/friendFixture';
import { friendRequestFixture } from '../../domains/social/infrastructure/friendRequestFixture';
import { friendSearchFixture } from '../../domains/social/infrastructure/friendSearchFixture';
import type { Solution } from '../../domains/submission/infrastructure/solutionApi';
import type { UserProfile } from '../../domains/member/infrastructure/profileApi';

interface DemoRequestOptions {
  method?: string;
  body?: object;
  signal?: AbortSignal;
  authenticated?: boolean;
}

interface DemoSolution extends Solution {
  problemId: number;
  readyAt: number;
  finalStatus: 'ACCEPTED' | 'WRONG_ANSWER';
}

const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());
const submittedAt = new Date().toISOString();
const sampleCode =
  'n = int(input())\nscores = [int(input()) for _ in range(n)]\nprint(max(scores))';
const seedSolutions: DemoSolution[] = [
  {
    solutionId: 10001,
    problemId: 1287,
    language: 'Python',
    code: sampleCode,
    time: 36,
    memoryUsage: 31120,
    status: 'ACCEPTED',
    submittedAt,
    readyAt: 0,
    finalStatus: 'ACCEPTED',
  },
  {
    solutionId: 10002,
    problemId: 1287,
    language: 'Python',
    code: sampleCode,
    time: 24,
    memoryUsage: 30684,
    status: 'WRONG_ANSWER',
    submittedAt,
    readyAt: 0,
    finalStatus: 'WRONG_ANSWER',
  },
];
function restoreSolutions(): DemoSolution[] {
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem('demoSolutions') ?? 'null');
    if (
      Array.isArray(stored) &&
      stored.every(
        (item) =>
          typeof item.solutionId === 'number' &&
          typeof item.problemId === 'number' &&
          typeof item.readyAt === 'number' &&
          typeof item.code === 'string' &&
          ['ACCEPTED', 'WRONG_ANSWER'].includes(item.finalStatus),
      )
    )
      return stored;
  } catch {
    /* 저장된 데이터가 없거나 손상되면 기본 시연 기록으로 시작합니다. */
  }
  return seedSolutions;
}

const solutions = restoreSolutions();
let nextSolutionId = Math.max(10002, ...solutions.map((solution) => solution.solutionId)) + 1;
let acceptedSubmissions = solutions.filter(
  (solution) => solution.solutionId > 10002 && solution.status === 'ACCEPTED',
).length;

function saveSolutions() {
  sessionStorage.setItem('demoSolutions', JSON.stringify(solutions));
}
let friends = friendFixtureRepository.list().items.map((friend, index) => ({
  ...friend,
  friendshipId: 200 + index,
}));
let requests = friendRequestFixture
  .filter((request) => request.status === 'pending')
  .map((request, index) => ({ ...request, friendshipId: 300 + index }));
const profile: UserProfile = {
  userId: 2312,
  name: '김민서',
  email: 'minseo@school.ac.kr',
  role: 'STUDENT',
  score: 1240 + acceptedSubmissions * 20,
  rank: '대나무 5m',
  solvedCount: 61 + acceptedSubmissions,
  student: { grade: 2, class: 3, number: 12 },
};

function pageOf<T>(items: T[], page: number, size: number) {
  return {
    page,
    size,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    items: items.slice(page * size, (page + 1) * size),
  };
}

function presentSolution(solution: DemoSolution): Solution {
  if (solution.status === 'PENDING' && Date.now() >= solution.readyAt) {
    solution.status = solution.finalStatus;
    if (solution.status === 'ACCEPTED') {
      profile.score += 20;
      profile.solvedCount += 1;
      acceptedSubmissions += 1;
    }
    saveSolutions();
  }
  return {
    solutionId: solution.solutionId,
    language: solution.language,
    code: solution.code,
    memoryUsage: solution.memoryUsage,
    time: solution.time,
    status: solution.status,
    submittedAt: solution.submittedAt,
  };
}

export async function demoResponse(
  path: string,
  options: DemoRequestOptions = {},
): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 180));
  options.signal?.throwIfAborted();
  if (options.authenticated && !getDemoToken()) throw new ApiError(401, '로그인이 필요해요.');

  const url = new URL(path, 'https://demo.local');
  const method = options.method ?? 'GET';
  const body = (options.body ?? {}) as Record<string, unknown>;
  const json = (value: unknown) => Response.json(value);
  const page = Math.max(0, Number(url.searchParams.get('page') ?? 0));
  const size = Math.max(1, Number(url.searchParams.get('size') ?? 20));

  if (method === 'GET' && url.pathname === '/users/me') return json(profile);
  if (method === 'GET' && /^\/users\/\d+$/.test(url.pathname)) {
    const userId = Number(url.pathname.split('/').at(-1));
    const person = [...friends, ...friendSearchFixture].find((user) => Number(user.id) === userId);
    return json({
      ...profile,
      userId,
      name: person?.name ?? '윤서준',
      rank: person?.tierLabel ?? '대나무 3m',
      score: 860,
      solvedCount: 42,
      student: { grade: 2, class: 1, number: (userId % 30) + 1 },
    });
  }
  if (method === 'GET' && url.pathname === '/streaks/me') {
    return json({ currentStreak: 13, maxStreak: 31, lastSolvedDate: today() });
  }
  if (method === 'GET' && url.pathname === '/streaks/me/grass') {
    const from = url.searchParams.get('from') ?? today();
    const to = url.searchParams.get('to') ?? today();
    const end = new Date(`${to}T00:00:00Z`).getTime();
    const days = [];
    for (
      let time = new Date(`${from}T00:00:00Z`).getTime(), index = 0;
      time <= end;
      time += 86400000, index++
    ) {
      const daysAgo = Math.round((end - time) / 86400000);
      const solvedCount = daysAgo < 13 ? (index % 4) + 1 : index % 7 < 4 ? (index % 5) + 1 : 0;
      days.push({
        date: new Date(time).toISOString().slice(0, 10),
        solvedCount: solvedCount + (daysAgo === 0 ? acceptedSubmissions : 0),
      });
    }
    return json({ from, to, days });
  }
  if (method === 'GET' && url.pathname === '/friends') {
    const result = pageOf(
      friends.map((friend) => ({
        ...friend,
        userId: Number(friend.id),
        acceptedAt: submittedAt,
      })),
      page,
      size,
    );
    return json({ ...result, friends: result.items });
  }
  if (method === 'GET' && url.pathname === '/friends/requests/received') {
    const result = pageOf(
      requests.map((request) => ({
        ...request,
        requesterId: Number(request.id),
        requesterName: request.name,
        requestedAt: submittedAt,
      })),
      page,
      size,
    );
    return json({ ...result, requests: result.items });
  }
  if (method === 'POST' && url.pathname === '/friends/requests')
    return new Response(null, { status: 201 });
  if (method === 'DELETE' && /^\/friends\/\d+$/.test(url.pathname)) {
    friends = friends.filter(
      (friend) => friend.friendshipId !== Number(url.pathname.split('/').at(-1)),
    );
    return new Response(null, { status: 204 });
  }
  if (method === 'PATCH' && /^\/friends\/requests\/\d+\/(accept|reject)$/.test(url.pathname)) {
    const id = Number(url.pathname.split('/').at(-2));
    const request = requests.find((item) => item.friendshipId === id);
    if (request && url.pathname.endsWith('/accept')) {
      friends.push({
        id: request.id,
        name: request.name,
        friendshipId: id,
        tier: request.tier,
        tierLabel: request.tierLabel,
        recentActivity: '방금 친구가 되었어요.',
      });
    }
    requests = requests.filter((item) => item.friendshipId !== id);
    return new Response(null, { status: 204 });
  }
  if (method === 'POST' && /^\/solutions\/\d+$/.test(url.pathname)) {
    const finalStatus = body.demoStatus === 'WRONG_ANSWER' ? 'WRONG_ANSWER' : 'ACCEPTED';
    const solution: DemoSolution = {
      solutionId: nextSolutionId++,
      problemId: Number(url.pathname.split('/').at(-1)),
      language: body.language as Solution['language'],
      code: String(body.code ?? ''),
      status: 'PENDING',
      finalStatus,
      readyAt: Date.now() + 900,
      time: finalStatus === 'ACCEPTED' ? 36 : 24,
      memoryUsage: 31120,
      submittedAt: new Date().toISOString(),
    };
    solutions.unshift(solution);
    saveSolutions();
    return new Response(null, {
      status: 201,
      headers: { Location: `/solutions/${solution.solutionId}` },
    });
  }
  if (method === 'GET' && /^\/solutions\/\d+$/.test(url.pathname)) {
    const solution = solutions.find(
      (item) => item.solutionId === Number(url.pathname.split('/').at(-1)),
    );
    if (!solution)
      throw new ApiError(404, '시연용 제출 기록을 찾을 수 없어요. 다시 제출해 주세요.');
    return json(presentSolution(solution));
  }
  if (method === 'GET' && url.pathname === '/solutions') {
    const problemId = Number(url.searchParams.get('problemId'));
    const result = pageOf(
      solutions.filter((solution) => solution.problemId === problemId).map(presentSolution),
      Math.max(0, page - 1),
      size,
    );
    return json({ ...result, solutions: result.items });
  }
  if (method === 'POST' && url.pathname === '/auth/email-verifications') {
    return json({ verificationId: 'demo-verification', expiresIn: 180 });
  }
  if (method === 'POST' && url.pathname === '/auth/email-verifications/verify') {
    return json({ emailVerifiedToken: 'demo-verified-email' });
  }
  if (
    method === 'POST' &&
    ['/auth/sign-in', '/auth/sign-up', '/auth/sign-up/admin'].includes(url.pathname)
  ) {
    return json({ accessToken: 'demo-session', refreshToken: 'demo-refresh' });
  }
  throw new ApiError(404, '아직 시연 데이터가 준비되지 않은 기능이에요.');
}
