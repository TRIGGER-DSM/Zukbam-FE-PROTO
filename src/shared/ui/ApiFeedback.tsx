interface ApiFeedbackProps {
  pending?: boolean;
  error?: Error | null;
}

export function ApiFeedback({ pending, error }: ApiFeedbackProps) {
  if (pending) return <p role="status">불러오는 중이에요.</p>;
  if (error) return <p role="alert">{error.message}</p>;
  return null;
}
