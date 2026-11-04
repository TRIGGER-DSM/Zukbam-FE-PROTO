import * as S from './WrongResultPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { getWrongJudgement } from '../../domains/submission/application/getWrongJudgement';
import { judgementFixtureRepository } from '../../domains/submission/infrastructure/judgementFixture';

export function WrongResultPage() {
  const { problemId } = useParams();
  const result = getWrongJudgement(judgementFixtureRepository, problemId);
  const [pending, setPending] = useState<string | null>(null);
  return (
    <SiteLayout onNavigate={setPending}>
      {result ? (
        <S.Page id="main" aria-labelledby="wrong-title">
          <S.Mascot
            src="/images/result/disappointed.png"
            alt="아쉬워하며 다시 도전을 기다리는 판다"
            width="360"
            height="320"
          />
          <h1 id="wrong-title">아쉬워요, 오답이에요</h1>
          <S.Description>
            일부 테스트에서 결과가 달라요. 경계값이나 예외 상황을 한 번 더 떠올려 볼까요?
          </S.Description>
          <S.Summary aria-labelledby="wrong-summary-title">
            <S.SummaryHeading>
              <div>
                <h2 id="wrong-summary-title">채점 결과</h2>
                <S.Status>틀렸습니다</S.Status>
              </div>
              <p>
                제출 #{result.submissionId.toLocaleString('ko-KR')} · {result.submittedAtLabel}
              </p>
            </S.SummaryHeading>
            <S.ProgressSection>
              <div>
                <span>채점 진행</span>
                <strong>{result.progressPercent}%에서 멈췄어요</strong>
              </div>
              <S.Progress
                role="progressbar"
                aria-label="채점 진행"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={result.progressPercent}
                aria-valuetext={`${result.progressPercent}%에서 오답으로 종료`}
              >
                <img src="/images/result/wrong-progress.svg" alt="" />
              </S.Progress>
            </S.ProgressSection>
            <S.Statistics>
              <div>
                <dt>언어</dt>
                <dd>{result.languageLabel}</dd>
              </div>
              <div>
                <dt>실행 시간</dt>
                <dd>{result.executionTimeMs === null ? '—' : `${result.executionTimeMs}ms`}</dd>
              </div>
              <div>
                <dt>메모리</dt>
                <dd>{result.memoryKb === null ? '—' : `${result.memoryKb} KB`}</dd>
              </div>
              <div>
                <dt>코드 길이</dt>
                <dd>{result.codeLengthBytes} B</dd>
              </div>
            </S.Statistics>
            <S.Notice>
              <img src="/images/result/lock.svg" alt="" />
              채점용 테스트케이스는 공개되지 않아요. 문제의 예제와 직접 만든 입력으로 확인해 보세요.
            </S.Notice>
          </S.Summary>
          <S.Hint aria-label="풀이 힌트">
            <strong>힌트</strong>
            <p>{result.hint}</p>
          </S.Hint>
          <S.Reward>
            <img src="/images/result/xp-small.svg" alt="" />
            다시 도전해서 맞히면 +{result.availableXp} XP를 그대로 받을 수 있어요
          </S.Reward>
          <S.Actions>
            <S.Review to={`/problems/${result.problemId}`}>문제 다시 보기</S.Review>
            <S.Retry to={`/problems/${result.problemId}/submit`}>코드 고치러 가기</S.Retry>
          </S.Actions>
        </S.Page>
      ) : (
        <S.Unavailable id="main">
          <h1>채점 결과를 준비 중이에요</h1>
          <Link to="/problems">문제 목록으로</Link>
        </S.Unavailable>
      )}
      {pending && (
        <PreviewDialog title={pending} onClose={() => setPending(null)}>
          <UI.Description>{pending}는 준비 중이에요.</UI.Description>
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
