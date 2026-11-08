import styled from '@emotion/styled';
import { colors, alpha } from '../../../shared/styles/colors';

interface RootStyleProps {
  $fontSize: number;
}

export const Root = styled.div<RootStyleProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 10rem;
  overflow: hidden;
  background: ${colors.background.alternative};
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: ${({ $fontSize }) => $fontSize}px;
  &:focus-within {
    box-shadow: inset 0 0 0 1px ${alpha(colors.primary.strong, 0.25)};
  }
`;

export const Host = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  min-width: 0;
  && .cm-editor {
    position: absolute;
    inset: 0;
    height: 100%;
    min-width: 0;
    max-width: 100%;
    color: ${colors.label.normal};
    background: transparent;
    font-size: inherit;
  }
  .cm-editor.cm-focused {
    outline: none;
  }
  .cm-scroller {
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: ${colors.label.assistive} transparent;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.7;
  }
  .cm-content {
    padding: 1.25rem 0;
    caret-color: ${colors.primary.strong};
    white-space: pre;
    overflow-wrap: normal;
    word-break: normal;
  }
  .cm-line {
    padding: 0 1rem;
  }
  .cm-gutters {
    background: transparent;
    color: ${colors.label.assistive};
    border-right: 1px solid ${colors.line.alternative};
  }
  .cm-gutterElement {
    padding-inline: 0.75rem 0.5rem;
  }
  .cm-activeLine {
    background: ${alpha(colors.fill.normal, 0.45)};
  }
  .cm-activeLineGutter {
    background: ${colors.fill.normal};
    color: ${colors.label.neutral};
  }
  .cm-cursor,
  .cm-dropCursor {
    border-left-color: ${colors.primary.strong};
  }
  .cm-selectionBackground,
  .cm-editor.cm-focused .cm-selectionBackground {
    background: ${alpha(colors.primary.strong, 0.16)};
  }
  .cm-content ::selection {
    background: ${alpha(colors.primary.strong, 0.16)};
  }
  .cm-selectionMatch {
    background: ${alpha(colors.primary.strong, 0.12)};
  }
  .cm-matchingBracket {
    background: ${alpha(colors.primary.strong, 0.2)};
    outline: 1px solid ${colors.primary.heavy};
  }
  .cm-foldPlaceholder {
    background: ${colors.fill.normal};
    color: ${colors.label.neutral};
    border-color: ${colors.line.normal};
  }
  .cm-searchMatch {
    background: ${alpha(colors.status.cautionary, 0.25)};
  }
  .cm-searchMatch-selected {
    background: ${alpha(colors.status.cautionary, 0.45)};
  }
  .cm-panels,
  .cm-tooltip {
    background: ${colors.background.elevated};
    color: ${colors.label.normal};
    border-color: ${colors.line.normal};
  }
  .cm-search {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0.75rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.875rem;
  }
  .cm-textfield {
    min-width: 0;
    color: ${colors.label.normal};
    background: ${colors.background.normal};
    border: 1px solid ${colors.line.normal};
    border-radius: 0.25rem;
  }
  .cm-button {
    color: ${colors.label.normal};
    background: ${colors.fill.normal};
    border: 1px solid ${colors.line.normal};
    border-radius: 0.25rem;
  }
  .cm-tooltip-autocomplete > ul > li[aria-selected] {
    background: ${colors.fill.heavy};
    color: ${colors.primary.strong};
  }
  @media (max-width: 650px) {
    .cm-line {
      padding-inline: 0.5rem;
    }
    .cm-gutterElement {
      padding-inline: 0.375rem;
    }
  }
`;

export const Hint = styled.p`
  flex-shrink: 0;
  padding: 0.375rem 0.75rem;
  color: ${colors.label.alternative};
  font-size: 0.6875rem;
  line-height: 1.5;
  font-family: 'Noto Sans KR', sans-serif;
  border-top: 1px solid ${colors.line.alternative};
`;
