import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router';
import { myProfileOptions } from '../../domains/member/infrastructure/profileApi';
import { ApiError } from '../../shared/api/client';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';

export function AdminGuard() {
  const { key } = useLocation();
  const signedIn = Boolean(useAccessToken());
  const profileOptions = myProfileOptions('optional');
  const profile = useQuery({
    ...profileOptions,
    queryKey: [...profileOptions.queryKey, 'admin-entry', key],
    gcTime: 0,
    retry: false,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });

  if (
    (profile.error instanceof ApiError && [401, 403].includes(profile.error.status)) ||
    (profile.isSuccess && profile.data.role !== 'TEACHER')
  ) {
    return <Navigate to="/" replace />;
  }

  if (profile.isSuccess && !profile.isFetching && signedIn) {
    return <Outlet />;
  }

  return (
    <main id="main">
      <ApiFeedback pending={profile.isPending || profile.isFetching} error={profile.error} />
      {profile.isError && !profile.isFetching && (
        <button type="button" onClick={() => void profile.refetch()}>
          다시 시도
        </button>
      )}
    </main>
  );
}
