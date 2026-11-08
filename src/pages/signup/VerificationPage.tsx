import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
  sendEmailVerification,
  signUp,
  verifyEmail,
} from '../../domains/auth/infrastructure/authApi';
import { useAuthRequest } from '../../domains/auth/presentation/useAuthRequest';
import { ApiError, saveSession } from '../../shared/api/client';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { AuthArt } from '../../shared/ui/auth/AuthArt';
import * as Auth from '../../shared/ui/auth/Auth.styles';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { Description } from '../../shared/ui/primitives.styles';
import { SignupStep } from './SignupStep';
import { useSignupFlow, type SignupAttempt } from './SignupFlow';
import * as S from './VerificationPage.styles';

const codeLength = 6;
const icons = '/images/signup';

function remainingSeconds(deadline: number) {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

function formatRemainingTime(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const remainder = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export function VerificationPage() {
  const { attempt } = useSignupFlow();
  return attempt ? <VerificationForm attempt={attempt} /> : <Navigate to="/signup" replace />;
}

interface VerificationFormProps {
  attempt: SignupAttempt;
}

function VerificationForm({ attempt }: VerificationFormProps) {
  const { draft, verification, deadline } = attempt;
  const { setAttempt } = useSignupFlow();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { run, pendingAction, error, clearError } = useAuthRequest<'verify' | 'resend'>();
  const signupPath = draft.role === 'teacher' ? '/signup/teacher' : '/signup';
  const [code, setCode] = useState('');
  const [caretPosition, setCaretPosition] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(() => remainingSeconds(deadline));
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const codeInput = useRef<HTMLInputElement>(null);
  const expired = secondsLeft === 0;
  const canVerify = Boolean(verifiedToken) || (code.length === codeLength && !expired);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const remaining = remainingSeconds(deadline);
      setSecondsLeft(remaining);
      if (remaining === 0) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [deadline]);

  function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canVerify || (!verifiedToken && Date.now() >= deadline)) return;

    setResendMessage('');
    void run('verify', async (signal) => {
      try {
        const token =
          verifiedToken ??
          (
            await verifyEmail(
              {
                email: draft.email,
                verificationId: verification.verificationId,
                verificationCode: code,
              },
              signal,
            )
          ).emailVerifiedToken;
        signal.throwIfAborted();
        setVerifiedToken(token);

        const tokens = await signUp(draft, token, signal);
        signal.throwIfAborted();
        saveSession(tokens);
        queryClient.clear();
        navigate('/', { replace: true });
      } catch (failure) {
        if (
          !signal.aborted &&
          failure instanceof ApiError &&
          (failure.code === 'A002' || failure.code === 'A004')
        ) {
          setVerifiedToken(null);
          setSecondsLeft(0);
          setAttempt({ ...attempt, deadline: 0 });
        }
        throw failure;
      }
    });
  }

  function handleResend() {
    setResendMessage('');
    void run('resend', async (signal) => {
      const nextVerification = await sendEmailVerification(draft.email, signal);
      signal.throwIfAborted();
      setCode('');
      setCaretPosition(0);
      setVerifiedToken(null);
      setSecondsLeft(nextVerification.expiresIn);
      setAttempt({
        draft,
        verification: nextVerification,
        deadline: Date.now() + nextVerification.expiresIn * 1000,
      });
      setResendMessage('인증 코드를 다시 보냈어요.');
    });
  }

  return (
    <Auth.Page id="main">
      <AuthArt />
      <S.Panel aria-labelledby="verification-title">
        <Auth.Form method="post" onSubmit={handleVerify}>
          <S.Back to={signupPath}>
            <img src={`${icons}/verify-back.svg`} width="20" height="20" alt="" />
            정보 다시 입력하기
          </S.Back>
          <SignupStep step={2} />
          <Auth.Heading>
            <h1 id="verification-title">메일함을 확인해 주세요</h1>
            <S.Intro>
              <strong>{draft.email}</strong>으로
              <br />
              6자리 인증 코드를 보냈어요.
            </S.Intro>
          </Auth.Heading>
          <Auth.Field>
            <label htmlFor="verification-code">인증 코드</label>
            <S.Code>
              <S.CodeInput
                ref={codeInput}
                id="verification-code"
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                value={code}
                required
                readOnly={pendingAction !== null || Boolean(verifiedToken)}
                onChange={(event) => {
                  const input = event.currentTarget;
                  const digits = input.value.replace(/[^0-9]/g, '').slice(0, codeLength);
                  setCode(digits);
                  setCaretPosition(Math.min(input.selectionStart ?? digits.length, digits.length));
                  clearError();
                }}
                onSelect={(event) => setCaretPosition(event.currentTarget.selectionStart ?? 0)}
              />
              {Array.from({ length: codeLength }, (_, index) => (
                <S.Digit
                  key={index}
                  aria-hidden="true"
                  data-active={index === Math.min(caretPosition, codeLength - 1)}
                  onClick={() => {
                    const position = Math.min(index, code.length);
                    codeInput.current?.focus();
                    codeInput.current?.setSelectionRange(position, position);
                    setCaretPosition(position);
                  }}
                >
                  {code[index]}
                </S.Digit>
              ))}
            </S.Code>
            <S.Meta>
              <S.Timer>
                <img src={`${icons}/verify-clock.svg`} width="18" height="18" alt="" />
                {verifiedToken
                  ? '이메일 인증 완료'
                  : expired
                    ? '인증 시간이 만료됐어요'
                    : `남은 시간 ${formatRemainingTime(secondsLeft)}`}
              </S.Timer>
              <S.Resend type="button" onClick={handleResend} disabled={pendingAction !== null}>
                {pendingAction === 'resend' ? '재전송 중…' : '코드 재전송'}
              </S.Resend>
            </S.Meta>
          </Auth.Field>
          <ApiFeedback error={error} />
          {resendMessage && <p role="status">{resendMessage}</p>}
          <S.Submit type="submit" disabled={!canVerify || pendingAction !== null}>
            {pendingAction === 'verify'
              ? '가입 처리 중…'
              : verifiedToken
                ? '가입 다시 시도'
                : '인증 완료'}
          </S.Submit>
          <S.Info>
            <img src={`${icons}/verify-mail.svg`} width="20" height="20" alt="" />
            <p>메일이 오지 않았나요? 스팸함을 확인하거나 코드를 다시 받아 보세요.</p>
          </S.Info>
        </Auth.Form>
        <S.Legal aria-label="서비스 정책">
          <button type="button" onClick={() => setNotice('이용약관')}>
            이용약관
          </button>
          <span aria-hidden="true">·</span>
          <button type="button" onClick={() => setNotice('개인정보처리방침')}>
            개인정보처리방침
          </button>
        </S.Legal>
      </S.Panel>
      {notice && (
        <PreviewDialog title={notice} onClose={() => setNotice(null)}>
          <Description>{notice} 화면은 준비 중이에요.</Description>
        </PreviewDialog>
      )}
    </Auth.Page>
  );
}
