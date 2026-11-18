import { useState, type FormEvent } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';
import { ActivityHeatmap } from '../../domains/activity/presentation/ActivityHeatmap';
import { growthOptions } from '../../domains/activity/infrastructure/activityApi';
import { groupOptions, myGroupsOptions } from '../../domains/member/infrastructure/groupApi';
import {
  getUser,
  myProfileOptions,
  studentNumber,
  type UserProfile,
} from '../../domains/member/infrastructure/profileApi';
import {
  solutionStatusLabels,
  studentSubmissionOptions,
} from '../../domains/submission/infrastructure/solutionApi';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { formatDateTime } from '../../shared/format';
import { colors } from '../../shared/styles/colors';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { Asset } from '../../shared/ui/Asset';
import { AdminLayout } from './AdminLayout';
import * as Dashboard from './AdminDashboardPage.styles';
import * as S from './StudentAchievementPage.styles';

export function StudentAchievementPage() {
  const signedIn = Boolean(useAccessToken());
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const teacherId = signedIn && profile.data?.role === 'TEACHER' ? profile.data.userId : undefined;
  return (
    <AdminLayout achievement>
      <Dashboard.Panel>
        <Dashboard.Heading>
          <h1>학생별 성취도</h1>
          <p>학생의 풀이 기록, 스트릭, 잔디, 최근 제출 기록을 확인해요.</p>
        </Dashboard.Heading>
        {teacherId !== undefined ? (
          <Achievement key={teacherId} teacherId={teacherId} />
        ) : !signedIn ? (
          <Dashboard.Card>
            <p>교사 계정으로 로그인해 주세요.</p>
            <Link to="/login">로그인</Link>
          </Dashboard.Card>
        ) : profile.isSuccess ? (
          <p>교사 계정만 학생별 성취도를 확인할 수 있어요.</p>
        ) : (
          <ApiFeedback pending={profile.isPending} error={profile.error} />
        )}
      </Dashboard.Panel>
    </AdminLayout>
  );
}

function Achievement({ teacherId }: { teacherId: number }) {
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('');
  const studentId = Number(params.get('student'));
  const groups = useQuery(myGroupsOptions(teacherId));
  const groupIds = (groups.data ?? [])
    .filter(({ groupId }) => !group || String(groupId) === group)
    .map(({ groupId }) => groupId);
  const details = useQueries({
    queries: groupIds.map((id) => ({
      ...groupOptions(teacherId, id),
      enabled: Boolean(query),
    })),
  });
  const members = [
    ...new Map(
      details.flatMap(({ data }) => data?.members ?? []).map((member) => [member.userId, member]),
    ).values(),
  ];
  const numeric = /^\d+$/.test(query);
  const matchingMembers = query
    ? members.filter((member) => numeric || member.name.toLowerCase().includes(query.toLowerCase()))
    : [];
  const results = useQueries({
    queries: matchingMembers.map(({ userId }) => ({
      queryKey: ['group-member-profile', teacherId, userId],
      queryFn: ({ signal }) => getUser(userId, signal),
      staleTime: 60_000,
      gcTime: 0,
      enabled: Boolean(query),
    })),
  });
  const students = results.flatMap(({ data }) =>
    data?.role === 'STUDENT' &&
    (!numeric || studentNumber(data) === query || String(data.userId) === query)
      ? [data]
      : [],
  );
  const chosen = useQuery({
    queryKey: ['group-member-profile', teacherId, studentId],
    queryFn: ({ signal }) => getUser(studentId, signal),
    enabled: Number.isSafeInteger(studentId) && studentId > 0,
    gcTime: 0,
  });
  const student =
    chosen.data?.role === 'STUDENT' ? chosen.data : students.length === 1 ? students[0] : undefined;
  const searching =
    Boolean(query) &&
    (groups.isPending ||
      details.some((detail) => detail.isLoading) ||
      results.some((result) => result.isLoading));
  const error =
    groups.error ??
    details.find((detail) => detail.error)?.error ??
    results.find((result) => result.error)?.error ??
    chosen.error;

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setParams({});
    setQuery(input.trim());
  }

  return (
    <>
      <S.Filters onSubmit={search}>
        <Dashboard.Search>
          <img src="/images/admin/search.svg" width={20} height={20} alt="" />
          <input
            type="search"
            aria-label="학생 이름 또는 학번"
            placeholder="학생 이름 또는 학번 검색"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </Dashboard.Search>
        <Dashboard.Select
          aria-label="그룹"
          value={group}
          onChange={(event) => {
            setGroup(event.target.value);
            setParams({});
          }}
        >
          <option value="">전체 그룹</option>
          {groups.data?.map(({ groupId, title }) => (
            <option key={groupId} value={groupId}>
              {title}
            </option>
          ))}
        </Dashboard.Select>
        <S.SearchButton type="submit">검색</S.SearchButton>
      </S.Filters>
      <ApiFeedback pending={searching || chosen.isLoading} error={error} />
      {!student && students.length > 1 && (
        <Dashboard.Card>
          <Dashboard.Select
            aria-label="검색된 학생"
            value=""
            onChange={(event) => setParams({ student: event.target.value })}
          >
            <option value="" disabled>
              학생을 선택하세요
            </option>
            {students.map((candidate) => (
              <option key={candidate.userId} value={candidate.userId}>
                {candidate.name} · {studentNumber(candidate) || candidate.userId}
              </option>
            ))}
          </Dashboard.Select>
        </Dashboard.Card>
      )}
      {student ? (
        <StudentStats key={student.userId} student={student} teacherId={teacherId} />
      ) : (
        !searching &&
        !chosen.isLoading &&
        !error &&
        students.length <= 1 && (
          <Dashboard.Card>
            <S.Empty role="status">
              {query ? '조건에 맞는 학생이 없어요.' : '내 그룹에서 학생을 검색해 주세요.'}
            </S.Empty>
          </Dashboard.Card>
        )
      )}
    </>
  );
}

