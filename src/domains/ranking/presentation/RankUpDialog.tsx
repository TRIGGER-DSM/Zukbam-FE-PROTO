import * as S from './RankUpDialog.styles';
import { useId } from 'react';
import { Link } from 'react-router';
import type { RankPromotion } from '../domain/rankPromotion';
import { CelebrationDialog } from '../../../shared/ui/CelebrationDialog';

interface RankUpDialogProps {
  promotion: RankPromotion;
  onClose: () => void;
}

export function RankUpDialog({ promotion, onClose }: RankUpDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <CelebrationDialog titleId={titleId} descriptionId={descriptionId} onClose={onClose}>
      <S.Content>
        <S.Art src="/images/rank-up/medal-art.svg" alt={promotion.currentTier + ' 승급 메달'} />
        <S.Label>랭크 업!</S.Label>
        <h2 id={titleId}>{promotion.headline}</h2>
        <S.Description id={descriptionId}>{promotion.description}</S.Description>
        <S.Transition aria-label={`${promotion.previousTier}에서 ${promotion.currentTier}로 승급`}>
          <S.Previous>
            <img src="/images/rank-up/previous-medal.svg" alt="" />
            <span>{promotion.previousTier}</span>
          </S.Previous>
          <img src="/images/rank-up/chevron.svg" alt="" />
          <S.Current>
            <img src="/images/rank-up/current-medal.svg" alt="" />
            <span>{promotion.currentTier}</span>
          </S.Current>
        </S.Transition>
        <S.Next aria-label="다음 랭크 목표">
          <div>
            <p>
              <img src="/images/rank-up/next-medal.svg" alt="" />
              {promotion.nextTier}까지
            </p>
            <strong>{promotion.remainingXp.toLocaleString('ko-KR')} XP</strong>
          </div>
          <S.Progress
            src="/images/rank-up/progress.svg"
            alt={`${promotion.nextTier}까지 ${promotion.remainingXp.toLocaleString('ko-KR')} XP 남았어요`}
          />
        </S.Next>
        <S.Actions>
          <button onClick={onClose}>계속하기</button>
          <Link to="/ranking">랭킹에서 확인하기</Link>
        </S.Actions>
      </S.Content>
    </CelebrationDialog>
  );
}
