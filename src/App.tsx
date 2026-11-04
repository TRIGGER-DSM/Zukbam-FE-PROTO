import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { AcceptedResultPage } from './pages/result/AcceptedResultPage';
import { WrongResultPage } from './pages/result/WrongResultPage';
import { HomePage } from './pages/home/HomePage';
import { ProblemDetailPage } from './pages/problem-detail/ProblemDetailPage';
import { ProblemsPage } from './pages/problems/ProblemsPage';
import { RankingPage } from './pages/ranking/RankingPage';

const ComponentsPage = lazy(() => import('./pages/components/ComponentsPage'));

const ColorsPage = lazy(() => import('./pages/components/ColorsPage'));

const SubmissionPage = lazy(() =>
  import('./pages/submission/SubmissionPage').then((module) => ({
    default: module.SubmissionPage,
  })),
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
      </Routes>
    </BrowserRouter>
  );
}
