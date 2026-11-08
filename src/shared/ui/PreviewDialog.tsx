import { useId, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { useModalDialog } from '../hooks/useModalDialog';
import { colors } from '../styles/colors';
import { Dialog } from './PreviewDialog.styles';
import { Heading } from './primitives.styles';

interface PreviewDialogProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function PreviewDialog({ title, children, onClose }: PreviewDialogProps) {
  const titleId = useId();
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({ onClose });

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <Heading>
        <h2 id={titleId}>{title}</h2>
        <button autoFocus onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </Heading>
      {children}
      <Close onClick={onClose}>확인</Close>
    </Dialog>
  );
}

const Close = styled.button`
  display: block;
  margin: 1.5rem 0 0 auto;
  padding: 0.625rem 1.5rem;
  border-radius: 0.625rem;
  background: ${({ theme }) => theme.colors.primary.normal};
  color: ${colors.label.onPrimary};
  font-weight: 700;
`;
