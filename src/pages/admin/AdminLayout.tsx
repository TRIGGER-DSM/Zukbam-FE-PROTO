import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Asset } from '../../shared/ui/Asset';
import { AppFooter } from '../../shared/ui/SiteLayout';
import * as S from './AdminDashboardPage.styles';

interface AdminLayoutProps {
  achievement?: boolean;
  problemRegistration?: boolean;
  problemEditing?: boolean;
  groupManagement?: boolean;
  children: ReactNode;
}

export function AdminLayout({
  achievement = false,
  problemRegistration = false,
  problemEditing = false,
  groupManagement = false,
  children,
}: AdminLayoutProps) {
  const { hash } = useLocation();
  const statistics = !achievement && hash === '#statistics';
  const problemManagement = problemRegistration || problemEditing;

  return (
    <>
      <S.Header>
        <S.HeaderInner>
          <Link to="/" aria-label="죽빰 홈">
            <S.Wordmark name="wordmark.svg" loading="eager" />
          </Link>
          <S.TopNav aria-label="관리자 메뉴">
            <Link
              to="/admin"
              aria-current={problemManagement || groupManagement ? undefined : 'page'}
            >
              대시보드
            </Link>
            <Link to="/admin/problems/new" aria-current={problemManagement ? 'page' : undefined}>
              문제 관리
            </Link>
            <Link to="/admin/groups" aria-current={groupManagement ? 'page' : undefined}>
              그룹 관리
            </Link>
          </S.TopNav>
          <S.Profile>
            <span>김지영 선생님</span>
            <Asset name="avatar.svg" width={42} height={42} />
          </S.Profile>
        </S.HeaderInner>
      </S.Header>
      <S.Main>
        {groupManagement ? (
          <S.SideNav aria-label="그룹 관리 메뉴">
            <a href="#group-list" aria-current={hash === '#group-create' ? undefined : 'location'}>
              <img src="/images/admin/group-users.svg" alt="" width={22} height={22} />
              그룹 목록
            </a>
            <a
              href="#group-create"
              aria-current={hash === '#group-create' ? 'location' : undefined}
            >
              <img src="/images/admin/group-plus.svg" alt="" width={22} height={22} />
              그룹 생성
            </a>
          </S.SideNav>
        ) : problemManagement ? (
          <S.SideNav aria-label="문제 관리 메뉴">
            <Link to="/problems" aria-current={problemEditing ? 'location' : undefined}>
              <img
                src={
                  problemEditing
                    ? '/images/admin/problem-inbox-active.svg'
                    : '/images/admin/problem-inbox.svg'
                }
                alt=""
                width={22}
                height={22}
              />
              문제 목록
            </Link>
            <Link to="/admin/problems/new" aria-current={problemRegistration ? 'page' : undefined}>
              <img
                src={
                  problemEditing
                    ? '/images/admin/problem-register-inactive.svg'
                    : '/images/admin/problem-register.svg'
                }
                alt=""
                width={22}
                height={22}
              />
              문제 등록
            </Link>
          </S.SideNav>
        ) : (
          <S.SideNav aria-label="대시보드 섹션">
            <Link to="/admin" aria-current={!achievement && !statistics ? 'page' : undefined}>
              <img
                src={`/images/admin/${achievement ? 'chart-inactive' : 'chart'}.svg`}
                alt=""
                width={22}
                height={22}
              />
              학생 풀이 현황
            </Link>
            <Link to="/admin#statistics" aria-current={statistics ? 'location' : undefined}>
              <img src="/images/admin/check.svg" alt="" width={22} height={22} />
              문제 풀이 통계
            </Link>
            <Link to="/admin/achievement" aria-current={achievement ? 'page' : undefined}>
              <img
                src={`/images/admin/${achievement ? 'student-active' : 'student'}.svg`}
                alt=""
                width={22}
                height={22}
              />
              학생별 성취도
            </Link>
          </S.SideNav>
        )}
        {children}
      </S.Main>
      <AppFooter />
    </>
  );
}
