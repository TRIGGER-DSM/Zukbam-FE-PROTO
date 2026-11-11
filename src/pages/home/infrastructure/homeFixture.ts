import type { Announcement } from '../../../domains/announcement/domain/announcement';
import type { Quest } from '../../../domains/quest/domain/quest';
// Design fixtures. Replace this adapter with an API repository when connecting the backend.
export const homeFixture: {
  quests: Quest[];
  notices: Announcement[];
} = {
  quests: [
    {
      id: 'solve',
      title: '문제 1개 풀기',
      current: 1,
      target: 1,
    },
    {
      id: 'xp',
      title: '30 XP 획득하기',
      current: 20,
      target: 30,
    },
    {
      id: 'difficulty',
      title: '물 한 병 이상 1문제 풀기',
      current: 0,
      target: 1,
    },
  ],
  notices: [
    {
      id: 'challenge',
      date: '10.20',
      title: '10월 알고리즘 챌린지 안내',
      isNew: true,
    },
    {
      id: 'maintenance',
      date: '10.17',
      title: '채점 서버 점검 일정 (10/24 02:00~04:00)',
    },
    {
      id: 'problems',
      date: '10.15',
      title: '신규 문제 24개 추가',
    },
    {
      id: 'event',
      date: '10.10',
      title: '10월 출석 이벤트 당첨자 발표',
    },
  ],
};
