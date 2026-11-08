import * as S from './SiteLayout.styles';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Asset } from './Asset';
import { useQuery } from '@tanstack/react-query';
import { useAccessToken } from '../hooks/useAccessToken';
import { myProfileOptions, studentNumber } from '../../domains/member/infrastructure/profileApi';

const teamMembers = [
  {
    name: '남우현',
    role: 'PM · Backend',
  },
  {
    name: '김태균',
    role: 'Backend',
  },
  {
    name: '조연재',
    role: 'Frontend',
  },
  {
    name: '정일웅',
    role: 'Design',
  },
];

const navigationItems = [
  {
    label: '홈',
    to: '/',
    section: '/',
  },
  {
    label: '문제',
    to: '/problems',
    section: '/problems',
  },
  {
    label: '랭킹',
    to: '/ranking',
    section: '/ranking',
  },
  {
    label: '소셜',
    to: '/mypage/friends',
    section: '/mypage',
  },
];

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <S.SkipLink href="#main">본문 바로가기</S.SkipLink>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}

interface AppHeaderProps {
  active?: string;
}

export function AppHeader({ active }: AppHeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const signedIn = Boolean(useAccessToken());
  const profilePath = signedIn || active !== undefined ? '/mypage/friends' : '/login';
  const profile = useQuery({
    ...myProfileOptions(),
    enabled: signedIn && active === undefined,
  }).data;
  const currentSection = navigationItems.find(({ section }) =>
    section === '/' ? pathname === section : pathname.startsWith(section),
  );
  const activeLabel = active ?? currentSection?.label;
  const defaultProfileLabel = active ? '2312 정일웅' : signedIn ? '마이페이지' : '로그인';
  const profileLabel =
    signedIn && profile
      ? [studentNumber(profile), profile.name].filter(Boolean).join(' ')
      : defaultProfileLabel;
  return (
    <S.Header>
      <S.HeaderContent>
        <Link to="/" aria-label="죽빰 홈">
          <Asset name="wordmark.svg" />
        </Link>
        <nav aria-label="주 메뉴">
          {navigationItems.map(({ label, to }) => (
            <S.NavLink key={to} to={to} aria-current={activeLabel === label ? 'page' : undefined}>
              {label}
            </S.NavLink>
          ))}
        </nav>
      </S.HeaderContent>
      <S.Profile onClick={() => navigate(profilePath)}>
        <span>{profileLabel}</span>
        <Asset name="profile.svg" />
      </S.Profile>
    </S.Header>
  );
}

export function AppFooter() {
  return (
    <S.Footer>
      <S.Brand>
        <S.Logo to="/">
          <Asset name="app-icon.svg" />
          <strong>죽빰</strong>
        </S.Logo>
        <p>대나무처럼 매일 자라는 코딩 습관</p>
        <small>© 2026 Team Trigger. All rights reserved.</small>
      </S.Brand>
      <S.Team>
        <h2>만든 사람들</h2>
        <ul>
          {teamMembers.map((member) => (
            <li key={member.name}>
              <Asset name="avatar.svg" />
              <div>
                <S.MemberName>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </S.MemberName>
                <S.Github>
                  <Asset name="github.svg" />
                  <span>github.com/username</span>
                </S.Github>
              </div>
            </li>
          ))}
        </ul>
      </S.Team>
    </S.Footer>
  );
}
