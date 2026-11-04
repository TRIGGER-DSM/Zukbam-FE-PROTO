import { useId, type ReactNode } from 'react';
import { useModalDialog } from '../hooks/useModalDialog';
import * as S from './PreviewDialog.styles';
import * as UI from './primitives.styles';

interface PreviewDialogProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function PreviewDialog({ title, children, onClose }: PreviewDialogProps) {
  const titleId = useId();
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({ onClose });

  return (
    <S.Dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <UI.Heading>
        <h2 id={titleId}>{title}</h2>
        <button autoFocus onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </UI.Heading>
      {children}
      <S.Close onClick={onClose}>확인</S.Close>
    </S.Dialog>
  );
}
