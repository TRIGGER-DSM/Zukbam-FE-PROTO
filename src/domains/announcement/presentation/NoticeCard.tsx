import * as S from './NoticeCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { Announcement } from '../domain/announcement';
import { Asset } from '../../../shared/ui/Asset';

interface NoticeCardProps {
  notices: Announcement[];
  onSelect: (notice: Announcement) => void;
  onShowAll: () => void;
}

export function NoticeCard({ notices, onSelect, onShowAll }: NoticeCardProps) {
  return (
    <S.Card aria-labelledby="notice-title">
      <UI.NoticeHeading>
        <div>
          <S.Bell>
            <Asset name="bell.svg" />
          </S.Bell>
          <h2 id="notice-title">공지사항</h2>
        </div>
        <button onClick={onShowAll}>전체</button>
      </UI.NoticeHeading>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <button onClick={() => onSelect(notice)}>
              <S.Date>{notice.date}</S.Date>
              <S.Name>{notice.title}</S.Name>
              {notice.isNew && <S.NewBadge>NEW</S.NewBadge>}
              <Asset name="chevron.svg" />
            </button>
          </li>
        ))}
      </ul>
    </S.Card>
  );
}
