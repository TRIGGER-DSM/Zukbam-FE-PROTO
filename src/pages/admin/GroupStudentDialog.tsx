import { useId, useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { inviteStudent } from '../../domains/member/infrastructure/groupApi';
import {
  getUser,
  studentNumber,
  type UserProfile,
} from '../../domains/member/infrastructure/profileApi';
import { useModalDialog } from '../../shared/hooks/useModalDialog';
import { alpha, colors } from '../../shared/styles/colors';
import { Asset } from '../../shared/ui/Asset';
import { Dialog } from '../../shared/ui/PreviewDialog.styles';
import { Search } from './AdminDashboardPage.styles';
import { Error as ErrorText, Hint, Secondary, Submit } from './ProblemRegistrationPage.styles';

interface GroupStudentDialogProps {
  groupId: number;
  title: string;
  memberIds: number[];
  onClose: () => void;
  onSuccess: (count: number) => void;
}

export function GroupStudentDialog({
  groupId,
  title,
  memberIds,
  onClose,
  onSuccess,
}: GroupStudentDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [number, setNumber] = useState('');
  const [candidates, setCandidates] = useState<UserProfile[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [sent, setSent] = useState<number[]>([]);
  const [validation, setValidation] = useState('');
  const [failures, setFailures] = useState<Record<number, string>>({});

  const lookup = useMutation({
    mutationFn: async (id: number) => {
      const student = await getUser(id);
      if (student.role !== 'STUDENT') throw new Error('학생 계정만 추가할 수 있어요.');
      return student;
    },
    onSuccess: (student) => {
      setCandidates((previous) => [
        student,
        ...previous.filter(({ userId }) => userId !== student.userId),
      ]);
      setNumber('');
    },
  });
  const invitation = useMutation({
    mutationFn: async (ids: number[]) => {
      const results = await Promise.allSettled(ids.map((id) => inviteStudent(groupId, id)));
      const successes: number[] = [];
      const errors: Record<number, string> = {};
      results.forEach((result, index) => {
        const id = ids[index];
        if (result.status === 'fulfilled') successes.push(id);
        else
          errors[id] =
            result.reason instanceof Error ? result.reason.message : '초대를 보내지 못했어요.';
      });
      return { successes, errors };
    },
    onSuccess: ({ successes, errors }) => {
      setFailures(errors);
      if (!Object.keys(errors).length) {
        onSuccess(sent.length + successes.length);
        return;
      }
      setSent((previous) => [...previous, ...successes]);
      setSelected((previous) => previous.filter((id) => !successes.includes(id)));
    },
  });
  const pending = invitation.isPending;
  const close = () => {
    if (!pending) onClose();
  };
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({ onClose: close });
  const invitees = selected.filter((id) => !memberIds.includes(id));

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lookup.isPending || pending) return;
    const value = number.trim();
    const id = Number(value);
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(id) || id < 1) {
      setValidation('올바른 사용자 번호를 입력해 주세요.');
      return;
    }
    setValidation('');
    lookup.mutate(id);
  }

  return (
    <Modal
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <Content>
        <Header>
          <div>
            <h2 id={titleId}>학생 추가</h2>
            <Hint id={descriptionId}>{title}에 추가할 학생을 검색해 선택해요.</Hint>
          </div>
          <button type="button" aria-label="닫기" disabled={pending} onClick={close}>
            <img src="/images/admin/case-modal-close.svg" width={24} height={24} alt="" />
          </button>
        </Header>
        <SearchForm onSubmit={search}>
          <Lookup>
            <img src="/images/admin/search.svg" alt="" width={20} height={20} />
            <input
              type="search"
              inputMode="numeric"
              autoFocus
              aria-label="학생 사용자 번호"
              placeholder="학생 사용자 번호 검색"
              value={number}
              disabled={lookup.isPending || pending}
              onChange={(event) => {
                setNumber(event.target.value);
                setValidation('');
                lookup.reset();
              }}
            />
          </Lookup>
          <Secondary type="submit" disabled={lookup.isPending || pending}>
            검색
          </Secondary>
        </SearchForm>
        {lookup.isPending && <Hint role="status">학생을 찾고 있어요.</Hint>}
        {(validation || lookup.error) && (
          <ErrorText role="alert">{validation || lookup.error?.message}</ErrorText>
        )}
        {candidates.length > 0 && (
          <Students aria-label="검색한 학생">
            {candidates.map((student) => {
              const id = student.userId;
              const member = memberIds.includes(id);
              const invited = sent.includes(id);
              return (
                <li key={id}>
                  <Student>
                    <Asset name="avatar.svg" width={36} height={36} />
                    <Identity>
                      <strong>
                        {studentNumber(student) || id} {student.name}
                      </strong>
                      {(member || invited) && <Badge>{member ? '추가됨' : '초대 보냄'}</Badge>}
                      {student.email && <Hint>{student.email}</Hint>}
                    </Identity>
                    <Check
                      type="checkbox"
                      checked={member || invited || selected.includes(id)}
                      disabled={member || invited || pending}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setSelected((previous) =>
                          checked ? [...previous, id] : previous.filter((item) => item !== id),
                        );
                      }}
                    />
                  </Student>
                  {failures[id] && <ErrorText role="alert">{failures[id]}</ErrorText>}
                </li>
              );
            })}
          </Students>
        )}
        <Actions>
          <Count aria-live="polite">{invitees.length}명 선택됨</Count>
          <Secondary type="button" onClick={close} disabled={pending}>
            취소
          </Secondary>
          <Submit
            type="button"
            disabled={!invitees.length || pending || lookup.isPending}
            onClick={() => invitation.mutate(invitees)}
          >
            {pending ? '보내는 중…' : '추가하기'}
          </Submit>
        </Actions>
      </Content>
    </Modal>
  );
}

