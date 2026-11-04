import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react';

interface ModalDialogOptions {
  onClose: () => void;
  focusDialog?: boolean;
}

export function useModalDialog({ onClose, focusDialog = false }: ModalDialogOptions) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;

    dialogElement.showModal();
    if (focusDialog) dialogElement.focus({ preventScroll: true });
    dialogElement.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    return () => {
      dialogElement.close();
      document.body.style.overflow = previousBodyOverflow;

      if (previouslyFocusedElement instanceof HTMLElement && previouslyFocusedElement.isConnected) {
        previouslyFocusedElement.focus({ preventScroll: true });
      }
    };
  }, [focusDialog]);

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;

    const dialogBounds = event.currentTarget.getBoundingClientRect();
    const clickedOutsideDialog =
      event.clientX < dialogBounds.left ||
      event.clientX > dialogBounds.right ||
      event.clientY < dialogBounds.top ||
      event.clientY > dialogBounds.bottom;

    if (clickedOutsideDialog) onClose();
  }

  return { dialogRef, handleCancel, handleBackdropClick };
}
