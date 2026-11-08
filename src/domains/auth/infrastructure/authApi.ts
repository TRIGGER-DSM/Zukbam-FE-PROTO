import { apiJson } from '../../../shared/api/client';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignupCredentials extends SignInRequest {
  name: string;
}

interface StudentSignupDraft extends SignupCredentials {
  role: 'student';
  grade: number;
  class: number;
  number: number;
}

interface TeacherSignupDraft extends SignupCredentials {
  role: 'teacher';
  teacherCode: string;
}

export type SignupDraft = StudentSignupDraft | TeacherSignupDraft;

export interface EmailVerification {
  verificationId: string;
  expiresIn: number;
}

interface EmailVerificationRequest {
  email: string;
  verificationId: string;
  verificationCode: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface EmailVerifiedTokenResponse {
  emailVerifiedToken: string;
}

export function signIn(body: SignInRequest, signal: AbortSignal) {
  return apiJson<TokenResponse>('/auth/sign-in', { method: 'POST', body, signal });
}

export function sendEmailVerification(email: string, signal: AbortSignal) {
  return apiJson<EmailVerification>('/auth/email-verifications', {
    method: 'POST',
    body: { email },
    signal,
  });
}

export function verifyEmail(body: EmailVerificationRequest, signal: AbortSignal) {
  return apiJson<EmailVerifiedTokenResponse>('/auth/email-verifications/verify', {
    method: 'POST',
    body,
    signal,
  });
}

export function signUp(draft: SignupDraft, emailVerifiedToken: string, signal: AbortSignal) {
  const { role, ...fields } = draft;
  const path = role === 'teacher' ? '/auth/sign-up/admin' : '/auth/sign-up';
  return apiJson<TokenResponse>(path, {
    method: 'POST',
    body: { ...fields, emailVerifiedToken },
    signal,
  });
}
