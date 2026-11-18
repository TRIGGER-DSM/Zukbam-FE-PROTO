import { useId } from 'react';
import styled from '@emotion/styled';
import type { EditableProblem } from '../../domains/problem/infrastructure/problemApi';
import { useModalDialog } from '../../shared/hooks/useModalDialog';
import { alpha, colors } from '../../shared/styles/colors';
import { Dialog } from '../../shared/ui/PreviewDialog.styles';
import { Delete, Error, Secondary } from './ProblemRegistrationPage.styles';

interface ProblemDeleteDialogProps {
  problem: Pick<EditableProblem, 'problemId' | 'title'>;
  pending: boolean;
  error?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ProblemDeleteDialog({
  problem,
  pending,
  error,
  onConfirm,
  onClose,
}: ProblemDeleteDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({ onClose });

  return (
    <Modal
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <Content>
        <Icon>
          <img src="/images/admin/problem-delete.svg" width={30} height={30} alt="" />
        </Icon>
        <h2 id={titleId}>문제를 삭제할까요?</h2>
        <Description id={descriptionId}>
          {problem.problemId}. {problem.title} 문제와 테스트케이스가 함께 삭제돼요.
          <br />
          삭제한 문제는 되돌릴 수 없어요.
        </Description>
        {error && <Error role="alert">{error}</Error>}
        <Actions>
          <Secondary type="button" autoFocus onClick={onClose} disabled={pending}>
            취소
          </Secondary>
          <Confirm type="button" onClick={onConfirm} disabled={pending}>
            {pending ? '삭제 중…' : '삭제하기'}
          </Confirm>
        </Actions>
      </Content>
    </Modal>
  );
}

const Modal = styled(Dialog)`
  && {
    width: min(480px, calc(100% - 2rem));
    padding: clamp(1.5rem, 4vw, 40px) clamp(1.5rem, 4vw, 40px) clamp(1.25rem, 3.2vw, 32px);
    border: 1px solid ${colors.line.normal};
    border-radius: 28px;
  }
  &&::backdrop {
    background: ${alpha(colors.static.black, 0.72)};
    backdrop-filter: none;
  }
`;

const Content = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
  text-align: center;
  h2 {
    font-size: clamp(1.375rem, 2.5vw, 24px);
  }
`;

const Icon = styled.span`
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 50%;
  background: ${colors.status.negativeSubtle};
`;

const Description = styled.p`
  color: ${colors.label.alternative};
  font-size: 1rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

const Actions = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding-top: 8px;
  button {
    min-height: 54px;
    padding-inline: 0.5rem;
  }
`;

const Confirm = styled(Delete)`
  margin-right: 0;
  color: ${colors.static.black};
`;
