import type { StreakMilestone } from '../domain/streakMilestone';

export const streakMilestoneFixture: StreakMilestone = {
  days: 13,
  bestDays: 31,
  week: [
    {
      label: '월',
      status: 'completed',
    },
    {
      label: '화',
      status: 'today',
    },
    {
      label: '수',
      status: 'upcoming',
    },
    {
      label: '목',
      status: 'upcoming',
    },
    {
      label: '금',
      status: 'upcoming',
    },
    {
      label: '토',
      status: 'upcoming',
    },
    {
      label: '일',
      status: 'upcoming',
    },
  ],
};
