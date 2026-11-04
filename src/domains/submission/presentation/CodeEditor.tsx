import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { CodeLanguage } from '../domain/submission';
import { createEditorState, externalChange, loadLanguage } from './editorConfig';
import * as S from './CodeEditor.styles';

interface CodeEditorProps {
  source: string;
  language: CodeLanguage;
  fontSize: number;
  onChange: (source: string) => void;
}

export function CodeEditor({ source, language, fontSize, onChange }: CodeEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);
  const initialSource = useRef(source);
  const activeLanguage = useRef(language);
  const languageStates = useRef(new Map<CodeLanguage, EditorState>());
  const languageConfig = useRef(new Compartment());
  const onSourceChange = useRef(onChange);
  const hintId = useId();
  const [failedLanguage, setFailedLanguage] = useState<CodeLanguage | null>(null);

  useLayoutEffect(() => {
    onSourceChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!hostRef.current) return;
    const editor = new EditorView({
      parent: hostRef.current,
      state: createEditorState(initialSource.current, languageConfig.current, hintId, (value) =>
        onSourceChange.current(value),
      ),
    });
    editorRef.current = editor;
    return () => {
      languageStates.current.set(activeLanguage.current, editor.state);
      editor.destroy();
      editorRef.current = null;
    };
  }, [hintId]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (activeLanguage.current !== language) {
      languageStates.current.set(activeLanguage.current, editor.state);
      const cached = languageStates.current.get(language);
      editor.setState(
        cached ??
          createEditorState(source, languageConfig.current, hintId, (value) =>
            onSourceChange.current(value),
          ),
      );
      activeLanguage.current = language;
    }
    if (editor.state.doc.toString() !== source) {
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: source },
        annotations: externalChange.of(true),
      });
    }
  }, [source, language, hintId]);

  useEffect(() => {
    let cancelled = false;
    loadLanguage(language)
      .then((support) => {
        if (!cancelled && editorRef.current) {
          editorRef.current.dispatch({
            effects: languageConfig.current.reconfigure(support),
          });
          setFailedLanguage((current) => (current === language ? null : current));
        }
      })
      .catch(() => {
        if (!cancelled) setFailedLanguage(language);
      });
    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    editorRef.current?.requestMeasure();
  }, [fontSize]);

  return (
    <S.Root $fontSize={fontSize}>
      <S.Host ref={hostRef} />
      <S.Hint id={hintId}>
        Tab: 들여쓰기 · Shift+Tab: 내어쓰기 · Esc 다음 Tab: 편집기 밖으로 이동 · Ctrl/Cmd+F: 검색
      </S.Hint>
      {failedLanguage === language && (
        <S.Hint role="alert">
          언어 지원을 불러오지 못했습니다. 코드를 편집할 수 있으며 새로고침하면 다시 시도합니다.
        </S.Hint>
      )}
    </S.Root>
  );
}
