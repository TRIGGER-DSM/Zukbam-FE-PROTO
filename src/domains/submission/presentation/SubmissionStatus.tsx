import type { Solution } from '../infrastructure/solutionApi';
import { solutionStatusLabels } from '../infrastructure/solutionApi';
import { Spinner } from '../../../shared/ui/Spinner';
import * as S from './SubmissionStatus.styles';

export type SubmissionPhase = 'submitting' | 'judging' | 'submitted' | 'finished' | 'error';

interface SubmissionStatusProps {
  phase: SubmissionPhase;
  solution?: Solution;
  error?: Error | null;
  onRetry?: () => void;
}

const steps = ['제출', '채점', '결과'];

export function SubmissionStatus({ phase, solution, error, onRetry }: SubmissionStatusProps) {
  const pending = phase === 'submitting' || phase === 'judging';
  const accepted = solution?.status === 'ACCEPTED';
  const failed = phase === 'error' || (phase === 'finished' && !accepted);
  const currentStep = phase === 'submitting' ? 0 : phase === 'finished' ? 2 : 1;
  let title = '제출이 접수됐어요';
  let description = '옆의 제출 기록에서 결과를 확인할 수 있어요.';

  if (phase === 'submitting') {
    title = '코드를 제출하고 있어요';
    description = '잠시만 기다려 주세요. 제출이 완료되면 채점을 시작해요.';
  } else if (phase === 'judging') {
    title = '채점 중이에요';
    description = '서버에서 코드를 확인하고 있어요. 결과가 나오면 자동으로 표시해요.';
  } else if (phase === 'error') {
    title = '요청을 처리하지 못했어요';
    description = error?.message ?? '잠시 후 다시 시도해 주세요.';
  } else if (phase === 'finished' && solution) {
    title = accepted ? '정답이에요!' : solutionStatusLabels[solution.status];
    description = `제출 #${solution.solutionId}의 채점이 완료됐어요. 제출 기록에서 상세 결과를 확인하세요.`;
  }

  return (
    <S.Panel $failed={failed} role={phase === 'error' ? 'alert' : 'status'}>
      <S.Summary>
        <S.Icon>{pending ? <Spinner /> : failed ? '!' : '✓'}</S.Icon>
        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
        {onRetry && <button onClick={onRetry}>다시 확인</button>}
      </S.Summary>
      {phase !== 'error' && phase !== 'submitted' && (
        <S.Steps aria-label="채점 진행 단계">
          {steps.map((step, index) => (
            <li
              key={step}
              aria-current={index === currentStep ? 'step' : undefined}
              data-complete={index < currentStep || phase === 'finished'}
            >
              <span>{index < currentStep || phase === 'finished' ? '✓' : index + 1}</span>
              {step}
            </li>
          ))}
        </S.Steps>
      )}
    </S.Panel>
  );
}