const Modal = styled(Dialog)`
  && {
    width: min(560px, calc(100% - 2rem));
    padding: clamp(1.25rem, 2vw, 32px) clamp(1.25rem, 2vw, 36px);
    border-color: ${colors.line.normal};
    border-radius: 28px;
  }
  &&::backdrop {
    background: ${alpha(colors.static.black, 0.72)};
    backdrop-filter: none;
  }
`;

const Content = styled.div`
  display: grid;
  gap: clamp(0.875rem, 1.04vw, 20px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.75rem;
  h2 {
    font-size: clamp(1.25rem, 1.25vw, 24px);
    margin-bottom: 0.375rem;
  }
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem;
`;

const Lookup = styled(Search)`
  background: ${colors.background.alternative};
`;

const Students = styled.ul`
  display: grid;
  gap: 0.5rem;
  max-height: min(330px, 40vh);
  overflow-y: auto;
`;

const Student = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  min-height: 72px;
  background: ${colors.background.normal};
  border: 1px solid transparent;
  border-radius: 0.875rem;
  cursor: pointer;
  &:has(input:checked:not(:disabled)) {
    border-color: ${colors.primary.normal};
    background: ${colors.fill.normal};
  }
  &:has(input:disabled) {
    cursor: default;
  }
  &:has(input:disabled:checked) {
    color: ${colors.label.alternative};
  }
`;

const Identity = styled.span`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.5rem;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Badge = styled.span`
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  background: ${colors.fill.normal};
  color: ${colors.label.alternative};
  font-size: 0.875rem;
`;

const Check = styled.input`
  appearance: none;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  border: 1px solid ${colors.line.strong};
  border-radius: 0.5rem;
  cursor: inherit;
  &:checked {
    border-color: transparent;
    background: ${colors.primary.normal} url('/images/admin/student-selected.svg') center / 16px
      no-repeat;
  }
  &:checked:disabled {
    background-color: ${colors.fill.raised};
    opacity: 0.6;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const Count = styled.span`
  margin-right: auto;
  color: ${colors.primary.normal};
  font-weight: 700;
`;
