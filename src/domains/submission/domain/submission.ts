export type CodeLanguage = 'python' | 'javascript' | 'cpp';

export type SubmissionTab = 'problem' | 'history' | 'questions';

export type ConsoleTab = 'result' | 'testcases';

export interface CodeDraft {
  language: CodeLanguage;
  source: string;
}

export const codeLanguages: {
  id: CodeLanguage;
  label: string;
  filename: string;
}[] = [
  {
    id: 'python',
    label: 'Python 3',
    filename: 'main.py',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    filename: 'main.js',
  },
  {
    id: 'cpp',
    label: 'C++17',
    filename: 'main.cpp',
  },
];

export function clampFontSize(size: number) {
  return Math.min(24, Math.max(10, size));
}

export function formatElapsedTime(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}
