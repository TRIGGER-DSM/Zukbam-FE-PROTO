import * as S from './HomePage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ActivityCard, StreakCard } from '../../domains/activity/presentation/Activity';
import { StreakDialog } from '../../domains/activity/presentation/StreakDialog';
import { streakMilestoneFixture } from '../../domains/activity/infrastructure/streakMilestoneFixture';
import { QuestCard } from '../../domains/quest/presentation/QuestCard';
import { RankingCard } from '../../domains/ranking/presentation/RankingCard';
import { RankUpDialog } from '../../domains/ranking/presentation/RankUpDialog';
import { rankPromotionFixture } from '../../domains/ranking/infrastructure/rankPromotionFixture';
import { NoticeCard } from '../../domains/announcement/presentation/NoticeCard';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { BannerCarousel } from './components/BannerCarousel';
import { homeFixture } from './infrastructure/homeFixture';
import { problemDetailPath } from '../../domains/problem/presentation/problemDetailPath';

type Preview =
  | {
      kind: 'pending';
      title: string;
    }
  | {
      kind: 'notices';
      title: string;
    }
  | {
      kind: 'notice';
      title: string;
      date: string;
    };

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const closeCelebration = () =>
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.delete('modal');
        return next;
      },
      {
        replace: true,
      },
    );
  const [preview, setPreview] = useState<Preview | null>(null);
  const { activity, quests, rank, notices } = homeFixture;
  const showPending = (title: string) =>
    setPreview({
      kind: 'pending',
      title,
    });
  return (
    <SiteLayout onNavigate={showPending}>
      <BannerCarousel
        onProblem={(title) => navigate(problemDetailPath(Number.parseInt(title, 10)))}
      />
      <S.Page id="main">
        <UI.HiddenHeading>죽빰 — 매일 자라는 코딩 습관</UI.HiddenHeading>
        <S.KpiGrid>
          <StreakCard activity={activity} />
          <QuestCard quests={quests} />
        </S.KpiGrid>
        <S.ActivityGrid>
          <ActivityCard activity={activity} />
          <NoticeCard
            notices={notices}
            onSelect={(notice) =>
              setPreview({
                kind: 'notice',
                title: notice.title,
                date: notice.date,
              })
            }
            onShowAll={() =>
              setPreview({
                kind: 'notices',
                title: '공지사항',
              })
            }
          />
        </S.ActivityGrid>
        <RankingCard rank={rank} onShowAll={() => navigate('/ranking')} />
      </S.Page>
      {searchParams.get('modal') === 'rank-up' && (
        <RankUpDialog promotion={rankPromotionFixture} onClose={closeCelebration} />
      )}
      {searchParams.get('modal') === 'streak' && (
        <StreakDialog milestone={streakMilestoneFixture} onClose={closeCelebration} />
      )}
      {preview && (
        <PreviewDialog key={preview.title} title={preview.title} onClose={() => setPreview(null)}>
          {preview.kind === 'pending' && (
            <UI.Description>{preview.title} 화면은 준비 중이에요.</UI.Description>
          )}
          {preview.kind === 'notice' && (
            <>
              <UI.Muted>2026.{preview.date}</UI.Muted>
              <UI.Description>공지 상세 내용은 서비스 연결 후 확인할 수 있어요.</UI.Description>
            </>
          )}
          {preview.kind === 'notices' && (
            <S.Notices>
              {notices.map((notice) => (
                <li key={notice.id}>
                  <button
                    onClick={() =>
                      setPreview({
                        kind: 'notice',
                        title: notice.title,
                        date: notice.date,
                      })
                    }
                  >
                    <UI.MutedInline>{notice.date}</UI.MutedInline>
                    {notice.title}
                  </button>
                </li>
              ))}
            </S.Notices>
          )}
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
