import * as S from './NoticeCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { Announcement } from '../domain/announcement';
import { Asset } from '../../../shared/ui/Asset';
import type { ReactNode } from 'react';
import { formatNoticeDate } from './formatNoticeDate';

interface NoticeCardProps {
  notices: Announcement[];
  onSelect: (notice: Announcement) => void;
  onShowAll: () => void;
  children?: ReactNode;
}

export function NoticeCard({ notices, onSelect, children }: NoticeCardProps) {
  return (
    <S.Card aria-labelledby="notice-title">
      <UI.NoticeHeading>
        <div>
          <S.Bell>
            <Asset name="bell.svg" />
          </S.Bell>
          <h2 id="notice-title">공지사항</h2>
        </div>
      </UI.NoticeHeading>
      <ul>
        {notices.map((notice) => (
          <li key={notice.noticeId}>
            <button onClick={() => onSelect(notice)}>
              <S.Date>{formatNoticeDate(notice.createdAt)}</S.Date>
              <S.Name>{notice.title}</S.Name>
              <Asset name="chevron.svg" />
            </button>
          </li>
        ))}
      </ul>
      {children}
    </S.Card>
  );
}
