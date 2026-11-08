import type { CodeLanguage } from '../domain/submission';

export const codeTemplates: Record<CodeLanguage, string> = {
  python: '',
  javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);

// 여기에 풀이를 작성하세요.
`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // 여기에 풀이를 작성하세요.
    return 0;
}
`,
};