function StudentStats({ student, teacherId }: { student: UserProfile; teacherId: number }) {
  const growth = useQuery(growthOptions(student.userId, teacherId));
  const history = useQuery(studentSubmissionOptions(teacherId, student.email, undefined, 4, true));
  const graded =
    history.data?.filter(({ status }) => status !== 'PENDING' && status !== 'INTERNAL_ERROR') ?? [];
  const rate = graded.length
    ? `${((graded.filter(({ status }) => status === 'ACCEPTED').length * 100) / graded.length).toFixed(1)}%`
    : '—';
  const stats = [
    ['풀이 수', student.solvedCount ?? '—'],
    ['최근 4주 정답률', rate],
    ['현재 스트릭', growth.data ? `${growth.data.currentStreak}일` : '—'],
    ['최장 스트릭', growth.data ? `${growth.data.longestStreak}일` : '—'],
  ];
  return (
    <>
      <S.ProfileCard>
        <Asset name="avatar.svg" width={72} height={72} />
        <S.ProfileInfo>
          <S.ProfileName>
            <h2>{student.name}</h2>
            {student.rank && <S.Badge $color={colors.primary.normal}>{student.rank}</S.Badge>}
          </S.ProfileName>
          <p>
            {studentNumber(student)} · {student.email}
          </p>
        </S.ProfileInfo>
        <S.GroupLink to="/admin/groups">그룹에서 보기</S.GroupLink>
      </S.ProfileCard>
      <Dashboard.Stats aria-label="학생 성취도 요약">
        {stats.map(([label, value]) => (
          <li key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </Dashboard.Stats>
      <Dashboard.Card>
        <h2>최근 365일 풀이 활동</h2>
        <ApiFeedback pending={growth.isPending} error={growth.error} />
        {growth.data?.activityDays && (
          <>
            <S.ActivityScroll role="region" aria-label="풀이 활동" tabIndex={0}>
              <ActivityHeatmap days={growth.data.activityDays} />
            </S.ActivityScroll>
            <S.ActivityFoot>
              <span>
                이번 달 {growth.data.monthlySolved}문제 · 최장 {growth.data.longestStreak}일
              </span>
            </S.ActivityFoot>
          </>
        )}
      </Dashboard.Card>
      <Dashboard.Card>
        <S.CardHead>
          <h2>최근 제출 기록</h2>
          <S.HistoryButton to={`/admin/submissions/${student.userId}`}>
            전체 기록 보기{' '}
            <img src="/images/admin/achievement-next.svg" width={16} height={16} alt="" />
          </S.HistoryButton>
        </S.CardHead>
        <ApiFeedback pending={history.isPending} error={history.error} />
        <S.TableScroll role="region" aria-label="학생 제출 기록 표" tabIndex={0}>
          <S.Table>
            <thead>
              <tr>
                {['문제', '언어', '결과', '실행 시간', '제출 시각'].map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.data?.slice(0, 4).map((record) => (
                <tr key={record.solutionId}>
                  <td>{record.problemId ?? '—'}</td>
                  <td>{record.language}</td>
                  <td>
                    <S.Badge
                      $color={record.status === 'ACCEPTED' ? colors.primary.normal : undefined}
                    >
                      {solutionStatusLabels[record.status]}
                    </S.Badge>
                  </td>
                  <td>{record.time ?? '—'}</td>
                  <td>{formatDateTime(record.submittedAt)}</td>
                </tr>
              ))}
              {history.isSuccess && !history.data.length && (
                <tr>
                  <td colSpan={5}>
                    <S.Empty>최근 제출 기록이 없어요.</S.Empty>
                  </td>
                </tr>
              )}
            </tbody>
          </S.Table>
        </S.TableScroll>
      </Dashboard.Card>
    </>
  );
}
