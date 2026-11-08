import * as S from './AcceptedResultPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { problemDetailOptions } from '../../domains/problem/infrastructure/problemApi';
import { resultPath, solutionOptions } from '../../domains/submission/infrastructure/solutionApi';
import { streakOptions } from '../../domains/activity/infrastructure/activityApi';
import { isDemoMode } from '../../shared/demo/mode';

export function AcceptedResultPage() {
  const { problemId } = useParams();
  const [searchParams] = useSearchParams();
  const solutionId = Number(searchParams.get('solutionId') ?? (isDemoMode ? 10001 : 0));
  const queryClient = useQueryClient();
  const solutionQuery = useQuery(solutionOptions(solutionId));
  const problem = useQuery(problemDetailOptions(Number(problemId))).data;
  const result = solutionQuery.data;
  const isJudging = result?.status === 'PENDING';
  const isAccepted = result?.status === 'ACCEPTED';
  const streak = useQuery({ ...streakOptions(), enabled: isAccepted });
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!isDemoMode || !isAccepted) return;
    for (const key of ['me', 'growth', 'streak', 'problems']) {
      void queryClient.invalidateQueries({ queryKey: [key] });
    }
  }, [isAccepted, solutionId, queryClient]);

  if (result && !isJudging && !isAccepted) {
    return <Navigate replace to={resultPath(Number(problemId), result)} />;
  }

  return (
    <SiteLayout>
      {isAccepted ? (
        <S.Page id="main" aria-labelledby="accepted-title">
          <S.Mascot
            src="/images/result/celebrate.png"
            alt="정답을 축하하는 판다"
            width="360"
            height="320"
          />
          <h1 id="accepted-title">정답이에요!</h1>
          <S.Description>
            {problem ? `${problem.id}. ${problem.title}를 해결했어요.` : '문제를 해결했어요.'}
          </S.Description>
          <S.Stats>
            <S.Time>
              <dt>실행 시간</dt>
              <dd>{result.time ?? '—'}</dd>
            </S.Time>
            <S.Time>
              <dt>메모리</dt>
              <dd>{result.memoryUsage ?? '—'}</dd>
            </S.Time>
            {streak.data && (
              <S.Streak>
                <dt>연속 풀이</dt>
                <dd>
                  <img src="/images/result/streak.svg" alt="" />
                  {streak.data.currentStreak}일
                </dd>
              </S.Streak>
            )}
          </S.Stats>
          <S.Actions>
            <button onClick={() => setPreviewTitle('다른 사람 풀이 보기')}>
              다른 사람 풀이 보기
            </button>
            <S.Next to="/problems">다음 문제 풀기</S.Next>
          </S.Actions>
        </S.Page>
      ) : (
        <S.Unavailable id="main">
          <h1>{isJudging ? '채점 중이에요' : '채점 결과'}</h1>
          <ApiFeedback pending={solutionQuery.isLoading} error={solutionQuery.error} />
          {!result && !solutionQuery.isLoading && !solutionQuery.error && (
            <p>제출 기록에서 채점 결과를 선택해 주세요.</p>
          )}
          <Link to={`/problems/${problemId}/submit`}>풀이 제출 화면으로</Link>
        </S.Unavailable>
      )}
      {previewTitle && (
        <PreviewDialog title={previewTitle} onClose={() => setPreviewTitle(null)}>
          <UI.Description>{previewTitle}는 준비 중이에요.</UI.Description>
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
