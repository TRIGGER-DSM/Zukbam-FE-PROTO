import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import {
  createGroup,
  deleteGroup,
  groupOptions,
  myGroupsOptions,
  updateGroup,
  type GroupFields,
} from '../../domains/member/infrastructure/groupApi';
import {
  getUser,
  myProfileOptions,
  studentNumber,
} from '../../domains/member/infrastructure/profileApi';
import { tierThresholds } from '../../domains/ranking/domain/leaderboard';
import { useAccessToken } from '../../shared/hooks/useAccessToken';
import { useModalDialog } from '../../shared/hooks/useModalDialog';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { Asset } from '../../shared/ui/Asset';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import { AdminLayout } from './AdminLayout';
import { Card, Heading, Panel, Search } from './AdminDashboardPage.styles';
import { Delete, Error, Field, Hint, Secondary, Submit } from './ProblemRegistrationPage.styles';
import * as S from './GroupManagementPage.styles';
import { GroupStudentDialog } from './GroupStudentDialog';

export default function GroupManagementPage() {
  const signedIn = Boolean(useAccessToken());
  const profile = useQuery({ ...myProfileOptions(), enabled: signedIn });
  const userId = signedIn && profile.data?.role === 'TEACHER' ? profile.data.userId : undefined;

  return (
    <AdminLayout groupManagement>
      <Panel>
        <Heading>
          <h1>그룹 관리</h1>
          <p>반·스터디·학교 단위 그룹을 만들고 학생을 등록해 관리해요.</p>
        </Heading>
        {userId !== undefined ? (
          <GroupWorkspace key={userId} userId={userId} />
        ) : !signedIn ? (
          <Card>
            <p>그룹을 관리하려면 교사 계정으로 로그인해 주세요.</p>
            <Link to="/login">로그인</Link>
          </Card>
        ) : profile.isSuccess ? (
          <Card>
            <p>교사 계정만 그룹 관리 화면을 이용할 수 있어요.</p>
          </Card>
        ) : (
          <ApiFeedback pending={profile.isPending} error={profile.error} />
        )}
      </Panel>
    </AdminLayout>
  );
}

type GroupAction = 'edit' | 'delete' | 'invite';

function GroupWorkspace({ userId }: { userId: number }) {
  const [selection, setSelection] = useState<number>();
  const [action, setAction] = useState<GroupAction>();
  const [notice, setNotice] = useState('');
  const queryClient = useQueryClient();
  const list = useQuery(myGroupsOptions(userId));
  const groups = list.data ?? [];
  const selected = groups.find((group) => group.groupId === selection) ?? groups[0];
  const detail = useQuery(groupOptions(userId, selected?.groupId));

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ['groups', userId] });
  }

  const create = useMutation({
    mutationFn: createGroup,
    onSuccess: async (id) => {
      setSelection(id);
      setNotice('그룹을 만들었어요.');
      await refresh();
    },
  });

  return (
    <>
      {notice && <Hint role="status">{notice}</Hint>}
      <S.Columns>
        <S.Stack>
          <Card id="group-create">
            <h2>새 그룹 만들기</h2>
            <GroupForm
              groups={groups}
              pending={create.isPending}
              error={create.error?.message}
              onSave={async (fields) => {
                await create.mutateAsync(fields);
              }}
              resetOnSuccess
            />
          </Card>
          <Card id="group-list">
            <S.Row>
              <h2>그룹 목록</h2>
              <Hint>{groups.length}개</Hint>
            </S.Row>
            <ApiFeedback pending={list.isPending} error={list.error} />
            {list.isSuccess && !groups.length && <Hint>등록된 그룹이 없어요.</Hint>}
            <S.GroupList>
              {groups.map((group) => (
                <li key={group.groupId}>
                  <S.GroupButton
                    type="button"
                    aria-pressed={group.groupId === selected?.groupId}
                    onClick={() => {
                      setSelection(group.groupId);
                      setNotice('');
                    }}
                  >
                    <span>
                      <strong>{group.title}</strong>
                      <Hint>
                        {group.groupId === detail.data?.groupId
                          ? `학생 및 구성원 ${detail.data.members.length}명`
                          : group.myRole === 'OWNER'
                            ? '그룹장'
                            : '그룹원'}
                      </Hint>
                    </span>
                    <img src="/images/admin/group-next.svg" alt="" />
                  </S.GroupButton>
                </li>
              ))}
            </S.GroupList>
          </Card>
        </S.Stack>
        {selected && (
          <Card>
            <S.Row>
              <Heading>
                <h2>{selected.title}</h2>
                <p>
                  {selected.introduce && `${selected.introduce} · `}
                  {detail.data && `구성원 ${detail.data.members.length}명`}
                </p>
              </Heading>
              <S.Buttons>
                {selected.myRole === 'OWNER' && (
                  <>
                    <Secondary type="button" onClick={() => setAction('edit')}>
                      그룹 수정
                    </Secondary>
                    <Delete type="button" onClick={() => setAction('delete')}>
                      그룹 삭제
                    </Delete>
                  </>
                )}
                <Submit type="button" disabled={!detail.data} onClick={() => setAction('invite')}>
                  학생 추가
                </Submit>
              </S.Buttons>
            </S.Row>
            <ApiFeedback pending={detail.isPending} error={detail.error} />
            {detail.data && (
              <Members key={selected.groupId} members={detail.data.members} userId={userId} />
            )}
          </Card>
        )}
      </S.Columns>
      {action === 'invite' && selected && detail.data && (
        <GroupStudentDialog
          key={selected.groupId}
          groupId={selected.groupId}
          title={selected.title}
          memberIds={detail.data.members.map((member) => member.userId)}
          onClose={() => setAction(undefined)}
          onSuccess={(count) => {
            setNotice(`${count}명에게 그룹 초대를 보냈어요.`);
            setAction(undefined);
          }}
        />
      )}
      {action && action !== 'invite' && selected && (
        <GroupDialog
          action={action}
          group={selected}
          memberCount={detail.data?.members.length}
          groups={groups}
          onClose={() => setAction(undefined)}
          onSuccess={async (message) => {
            setNotice(message);
            await refresh();
            setAction(undefined);
          }}
        />
      )}
    </>
  );
}

