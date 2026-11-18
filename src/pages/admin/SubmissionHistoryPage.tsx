import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {
  getUser,
  myProfileOptions,
  studentNumber,
} from '../../domains/member/infrastructure/profileApi';
import { problemCatalogueOptions } from '../../domains/problem/infrastructure/problemApi';
import type { Difficulty } from '../../domains/problem/domain/problem';
import {
  solutionStatusLabels,
  studentSubmissionOptions,
  type Solution,
} from '../../domains/submission/infrastructure/solutionApi';
import { formatDateTime } from '../../shared/format';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { Asset } from '../../shared/ui/Asset';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { AdminLayout } from './AdminLayout';
import { Heading, Panel, Reset, Select } from './AdminDashboardPage.styles';
import * as S from './SubmissionHistoryPage.styles';

interface HistoryRow {
  id: number;
  problemId?: number;
  title?: string;
  difficulty?: Difficulty;
  language: string;
  status: Solution['status'];
  time: number | null;
  memory: number | null;
  submittedAt: string;
  code: string | null;
}

const columns = [
  ['submittedAt', '제출 시각'],
  ['problemId', '문제'],
  ['time', '실행 시간'],
  ['memory', '메모리'],
] as const;
type SortKey = (typeof columns)[number][0];
const pageSize = 10;
const languageOptions = ['C99', 'C++17', 'Java', 'Python', 'JavaScript', 'Text'];

export default function SubmissionHistoryPage() {
  const { userId } = useParams();
  const id = Number(userId);
  return (
    <AdminLayout achievement>
      <Panel>
        <S.Back
          to={
            userId
              ? `/admin/achievement?student=${encodeURIComponent(userId)}`
              : '/admin/achievement'
          }
        >
          <img src="/images/admin/case-back.svg" alt="" />
          학생별 성취도
        </S.Back>
        {userId === undefined ? (
          <Heading>
            <h1>제출 기록</h1>
            <p>학생별 성취도에서 학생을 선택해 주세요.</p>
          </Heading>
        ) : (
          <StudentHistory key={id} id={id} />
        )}
      </Panel>
    </AdminLayout>
  );
}

function StudentHistory({ id }: { id: number }) {
  const signedIn = Boolean(useAccessToken());
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const teacherId = signedIn && profile.data?.role === 'TEACHER' ? profile.data.userId : undefined;
  const student = useQuery({
    queryKey: ['submission-student', teacherId, id],
    gcTime: 0,
    enabled: teacherId !== undefined && Number.isSafeInteger(id) && id > 0,
    queryFn: ({ signal }) => getUser(id, signal),
  });
  if (teacherId !== undefined && student.data?.role === 'STUDENT' && student.data.email) {
    return (
      <History
        name={student.data.name}
        number={studentNumber(student.data)}
        email={student.data.email}
        teacherId={teacherId}
      />
    );
  }
  return (
    <>
      <Heading>
        <h1>제출 기록</h1>
      </Heading>
      {!signedIn ? (
        <p>교사 계정으로 로그인해 주세요.</p>
      ) : (
        <>
          <ApiFeedback
            pending={profile.isPending || student.isLoading}
            error={profile.error ?? student.error}
          />
          {profile.isSuccess && teacherId === undefined && (
            <p>교사 계정만 학생 제출 기록을 확인할 수 있어요.</p>
          )}
          {teacherId !== undefined &&
            (!Number.isSafeInteger(id) ||
              id <= 0 ||
              (student.isSuccess && (student.data.role !== 'STUDENT' || !student.data.email))) && (
              <p>학생 정보를 확인할 수 없어요.</p>
            )}
        </>
      )}
    </>
  );
}

interface HistoryProps {
  name: string;
  number: string;
  email: string;
  teacherId: number;
}

