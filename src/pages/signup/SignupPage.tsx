import { useState, type ComponentPropsWithoutRef, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { sendEmailVerification, type SignupDraft } from '../../domains/auth/infrastructure/authApi';
import { useAuthRequest } from '../../domains/auth/presentation/useAuthRequest';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import * as Auth from '../../shared/ui/auth/Auth.styles';
import * as S from './SignupPage.styles';
import { SignupStep } from './SignupStep';
import { useSignupFlow } from './SignupFlow';

interface SignupFieldProps extends ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  icon?: string;
  helper?: string;
  trailing?: ReactNode;
}

interface SignupPageProps {
  role: SignupDraft['role'];
}

const passwordHelp = '8~64자로 입력하고 영문, 숫자, 특수문자를 포함해 주세요.';
const classHelpId = 'signup-class-help';
const classFields = [
  { name: 'grade', label: '학년', placeholder: '예) 2', max: 3 },
  { name: 'class', label: '반', placeholder: '3', max: 4 },
  { name: 'number', label: '번호', placeholder: '예) 15', max: 2_147_483_647 },
] as const;

export function SignupPage({ role }: SignupPageProps) {
  const navigate = useNavigate();
  const { attempt, setAttempt } = useSignupFlow();
  const { run, pendingAction, error } = useAuthRequest<'send'>();
  const [showPassword, setShowPassword] = useState(false);
  const isTeacher = role === 'teacher';
  const previousDraft = attempt?.draft.role === role ? attempt.draft : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const credentials = {
      email,
      name: String(form.get('name') ?? '').trim(),
      password: String(form.get('password') ?? ''),
    };
    const draft: SignupDraft = isTeacher
      ? { ...credentials, role, teacherCode: String(form.get('teacherCode') ?? '').trim() }
      : {
          ...credentials,
          role,
          grade: Number(form.get('grade')),
          class: Number(form.get('class')),
          number: Number(form.get('number')),
        };

    void run('send', async (signal) => {
      if (!draft.name) throw new Error('이름을 입력해 주세요.');
      const verification = await sendEmailVerification(email, signal);
      signal.throwIfAborted();
      setAttempt({ draft, verification, deadline: Date.now() + verification.expiresIn * 1000 });
      navigate('/signup/verify');
    });
  }

  return (
    <S.Page id="main">
      <S.Art />
      <S.Panel aria-labelledby="signup-title">
        <S.Form method="post" onSubmit={handleSubmit}>
          <SignupStep step={1} />

          <S.Heading>
            <h1 id="signup-title">죽빰에 오신 걸 환영해요</h1>
            <p>필수 정보를 입력하고 학교 이메일 인증을 진행해요.</p>
          </S.Heading>

          <S.Roles role="group" aria-label="가입 유형">
            <S.Role to="/signup" aria-current={isTeacher ? undefined : 'page'}>
              학생
            </S.Role>
            <S.Role to="/signup/teacher" aria-current={isTeacher ? 'page' : undefined}>
              선생님
            </S.Role>
          </S.Roles>

          <S.Fields>
            <SignupField
              id="signup-email"
              name="email"
              label="학교 이메일"
              type="email"
              autoComplete="email"
              defaultValue={previousDraft?.email}
              placeholder={isTeacher ? 'jiyoung.kim@school.ac.kr' : 'minseo@school.ac.kr'}
              icon="/images/login/mail.svg"
              helper="학교 이메일만 가입할 수 있어요."
              required
            />
            <SignupField
              id="signup-password"
              name="password"
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              defaultValue={previousDraft?.password}
              placeholder="••••••••"
              icon="/images/login/lock.svg"
              helper={passwordHelp}
              minLength={8}
              maxLength={64}
              pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,64}"
              title={passwordHelp}
              required
              trailing={
                <Auth.Visibility
                  type="button"
                  aria-label="비밀번호 표시"
                  aria-controls="signup-password"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  <img
                    src={showPassword ? '/images/login/eye-off.svg' : '/images/signup/eye.svg'}
                    width="24"
                    height="24"
                    alt=""
                  />
                </Auth.Visibility>
              }
            />
            <SignupField
              id="signup-name"
              name="name"
              label="이름"
              autoComplete="name"
              defaultValue={previousDraft?.name}
              maxLength={255}
              placeholder={isTeacher ? '김지영' : '김민서'}
              icon="/images/signup/user.svg"
              required
            />
            {isTeacher ? (
              <TeacherCodeField
                defaultValue={
                  previousDraft?.role === 'teacher' ? previousDraft.teacherCode : undefined
                }
              />
            ) : (
              <S.ClassInfo>
                <S.ClassRow role="group" aria-label="학급 정보">
                  {classFields.map(({ name, label, placeholder, max }) => (
                    <SignupField
                      key={name}
                      id={`signup-${name}`}
                      name={name}
                      label={label}
                      placeholder={placeholder}
                      defaultValue={
                        previousDraft?.role === 'student' ? previousDraft[name] : undefined
                      }
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={max}
                      step={1}
                      aria-describedby={classHelpId}
                      required
                    />
                  ))}
                </S.ClassRow>
                <S.Helper id={classHelpId}>학년, 반, 번호는 숫자로 각각 입력해 주세요.</S.Helper>
              </S.ClassInfo>
            )}
          </S.Fields>

          <ApiFeedback error={error} />
          <S.Submit type="submit" disabled={pendingAction !== null}>
            {pendingAction ? '인증 메일 보내는 중…' : '인증 메일 보내기'}
          </S.Submit>
          <Auth.Switch>
            이미 계정이 있나요?
            <Auth.SwitchLink to="/login">로그인</Auth.SwitchLink>
          </Auth.Switch>
        </S.Form>
      </S.Panel>
    </S.Page>
  );
}

interface TeacherCodeFieldProps {
  defaultValue?: string;
}

function TeacherCodeField({ defaultValue }: TeacherCodeFieldProps) {
  const [hasCodeError, setHasCodeError] = useState(false);
  const codeHelp = '학교에서 발급한 코드로만 가입할 수 있어요.';

  return (
    <SignupField
      id="signup-code"
      name="teacherCode"
      defaultValue={defaultValue}
      label="고유 코드"
      icon="/images/signup/key.svg"
      placeholder="학교 발급 코드"
      autoCapitalize="characters"
      spellCheck={false}
      pattern=".*\S.*"
      required
      aria-invalid={hasCodeError || undefined}
      helper={hasCodeError ? `코드를 다시 확인해 주세요. ${codeHelp}` : codeHelp}
      onInvalid={() => setHasCodeError(true)}
      onChange={() => setHasCodeError(false)}
    />
  );
}

function SignupField({ id, label, icon, helper, trailing, ...inputProps }: SignupFieldProps) {
  const helperId = helper ? `${id}-help` : inputProps['aria-describedby'];
  const isInvalid = inputProps['aria-invalid'] === true;
  return (
    <S.Field>
      <label htmlFor={id}>{label}</label>
      <S.InputBox $invalid={isInvalid}>
        {icon && <img src={icon} width="24" height="24" alt="" />}
        <S.Input {...inputProps} id={id} aria-describedby={helperId} />
        {trailing}
      </S.InputBox>
      {helper && (
        <S.Helper id={helperId} $invalid={isInvalid}>
          {helper}
        </S.Helper>
      )}
    </S.Field>
  );
}
