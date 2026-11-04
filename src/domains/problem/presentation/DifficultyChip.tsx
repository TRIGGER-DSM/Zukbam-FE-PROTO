import { difficulties, type Difficulty } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';
import * as S from './DifficultyChip.styles';

interface DifficultyChipProps {
  level: Difficulty;
}

export function DifficultyChip({ level }: DifficultyChipProps) {
  return (
    <S.Root>
      <ProblemAsset name={level} alt="" />
      {difficulties.find((item) => item.id === level)?.label}
    </S.Root>
  );
}
