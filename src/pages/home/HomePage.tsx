import * as S from './HomePage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { myProfileOptions } from '../../domains/member/infrastructure/profileApi';
import { getAccessToken } from '../../shared/api/client';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { StreakDialog } from '../../domains/activity/presentation/StreakDialog';
import { streakMilestoneFixture } from '../../domains/activity/infrastructure/streakMilestoneFixture';
import { QuestCard } from '../../domains/quest/presentation/QuestCard';
import { RankingCard } from '../../domains/ranking/presentation/RankingCard';
import { RankUpDialog } from '../../domains/ranking/presentation/RankUpDialog';
import { rankPromotionFixture } from '../../domains/ranking/infrastructure/rankPromotionFixture';
import { NoticeCard } from '../../domains/announcement/presentation/NoticeCard';
import type { Announcement } from '../../domains/announcement/domain/announcement';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { BannerCarousel } from './components/BannerCarousel';
import { homeFixture } from './infrastructure/homeFixture';
import { problemDetailPath } from '../../domains/problem/presentation/problemDetailPath';

interface NoticeListPreview {
  kind: 'notices';
  title: string;
}

interface NoticePreview {
  kind: 'notice';
  title: string;
  date: string;
}

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [preview, setPreview] = useState<NoticeListPreview | NoticePreview | null>(null);
  const { quests, notices } = homeFixture;
  const modal = searchParams.get('modal');
  const signedIn = Boolean(getAccessToken());
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const rank = profile.data && { title: profile.data.rank, xp: profile.data.score };

  function closeCelebration() {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.delete('modal');
        return next;
      },
      { replace: true },
    );
  }

  function openBannerProblem(title: string) {
    const problemId = Number.parseInt(title, 10);
    navigate(Number.isSafeInteger(problemId) ? problemDetailPath(problemId) : '/problems');
  }

  function openNotice({ title, date }: Announcement) {
    setPreview({ kind: 'notice', title, date });
  }

  return (
    <SiteLayout>
      <BannerCarousel onProblem={openBannerProblem} />
      <S.Page id="main">
        <UI.HiddenHeading>죽빰 — 매일 자라는 코딩 습관</UI.HiddenHeading>
        <S.Cards>
          <QuestCard quests={quests} />
          <NoticeCard
            notices={notices}
            onSelect={openNotice}
            onShowAll={() => setPreview({ kind: 'notices', title: '공지사항' })}
          />
        </S.Cards>
        <RankingCard rank={rank} onShowAll={() => navigate('/ranking')}>
          {signedIn ? (
            <ApiFeedback pending={profile.isPending} error={profile.error} />
          ) : (
            <UI.Muted>로그인 후 내 랭크를 확인할 수 있어요.</UI.Muted>
          )}
        </RankingCard>
      </S.Page>
      {modal === 'rank-up' && (
        <RankUpDialog promotion={rankPromotionFixture} onClose={closeCelebration} />
      )}
      {modal === 'streak' && (
        <StreakDialog milestone={streakMilestoneFixture} onClose={closeCelebration} />
      )}
      {preview && (
        <PreviewDialog key={preview.title} title={preview.title} onClose={() => setPreview(null)}>
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
                  <S.NoticeButton onClick={() => openNotice(notice)}>
                    <UI.MutedInline>{notice.date}</UI.MutedInline>
                    {notice.title}
                  </S.NoticeButton>
                </li>
              ))}
            </S.Notices>
          )}
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
