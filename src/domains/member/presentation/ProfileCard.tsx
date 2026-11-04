import type { MemberProfile } from '../domain/member';
import { Avatar } from '../../../shared/ui/Avatar';
import { Button } from '../../../shared/ui/Button';
import * as S from './ProfileCard.styles';

interface ProfileCardProps {
  member: MemberProfile;
  onEdit: () => void;
}

export function ProfileCard({ member, onEdit }: ProfileCardProps) {
  const stats = [
    ['현재 스트릭', `${member.streak}일`],
    ['최장 스트릭', `${member.bestStreak}일`],
    ['총 정답', `${member.solved.toLocaleString('ko-KR')}문제`],
    ['친구', `${member.friends}명`],
  ];
  return (
    <S.Root aria-label={`${member.name} 프로필`}>
      <Avatar name={member.name} size={104} />
      <S.Info>
        <S.Name>
          <h3>{member.name}</h3>
          <span>{member.id}</span>
        </S.Name>
        <S.Tier>
          <img src="/images/home/rank-5.svg" alt="" />
          <strong>{member.tier}</strong>
          <span>·</span>
          <img src="/images/home/xp.svg" alt="" />
          <S.Xp>{member.xp.toLocaleString('ko-KR')} XP</S.Xp>
        </S.Tier>
      </S.Info>
      <S.Stats>
        {stats.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </S.Stats>
      <Button variant="secondary" onClick={onEdit}>
        프로필 수정
      </Button>
    </S.Root>
  );
}
