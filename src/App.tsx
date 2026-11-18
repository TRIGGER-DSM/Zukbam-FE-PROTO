import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { AcceptedResultPage } from './pages/result/AcceptedResultPage';
import { WrongResultPage } from './pages/result/WrongResultPage';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { SignupPage } from './pages/signup/SignupPage';
import { SignupFlow } from './pages/signup/SignupFlow';
import { VerificationPage } from './pages/signup/VerificationPage';
import { ProblemDetailPage } from './pages/problem-detail/ProblemDetailPage';
import { ProblemsPage } from './pages/problems/ProblemsPage';
import { RankingPage } from './pages/ranking/RankingPage';
import { FriendsPage } from './pages/mypage/FriendsPage';
import { AddFriendPage } from './pages/mypage/AddFriendPage';
import { FriendRequestsPage } from './pages/mypage/FriendRequestsPage';
import { GrowthPage } from './pages/mypage/GrowthPage';
import { AccountPage } from './pages/mypage/AccountPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { StudentAchievementPage } from './pages/admin/StudentAchievementPage';
import { ProblemRegistrationPage } from './pages/admin/ProblemRegistrationPage';
import { ProblemEditPage } from './pages/admin/ProblemEditPage';

const ComponentsPage = lazy(() => import('./pages/components/ComponentsPage'));

const ColorsPage = lazy(() => import('./pages/components/ColorsPage'));
const GroupManagementPage = lazy(() => import('./pages/admin/GroupManagementPage'));
const SubmissionHistoryPage = lazy(() => import('./pages/admin/SubmissionHistoryPage'));

const TestCasesPage = lazy(() =>
  import('./pages/admin/TestCasesPage').then(({ TestCasesPage }) => ({ default: TestCasesPage })),
);

const SubmissionPage = lazy(() =>
  import('./pages/submission/SubmissionPage').then((module) => ({
    default: module.SubmissionPage,
  })),
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === '/admin/groups' && (hash === '#group-list' || hash === '#group-create')) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    if (hash === '#statistics' && pathname === '/admin') {
      document.getElementById('statistics')?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/components/colors"
          element={
            <Suspense fallback={<p>불러오는 중…</p>}>
              <ColorsPage />
            </Suspense>
          }
        />
        <Route
          path="/components"
          element={
            <Suspense fallback={<p>불러오는 중…</p>}>
              <ComponentsPage />
            </Suspense>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/achievement" element={<StudentAchievementPage />} />
        <Route
          path="/admin/submissions/:userId?"
          element={
            <Suspense fallback={<p>불러오는 중…</p>}>
              <SubmissionHistoryPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/groups"
          element={
            <Suspense fallback={<p>불러오는 중…</p>}>
              <GroupManagementPage />
            </Suspense>
          }
        />
        <Route path="/admin/problems/new" element={<ProblemRegistrationPage />} />
        <Route path="/admin/problems/:problemId/edit" element={<ProblemEditPage />} />
        <Route
          path="/admin/problems/:problemId/test-cases"
          element={
            <Suspense fallback={<p>불러오는 중…</p>}>
              <TestCasesPage />
            </Suspense>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupFlow />}>
          <Route index element={<SignupPage key="student" role="student" />} />
          <Route path="teacher" element={<SignupPage key="teacher" role="teacher" />} />
          <Route path="verify" element={<VerificationPage />} />
        </Route>
        <Route
          path="/problems/:problemId/submit"
          element={
            <Suspense fallback={<p>편집기 불러오는 중…</p>}>
              <SubmissionPage />
            </Suspense>
          }
        />
        <Route path="/problems/:problemId/result" element={<AcceptedResultPage />} />
        <Route path="/problems/:problemId/result/wrong" element={<WrongResultPage />} />
        <Route path="/problems/:problemId" element={<ProblemDetailPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/mypage/friends" element={<FriendsPage />} />
        <Route path="/mypage/friends/add" element={<AddFriendPage />} />
        <Route path="/mypage/friends/requests" element={<FriendRequestsPage />} />
        <Route path="/mypage/growth" element={<GrowthPage />} />
        <Route path="/mypage/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}
