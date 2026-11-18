import { useId, useRef, useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateProblemCases,
  type EditableProblem,
  type ProblemTestCase,
} from '../../domains/problem/infrastructure/problemApi';
import { useModalDialog } from '../../shared/hooks/useModalDialog';
import { Dialog } from '../../shared/ui/PreviewDialog.styles';
import { AdminLayout } from './AdminLayout';
import { Heading, Panel } from './AdminDashboardPage.styles';
import { AdminProblemScreen } from './ProblemEditPage';
import {
  Delete,
  Error,
  Field,
  Hint,
  Secondary,
  Submit,
  Text,
} from './ProblemRegistrationPage.styles';
import * as S from './TestCasesPage.styles';

interface CaseAction {
  problem: EditableProblem;
  index?: number;
  upload?: true;
}

export function TestCasesPage() {
  return (
    <AdminProblemScreen
      title="테스트케이스"
      render={(problem) => <TestCases key={problem.problemId} problem={problem} />}
    />
  );
}

function TestCases({ problem }: { problem: EditableProblem }) {
  const [action, setAction] = useState<CaseAction | null>(null);
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: ({ problem, cases }: { problem: EditableProblem; cases: ProblemTestCase[] }) =>
      updateProblemCases(problem, cases),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['editable-problem', problem.problemId] }),
        queryClient.invalidateQueries({ queryKey: ['problem', problem.problemId] }),
      ]);
      setAction(null);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: ['editable-problem', problem.problemId] });
    },
  });

  function open(next: CaseAction) {
    save.reset();
    setAction(next);
  }

  return (
    <AdminLayout problemEditing>
      <Panel>
        <S.Back to={`/admin/problems/${problem.problemId}/edit`}>
          <img src="/images/admin/case-back.svg" alt="" />
          {problem.problemId}. {problem.title}
        </S.Back>
        <S.Toolbar>
          <Heading>
            <h1>테스트케이스</h1>
            <p>채점에 쓰이는 입력과 정답 출력이에요.</p>
          </Heading>
          <S.Buttons>
            <Secondary type="button" onClick={() => open({ problem, upload: true })}>
              파일로 올리기
            </Secondary>
            <Submit type="button" onClick={() => open({ problem })}>
              케이스 추가
            </Submit>
          </S.Buttons>
        </S.Toolbar>
        <S.TableScroll role="region" aria-label="테스트케이스 목록" tabIndex={0}>
          <S.Table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">입력</th>
                <th scope="col">정답 출력</th>
                <th scope="col" aria-label="공개 여부" />
                <th scope="col" aria-label="수정" />
              </tr>
            </thead>
            <tbody>
              {problem.testCases.map(({ input, output, isSample }, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <S.Value>{input?.split(/\r?\n/).join(' / ') || '—'}</S.Value>
                  </td>
                  <td>
                    <S.Value>{output.split(/\r?\n/).join(' / ') || '—'}</S.Value>
                  </td>
                  <td>{isSample && <S.Badge>예시 공개</S.Badge>}</td>
                  <td>
                    <S.Edit
                      type="button"
                      aria-label={`${index + 1}번 케이스 수정`}
                      onClick={() => open({ problem, index })}
                    >
                      <img src="/images/admin/case-edit.svg" alt="" />
                    </S.Edit>
                  </td>
                </tr>
              ))}
              {!problem.testCases.length && (
                <tr>
                  <td colSpan={5}>등록된 테스트케이스가 없어요.</td>
                </tr>
              )}
            </tbody>
          </S.Table>
        </S.TableScroll>
        <Hint>예시 공개로 설정한 케이스는 문제 페이지에 보여요. 나머지는 채점에만 쓰여요.</Hint>
      </Panel>
      {action && (
        <CaseDialog
          action={action}
          pending={save.isPending}
          error={save.error?.message}
          onClose={() => setAction(null)}
          onSave={(cases) => save.mutate({ problem: action.problem, cases })}
        />
      )}
    </AdminLayout>
  );
}

interface CaseDialogProps {
  action: CaseAction;
  pending: boolean;
  error?: string;
  onClose: () => void;
  onSave: (cases: ProblemTestCase[]) => void;
}