interface GroupFormProps {
  groups: { groupId: number; title: string }[];
  initial?: GroupFields & { groupId: number };
  pending: boolean;
  error?: string;
  resetOnSuccess?: boolean;
  children?: ReactNode;
  onSave: (fields: GroupFields) => Promise<void>;
}

function GroupForm({
  groups,
  initial,
  pending,
  error,
  resetOnSuccess,
  onSave,
  children,
}: GroupFormProps) {
  const [validation, setValidation] = useState('');
  const errorId = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const element = event.currentTarget;
    const data = new FormData(element);
    const title = String(data.get('title') ?? '').trim();
    const introduce = String(data.get('introduce') ?? '').trim();
    if (!title) {
      setValidation('그룹명을 입력해 주세요.');
      return;
    }
    if (
      groups.some((group) => group.groupId !== initial?.groupId && group.title.trim() === title)
    ) {
      setValidation('이미 같은 이름의 그룹이 있어요. 다른 이름을 입력해 주세요.');
      return;
    }
    setValidation('');
    try {
      await onSave({ title, introduce });
      if (resetOnSuccess) element.reset();
    } catch {
      // The mutation displays the server error.
    }
  }

  return (
    <S.Form noValidate onSubmit={submit}>
      <Field>
        그룹명 *
        <S.GroupInput
          name="title"
          autoFocus={Boolean(initial)}
          required
          maxLength={255}
          defaultValue={initial?.title}
          placeholder="그룹명을 입력하세요"
          aria-invalid={Boolean(validation)}
          aria-describedby={validation ? errorId : undefined}
          onChange={() => setValidation('')}
        />
        {validation && (
          <Error id={errorId} role="alert">
            {validation}
          </Error>
        )}
      </Field>
      <Field>
        설명
        <S.GroupInput
          name="introduce"
          maxLength={255}
          defaultValue={initial?.introduce}
          placeholder="그룹 설명을 입력하세요"
        />
      </Field>
      {error && <Error role="alert">{error}</Error>}
      {children ?? (
        <Submit type="submit" disabled={pending}>
          {pending ? '저장 중…' : '그룹 생성'}
        </Submit>
      )}
    </S.Form>
  );
}

interface GroupDialogProps {
  action: Exclude<GroupAction, 'invite'>;
  group: GroupFields & { groupId: number };
  memberCount?: number;
  groups: GroupFormProps['groups'];
  onClose: () => void;
  onSuccess: (message: string) => Promise<void>;
}

