import * as S from './StatusBadge.styles';

export type Relationship = 'accepted' | 'rejected' | 'sent' | 'friend';

const labels: Record<Relationship, string> = {
  accepted: '수락함',
  rejected: '거절됨',
  sent: '요청 보냄',
  friend: '친구',
};

interface StatusBadgeProps {
  status: Relationship;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <S.Root $status={status}>
      <img src={`/images/components/${status}.svg`} alt="" />
      {labels[status]}
    </S.Root>
  );
}
