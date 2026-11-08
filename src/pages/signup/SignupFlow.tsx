import { useState, type Dispatch, type SetStateAction } from 'react';
import { Outlet, useOutletContext } from 'react-router';
import type { EmailVerification, SignupDraft } from '../../domains/auth/infrastructure/authApi';

export interface SignupAttempt {
  draft: SignupDraft;
  verification: EmailVerification;
  deadline: number;
}

interface SignupFlowContext {
  attempt: SignupAttempt | null;
  setAttempt: Dispatch<SetStateAction<SignupAttempt | null>>;
}

export function SignupFlow() {
  // Keep the password in memory only while the user is in the signup flow.
  const [attempt, setAttempt] = useState<SignupAttempt | null>(null);
  return <Outlet context={{ attempt, setAttempt } satisfies SignupFlowContext} />;
}

export function useSignupFlow() {
  return useOutletContext<SignupFlowContext>();
}
