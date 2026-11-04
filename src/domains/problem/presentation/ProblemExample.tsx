import * as S from './ProblemExample.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import { useEffect, useRef, useState } from 'react';

interface ExampleCodeProps {
  label: string;
  value: string;
}

function ExampleCode({ label, value }: ExampleCodeProps) {
  const [message, setMessage] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const codeRef = useRef<HTMLPreElement>(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setMessage('복사 완료');
    } catch {
      // If clipboard access is unavailable, select the example for manual copying.
      if (codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setMessage('선택됨 · 직접 복사해 주세요');
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setMessage(''), 2500);
  };
  return (
    <S.Code>
      <div>
        <h3>{label}</h3>
        <button onClick={copy} aria-label={`예제 ${label} 복사`}>
          {message || '복사'}
        </button>
      </div>
      <pre ref={codeRef} tabIndex={0} aria-label={`예제 ${label}`}>
        <code>{value}</code>
      </pre>
      <UI.HiddenText role="status">{message}</UI.HiddenText>
    </S.Code>
  );
}

interface ProblemExampleProps {
  example: {
    input: string;
    output: string;
  };
  index: number;
}

export function ProblemExample({ example, index }: ProblemExampleProps) {
  return (
    <S.Section>
      <h2>예제 {index + 1}</h2>
      <S.Grid>
        <ExampleCode label="입력" value={example.input} />
        <ExampleCode label="출력" value={example.output} />
      </S.Grid>
    </S.Section>
  );
}
