import type { ReactNode } from 'react';
import { useModalDialog } from '../hooks/useModalDialog';
import * as S from './CelebrationDialog.styles';

interface CelebrationDialogProps {
  titleId: string;
  descriptionId: string;
  children: ReactNode;
  onClose: () => void;
}

export function CelebrationDialog({
  titleId,
  descriptionId,
  children,
  onClose,
}: CelebrationDialogProps) {
  const { dialogRef, handleCancel, handleBackdropClick } = useModalDialog({
    onClose,
    focusDialog: true,
  });

  return (
    <S.Dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      {children}
    </S.Dialog>
  );
}
