import * as S from './SubmissionProblemPanel.styles';
import { useState } from 'react';
import { SolutionHistory } from './SolutionHistory';
import type { ProblemDetail } from '../../problem/domain/problemDetail';
import type { SubmissionTab } from '../domain/submission';

interface SampleProps {
  label: string;
  value: string;
}

function Sample({ label, value }: SampleProps) {
  const [copied, setCopied] = useState(false);
  return (
    <S.Sample>
      <div>
        <strong>{label}</strong>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          aria-label={`예제 ${label} 복사`}
        >
          {copied ? '복사 완료' : '복사'}
        </button>
      </div>
      <pre>{value}</pre>
    </S.Sample>
  );
}

interface SubmissionProblemPanelProps {
  problem: ProblemDetail;
  tab: SubmissionTab;
  onTabChange: (tab: SubmissionTab) => void;
}

export function SubmissionProblemPanel({ problem, tab, onTabChange }: SubmissionProblemPanelProps) {
  return (
    <S.Panel aria-label="문제 패널">
      <S.Tabs role="tablist" aria-label="문제 정보 탭">
        {[
          {
            id: 'problem',
            label: '문제',
          },
          {
            id: 'history',
            label: '제출 기록',
          },
          {
            id: 'questions',
            label: '질문',
          },
        ].map((item) => (
          <button
            key={item.id}
            role="tab"
            id={`submission-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls="submission-problem-content"
            onClick={() => onTabChange(item.id as SubmissionTab)}
          >
            {item.label}
          </button>
        ))}
      </S.Tabs>
      <S.Body
        id="submission-problem-content"
        role="tabpanel"
        aria-labelledby={`submission-tab-${tab}`}
        tabIndex={0}
      >
        {tab === 'problem' ? (
          <>
            <h1>
              <span>{problem.id}</span>
              {problem.title}
            </h1>
            <section>
              <h2>문제</h2>
              <p>{problem.description}</p>
              <ul>
                {problem.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
              <p>{problem.objective}</p>
            </section>
            <section>
              <h2>입력</h2>
              <p>{problem.input}</p>
            </section>
            <section>
              <h2>출력</h2>
              <p>{problem.output}</p>
            </section>
            {problem.examples.map((example, index) => (
              <section key={index}>
                <h2>예제 {index + 1}</h2>
                <S.Samples>
                  <Sample label="입력" value={example.input} />
                  <Sample label="출력" value={example.output} />
                </S.Samples>
              </section>
            ))}
            <section>
              <h2>제한</h2>
              <S.Limits>
                <span>
                  시간 제한 <strong>{problem.timeLimit}</strong>
                </span>
                <span>
                  메모리 제한 <strong>{problem.memoryLimit}</strong>
                </span>
              </S.Limits>
            </section>
          </>
        ) : tab === 'history' ? (
          <section>
            <h2>제출 기록</h2>
            <SolutionHistory problemId={problem.id} />
          </section>
        ) : (
          <S.Empty>
            <h2>질문</h2>
            <p>질문 기능은 준비 중이에요.</p>
          </S.Empty>
        )}
      </S.Body>
    </S.Panel>
  );
}
