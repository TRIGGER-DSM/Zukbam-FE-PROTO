import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { clearSession, getAccessToken } from '../../shared/api/client';
import { myProfileOptions } from '../../domains/member/infrastructure/profileApi';
import { friendsOptions } from '../../domains/social/infrastructure/friendApi';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { AccountProfile } from '../../domains/account/presentation/AccountProfile';
import { AccountRank } from '../../domains/account/presentation/AccountRank';
import * as Account from '../../domains/account/presentation/Account.styles';
import { MyPageLayout } from './MyPageLayout';
import * as S from './FriendsPage.styles';

export function AccountPage() {
  const profile = useQuery(myProfileOptions());
  const friends = useQuery({ ...friendsOptions(), enabled: Boolean(getAccessToken()) });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const account = profile.data && {
    name: profile.data.name,
    email: profile.data.email,
    phone: '',
    joinedAt: '—',
    friendCount: friends.data?.length,
    rank: profile.data.rank,
    experience: profile.data.score,
  };

  function logout() {
    clearSession();
    queryClient.clear();
    navigate('/', { replace: true });
  }
  return (
    <MyPageLayout>
      <S.Panel aria-labelledby="account-title">
        <S.Heading>
          <h1 id="account-title">계정 관리</h1>
          <p>내 정보 수정과 로그아웃을 따로 나눠서 실수 없이 관리해요.</p>
        </S.Heading>
        <ApiFeedback pending={profile.isPending} error={profile.error} />
        {account && (
          <>
            <AccountProfile account={account} />
            <AccountRank account={account} />
          </>
        )}
        <Account.Logout aria-labelledby="logout-title">
          <img src="/images/account/logout.svg" alt="" />
          <div>
            <h2 id="logout-title">로그아웃</h2>
            <p>이 브라우저에 저장된 로그인 정보를 지워요.</p>
          </div>
          <Account.Exit variant="danger" disabled={!getAccessToken()} onClick={logout}>
            로그아웃
          </Account.Exit>
        </Account.Logout>
      </S.Panel>
    </MyPageLayout>
  );
}