function GroupDialog({ action, group, groups, memberCount, onClose, onSuccess }: GroupDialogProps) {
  const titleId = useId();
  const editing = action === 'edit';
  const [confirmDelete, setConfirmDelete] = useState(!editing);
  const edit = useMutation({
    mutationFn: (fields: GroupFields) => updateGroup(group.groupId, fields),
    onSuccess: () => onSuccess('그룹을 수정했어요.'),
  });
  const remove = useMutation({
    mutationFn: () => deleteGroup(group.groupId),
    onSuccess: () => onSuccess('그룹을 삭제했어요.'),
  });
  const pending = edit.isPending || remove.isPending;
  const close = () => {
    if (!pending) onClose();
  };
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({ onClose: close });

  const danger = (
    <S.Danger>
      <img src="/images/admin/group-delete.svg" alt="" width={22} height={22} />
      <div>
        <strong>그룹 삭제</strong>
        <p>
          {memberCount === undefined
            ? '구성원이 그룹에서 빠져요.'
            : `구성원 ${memberCount}명이 그룹에서 빠져요.`}{' '}
          학생 계정과 풀이 기록은 그대로 남아요.
        </p>
      </div>
      {!confirmDelete && (
        <Delete type="button" disabled={pending} onClick={() => setConfirmDelete(true)}>
          삭제
        </Delete>
      )}
    </S.Danger>
  );

  const confirmation = confirmDelete && (
    <S.Stack>
      <p role="status">‘{group.title}’ 그룹과 대기 중인 초대를 삭제할까요?</p>
      {remove.error && <Error role="alert">{remove.error.message}</Error>}
      <S.DialogActions>
        <Secondary
          type="button"
          autoFocus={!editing}
          disabled={pending}
          onClick={() => {
            if (!editing) {
              close();
              return;
            }
            remove.reset();
            setConfirmDelete(false);
          }}
        >
          취소
        </Secondary>
        <Delete type="button" disabled={pending} onClick={() => remove.mutate()}>
          {pending ? '삭제 중…' : '삭제하기'}
        </Delete>
      </S.DialogActions>
    </S.Stack>
  );

  return (
    <S.GroupModal
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <S.Stack>
        <S.DialogHeader>
          <h2 id={titleId}>{editing ? '그룹 수정' : '그룹 삭제'}</h2>
          <button type="button" aria-label="닫기" onClick={close} disabled={pending}>
            <img src="/images/admin/case-modal-close.svg" width={24} height={24} alt="" />
          </button>
        </S.DialogHeader>
        {editing ? (
          <GroupForm
            groups={groups}
            initial={group}
            pending={pending || confirmDelete}
            error={edit.error?.message}
            onSave={async (fields) => {
              await edit.mutateAsync(fields);
            }}
          >
            <Field as="div">
              그룹 유형
              <S.Types aria-label="그룹 유형" role="group">
                {['반', '스터디', '학교'].map((type) => (
                  <button type="button" key={type} disabled>
                    {type}
                  </button>
                ))}
              </S.Types>
              <Hint>그룹 유형은 현재 변경할 수 없어요.</Hint>
            </Field>
            {danger}
            {confirmation || (
              <S.DialogActions>
                <Secondary type="button" onClick={close} disabled={pending}>
                  취소
                </Secondary>
                <Submit type="submit" disabled={pending}>
                  {pending ? '저장 중…' : '변경사항 저장'}
                </Submit>
              </S.DialogActions>
            )}
          </GroupForm>
        ) : (
          <>
            {danger}
            {confirmation}
          </>
        )}
      </S.Stack>
    </S.GroupModal>
  );
}

interface Member {
  userId: number;
  name: string;
  role: 'OWNER' | 'MEMBER';
}

const sortable = [
  ['name', '학생'],
  ['number', '학번'],
  ['xp', 'XP'],
  ['solved', '풀이 수'],
] as const;
type SortKey = (typeof sortable)[number][0];