function CaseDialog({ action, pending, error, onClose, onSave }: CaseDialogProps) {
  const titleId = useId();
  const reading = useRef(false);
  const [validation, setValidation] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const close = () => {
    if (!pending && !reading.current) onClose();
  };
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({ onClose: close });
  const { index, problem, upload } = action;
  const selected = index === undefined ? undefined : problem.testCases[index];
  const editing = index !== undefined;
  const Modal = editing ? S.EditDialog : Dialog;
  const Io = editing ? S.Io : S.Stack;

  function deleteCase() {
    if (index === undefined || pending) return;
    if (problem.testCases.length === 1) {
      setValidation('테스트케이스는 한 개 이상 남겨야 해요.');
      return;
    }
    setValidation('');
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onSave(problem.testCases.filter((_, caseIndex) => caseIndex !== index));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || reading.current || confirmDelete) return;
    setValidation('');
    const form = new FormData(event.currentTarget);
    if (upload) {
      const file = form.get('file');
      if (!(file instanceof File) || !file.size) {
        setValidation('업로드할 JSON 파일을 선택해 주세요.');
        return;
      }
      reading.current = true;
      setUploading(true);
      try {
        const cases: unknown = JSON.parse(await file.text());
        if (!Array.isArray(cases) || cases.length === 0 || !cases.every(isTestCase)) {
          setValidation(
            '파일에 입력, 정답 출력, 예시 공개 여부가 올바르게 입력되어 있는지 확인해 주세요.',
          );
          return;
        }
        onSave([...problem.testCases, ...cases]);
      } catch {
        setValidation('JSON 파일을 읽을 수 없어요.');
      } finally {
        reading.current = false;
        setUploading(false);
      }
      return;
    }

    const input = String(form.get('input') ?? '');
    const output = String(form.get('output') ?? '');
    if (!output.trim()) {
      setValidation('정답 출력을 입력해 주세요.');
      return;
    }
    const testCase = { input, output, isSample: form.has('sample') };
    const cases = problem.testCases.slice();
    if (index === undefined) cases.push(testCase);
    else cases[index] = testCase;
    onSave(cases);
  }

  return (
    <Modal
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <S.DialogForm onSubmit={submit} noValidate>
        <S.DialogHead>
          <h2 id={titleId}>
            {upload
              ? '파일로 테스트케이스 올리기'
              : editing
                ? `테스트케이스 ${index + 1}`
                : '케이스 추가'}
          </h2>
          {editing && (
            <S.Close type="button" onClick={close} aria-label="닫기" disabled={pending}>
              <img src="/images/admin/case-modal-close.svg" width={24} height={24} alt="" />
            </S.Close>
          )}
        </S.DialogHead>
        {upload ? (
          <Field>
            JSON 파일
            <input type="file" name="file" accept=".json,application/json" />
            <Hint>파일의 케이스를 기존 목록에 추가해요. 아래 형식으로 작성해 주세요.</Hint>
            <S.Format>{'[{"input":"1 2","output":"3","isSample":false}]'}</S.Format>
          </Field>
        ) : (
          <>
            <Io>
              <Field>
                입력
                <Text name="input" rows={4} autoFocus={editing} defaultValue={selected?.input} />
              </Field>
              <Field>
                정답 출력
                <Text name="output" rows={4} required defaultValue={selected?.output} />
              </Field>
            </Io>
            <S.Options>
              <S.Check>
                <input
                  name="sample"
                  type="checkbox"
                  role={editing ? 'switch' : undefined}
                  defaultChecked={selected?.isSample}
                />
                예시 공개
              </S.Check>
              {editing && (
                <S.Generate
                  type="button"
                  disabled
                  title="모범 답안 출력 생성 API가 제공되면 사용할 수 있어요."
                >
                  <img src="/images/admin/case-generate.svg" alt="" />
                  모범 답안으로 출력 생성
                </S.Generate>
              )}
            </S.Options>
          </>
        )}
        {(validation || error) && <Error role="alert">{validation || error}</Error>}
        {editing && confirmDelete && <p role="status">{index + 1}번 테스트케이스를 삭제할까요?</p>}
        <S.Buttons>
          {editing && (
            <Delete type="button" disabled={pending} onClick={deleteCase}>
              {confirmDelete ? (pending ? '삭제 중…' : '삭제 확인') : '삭제'}
            </Delete>
          )}
          <Secondary
            type="button"
            disabled={pending || uploading}
            onClick={confirmDelete ? () => setConfirmDelete(false) : close}
          >
            취소
          </Secondary>
          <Submit type="submit" disabled={pending || uploading || confirmDelete}>
            {pending ? '저장 중…' : upload ? '파일 올리기' : '저장'}
          </Submit>
        </S.Buttons>
      </S.DialogForm>
    </Modal>
  );
}

function isTestCase(value: unknown): value is ProblemTestCase {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'input' in value &&
    typeof value.input === 'string' &&
    'output' in value &&
    typeof value.output === 'string' &&
    value.output.trim() &&
    'isSample' in value &&
    typeof value.isSample === 'boolean',
  );
}
