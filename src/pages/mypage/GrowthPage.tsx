import { useQuery } from '@tanstack/react-query';
import { growthOptions } from '../../domains/activity/infrastructure/activityApi';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { GrowthOverview } from '../../domains/activity/presentation/GrowthOverview';
import { StreakCalendar } from '../../domains/activity/presentation/StreakCalendar';
import { GrowthActivity } from '../../domains/activity/presentation/GrowthActivity';
import { Overview } from '../../domains/activity/presentation/Growth.styles';
import { MyPageLayout } from './MyPageLayout';
import * as S from './FriendsPage.styles';

export function GrowthPage() {
  const growth = useQuery(growthOptions());
  const summary = growth.data;
  return (
    <MyPageLayout>
      <S.Panel aria-labelledby="growth-title">
        <S.Heading>
          <h1 id="growth-title">성장 기록</h1>
          <p>최근 365일 풀이 활동과 꾸준함을 한눈에 확인해요.</p>
        </S.Heading>
        <ApiFeedback pending={growth.isPending} error={growth.error} />
        {summary && (
          <>
            <Overview>
              <GrowthOverview summary={summary} />
              <StreakCalendar summary={summary} />
            </Overview>
            <GrowthActivity summary={summary} />
          </>
        )}
      </S.Panel>
    </MyPageLayout>
  );
}
