import * as S from './HomePage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { lazy, Suspense, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { myProfileOptions } from '../../domains/member/infrastructure/profileApi';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { StreakDialog } from '../../domains/activity/presentation/StreakDialog';
import { streakMilestoneFixture } from '../../domains/activity/infrastructure/streakMilestoneFixture';
import { QuestCard } from '../../domains/quest/presentation/QuestCard';
import { claimQuestReward, todayQuestsOptions } from '../../domains/quest/infrastructure/questApi';
import { RankingCard } from '../../domains/ranking/presentation/RankingCard';
import { RankUpDialog } from '../../domains/ranking/presentation/RankUpDialog';
import { rankPromotionFixture } from '../../domains/ranking/infrastructure/rankPromotionFixture';
import { NoticeCard } from '../../domains/announcement/presentation/NoticeCard';
import type { Announcement } from '../../domains/announcement/domain/announcement';
import {
  announcementOptions,
  announcementsOptions,
} from '../../domains/announcement/infrastructure/announcementApi';
import { formatNoticeDate } from '../../domains/announcement/presentation/formatNoticeDate';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { BannerCarousel } from './components/BannerCarousel';
import { problemDetailPath } from '../../domains/problem/presentation/problemDetailPath';

const Markdown = lazy(() => import('react-markdown'));

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = searchParams.get('modal');
  const signedIn = Boolean(useAccessToken());
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const userId = signedIn ? profile.data?.userId : undefined;
  const quests = useQuery(todayQuestsOptions(userId));
  const queryClient = useQueryClient();
  const reward = useMutation({
    mutationFn: claimQuestReward,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['today-quests', userId] }),
        queryClient.invalidateQueries({ queryKey: ['me'] }),
        queryClient.invalidateQueries({ queryKey: ['rankings'] }),
        queryClient.invalidateQueries({ queryKey: ['xp-histories'] }),
      ]);
    },
  });
  const rank =
    signedIn && profile.data ? { title: profile.data.rank, xp: profile.data.xp } : undefined;

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

  function openBannerProblem(problemId?: number) {
    navigate(problemId === undefined ? '/problems' : problemDetailPath(problemId));
  }

  return (
    <SiteLayout>
      <BannerCarousel onProblem={openBannerProblem} />
      <S.Page id="main">
        <UI.HiddenHeading>죽빰 — 매일 자라는 코딩 습관</UI.HiddenHeading>
        <S.Cards>
          <QuestCard
            showPlaceholder={!signedIn}
            quests={signedIn ? (quests.data?.quests ?? []) : []}
            resetAt={signedIn ? quests.data?.resetAt : undefined}
            pendingId={reward.isPending ? reward.variables : undefined}
            onClaim={(quest) => reward.mutate(quest.id)}
          >
            {signedIn && (
              <ApiFeedback
                pending={profile.isPending || quests.isLoading}
                error={profile.error ?? quests.error ?? reward.error}
              />
            )}
            {signedIn && quests.isSuccess && !quests.data.quests.length && (
              <UI.Muted>오늘의 퀘스트가 없어요.</UI.Muted>
            )}
          </QuestCard>
          <HomeNotices />
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
    </SiteLayout>
  );
}

function HomeNotices() {
  const [preview, setPreview] = useState<'all' | Announcement | null>(null);
  const [page, setPage] = useState(0);
  const latest = useQuery(announcementsOptions(0));
  const listing = useQuery({ ...announcementsOptions(page), enabled: preview === 'all' });
  const totalPages = listing.data?.totalPages ?? 0;
  const close = () => setPreview(null);

  return (
    <>
      <NoticeCard
        notices={latest.data?.notices.slice(0, 4) ?? []}
        onSelect={setPreview}
        onShowAll={() => {
          setPage(0);
          setPreview('all');
        }}
      >
        <NoticeFeedback
          pending={latest.isPending}
          error={latest.error}
          empty={latest.data?.notices.length === 0}
        />
      </NoticeCard>
      {preview === 'all' && (
        <PreviewDialog title="공지사항" onClose={close}>
          <NoticeFeedback
            pending={listing.isPending}
            error={listing.error}
            empty={listing.data?.notices.length === 0}
          />
          <S.Notices>
            {listing.data?.notices.map((notice) => (
              <li key={notice.noticeId}>
                <S.NoticeButton type="button" onClick={() => setPreview(notice)}>
                  <UI.MutedInline>{formatNoticeDate(notice.createdAt)}</UI.MutedInline>
                  {notice.title}
                </S.NoticeButton>
              </li>
            ))}
          </S.Notices>
          {(page > 0 || totalPages > 1) && (
            <S.NoticePagination aria-label="공지사항 페이지">
              <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)}>
                이전
              </button>
              <span>
                {page + 1}
                {totalPages > 0 && ` / ${totalPages}`}
              </span>
              <button
                type="button"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                다음
              </button>
            </S.NoticePagination>
          )}
        </PreviewDialog>
      )}
      {preview && preview !== 'all' && (
        <NoticeDetail key={preview.noticeId} notice={preview} onClose={close} />
      )}
    </>
  );
}

function NoticeDetail({ notice, onClose }: { notice: Announcement; onClose: () => void }) {
  const detail = useQuery(announcementOptions(notice.noticeId));
  return (
    <PreviewDialog title={detail.data?.title ?? notice.title} onClose={onClose}>
      <ApiFeedback pending={detail.isPending} error={detail.error} />
      {detail.data && (
        <>
          <UI.Muted>
            {formatNoticeDate(detail.data.createdAt, true)} · {detail.data.authorName}
          </UI.Muted>
          <S.NoticeContent>
            <Suspense fallback={<ApiFeedback pending />}>
              <Markdown skipHtml>{detail.data.content}</Markdown>
            </Suspense>
          </S.NoticeContent>
        </>
      )}
    </PreviewDialog>
  );
}

function NoticeFeedback({
  pending,
  error,
  empty,
}: {
  pending: boolean;
  error: Error | null;
  empty: boolean;
}) {
  return (
    <>
      <ApiFeedback pending={pending} error={error} />
      {empty && !error && <UI.Muted>등록된 공지사항이 없어요.</UI.Muted>}
    </>
  );
}
