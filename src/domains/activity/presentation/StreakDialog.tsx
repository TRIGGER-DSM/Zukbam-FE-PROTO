import * as S from './StreakDialog.styles';
import { useId, useState } from 'react';
import { CelebrationDialog } from '../../../shared/ui/CelebrationDialog';
import { daysUntilBest, type StreakMilestone } from '../domain/streakMilestone';

interface StreakDialogProps {
  milestone: StreakMilestone;
  onClose: () => void;
}

export function StreakDialog({ milestone, onClose }: StreakDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [shareMessage, setShareMessage] = useState('');
  const share = async () => {
    const text = `죽빰에서 ${milestone.days}일 연속으로 문제를 풀었어요!`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${milestone.days}일 연속 풀이!`,
          text,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setShareMessage('공유 문구를 복사했어요.');
      } else {
        setShareMessage(text);
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setShareMessage(text);
    }
  };
  return (
    <CelebrationDialog titleId={titleId} descriptionId={descriptionId} onClose={onClose}>
      <S.Content>
        <S.Art src="/images/streak/flame-art.svg" alt="연속 풀이를 축하하는 불꽃" />
        <S.Count aria-hidden="true">{milestone.days}</S.Count>
        <h2 id={titleId}>{milestone.days}일 연속 풀이!</h2>
        <S.Description id={descriptionId}>
          어제보다 대나무가 한 마디 더 단단해졌어요.
          <br />
          내일도 한 문제 풀어 볼까요?
        </S.Description>
        <S.Week aria-label="이번 주 풀이 기록">
          {milestone.week.map((day) => (
            <S.Day
              key={day.label}
              $status={day.status}
              aria-label={`${day.label}요일 ${day.status === 'upcoming' ? '예정' : day.status === 'today' ? '오늘 달성' : '달성'}`}
              aria-current={day.status === 'today' ? 'date' : undefined}
            >
              <span>{day.label}</span>
              <S.DayMark aria-hidden="true">
                {day.status === 'completed' ? (
                  '✓'
                ) : day.status === 'today' ? (
                  <img src="/images/streak/flame.svg" alt="" />
                ) : null}
              </S.DayMark>
            </S.Day>
          ))}
        </S.Week>
        <S.Best>
          <img src="/images/streak/xp.svg" alt="" />
          최장 기록 {milestone.bestDays}일까지 {daysUntilBest(milestone)}일 남았어요
        </S.Best>
        <S.Actions>
          <S.Continue onClick={onClose}>계속하기</S.Continue>
          <S.Share onClick={share}>공유하기</S.Share>
        </S.Actions>
        {shareMessage && <S.ShareMessage role="status">{shareMessage}</S.ShareMessage>}
      </S.Content>
    </CelebrationDialog>
  );
}
