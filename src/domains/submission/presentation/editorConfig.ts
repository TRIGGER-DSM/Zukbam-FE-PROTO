import { Annotation, Compartment, EditorState } from '@codemirror/state';
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab, redo } from '@codemirror/commands';
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  HighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
} from '@codemirror/language';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
import { tags } from '@lezer/highlight';
import type { CodeLanguage } from '../domain/submission';
import { colors } from '../../../shared/styles/colors';

export const externalChange = Annotation.define<boolean>();

const highlight = HighlightStyle.define([
  { tag: tags.keyword, color: colors.accent.waterLight },
  { tag: [tags.string, tags.number, tags.bool], color: colors.status.cautionary },
  {
    tag: [tags.function(tags.variableName), tags.standard(tags.variableName), tags.typeName],
    color: colors.primary.strong,
  },
  { tag: tags.variableName, color: colors.label.normal },
  { tag: [tags.comment, tags.meta], color: colors.label.alternative },
  { tag: [tags.operator, tags.punctuation], color: colors.label.neutral },
  { tag: tags.invalid, color: colors.status.negative },
]);

export function createEditorState(
  source: string,
  grammar: Compartment,
  hintId: string,
  onChange: (source: string) => void,
) {
  return EditorState.create({
    doc: source,
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      indentUnit.of('    '),
      EditorState.tabSize.of(4),
      EditorState.phrases.of({
        Find: '찾기',
        Replace: '바꾸기',
        next: '다음',
        previous: '이전',
        all: '모두 선택',
        'match case': '대소문자 구분',
        regexp: '정규식',
        'by word': '단어 단위',
        replace: '바꾸기',
        'replace all': '모두 바꾸기',
        close: '닫기',
        'Go to line': '줄 이동',
        go: '이동',
        'Fold line': '줄 접기',
        'Unfold line': '줄 펼치기',
      }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      search({ top: true }),
      syntaxHighlighting(highlight),
      EditorView.theme({}, { dark: true }),
      grammar.of([]),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        { key: 'Mod-Shift-z', run: redo, preventDefault: true },
        ...foldKeymap,
        ...completionKeymap,
        indentWithTab,
      ]),
      EditorView.contentAttributes.of({
        'aria-label': '풀이 코드',
        'aria-describedby': hintId,
        spellcheck: 'false',
        autocapitalize: 'off',
        autocorrect: 'off',
      }),
      EditorView.updateListener.of((update) => {
        if (
          update.docChanged &&
          !update.transactions.some((transaction) => transaction.annotation(externalChange))
        ) {
          onChange(update.state.doc.toString());
        }
      }),
    ],
  });
}

export async function loadLanguage(language: CodeLanguage) {
  switch (language) {
    case 'python':
      return (await import('@codemirror/lang-python')).python();
    case 'javascript':
      return (await import('@codemirror/lang-javascript')).javascript();
    case 'cpp':
      return (await import('@codemirror/lang-cpp')).cpp();
  }
}
