import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import type { AccountProfile as Account } from '../domain/account';
import * as UI from '../../../shared/ui/primitives.styles';
import * as S from './Account.styles';

interface AccountProfileProps {
  account: Account;
}

export function AccountProfile({ account }: AccountProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [announcement, setAnnouncement] = useState('');

  useEffect(
    () => () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    },
    [photoUrl],
  );

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAnnouncement('이미지 파일을 선택해 주세요.');
      event.target.value = '';
      return;
    }
    setPhotoUrl(URL.createObjectURL(file));
    setAnnouncement('프로필 이미지 미리보기가 변경됐어요.');
    event.target.value = '';
  }

  return (
    <S.Profile aria-label="내 프로필">
      <S.Cover>
        {photoUrl ? (
          <img src={photoUrl} alt={`${account.name} 프로필 미리보기`} />
        ) : (
          <img src="/images/account/avatar.svg" alt={`${account.name} 프로필`} />
        )}
        <S.Edit aria-label="프로필 이미지 변경" onClick={() => fileInputRef.current?.click()}>
          <img src="/images/account/edit.svg" alt="" />
        </S.Edit>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          aria-label="프로필 이미지 파일"
          hidden
          onChange={handlePhotoChange}
        />
      </S.Cover>
      <S.Info>
        <h2>{account.name}</h2>
        <dl>
          <div>
            <dt>사용자 번호</dt>
            <dd>{account.userId}</dd>
          </div>
          <div>
            <dt>연락처</dt>
            <dd>
              <div>
                {account.phone && <span>{account.phone}</span>}
                <span>{account.email}</span>
              </div>
            </dd>
          </div>
          <div>
            <dt>가입날짜</dt>
            <dd>{account.joinedAt}</dd>
          </div>
        </dl>
        {account.friendCount !== undefined && <S.Friends>친구 {account.friendCount}명</S.Friends>}
        <UI.HiddenText role="status">{announcement}</UI.HiddenText>
      </S.Info>
    </S.Profile>
  );
}
