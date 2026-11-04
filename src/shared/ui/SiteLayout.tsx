import * as S from './SiteLayout.styles';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Asset } from './Asset';

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
  },
  {
    label: '문제',
    to: '/problems',
  },
  {
    label: '랭킹',
    to: '/ranking',
  },
  {
    label: '소셜',
  },
];

interface SiteLayoutProps {
  children: ReactNode;
  onNavigate: (name: string) => void;
}

export function SiteLayout({ children, onNavigate }: SiteLayoutProps) {
  return (
    <>
      <S.SkipLink href="#main">본문 바로가기</S.SkipLink>
      <AppHeader onNavigate={onNavigate} />
      {children}
      <AppFooter />
    </>
  );
}

interface AppHeaderProps {
  onNavigate: (name: string) => void;
  active?: string;
}

export function AppHeader({ onNavigate, active }: AppHeaderProps) {
  const { pathname } = useLocation();
  const activeNavigationLabel =
    active ??
    (pathname.startsWith('/problems')
      ? '문제'
      : pathname.startsWith('/ranking')
        ? '랭킹'
        : pathname === '/'
          ? '홈'
          : undefined);
  return (
    <S.Header>
      <S.HeaderContent>
        <Link to="/" aria-label="죽빰 홈">
          <Asset name="wordmark.svg" />
        </Link>
        <nav aria-label="주 메뉴">
          {navigationItems.map((item) =>
            item.to ? (
              <S.NavLink
                key={item.label}
                to={item.to}
                aria-current={activeNavigationLabel === item.label ? 'page' : undefined}
              >
                {item.label}
              </S.NavLink>
            ) : (
              <button
                key={item.label}
                aria-current={active === item.label ? 'page' : undefined}
                onClick={() => onNavigate(item.label)}
              >
                {item.label}
              </button>
            ),
          )}
        </nav>
      </S.HeaderContent>
      <S.Profile onClick={() => onNavigate('내 프로필')}>
        <span>2312 정일웅</span>
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
