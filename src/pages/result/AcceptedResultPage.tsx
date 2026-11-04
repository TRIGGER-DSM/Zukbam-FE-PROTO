import * as S from './AcceptedResultPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { getProblemDetail } from '../../domains/problem/application/getProblemDetail';
import { problemDetailFixtureRepository } from '../../domains/problem/infrastructure/problemDetailFixture';
import { getAcceptedJudgement } from '../../domains/submission/application/getAcceptedJudgement';
import { judgementFixtureRepository } from '../../domains/submission/infrastructure/judgementFixture';

const resultImage = (name: string) => `/images/result/${name}`;

export function AcceptedResultPage() {
  const { problemId } = useParams();
  const problem = getProblemDetail(problemDetailFixtureRepository, problemId);
  const result = getAcceptedJudgement(judgementFixtureRepository, problemId);
  const [pending, setPending] = useState<string | null>(null);
  return (
    <SiteLayout onNavigate={setPending}>
      {problem && result ? (
        <S.Page id="main" aria-labelledby="accepted-title">
          <S.Mascot
            src={resultImage('celebrate.png')}
            alt="두 팔을 들고 정답을 축하하는 판다"
            width="360"
            height="320"
          />
          <h1 id="accepted-title">정답이에요!</h1>
          <S.Description>
            {problem.id}. {problem.title}를 해결했어요. 대나무가 {result.earnedXp} XP만큼 자랐어요.
          </S.Description>
          <S.Stats>
            <S.Xp>
              <dt>획득 XP</dt>
              <dd>
                <img src={resultImage('xp.svg')} alt="" />+{result.earnedXp}
              </dd>
            </S.Xp>
            <S.Time>
              <dt>실행 시간</dt>
              <dd>{result.executionTimeMs}ms</dd>
            </S.Time>
            <S.Streak>
              <dt>연속 풀이</dt>
              <dd>
                <img src={resultImage('streak.svg')} alt="" />
                {result.streakDays}일
              </dd>
            </S.Streak>
          </S.Stats>
          <S.Growth aria-label="대나무 성장">
            <S.Medal src={resultImage('medal.svg')} alt={result.currentTier + ' 메달'} />
            <S.GrowthDetails>
              <p>
                <strong>{result.currentTier}</strong>
                <span>→&nbsp; {result.nextTier}</span>
              </p>
              <S.Progress
                role="progressbar"
                aria-label="다음 등급까지 획득한 XP"
                aria-valuemin={0}
                aria-valuemax={result.nextTierXp}
                aria-valuenow={result.totalXp}
              >
                <img src={resultImage('progress.svg')} alt="" />
              </S.Progress>
              <S.GrowthCaption>
                {result.totalXp.toLocaleString('ko-KR')} /{' '}
                {result.nextTierXp.toLocaleString('ko-KR')} XP ·{' '}
                {result.nextTierXp - result.totalXp} XP 남았어요
              </S.GrowthCaption>
            </S.GrowthDetails>
            <S.XpBadge>
              <img src={resultImage('xp-small.svg')} alt="" />+{result.earnedXp} XP
            </S.XpBadge>
          </S.Growth>
          <S.Actions>
            <button onClick={() => setPending('다른 사람 풀이 보기')}>다른 사람 풀이 보기</button>
            <S.Next to="/problems">다음 문제 풀기</S.Next>
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
