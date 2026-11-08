import * as S from './ProblemDetailPage.styles';
import * as Example from '../../domains/problem/presentation/ProblemExample.styles';
import styled from '@emotion/styled';
import { Link, useNavigate, useParams } from 'react-router';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { useQuery } from '@tanstack/react-query';
import { problemDetailOptions } from '../../domains/problem/infrastructure/problemApi';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { ProblemDetailHero } from '../../domains/problem/presentation/ProblemDetailHero';
import { ProblemDetailSidebar } from '../../domains/problem/presentation/ProblemDetailSidebar';
import { ProblemExample } from '../../domains/problem/presentation/ProblemExample';

export function ProblemDetailPage() {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const detail = useQuery(problemDetailOptions(Number(problemId)));
  const problem = detail.data;
  return (
    <SiteLayout>
      {problem ? (
        <S.Page id="main">
          <ProblemDetailHero problem={problem} />
          <S.Content>
            <S.Statement aria-label="문제 설명">
              <Example.Section>
                <h2>문제</h2>
                <Statement>{problem.description}</Statement>
                <S.Rules>
                  {problem.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </S.Rules>
                <p>{problem.objective}</p>
              </Example.Section>
              {problem.input && (
                <Example.Section>
                  <h2>입력</h2>
                  <p>{problem.input}</p>
                </Example.Section>
              )}
              {problem.output && (
                <Example.Section>
                  <h2>출력</h2>
                  <p>{problem.output}</p>
                </Example.Section>
              )}
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
          <h1>문제 상세</h1>
          <ApiFeedback pending={detail.isLoading} error={detail.error} />
          {!detail.isLoading && !detail.error && <p>문제 번호를 확인해 주세요.</p>}
          <Link to="/problems">문제 목록으로</Link>
        </S.Unavailable>
      )}
    </SiteLayout>
  );
}

const Statement = styled.p`
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;
