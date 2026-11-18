export type CodeLanguage = 'python' | 'javascript' | 'cpp' | 'c' | 'java';

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
  apiLanguage: string;
}[] = [
  {
    id: 'python',
    label: 'Python 3',
    filename: 'main.py',
    apiLanguage: 'Python',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    filename: 'main.js',
    apiLanguage: 'JavaScript',
  },
  {
    id: 'cpp',
    label: 'C++17',
    filename: 'main.cpp',
    apiLanguage: 'C++17',
  },
  {
    id: 'c',
    label: 'C (C99)',
    filename: 'main.c',
    apiLanguage: 'C99',
  },
  {
    id: 'java',
    label: 'Java',
    filename: 'Main.java',
    apiLanguage: 'Java',
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
