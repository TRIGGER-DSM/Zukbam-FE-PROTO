import { useId } from 'react';
import { CelebrationDialog } from '../../../shared/ui/CelebrationDialog';
import { Button } from '../../../shared/ui/Button';
import { formatNumber } from '../../../shared/format';
import * as S from './QuestRewardDialog.styles';

interface QuestRewardDialogProps {
  title: string;
  xp?: number;
  onClose: () => void;
}

export function QuestRewardDialog({ title, xp, onClose }: QuestRewardDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <CelebrationDialog titleId={titleId} descriptionId={descriptionId} onClose={onClose}>
      <S.Content>
        <S.Lightning>
          <img src="/images/result/xp.svg" alt="" />
        </S.Lightning>
        <h2 id={titleId}>{xp === undefined ? 'XP 보상을 받았어요!' : `+${formatNumber(xp)} XP`}</h2>
        <p>{title}</p>
        <span id={descriptionId}>퀘스트 보상을 수령했어요!</span>
        <Button onClick={onClose}>확인</Button>
      </S.Content>
    </CelebrationDialog>
  );
}
