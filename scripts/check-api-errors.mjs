import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

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
globalThis.window = Object.assign(new EventTarget(), { location: { search: '?demo=0' } });
let response;
globalThis.fetch = async () => response.clone();

const server = await createServer({
  configFile: false,
  define: { 'import.meta.env.VITE_DEMO_MODE': '"false"' },
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { apiResponse, ApiError, saveSession, getAccessToken } = await server.ssrLoadModule(
    '/src/shared/api/client.ts',
  );
  const { ApiFeedback } = await server.ssrLoadModule('/src/shared/ui/ApiFeedback.tsx');
  const cases = [
    [
      { errors: { reson: '비밀번호가 일치하지 않아요.' }, message: 'generic' },
      '비밀번호가 일치하지 않아요.',
    ],
    [{ errors: { reason: '이미 가입된 이메일이에요.' } }, '이미 가입된 이메일이에요.'],
    [
      { errors: [{ reson: '이메일을 확인해 주세요.' }, { reason: '이름을 입력해 주세요.' }] },
      '이메일을 확인해 주세요.\n이름을 입력해 주세요.',
    ],
    [{ errors: { reson: '우선 메시지', reason: '다른 메시지' } }, '우선 메시지'],
    [{ errors: { reson: ' ', reason: '유효한 메시지' } }, '유효한 메시지'],
    [{ errors: [null, { reson: 123 }, {}], message: '기존 메시지' }, '기존 메시지'],
    [null, '요청에 실패했어요. (400)'],
    [{ errors: {}, message: '' }, '요청에 실패했어요. (400)'],
  ];
  for (const [body, message] of cases) {
    response = Response.json(body, { status: 400 });
    await assert.rejects(apiResponse('/test'), (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.message, message);
      assert.ok(renderToStaticMarkup(createElement(ApiFeedback, { error })).includes(message));
      return true;
    });
  }
  response = new Response('<html>Bad Gateway</html>', { status: 502 });
  await assert.rejects(apiResponse('/test'), { message: '요청에 실패했어요. (502)' });
  saveSession({ accessToken: 'test-access', refreshToken: 'test-refresh' });
  response = Response.json(
    { errors: { reson: '토큰이 만료됐어요.' }, code: 'A002' },
    { status: 401 },
  );
  await assert.rejects(apiResponse('/test', { authenticated: true }), {
    status: 401,
    code: 'A002',
    message: '토큰이 만료됐어요.',
  });
  assert.equal(getAccessToken(), null);
  console.log('Verified error body messages, UI rendering, fallbacks and 401 token removal.');
} finally {
  await server.close();
}
