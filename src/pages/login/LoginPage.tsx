import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { signIn } from '../../domains/auth/infrastructure/authApi';
import { useAuthRequest } from '../../domains/auth/presentation/useAuthRequest';
import { saveSession } from '../../shared/api/client';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { Description } from '../../shared/ui/primitives.styles';
import { AuthArt } from '../../shared/ui/auth/AuthArt';
import * as S from '../../shared/ui/auth/Auth.styles';
import * as Login from './LoginPage.styles';

const imageDirectory = '/images/login';

export function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { run, pendingAction, error } = useAuthRequest<'login'>();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const remember = form.has('remember');

    void run('login', async (signal) => {
      const tokens = await signIn({ email, password }, signal);
      signal.throwIfAborted();
      saveSession(tokens, remember);
      queryClient.clear();
      navigate('/', { replace: true });
    });
  }

  return (
    <S.Page id="main">
      <AuthArt />

      <S.Panel aria-labelledby="login-title">
        <S.Form method="post" onSubmit={handleSubmit}>
          <S.Heading>
            <h1 id="login-title">다시 만나서 반가워요!</h1>
            <p>학교 이메일로 로그인하고 학습 기록을 이어가세요.</p>
          </S.Heading>

          <S.Fields>
            <S.Field>
              <label htmlFor="login-email">학교 이메일</label>
              <S.InputBox>
                <img src={`${imageDirectory}/mail.svg`} alt="" width="24" height="24" />
                <S.Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="minseo@school.ac.kr"
                  required
                />
              </S.InputBox>
            </S.Field>

            <S.Field>
              <label htmlFor="login-password">비밀번호</label>
              <S.InputBox>
                <img src={`${imageDirectory}/lock.svg`} alt="" width="24" height="24" />
                <S.Input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                />
                <S.Visibility
                  type="button"
                  aria-label="비밀번호 표시"
                  aria-controls="login-password"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  <img src={`${imageDirectory}/eye-off.svg`} alt="" width="24" height="24" />
                </S.Visibility>
              </S.InputBox>
            </S.Field>
          </S.Fields>

          <Login.Options>
            <Login.Remember>
              <Login.Checkbox name="remember" type="checkbox" defaultChecked />
              로그인 상태 유지
            </Login.Remember>
            <Login.TextButton type="button" onClick={() => setNotice('비밀번호 재설정')}>
              비밀번호를 잊으셨나요?
            </Login.TextButton>
          </Login.Options>

          <ApiFeedback error={error} />
          <S.Submit type="submit" disabled={pendingAction !== null}>
            {pendingAction ? '로그인 중…' : '로그인'}
          </S.Submit>

          <S.Switch>
            아직 계정이 없나요?
            <S.SwitchLink to="/signup">회원가입</S.SwitchLink>
          </S.Switch>
        </S.Form>
      </S.Panel>

      {notice && (
        <PreviewDialog title={notice} onClose={() => setNotice(null)}>
          <Description>{notice} 기능은 준비 중이에요.</Description>
        </PreviewDialog>
      )}
    </S.Page>
  );
}
