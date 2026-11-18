import { useRef, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import {
  createProblem,
  deleteProblem,
  problemRankOptions,
  updateProblem,
  type EditableProblem,
  type ProblemInput,
} from '../../domains/problem/infrastructure/problemApi';
import { ProblemDeleteDialog } from './ProblemDeleteDialog';
import { AdminLayout } from './AdminLayout';
import { Heading } from './AdminDashboardPage.styles';
import * as S from './ProblemRegistrationPage.styles';

interface Example {
  id: number;
  input: string;
  output: string;
}

const categories = [
  '그래프',
  '너비 우선 탐색',
  '깊이 우선 탐색',
  '동적 계획법',
  '문자열',
  '정렬',
  '구현',
];

export function ProblemRegistrationPage() {
  return <ProblemForm />;
}

interface ProblemFormProps {
  problem?: EditableProblem;
}

export function ProblemForm({ problem }: ProblemFormProps) {
  const editing = Boolean(problem);
  const [rankId, setRankId] = useState(problem ? String(problem.rank.problemRankId) : '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [examples, setExamples] = useState<Example[]>(() =>
    problem
      ? problem.testCases
          .filter((testCase) => testCase.isSample)
          .map(({ input, output }, id) => ({ id, input: input ?? '', output }))
      : [{ id: 0, input: '', output: '' }],
  );
  const [memoryUnit, setMemoryUnit] = useState<'MB' | 'KB'>('MB');
  const [memoryAmount, setMemoryAmount] = useState(String(problem?.memoryLimit ?? 256));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDelete, setShowDelete] = useState(false);
  const nextExampleId = useRef(examples.length);
  const submitting = useRef(false);
  const ranks = useQuery(problemRankOptions());
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const save = useMutation({
    mutationFn: (input: ProblemInput) =>
      problem ? updateProblem(problem.problemId, input) : createProblem(input),
  });
  const remove = useMutation({ mutationFn: deleteProblem });
  const gradingCases = problem?.testCases.filter((testCase) => !testCase.isSample) ?? [];
  const cancelPath = problem ? `/problems/${problem.problemId}` : '/problems';

  async function confirmDelete() {
    if (!problem || submitting.current) return;
    submitting.current = true;
    try {
      await remove.mutateAsync(problem.problemId);
      queryClient.removeQueries({ queryKey: ['problem', problem.problemId] });
      void queryClient.invalidateQueries({ queryKey: ['problems'] });
      navigate('/problems');
    } catch {
      // The dialog displays the API error.
    } finally {
      submitting.current = false;
    }
  }

  function clearFieldError(field: string) {
    setErrors((current) => {
      if (!(field in current)) return current;
      const remaining = { ...current };
      delete remaining[field];
      return remaining;
    });
  }

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
    clearFieldError('categories');
  }

  function changeMemoryUnit(unit: 'MB' | 'KB') {
    if (memoryUnit === unit) return;
    setMemoryAmount((amount) =>
      amount === '' ? '' : String(unit === 'KB' ? Number(amount) * 1024 : Number(amount) / 1024),
    );
    setMemoryUnit(unit);
  }

  function changeExample(id: number, field: 'input' | 'output', value: string) {
    setExamples((current) =>
      current.map((example) => (example.id === id ? { ...example, [field]: value } : example)),
    );
    if (field === 'output') clearFieldError(`example-${id}`);
  }

  function removeExample(id: number) {
    setExamples((current) => current.filter((example) => example.id !== id));
    clearFieldError(`example-${id}`);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get('title') ?? '').trim();
    const content = String(form.get('content') ?? '');
    const problemRankId = Number(form.get('rank'));
    const timeLimit = Number(form.get('time'));
    const memoryValue = Number(form.get('memory'));
    const memoryLimit = memoryUnit === 'KB' ? memoryValue / 1024 : memoryValue;
    const validation: Record<string, string> = {};

    if (!title) validation.title = '문제 이름은 필수 입력 항목이에요.';
    if (title.length > 255) validation.title = '문제 이름을 255자 이내로 입력해 주세요.';
    if (!content.trim()) validation.content = '문제 설명은 필수 입력 항목이에요.';
    if (
      problemRankId !== problem?.rank.problemRankId &&
      !ranks.data?.some((rank) => rank.problemRankId === problemRankId)
    )
      validation.rank = '난이도를 선택해 주세요.';
    if (!editing && !selectedCategories.length)
      validation.categories = '카테고리를 한 개 이상 선택해 주세요.';
    if (!timeLimit || !Number.isFinite(timeLimit) || timeLimit < 0)
      validation.time = '시간 제한을 0보다 큰 값으로 입력해 주세요.';
    else if (problem && timeLimit !== problem.timeLimit && (timeLimit < 1 || timeLimit > 10))
      validation.time = '시간 제한은 1~10초 사이로 입력해 주세요.';
    if (
      memoryLimit !== problem?.memoryLimit &&
      (!Number.isInteger(memoryLimit) || memoryLimit < 32 || memoryLimit > 1024)
    )
      validation.memory = '32~1024MB 사이의 정수 MB에 해당하는 값을 입력해 주세요.';
    if (!examples.length && !gradingCases.length)
      validation.examples = '예시를 한 개 이상 추가해 주세요.';
    for (const example of examples) {
      if (!example.output.trim())
        validation[`example-${example.id}`] = '예시 출력을 입력해 주세요.';
    }
    setErrors(validation);
    save.reset();
    if (Object.keys(validation).length) {
      requestAnimationFrame(() => document.getElementById('registration-errors')?.focus());
      return;
    }

    submitting.current = true;
    try {
      await save.mutateAsync({
        title,
        content,
        problemRankId,
        timeLimit,
        memoryLimit,
        testCases: [
          ...examples.map(({ input, output }) => ({ input, output, isSample: true })),
          ...gradingCases.map(({ input, output, isSample }) => ({ input, output, isSample })),
        ],
      });
      if (problem) void queryClient.invalidateQueries({ queryKey: ['problem', problem.problemId] });
      void queryClient.invalidateQueries({ queryKey: ['problems'] });
      navigate(cancelPath);
    } catch {
      requestAnimationFrame(() => document.getElementById('registration-errors')?.focus());
    } finally {
      submitting.current = false;
    }
  }

  const errorCount = Object.keys(errors).length;
  return (
    <AdminLayout problemRegistration={!editing} problemEditing={editing}>
      <S.Form
        noValidate
        onSubmit={submit}
        onChange={(event) => {
          const field = event.target;
          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLSelectElement ||
            field instanceof HTMLTextAreaElement
          ) {
            clearFieldError(field.name);
          }
        }}
      >
        <Heading>
          <h1>{problem ? `${problem.problemId}. ${problem.title} 수정` : '새 문제 등록'}</h1>
          <p>
            {editing
              ? '등록된 문제의 제목, 설명, 난이도, 카테고리, 예시, 제한 조건을 수정해요.'
              : '문제 이름, 설명, 난이도, 카테고리, 예시 입력·출력, 시간·메모리 제한을 입력해요.'}
          </p>
        </Heading>
        {problem && (
          <S.Info>
            <span aria-hidden="true">i</span>문제 번호 {problem.problemId}
          </S.Info>
        )}
        {(errorCount > 0 || save.error) && (
          <S.Alert id="registration-errors" role="alert" tabIndex={-1}>
            <span aria-hidden="true">!</span>
            {save.error?.message ??
              `확인이 필요한 항목이 ${errorCount}개 있어요. 표시된 항목을 수정한 뒤 다시 등록해 주세요.`}
          </S.Alert>
        )}
        <S.Section $plain={editing} aria-labelledby="problem-basics">
          <h2 id="problem-basics">기본 정보</h2>
          <S.BasicFields>
            <S.Field>
              문제 이름 *
              <S.Input
                name="title"
                defaultValue={problem?.title}
                required
                maxLength={255}
                placeholder="문제 이름을 입력하세요"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              <FieldError id="title-error" message={errors.title} />
            </S.Field>
            <S.Field>
              난이도 *
              <S.RankSelect
                name="rank"
                required
                value={rankId}
                onChange={(event) => setRankId(event.target.value)}
                aria-invalid={Boolean(errors.rank)}
                aria-describedby={errors.rank || ranks.isError ? 'rank-error' : undefined}
              >
                <option value="" disabled>
                  {ranks.isPending ? '불러오는 중…' : '난이도를 선택하세요'}
                </option>
                {problem &&
                  !ranks.data?.some(
                    (rank) => rank.problemRankId === problem.rank.problemRankId,
                  ) && <option value={problem.rank.problemRankId}>{problem.rank.name}</option>}
                {ranks.data?.map((rank) => (
                  <option key={rank.problemRankId} value={rank.problemRankId}>
                    {rank.name}
                  </option>
                ))}
              </S.RankSelect>
              <FieldError
                id="rank-error"
                message={ranks.isError ? ranks.error.message : errors.rank}
              />
            </S.Field>
            <div>
              <S.FieldName id="category-label">카테고리{editing ? '' : ' *'}</S.FieldName>
              <S.CategoryPicker
                aria-labelledby="category-label"
                aria-invalid={Boolean(errors.categories)}
                aria-describedby="category-help"
                role="group"
              >
                {selectedCategories.map((category) => (
                  <S.Chip
                    type="button"
                    key={category}
                    aria-label={`${category} 제거`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    <img src="/images/admin/category-close.svg" alt="" width={14} height={14} />
                  </S.Chip>
                ))}
                <S.CategoryMenu>
                  <summary aria-label="카테고리 선택">
                    {selectedCategories.length === 0 && '카테고리를 선택하세요'}
                    <img src="/images/admin/chevron.svg" alt="" width={20} height={20} />
                  </summary>
                  <div>
                    {categories.map((category) => (
                      <label key={category}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </S.CategoryMenu>
              </S.CategoryPicker>
              <FieldError message={errors.categories} />
              <S.Hint id="category-help">카테고리 선택은 화면에서만 적용돼요.</S.Hint>
            </div>
          </S.BasicFields>
        </S.Section>
        <S.Section $plain={editing} aria-labelledby="problem-content">
          <h2 id="problem-content">문제 내용</h2>
          <S.Field>
            문제 설명 *
            <S.Text
              name="content"
              defaultValue={problem?.content}
              required
              rows={5}
              placeholder="문제 설명을 입력하세요"
              aria-invalid={Boolean(errors.content)}
              aria-describedby="content-help"
            />
            <span id="content-help">
              <FieldError message={errors.content} />
              {!editing && <S.Hint>마크다운으로 작성할 수 있어요.</S.Hint>}
            </span>
          </S.Field>
          <S.Examples>
            {!editing && (
              <S.Row>
                <h3>예시 입력/출력</h3>
                <S.Hint>문제 페이지에 예시 1부터 순서대로 보여요.</S.Hint>
              </S.Row>
            )}
            {examples.map((example, index) => (
              <S.Example key={example.id}>
                <S.Row>
                  <h3>예시 {index + 1}</h3>
                  <S.Remove
                    type="button"
                    aria-label={`예시 ${index + 1} 삭제`}
                    onClick={() => removeExample(example.id)}
                  >
                    <img src="/images/admin/example-trash.svg" alt="" width={18} height={18} />
                    삭제
                  </S.Remove>
                </S.Row>
                <S.Pair>
                  <S.Field>
                    입력
                    <S.Text
                      rows={
                        editing ? Math.min(10, Math.max(4, example.input.split('\n').length)) : 4
                      }
                      value={example.input}
                      placeholder="예시 입력을 입력하세요"
                      onChange={(event) => changeExample(example.id, 'input', event.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    출력 *
                    <S.Text
                      required
                      rows={4}
                      value={example.output}
                      placeholder="예시 출력을 입력하세요"
                      onChange={(event) => changeExample(example.id, 'output', event.target.value)}
                      aria-invalid={Boolean(errors[`example-${example.id}`])}
                      aria-describedby={
                        errors[`example-${example.id}`] ? `example-${example.id}-error` : undefined
                      }
                    />
                    <FieldError
                      id={`example-${example.id}-error`}
                      message={errors[`example-${example.id}`]}
                    />
                  </S.Field>
                </S.Pair>
              </S.Example>
            ))}
            <FieldError message={errors.examples} />
            <S.Add
              type="button"
              onClick={() => {
                const id = nextExampleId.current++;
                setExamples((current) => [...current, { id, input: '', output: '' }]);
                clearFieldError('examples');
              }}
            >
              <img src="/images/admin/example-plus.svg" alt="" width={20} height={20} />
              예시 추가
            </S.Add>
          </S.Examples>
        </S.Section>
        {problem && (
          <S.CaseSummary>
            <div>
              <h2>테스트케이스</h2>
              <S.Hint>{problem.testCases.length}개 등록됨</S.Hint>
            </div>
            <S.Cancel to={`/admin/problems/${problem.problemId}/test-cases`}>
              테스트케이스 관리
            </S.Cancel>
          </S.CaseSummary>
        )}
        <S.Section $plain={editing} aria-labelledby="problem-limits">
          <h2 id="problem-limits">제한 조건</h2>
          <S.Pair>
            <S.Field>
              시간 제한 (초) *
              <S.Input
                name="time"
                defaultValue={problem?.timeLimit}
                type="number"
                step="any"
                required
                placeholder="예) 1"
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? 'time-error' : editing ? 'time-hint' : undefined}
              />
              <FieldError id="time-error" message={errors.time} />
              {editing && !errors.time && <S.Hint id="time-hint">1~10초 사이로 입력해요.</S.Hint>}
            </S.Field>
            <div>
              <S.FieldLabel htmlFor="problem-memory">메모리 제한 *</S.FieldLabel>
              <S.Memory>
                <S.Input
                  id="problem-memory"
                  name="memory"
                  type="number"
                  step="1"
                  required
                  value={memoryAmount}
                  onChange={(event) => setMemoryAmount(event.target.value)}
                  aria-invalid={Boolean(errors.memory)}
                  aria-describedby="memory-help"
                />
                <S.Units role="group" aria-label="메모리 단위">
                  {(['MB', 'KB'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      aria-pressed={memoryUnit === unit}
                      onClick={() => changeMemoryUnit(unit)}
                    >
                      {unit}
                    </button>
                  ))}
                </S.Units>
              </S.Memory>
              <span id="memory-help">
                <FieldError message={errors.memory} />
                <S.Hint>32~1024MB 사이로 입력해요.</S.Hint>
              </span>
            </div>
          </S.Pair>
        </S.Section>
        <S.Actions>
          {editing && (
            <S.Delete
              type="button"
              disabled={save.isPending}
              onClick={() => {
                remove.reset();
                setShowDelete(true);
              }}
            >
              문제 삭제
            </S.Delete>
          )}
          <S.Cancel to={cancelPath}>취소</S.Cancel>
          <S.Submit type="submit" disabled={save.isPending}>
            {editing
              ? save.isPending
                ? '저장 중…'
                : '변경사항 저장'
              : save.isPending
                ? '등록 중…'
                : '문제 등록'}
          </S.Submit>
        </S.Actions>
      </S.Form>
      {showDelete && problem && (
        <ProblemDeleteDialog
          problem={problem}
          pending={remove.isPending}
          error={remove.error?.message}
          onConfirm={confirmDelete}
          onClose={() => {
            if (!remove.isPending) setShowDelete(false);
          }}
        />
      )}
    </AdminLayout>
  );
}

interface FieldErrorProps {
  id?: string;
  message?: string;
}

function FieldError({ id, message }: FieldErrorProps) {
  return message ? <S.Error id={id}>{message}</S.Error> : null;
}
