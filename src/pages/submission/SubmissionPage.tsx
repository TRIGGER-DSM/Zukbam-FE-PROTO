import * as S from './SubmissionPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { problemDetailOptions } from '../../domains/problem/infrastructure/problemApi';
import {
  submitSolution,
  solutionIdFromLocation,
  solutionOptions,
  resultPath,
} from '../../domains/submission/infrastructure/solutionApi';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import type { ProblemDetail } from '../../domains/problem/domain/problemDetail';
import {
  codeLanguages,
  clampFontSize,
  formatElapsedTime,
  type CodeLanguage,
  type ConsoleTab,
  type SubmissionTab,
} from '../../domains/submission/domain/submission';
import { codeTemplates } from '../../domains/submission/infrastructure/codeTemplates';
import { CodeEditor } from '../../domains/submission/presentation/CodeEditor';
import { SubmissionAsset } from '../../domains/submission/presentation/SubmissionAsset';
import { SubmissionProblemPanel } from '../../domains/submission/presentation/SubmissionProblemPanel';
import {
  SubmissionStatus,
  type SubmissionPhase,
} from '../../domains/submission/presentation/SubmissionStatus';

const panelWidth = { min: 30, max: 65, initial: 43.1818, step: 2 };

const consoleTabs = [
  { id: 'result', label: '실행 결과' },
  { id: 'testcases', label: '테스트케이스' },
] satisfies { id: ConsoleTab; label: string }[];

function clampPanelWidth(width: number) {
  return Math.max(panelWidth.min, Math.min(panelWidth.max, width));
}

export function SubmissionPage() {
  const { problemId } = useParams();
  const problemQuery = useQuery(problemDetailOptions(Number(problemId)));
  const problem = problemQuery.data;
  if (!problem) {
    return (
      <SiteLayout>
        <S.Unavailable id="main">
          <h1>풀이 제출</h1>
          <ApiFeedback pending={problemQuery.isLoading} error={problemQuery.error} />
          <Link to="/problems">문제 목록으로</Link>
        </S.Unavailable>
      </SiteLayout>
    );
  }
  return <SubmissionWorkspace key={problem.id} problem={problem} />;
}

interface SubmissionWorkspaceProps {
  problem: ProblemDetail;
}

