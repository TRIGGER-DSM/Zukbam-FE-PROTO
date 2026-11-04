import * as S from './SubmissionPage.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link, useParams } from 'react-router';
import { SiteLayout } from '../../shared/ui/SiteLayout';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { getProblemDetail } from '../../domains/problem/application/getProblemDetail';
import { problemDetailFixtureRepository } from '../../domains/problem/infrastructure/problemDetailFixture';
import {
  codeLanguages,
  clampFontSize,
  formatElapsedTime,
  type CodeLanguage,
  type ConsoleTab,
} from '../../domains/submission/domain/submission';
import { codeTemplates } from '../../domains/submission/infrastructure/codeTemplates';
import { CodeEditor } from '../../domains/submission/presentation/CodeEditor';
import { SubmissionAsset } from '../../domains/submission/presentation/SubmissionAsset';
import { SubmissionProblemPanel } from '../../domains/submission/presentation/SubmissionProblemPanel';

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
  const problem = getProblemDetail(problemDetailFixtureRepository, problemId);
  const [language, setLanguage] = useState<CodeLanguage>('python');
  const [drafts, setDrafts] = useState({
    ...codeTemplates,
  });
  const [fontSize, setFontSize] = useState(14);
  const [split, setSplit] = useState(panelWidth.initial);
  const [elapsed, setElapsed] = useState(754);
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>('result');
  const [testInput, setTestInput] = useState(problem?.examples[0]?.input ?? '');
  const [runMessage, setRunMessage] = useState('');
  const [pending, setPending] = useState<string | null>(null);
  const workspace = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((current) => current + 1), 1000);
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
    setRunMessage(
      drafts[language].trim() ? '코드 실행 기능은 준비 중이에요.' : '실행할 코드를 입력해 주세요.',
    );
  }

  function resizePanel(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || !workspace.current) return;

    const bounds = workspace.current.getBoundingClientRect();
    const width = ((event.clientX - bounds.left) / bounds.width) * 100;
    setSplit(clampPanelWidth(width));
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
    setSplit((current) => clampPanelWidth(current + step));
  }

  const selectedLanguage = codeLanguages.find((item) => item.id === language)!;
  if (!problem) {
    return (
      <SiteLayout onNavigate={setPending}>
        <S.Unavailable id="main">
          <h1>풀이를 준비 중이에요</h1>
          <Link to="/problems">문제 목록으로</Link>
        </S.Unavailable>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout onNavigate={setPending}>
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
            <S.Elapsed>풀이 시간 {formatElapsedTime(elapsed)}</S.Elapsed>
            <button onClick={() => setPending('이전 문제')}>‹ 이전 문제</button>
            <button onClick={() => setPending('다음 문제')}>다음 문제 ›</button>
          </S.Navigation>
        </S.ProblemBar>
        <S.Workspace ref={workspace} $problemWidth={`${split}%`}>
          <SubmissionProblemPanel problem={problem} />
          <S.Resizer
            role="separator"
            aria-label="문제 패널 너비"
            aria-orientation="vertical"
            aria-valuemin={panelWidth.min}
            aria-valuemax={panelWidth.max}
            aria-valuenow={Math.round(split)}
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
              source={drafts[language]}
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
                    {testInput.trim() === problem.examples[0]?.input.trim() && (
                      <p>예제 예상 출력: {problem.examples[0]?.output}</p>
                    )}
                  </>
                ) : (
                  <p role="status">{runMessage}</p>
                )}
              </S.Output>
            </S.Console>
            <S.RunBar>
              <p>
                <SubmissionAsset name="streak" />
                오늘 제출하면 13일 연속 풀이가 돼요
              </p>
              <button onClick={runCode}>코드 실행</button>
            </S.RunBar>
          </S.Editor>
        </S.Workspace>
      </S.Page>
      {pending && (
        <PreviewDialog title={pending} onClose={() => setPending(null)}>
          <UI.Description>{pending}는 준비 중이에요.</UI.Description>
        </PreviewDialog>
      )}
    </SiteLayout>
  );
}