function History({ name, number, email, teacherId }: HistoryProps) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [language, setLanguage] = useState('');
  const [weeks, setWeeks] = useState(4);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean }>({
    key: 'submittedAt',
    descending: true,
  });
  const [opened, setOpened] = useState<HistoryRow>();
  const catalogue = useQuery(problemCatalogueOptions());
  const problemsById = new Map(catalogue.data?.map((problem) => [problem.id, problem]));
  const numeric = /^\d+$/.test(query) ? Number(query) : undefined;
  const matches =
    catalogue.data?.filter((problem) =>
      numeric !== undefined
        ? problem.id === numeric
        : problem.title.toLowerCase().includes(query.toLowerCase()),
    ) ?? [];
  const matched = matches.length === 1 ? matches[0] : undefined;
  const problemId = numeric ?? matched?.id;
  const lookup = useQuery(
    studentSubmissionOptions(teacherId, email, problemId, weeks, !query || problemId !== undefined),
  );
  const rows: HistoryRow[] = (lookup.data ?? []).map((record) => ({
    id: record.solutionId,
    problemId: record.problemId ?? problemId,
    title: problemsById.get(record.problemId ?? problemId ?? 0)?.title,
    difficulty: problemsById.get(record.problemId ?? problemId ?? 0)?.difficulty,
    language: record.language,
    status: record.status,
    time: record.time,
    memory: record.memoryUsage,
    submittedAt: record.submittedAt,
    code: record.code,
  }));
  const filtered = rows
    .filter((row) => (!result || row.status === result) && (!language || row.language === language))
    .sort((a, b) => {
      const first = sort.key === 'submittedAt' ? Date.parse(a.submittedAt) : a[sort.key];
      const second = sort.key === 'submittedAt' ? Date.parse(b.submittedAt) : b[sort.key];
      if (first == null) return second == null ? 0 : 1;
      if (second == null) return -1;
      return sort.descending ? second - first : first - second;
    });
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const firstPage = Math.max(1, Math.min(current - 2, pages - 4));
  const pagination = Array.from({ length: Math.min(5, pages) }, (_, index) => firstPage + index);
  const pending =
    lookup.isLoading || (Boolean(query) && catalogue.isLoading && numeric === undefined);
  const searchError =
    query && numeric === undefined && catalogue.isSuccess && !matched
      ? matches.length
        ? '여러 문제가 검색됐어요. 문제 번호를 입력해 주세요.'
        : '검색한 문제가 없어요.'
      : '';

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    setQuery(search.trim());
    setPage(1);
  }

  function reset() {
    setSearch('');
    setQuery('');
    setResult('');
    setLanguage('');
    setWeeks(4);
    setPage(1);
    setSort({ key: 'submittedAt', descending: true });
  }

  function sortHeader(key: SortKey) {
    const active = sort.key === key;
    return (
      <th
        scope="col"
        aria-sort={active ? (sort.descending ? 'descending' : 'ascending') : undefined}
      >
        <S.Sort
          type="button"
          onClick={() => {
            setSort({ key, descending: active ? !sort.descending : key === 'submittedAt' });
            setPage(1);
          }}
        >
          {columns.find(([column]) => column === key)?.[1]}
          <img
            src={active ? '/images/admin/sort-down.svg' : '/images/admin/sort.svg'}
            width={16}
            height={16}
            alt=""
          />
        </S.Sort>
      </th>
    );
  }

  return (
    <>
      <Heading>
        <h1>제출 기록</h1>
        <S.Person>
          <Asset name="avatar.svg" width={28} height={28} />
          <strong>{name}</strong>
          {number && <span>{number}</span>}
        </S.Person>
      </Heading>
      <S.FilterForm onSubmit={submitSearch}>
        <S.SearchBox>
          <button type="submit" aria-label="검색">
            <img src="/images/admin/search.svg" width={20} height={20} alt="" />
          </button>
          <input
            type="search"
            placeholder="문제 번호 또는 이름 검색"
            aria-label="문제 번호 또는 이름 검색"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              if (!event.target.value) {
                setQuery('');
                setPage(1);
              }
            }}
          />
        </S.SearchBox>
        <Select
          value={result}
          aria-label="채점 결과"
          onChange={(event) => {
            setResult(event.target.value);
            setPage(1);
          }}
        >
          <option value="">결과 전체</option>
          {Object.entries(solutionStatusLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
        <Select
          value={language}
          aria-label="언어"
          onChange={(event) => {
            setLanguage(event.target.value);
            setPage(1);
          }}
        >
          <option value="">언어 전체</option>
          {languageOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
        <Select
          value={weeks}
          aria-label="제출 기간"
          onChange={(event) => {
            setWeeks(Number(event.target.value));
            setPage(1);
          }}
        >
          {[1, 4, 12].map((week) => (
            <option key={week} value={week}>
              최근 {week}주
            </option>
          ))}
        </Select>
        <Reset type="button" onClick={reset}>
          초기화
        </Reset>
      </S.FilterForm>
      <ApiFeedback
        pending={pending}
        error={lookup.error ?? (numeric === undefined ? catalogue.error : null)}
      />
      {searchError && <p role="status">{searchError}</p>}
      <S.TableScroll role="region" aria-label="제출 기록 목록" tabIndex={0}>
        <S.Table>
          <thead>
            <tr>
              {sortHeader('submittedAt')}
              {sortHeader('problemId')}
              <th scope="col">언어</th>
              <th scope="col">결과</th>
              {sortHeader('time')}
              {sortHeader('memory')}
              <th scope="col" aria-label="코드" />
            </tr>
          </thead>
          <tbody>
            {filtered.slice((current - 1) * pageSize, current * pageSize).map((row) => (
              <tr key={row.id}>
                <td>
                  <S.Muted>
                    {formatDateTime(row.submittedAt, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </S.Muted>
                </td>
                <td>
                  <S.Problem>
                    {row.difficulty && (
                      <img
                        src={`/images/problems/${row.difficulty}.svg`}
                        width={20}
                        height={20}
                        alt=""
                      />
                    )}
                    <strong>{row.problemId ?? '—'}</strong>
                    {row.title && <span>{row.title}</span>}
                  </S.Problem>
                </td>
                <td>{row.language}</td>
                <td>
                  <S.Result data-status={row.status}>
                    {row.status === 'WRONG_ANSWER' ? '오답' : solutionStatusLabels[row.status]}
                  </S.Result>
                </td>
                <td>{row.time ?? '—'}</td>
                <td>{row.memory ?? '—'}</td>
                <td>
                  {row.code == null ? (
                    <S.Muted>비공개</S.Muted>
                  ) : (
                    <S.CodeButton type="button" onClick={() => setOpened(row)}>
                      코드{' '}
                      <img src="/images/admin/achievement-next.svg" width={16} height={16} alt="" />
                    </S.CodeButton>
                  )}
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={7}>
                  {pending ? '제출 기록을 불러오고 있어요.' : '조건에 맞는 제출 기록이 없어요.'}
                </td>
              </tr>
            )}
          </tbody>
        </S.Table>
      </S.TableScroll>
      <S.Pages aria-label="제출 기록 페이지">
        <button
          type="button"
          aria-label="이전 페이지"
          disabled={current === 1}
          onClick={() => setPage(current - 1)}
        >
          <img src="/images/problems/left.svg" width={16} height={16} alt="" />
        </button>
        {pagination.map((value) => (
          <button
            type="button"
            key={value}
            aria-current={value === current ? 'page' : undefined}
            onClick={() => setPage(value)}
          >
            {value}
          </button>
        ))}
        {pagination[pagination.length - 1] < pages && (
          <>
            <span>···</span>
            <button type="button" onClick={() => setPage(pages)}>
              {pages}
            </button>
          </>
        )}
        <button
          type="button"
          aria-label="다음 페이지"
          disabled={current === pages}
          onClick={() => setPage(current + 1)}
        >
          <img src="/images/problems/right.svg" width={16} height={16} alt="" />
        </button>
      </S.Pages>
      {opened && (
        <PreviewDialog title="제출 코드" onClose={() => setOpened(undefined)}>
          <S.Code>{opened.code}</S.Code>
        </PreviewDialog>
      )}
    </>
  );
}