function SubmissionWorkspace({ problem }: SubmissionWorkspaceProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [language, setLanguage] = useState<CodeLanguage>('python');
  const [drafts, setDrafts] = useState({ ...codeTemplates });
  const [fontSize, setFontSize] = useState(14);
  const [problemPanelWidth, setProblemPanelWidth] = useState(panelWidth.initial);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>('result');
  const firstExample = problem.examples[0];
  const [testInput, setTestInput] = useState(firstExample?.input ?? '');
  const [runMessage, setRunMessage] = useState('');
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [problemTab, setProblemTab] = useState<SubmissionTab>('problem');
  const [historyVersion, setHistoryVersion] = useState(0);
  const [latestSolutionId, setLatestSolutionId] = useState<number | null>(null);
  const judgement = useQuery(solutionOptions(latestSolutionId ?? 0));
  const latestStatus = judgement.data?.status;
  const isJudging =
    latestSolutionId !== null && !judgement.error && (!latestStatus || latestStatus === 'PENDING');
  const source = drafts[language];
  const hasSource = source.trim().length > 0;
  const matchesExample = firstExample && testInput.trim() === firstExample.input.trim();
  const submission = useMutation({
    onMutate: () => setLatestSolutionId(null),
    mutationFn: () => submitSolution(problem.id, language, source),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ['solutions', problem.id] });
      setLatestSolutionId(solutionIdFromLocation(response) ?? null);
      setRunMessage('');
      setHistoryVersion((version) => version + 1);
      setProblemTab('history');
    },
    onError: (error) => setRunMessage(error.message),
  });

  useEffect(() => {
    if (!latestSolutionId || !latestStatus || latestStatus === 'PENDING') return;
    for (const key of ['me', 'growth', 'streak', 'xp-histories']) {
      void queryClient.invalidateQueries({ queryKey: [key] });
    }
    void queryClient.invalidateQueries({ queryKey: ['solutions', problem.id] });
    navigate(resultPath(problem.id, { solutionId: latestSolutionId, status: latestStatus }), {
      replace: true,
    });
  }, [latestSolutionId, latestStatus, problem.id, queryClient, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  function updateSource(source: string) {
    setDrafts((current) => ({ ...current, [language]: source }));
  }

  function resetSource() {
    updateSource(codeTemplates[language]);
    setRunMessage('');
  }

  function runCode() {
    setConsoleTab('result');
    setRunMessage(hasSource ? '코드 실행 기능은 준비 중이에요.' : '실행할 코드를 입력해 주세요.');
  }

  function handleSubmit() {
    setConsoleTab('result');
    setRunMessage('');
    submission.mutate();
  }

  function resizePanel(event: PointerEvent<HTMLDivElement>) {
    const workspace = workspaceRef.current;
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || !workspace) return;

    const bounds = workspace.getBoundingClientRect();
    const widthPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    setProblemPanelWidth(clampPanelWidth(widthPercent));
  }

  function stopResizing(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function resizePanelWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    const step = event.key === 'ArrowLeft' ? -panelWidth.step : panelWidth.step;
    setProblemPanelWidth((currentWidth) => clampPanelWidth(currentWidth + step));
  }

  const selectedLanguage = codeLanguages.find((item) => item.id === language)!;
  let submissionPhase: SubmissionPhase | undefined;
  if (submission.isPending) submissionPhase = 'submitting';
  else if (submission.error || judgement.error) submissionPhase = 'error';
  else if (submission.isSuccess) {
    if (!latestSolutionId) submissionPhase = 'submitted';
    else submissionPhase = isJudging ? 'judging' : 'finished';
  }
  return (
    <SiteLayout>
      <S.Page id="main">
        <S.ProblemBar>
          <nav aria-label="현재 문제">
            <S.Back to="/problems">‹ 문제 목록</S.Back>
            <span>/</span>
            <span>{problem.category}</span>
            <span>/</span>
            <S.ProblemTitle to={`/problems/${problem.id}`}>
              {problem.id}. {problem.title}
            </S.ProblemTitle>
          </nav>
          <S.Navigation>
            <S.Elapsed>풀이 시간 {formatElapsedTime(elapsedSeconds)}</S.Elapsed>
            <button onClick={() => setPreviewTitle('이전 문제')}>‹ 이전 문제</button>
            <button onClick={() => setPreviewTitle('다음 문제')}>다음 문제 ›</button>
          </S.Navigation>
        </S.ProblemBar>
        <S.Workspace ref={workspaceRef} $problemWidth={`${problemPanelWidth}%`}>
          <SubmissionProblemPanel
            problem={problem}
            tab={problemTab}
            onTabChange={setProblemTab}
            historyVersion={historyVersion}
          />
          <S.Resizer
            role="separator"
            aria-label="문제 패널 너비"
            aria-orientation="vertical"
            aria-valuemin={panelWidth.min}
            aria-valuemax={panelWidth.max}
            aria-valuenow={Math.round(problemPanelWidth)}
            tabIndex={0}
            onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
            onPointerMove={resizePanel}
            onPointerUp={stopResizing}
            onKeyDown={resizePanelWithKeyboard}
          >
            <span />
          </S.Resizer>
          <S.Editor aria-label="풀이 편집기">
            <S.Toolbar>
              <S.Language>
                <select
                  aria-label="프로그래밍 언어"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as CodeLanguage)}
                >
                  {codeLanguages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <span>{selectedLanguage.filename}</span>
              </S.Language>
              <S.Tools>
                <span>폰트 크기</span>
                <button
                  aria-label="폰트 크기 줄이기"
                  disabled={fontSize === 10}
                  onClick={() => setFontSize((size) => clampFontSize(size - 1))}
                >
                  <SubmissionAsset name="minus" />
                </button>
                <strong>{fontSize}px</strong>
                <button
                  aria-label="폰트 크기 늘리기"
                  disabled={fontSize === 24}
                  onClick={() => setFontSize((size) => clampFontSize(size + 1))}
                >
                  <SubmissionAsset name="plus" />
                </button>
                <i />
                <S.Reset onClick={resetSource}>
                  <SubmissionAsset name="reset" />
                  새로고침
                </S.Reset>
              </S.Tools>
            </S.Toolbar>
            <CodeEditor
              source={source}
              language={language}
              fontSize={fontSize}
              onChange={updateSource}
            />
            <S.Console>
              <S.ConsoleTabs role="tablist" aria-label="실행 콘솔">
                {consoleTabs.map((item) => (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={consoleTab === item.id}
                    aria-controls="submission-console-content"
                    id={`console-tab-${item.id}`}
                    onClick={() => setConsoleTab(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </S.ConsoleTabs>
              <S.Output
                id="submission-console-content"
                role="tabpanel"
                aria-labelledby={`console-tab-${consoleTab}`}
                $empty={consoleTab === 'result' && !runMessage}
              >
                {consoleTab === 'testcases' ? (
                  <>
                    <label htmlFor="submission-test-input">테스트 입력</label>
                    <textarea
                      id="submission-test-input"
                      value={testInput}
                      onChange={(event) => setTestInput(event.target.value)}
                      spellCheck={false}
                    />
                    {matchesExample && <p>예제 예상 출력: {firstExample.output}</p>}
                  </>
                ) : (
                  <p role="status">{runMessage}</p>
                )}
              </S.Output>
            </S.Console>
            {submissionPhase && (
              <SubmissionStatus
                phase={submissionPhase}
                solution={judgement.data}
                error={submission.error ?? judgement.error}
                onRetry={
                  judgement.error
                    ? () => {
                        void judgement.refetch();
                      }
                    : undefined
                }
              />
            )}
            <S.RunBar>
              <p>
                <SubmissionAsset name="streak" />
                {submission.isPending
                  ? '풀이를 제출하고 있어요.'
                  : isJudging
                    ? '채점 결과를 기다리고 있어요.'
                    : '풀이가 준비되면 제출해 주세요.'}
              </p>
              <button onClick={runCode}>코드 실행</button>
              <button
                disabled={submission.isPending || isJudging || !hasSource}
                onClick={handleSubmit}
              >
                {submission.isPending ? '제출 중…' : isJudging ? '채점 중…' : '제출하기'}
              </button>
            </S.RunBar>
          </S.Editor>
        </S.Workspace>
      </S.Page>
      {previewTitle && (
        <PreviewDialog title={previewTitle} onClose={() => setPreviewTitle(null)}>
          <UI.Description>{previewTitle}는 준비 중이에요.</UI.Description>
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
