import { Bars, Step } from './SignupPage.styles';

interface SignupStepProps {
  step: 1 | 2;
}

export function SignupStep({ step }: SignupStepProps) {
  return (
    <Step>
      <p>
        STEP {step} / 2 · {step === 1 ? '정보 입력' : '이메일 인증'}
      </p>
      <Bars $complete={step === 2} aria-hidden="true">
        <span />
        <span />
      </Bars>
    </Step>
  );
}
