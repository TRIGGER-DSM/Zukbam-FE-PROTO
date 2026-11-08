import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { receivedRequestsOptions } from '../../domains/social/infrastructure/friendApi';
import { getAccessToken } from '../../shared/api/client';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import * as S from './FriendsPage.styles';

interface MyPageLayoutProps {
  children: ReactNode;
  pendingCount?: number;
}
interface MyPageMenuItem {
  label: string;
  icon: string;
  activeIcon: string;
  path: string;
  showsRequestCount?: boolean;
}

const menuItems: MyPageMenuItem[] = [
  { label: '친구 목록', icon: 'users-inactive', activeIcon: 'users', path: '/mypage/friends' },
  {
    label: '친구 추가',
    icon: 'user-plus',
    activeIcon: 'user-plus-active',
    path: '/mypage/friends/add',
  },
  {
    label: '받은 요청',
    icon: 'inbox',
    activeIcon: 'inbox-active',
    showsRequestCount: true,
    path: '/mypage/friends/requests',
  },
  { label: '성장 기록', icon: 'chart', activeIcon: 'chart-active', path: '/mypage/growth' },
  { label: '계정 관리', icon: 'settings', activeIcon: 'settings-active', path: '/mypage/account' },
];

export function MyPageLayout({ children, pendingCount }: MyPageLayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const requests = useQuery({
    ...receivedRequestsOptions(),
    enabled: Boolean(getAccessToken()) && pendingCount === undefined,
  });
  const requestCount = pendingCount ?? requests.data?.length ?? 0;

  return (
    <SiteLayout>
      <S.Page id="main">
        <S.Layout>
          <S.Nav aria-label="마이페이지 메뉴">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const icon = isActive ? item.activeIcon : item.icon;
              return (
                <S.NavButton
                  key={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => navigate(item.path)}
                >
                  <img src={`/images/friends/${icon}.svg`} alt="" />
                  <span>{item.label}</span>
                  {item.showsRequestCount && requestCount > 0 && (
                    <small aria-label={`${requestCount}개 요청`}>{requestCount}</small>
                  )}
                </S.NavButton>
              );
            })}
          </S.Nav>
          {children}
        </S.Layout>
      </S.Page>
    </SiteLayout>
  );
}
