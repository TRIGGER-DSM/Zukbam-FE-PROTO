import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import { myProfileOptions } from '../../domains/member/infrastructure/profileApi';
import {
  editableProblemOptions,
  type EditableProblem,
} from '../../domains/problem/infrastructure/problemApi';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { Panel } from './AdminDashboardPage.styles';
import { AdminLayout } from './AdminLayout';
import { ProblemForm } from './ProblemRegistrationPage';
import { Cancel } from './ProblemRegistrationPage.styles';

export function ProblemEditPage() {
  return (
    <AdminProblemScreen
      title="문제 수정"
      render={(problem) => <ProblemForm key={problem.problemId} problem={problem} />}
    />
  );
}

interface AdminProblemScreenProps {
  title: string;
  render: (problem: EditableProblem) => ReactNode;
}

export function AdminProblemScreen({ title, render }: AdminProblemScreenProps) {
  const { problemId } = useParams();
  const id = Number(problemId);
  const validId = Number.isSafeInteger(id) && id > 0;
  const signedIn = Boolean(useAccessToken());
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const teacher = signedIn && profile.data?.role === 'TEACHER';
  const detail = useQuery(editableProblemOptions(id, teacher));

  if (teacher && detail.data) {
    return render(detail.data);
  }

  return (
    <AdminLayout problemEditing>
      <Panel>
        <h1>{title}</h1>
        {!validId ? (
          <p>문제 번호를 확인해 주세요.</p>
        ) : !signedIn ? (
          <p>교사 계정으로 로그인해 주세요.</p>
        ) : (
          <ApiFeedback
            pending={profile.isPending || (teacher && detail.isPending)}
            error={profile.error ?? detail.error}
          />
        )}
        {validId && signedIn && profile.isSuccess && !teacher && (
          <p>교사 계정만 이 화면을 이용할 수 있어요.</p>
        )}
        <div>
          <Cancel to={!signedIn && validId ? '/login' : '/problems'}>
            {!signedIn && validId ? '로그인' : '문제 목록'}
          </Cancel>
        </div>
      </Panel>
    </AdminLayout>
  );
}
