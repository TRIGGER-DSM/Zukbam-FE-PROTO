import * as S from './ProblemDetailPage.styles';
import * as Example from '../../domains/problem/presentation/ProblemExample.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { getProblemDetail } from '../../domains/problem/application/getProblemDetail';
import { problemDetailFixtureRepository } from '../../domains/problem/infrastructure/problemDetailFixture';
import { ProblemDetailHero } from '../../domains/problem/presentation/ProblemDetailHero';
import { ProblemDetailSidebar } from '../../domains/problem/presentation/ProblemDetailSidebar';
import { ProblemExample } from '../../domains/problem/presentation/ProblemExample';

export function ProblemDetailPage() {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const problem = getProblemDetail(problemDetailFixtureRepository, problemId);
  const [pending, setPending] = useState<string | null>(null);
  return (
    <SiteLayout onNavigate={setPending}>
      {problem ? (
        <S.Page id="main">
          <ProblemDetailHero problem={problem} />
          <S.Content>
            <S.Statement aria-label="문제 설명">
              <Example.Section>
                <h2>문제</h2>
                <p>{problem.description}</p>
                <S.Rules>
                  {problem.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </S.Rules>
                <p>{problem.objective}</p>
              </Example.Section>
              <Example.Section>
                <h2>입력</h2>
                <p>{problem.input}</p>
              </Example.Section>
              <Example.Section>
                <h2>출력</h2>
                <p>{problem.output}</p>
              </Example.Section>
              {problem.examples.map((example, index) => (
                <ProblemExample key={index} example={example} index={index} />
              ))}
            </S.Statement>
            <S.Sidebar>
              <S.Mascot name="mascot.png" />
              <ProblemDetailSidebar
                problem={problem}
                onWrite={() => navigate(`/problems/${problem.id}/submit`)}
              />
            </S.Sidebar>
          </S.Content>
        </S.Page>
      ) : (
        <S.Unavailable id="main">
          <h1>문제 상세를 준비 중이에요</h1>
          <p>이 문제의 상세 내용은 아직 등록되지 않았어요.</p>
          <Link to="/problems">문제 목록으로</Link>
        </S.Unavailable>
      )}
      {pending && (
        <PreviewDialog title={pending} onClose={() => setPending(null)}>
          <UI.Description>{pending} 화면은 준비 중이에요.</UI.Description>
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
