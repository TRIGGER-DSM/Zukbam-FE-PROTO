import * as S from './WrongResultPage.styles';
import { Link, Navigate, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import {
  resultPath,
  solutionOptions,
  solutionStatusLabels,
} from '../../domains/submission/infrastructure/solutionApi';

export function WrongResultPage() {
  const { problemId } = useParams();
  const [searchParams] = useSearchParams();
  const solutionId = Number(searchParams.get('solutionId'));
  const solutionQuery = useQuery(solutionOptions(solutionId));
  const result = solutionQuery.data;

  if (result && (result.status === 'PENDING' || result.status === 'ACCEPTED')) {
    return <Navigate replace to={resultPath(Number(problemId), result)} />;
  }

  return (
    <SiteLayout>
      {result ? (
        <S.Page id="main" aria-labelledby="wrong-title">
          <S.Mascot
            src="/images/result/disappointed.png"
            alt="다시 도전을 기다리는 판다"
            width="360"
            height="320"
          />
          <h1 id="wrong-title">
            {result.status === 'WRONG_ANSWER'
              ? '아쉬워요, 오답이에요'
              : solutionStatusLabels[result.status]}
          </h1>
          <S.Summary aria-labelledby="wrong-summary-title">
            <S.SummaryHeading>
              <div>
                <h2 id="wrong-summary-title">채점 결과</h2>
                <S.Status>{solutionStatusLabels[result.status]}</S.Status>
              </div>
              <p>
                제출 #{result.solutionId.toLocaleString('ko-KR')} ·{' '}
                {new Date(result.submittedAt).toLocaleString('ko-KR')}
              </p>
            </S.SummaryHeading>
            <S.Statistics>
              <div>
                <dt>언어</dt>
                <dd>{result.language}</dd>
              </div>
              <div>
                <dt>실행 시간</dt>
                <dd>{result.time ?? '—'}</dd>
              </div>
              <div>
                <dt>메모리</dt>
                <dd>{result.memoryUsage ?? '—'}</dd>
              </div>
              <div>
                <dt>코드 길이</dt>
                <dd>{new TextEncoder().encode(result.code).length} B</dd>
              </div>
            </S.Statistics>
            <S.Notice>
              <img src="/images/result/lock.svg" alt="" />
              문제의 예제를 다시 확인해 보세요.
            </S.Notice>
          </S.Summary>
          <S.Actions>
            <S.Review to={`/problems/${problemId}`}>문제 다시 보기</S.Review>
            <S.Retry to={`/problems/${problemId}/submit`}>코드 고치러 가기</S.Retry>
          </S.Actions>
        </S.Page>
      ) : (
        <S.Unavailable id="main">
          <h1>채점 결과</h1>
          <ApiFeedback pending={solutionQuery.isLoading} error={solutionQuery.error} />
          {!solutionQuery.isLoading && !solutionQuery.error && (
            <p>제출 기록에서 채점 결과를 선택해 주세요.</p>
          )}
          <Link to={`/problems/${problemId}/submit`}>풀이 제출 화면으로</Link>
        </S.Unavailable>
      )}
    </SiteLayout>
  );
}