function Members({ members, userId }: { members: Member[]; userId: number }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean }>({
    key: 'xp',
    descending: true,
  });
  const [selected, setSelected] = useState<number>();
  const profiles = useQueries({
    queries: members.map(({ userId: memberId }) => ({
      queryKey: ['group-member-profile', userId, memberId],
      queryFn: ({ signal }) => getUser(memberId, signal),
      staleTime: 60_000,
      gcTime: 0,
    })),
  });
  const rows = members.map((member, index) => {
    const profile = profiles[index].data;
    return {
      ...member,
      email: profile?.email,
      number: profile ? studentNumber(profile) : '',
      xp: profile?.xp,
      solved: profile?.solvedCount,
      rank: profile?.rank,
    };
  });
  const student = rows.find((row) => row.userId === selected);
  const query = search.trim().toLowerCase();
  const visible = rows
    .filter(({ name, number }) => name.toLowerCase().includes(query) || number.includes(query))
    .sort((first, second) => {
      const a = first[sort.key];
      const b = second[sort.key];
      if (a == null || a === '') return b == null || b === '' ? 0 : 1;
      if (b == null || b === '') return -1;
      const result =
        typeof a === 'number' && typeof b === 'number'
          ? a - b
          : String(a).localeCompare(String(b), 'ko');
      return sort.descending ? -result : result;
    });

  function header(key: SortKey) {
    const active = sort.key === key;
    return (
      <th
        scope="col"
        aria-sort={active ? (sort.descending ? 'descending' : 'ascending') : undefined}
      >
        <S.Sort
          type="button"
          onClick={() =>
            setSort({
              key,
              descending: active ? !sort.descending : key === 'xp' || key === 'solved',
            })
          }
        >
          {sortable.find(([column]) => column === key)?.[1]}
          <img
            src={active ? '/images/admin/sort-down.svg' : '/images/admin/sort.svg'}
            alt=""
            width={16}
            height={16}
          />
        </S.Sort>
      </th>
    );
  }

  return (
    <>
      <Search>
        <img src="/images/admin/search.svg" alt="" width={20} height={20} />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="학생 이름 또는 학번으로 검색"
          placeholder="학생 이름 또는 학번으로 검색"
        />
      </Search>
      <S.TableScroll role="region" aria-label="그룹 구성원 목록" tabIndex={0}>
        <S.Table>
          <thead>
            <tr>
              {header('name')}
              {header('number')}
              <th scope="col">랭크</th>
              {header('xp')}
              {header('solved')}
              <th scope="col">정답률</th>
              <th scope="col" aria-label="상세" />
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              const tier = tierThresholds.find(({ label }) => label === row.rank);
              return (
                <tr key={row.userId}>
                  <td>
                    <S.Person>
                      <Asset name="avatar.svg" width={36} height={36} />
                      <div>
                        <strong>{row.name}</strong>
                        {row.role === 'OWNER' && <S.Owner>그룹장</S.Owner>}
                        {row.email && <Hint>{row.email}</Hint>}
                      </div>
                    </S.Person>
                  </td>
                  <td>{row.number || '—'}</td>
                  <td>
                    <S.Person>
                      {tier && <Asset name={`rank-${tier.id}.svg`} width={24} height={24} />}
                      {row.rank || '—'}
                    </S.Person>
                  </td>
                  <td>
                    <strong>{row.xp?.toLocaleString('ko-KR') ?? '—'}</strong>
                  </td>
                  <td>{row.solved ?? '—'}</td>
                  <td>—</td>
                  <td>
                    <S.Detail
                      type="button"
                      onClick={() => setSelected(row.userId)}
                      aria-label={`${row.name} 상세`}
                    >
                      상세{' '}
                      <img src="/images/admin/achievement-next.svg" alt="" width={16} height={16} />
                    </S.Detail>
                  </td>
                </tr>
              );
            })}
            {!visible.length && (
              <tr>
                <td colSpan={7}>표시할 구성원이 없어요.</td>
              </tr>
            )}
          </tbody>
        </S.Table>
      </S.TableScroll>
      {student && (
        <PreviewDialog title={student.name} onClose={() => setSelected(undefined)}>
          <p>
            사용자 번호 {student.userId}
            {student.number && ` · 학번 ${student.number}`}
          </p>
          {student.email && <p>{student.email}</p>}
          {student.number && (
            <Link to={`/admin/achievement?student=${student.userId}`}>학생별 성취도 보기</Link>
          )}
          {student.number && (
            <Link to={`/admin/submissions/${student.userId}`}>제출 기록 보기</Link>
          )}
        </PreviewDialog>
      )}
    </>
  );
}
