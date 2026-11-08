# Zukbam FE

React + TypeScript + Vite 기반 죽빰 프런트엔드.

## 영상 시연용 mock 모드

개발 서버에서 `/?demo=1`로 접속하면 가상 사용자 김민서로 시작합니다. 같은 탭에서 이동하거나 새로고침해도 시연 모드가 유지됩니다. `/?demo=0`으로 접속하면 실제 API 모드로 돌아갑니다. 환경 변수 `VITE_DEMO_MODE=true`로도 활성화할 수 있습니다.

- 기존 랭킹 샘플과 내 순위, 문제 19개의 목록·필터·상세·추천 문제를 확인할 수 있습니다.
- 편집기 상단 ‘시연 채점 결과’에서 정답·오답을 선택하고 제출하면 채점 중 화면을 거쳐 결과로 이동합니다. 제출 기록은 해당 탭의 sessionStorage에 보관합니다.
- 가상 프로필, 친구 목록·받은 요청·친구 검색, 성장 기록을 제공합니다.
- 실제 코드 실행·채점·이메일 발송은 하지 않습니다. 코드 실행은 예제의 예상 출력만 보여줍니다. 일부 문제 본문은 시연용 예시입니다.
- 시연 모드에서는 API 요청이 서버로 전송되지 않으며 기존 accessToken·refreshToken도 변경하지 않습니다. 다른 사람 풀이·질문 등 준비 중인 화면은 그대로입니다.

데이터 흐름 검증: `node scripts/check-demo.mjs`.

## 실행

```sh
pnpm install
pnpm dev
pnpm build
```

## 구조

- `src/domains/*/domain`: 학습 활동, 퀘스트, 랭크, 공지의 타입과 순수 규칙.
- `src/domains/*/presentation`: 각 도메인의 화면 컴포넌트.
- `src/pages/home`: 홈 화면 조합 및 배너 캐러셀.
- `src/pages/home/infrastructure/homeFixture.ts`: 피그마 시안 데이터 어댑터. API 연결 시 교체.
- `src/shared/ui`: 공통 레이아웃, 이미지, 접근성을 지원하는 미리보기 대화상자.
- `public/images/home`: Figma에서 내려받은 원본 에셋.

도메인 계층은 React, API, 이미지 경로에 의존하지 않습니다. API 및 실제 사용 사례가 추가되면 각 도메인의 application/infrastructure 계층을 확장합니다.

## 퍼블리싱 범위

[Figma 홈 화면](https://www.figma.com/design/Qg8Daah5ZuWAUZawMY4j3k?node-id=440-193)의 배너, 연속 풀이, 퀘스트, 활동 히트맵, 공지, 랭크, 푸터를 구현했습니다. 1920px 시안을 기준으로 태블릿/모바일 배치를 추가했습니다.

배너 선택, 공지 목록, 랭크 단계 대화상자를 사용할 수 있습니다. 다른 메뉴와 문제 풀기 화면은 준비 중 안내를 표시합니다. 사용자 수치, 퀘스트 타이머, 활동 히트맵, 공지 및 팀 프로필은 정적인 시안 데이터이며 서버와 연결되지 않았습니다. 시안의 연속 풀이 10일과 안내 문구의 13일 표기는 원본 그대로 유지했습니다.

본문은 Noto Sans KR, 배너는 Black Han Sans를 Google Fonts에서 불러옵니다. 네트워크 연결이 없으면 시스템 sans-serif 글꼴을 사용합니다.


## 랭킹 페이지

`/ranking`에서 확인할 수 있습니다. 헤더 랭킹 메뉴와 홈의 랭크 전체 버튼이 연결되어 있습니다.

- `src/domains/ranking/domain/leaderboard.ts`: 사용자, 기준/기간 타입, 정렬 규칙 및 랭크 기준.
- `src/domains/ranking/application/getLeaderboard.ts`: 상위 3명과 랭킹 목록 구성.
- `src/domains/ranking/infrastructure/leaderboardFixture.ts`: 기간별 퍼블리싱 목업 데이터.
- `src/domains/ranking/presentation`: 시상대, 전체 목록, 내 순위 및 랭크 단계.
- `src/pages/ranking`: 화면 조합과 필터 상태.

기본 XP/주간 화면은 Figma `660:2951` 시안 데이터입니다. 다른 기준과 기간은 UI 동작 확인용 목업입니다. 갱신 시간과 내 순위 정보는 정적 시안 값이며, 서버 타이머 및 실제 랭킹 API는 연결하지 않았습니다. 헤더의 정일웅과 목록의 김민서 표기는 각 시안 원문을 유지했습니다.


## 문제 목록

`/problems`에서 확인할 수 있습니다. 문제 메뉴를 통해 홈/랭킹 페이지와 이동할 수 있습니다.

- `domains/problem/domain`: 문제와 필터 타입, 검색·조건 조합·정렬 순수 규칙, 저장소 인터페이스.
- `domains/problem/application`: 저장소에서 목록을 받아 필터와 페이지 적용.
- `domains/problem/infrastructure`: Figma 목록 10개, 추천 4개, 친구 활동 4개의 목업 데이터.
- `domains/problem/presentation`: 추천/친구 카드, 필터, 범위 입력, 표.
- `pages/problems`: 화면 조합, 검색 제출, 정렬/필터/페이지 상태.

검색과 복합 필터(난이도, 분류 OR/AND, 해결 상태, 해결한 사람 수, 평균 시도), 정렬, 초기화가 동작합니다. 목록·추천·친구 카드에서 문제를 선택하면 구현된 문제 상세 화면으로 이동합니다.

전체 `1,284`개와 `65`페이지는 시안 메타데이터를 유지했습니다. 실제 로드된 목록은 시안의 1000~1009번 10개이며, 나머지 페이지는 빈 상태로 표시됩니다. 검색/필터 결과 개수는 해당 10개를 대상으로 계산합니다. 전체 목록과 페이지별 데이터는 API 연결 시 저장소 어댑터에서 교체해야 합니다.


## 문제 상세

`/problems/1287`은 Figma `444:1409`의 계단 오르기 상세 화면입니다. 본문, 규칙, 입출력, 예제, 통계, 친구 풀이, 난이도/제한 정보를 구현했습니다. 예제 복사는 브라우저 클립보드를 사용하며, 권한을 사용할 수 없으면 텍스트를 선택합니다.

퍼블리싱 확인을 위해 목록·추천·친구 활동과 홈 문제 배너는 구현된 계단 오르기 상세 화면으로 연결합니다. 친구 활동의 2579번은 번호를 유지하고, 다른 항목은 `/problems/1287`로 이동합니다. 경로 선택은 `domains/problem/presentation/problemDetailPath.ts`에서 관리합니다. 실제 문제별 상세 데이터 연결 전까지 사용하는 데모 이동이며, 등록되지 않은 문제 번호를 주소로 직접 입력하면 준비 중 화면을 표시합니다.

`domains/problem/domain/problemDetail.ts`에 상세 모델과 저장소 계약, `application/getProblemDetail.ts`에 ID 검증/조회, `infrastructure/problemDetailFixture.ts`에 시안 목업을 분리했습니다. `pages/problem-detail`에서 화면을 조합합니다. 풀이 작성 버튼은 풀이 제출 화면에 연결되어 있습니다. 채점·다른 사람 풀이 API는 연결하지 않았습니다.


## 풀이 제출

`/problems/1287/submit`에서 확인하며, 문제 상세의 풀이 작성하기 버튼으로 이동할 수 있습니다. 2579번 목업도 동일한 편집기 화면을 지원합니다.

- `domains/submission/domain`: 언어/탭 타입, 폰트 범위와 경과 시간 표시 규칙.
- `domains/submission/infrastructure`: Python 3, JavaScript, C++17 초기 코드.
- `domains/submission/presentation`: CodeMirror 6 편집기, 문제 패널, 탭과 예제 복사. `editorConfig.ts`에서 확장·단축키·언어 로딩을 구성하고 `CodeEditor.styles.ts`에서 Emotion과 공통 색상 토큰으로 외관을 정의합니다.
- `pages/submission`: 언어별 코드 상태, 콘솔, 테스트 입력, 너비 조절, 라우팅 조합.

Python·JavaScript·C++의 구문 강조와 자동 완성, 줄 번호·현재 줄 표시·코드 접기·괄호 자동 닫기·괄호 짝 표시·검색/바꾸기를 지원합니다. Tab은 공백 4칸 들여쓰기, Shift+Tab은 내어쓰기이며, Escape 다음 Tab으로 편집기 밖으로 이동합니다. Ctrl/Cmd+F로 검색하고 Ctrl/Cmd+Z로 실행 취소, Ctrl+Y 또는 Ctrl/Cmd+Shift+Z로 다시 실행합니다. 검색 패널은 한국어로 표시합니다.

언어를 바꿔도 각 언어의 코드·커서·실행 취소 기록을 유지합니다. 폰트 10~24px 조절과 현재 언어의 코드 초기화는 기존 툴바에 연결했습니다. 편집기와 언어 지원은 지연 로딩하고, 언어 로딩이 늦게 완료되어도 다른 언어의 설정을 덮어쓰지 않습니다. 패널 분할은 마우스 드래그 또는 방향키로 조절합니다. 모바일은 패널을 세로로 배치합니다. 풀이 시간은 시안의 12:34에서 시작하는 데모 타이머이며, 코드와 편집 기록은 현재 화면의 메모리에만 유지됩니다.

문제/제출 기록/질문 탭, 실행 결과/테스트케이스 탭을 전환할 수 있습니다. 테스트 입력을 수정할 수 있고, 기본 예제를 사용할 때만 예제 예상 출력을 표시합니다. 실제 코드 실행·제출·채점 서버가 연결되지 않았으므로 코드 실행 버튼은 준비 중 안내를 표시합니다. 실행 성공이나 정답 결과를 생성하지 않습니다. 이전/다음 문제, 제출 기록과 질문은 준비 중 상태입니다.

## 채점 결과 — 정답

`/problems/1287/result`에서 Figma `446:1606`의 정답 결과 화면을 확인할 수 있습니다. 기존 축소한 데스크톱 크기에 맞춰 축하 캐릭터, XP/실행 시간/연속 풀이, 등급 성장과 버튼을 구현했습니다. 모바일에서는 성장 영역과 버튼이 화면 너비에 맞춰 배치됩니다.

`domains/submission/domain/judgement.ts`에 결과 모델과 저장소 계약, `application/getAcceptedJudgement.ts`에 조회, `infrastructure/judgementFixture.ts`에 시안 데이터를 분리했습니다. 1287번과 2579번만 목업을 지원하고 다른 번호는 결과 준비 중 화면입니다. 실제 채점이나 XP 지급 없이 시안의 +20 XP, 36ms, 13일을 표시합니다. 제출 편집기의 코드 실행 버튼은 이 목업 결과를 생성하지 않습니다.

‘다음 문제 풀기’는 다음 문제를 선택할 수 있는 문제 목록으로 이동합니다. ‘다른 사람 풀이 보기’는 준비 중 안내를 표시합니다.

## 채점 결과 — 오답

`/problems/1287/result/wrong`에서 Figma `446:1788`의 오답 화면을 확인합니다. 오답 캐릭터, 37% 진행 상태, 제출 정보, 언어/실행 시간/메모리/코드 길이, 힌트와 재도전 XP 안내를 구현했습니다. ‘문제 다시 보기’는 해당 문제 상세로, ‘코드 고치러 가기’는 해당 문제 편집기로 이동합니다. 2579번도 동일한 목업을 지원하며 다른 번호는 준비 중 화면입니다.

오답 모델/저장소 계약은 `domain/judgement.ts`, 조회는 `application/getWrongJudgement.ts`, 시안 데이터는 `infrastructure/judgementFixture.ts`에 분리했습니다. 제출 번호와 진행률, 코드 길이는 시안 목업이며 실제 채점 결과가 아닙니다. 실행 시간과 메모리가 없는 상태는 `—`로 표시합니다. 실제 제출/채점 서버와 코드 보존은 연동 전입니다.

## 랭크 업 모달

`/?modal=rank-up`에서 Figma `448:1812`의 랭크 업 모달을 확인합니다. 홈 위에 원본 메달 아트, 5m → 10m 전환, 금죽까지 1,400 XP 안내를 표시합니다. ‘계속하기’, Escape 또는 배경 클릭으로 닫으며, ‘랭킹에서 확인하기’는 `/ranking`으로 이동합니다. 닫을 때 `modal` 쿼리만 제거하고 다른 쿼리는 유지합니다.

`domains/ranking/domain/rankPromotion.ts`에 승급 모델, `infrastructure/rankPromotionFixture.ts`에 시안 데이터, `presentation/RankUpDialog.tsx`에 재사용 가능한 모달을 분리했습니다. 브라우저 기본 모달로 배경 조작을 차단하고 스크롤 잠금/해제와 포커스 복원을 처리합니다. 작은 화면에서는 너비를 조절하고 높이가 부족하면 모달 내부를 스크롤합니다. 실제 승급 이벤트나 계정 XP 변경은 연동하지 않았습니다.

## 연속 풀이 모달

`/?modal=streak`에서 Figma `448:2046`의 연속 풀이 축하 모달을 확인합니다. 불꽃 아트, 13일 연속 풀이, 이번 주 요일별 달성 상태, 최장 기록 31일까지 18일 남은 안내를 구현했습니다. 시안 목업이며 실제 날짜나 사용자 기록은 반영하지 않습니다.

`domains/activity/domain/streakMilestone.ts`에 기록 모델과 남은 일수 계산, `infrastructure/streakMilestoneFixture.ts`에 목업, `presentation/StreakDialog.tsx`에 화면을 분리했습니다. `shared/ui/CelebrationDialog.tsx`의 기본 모달·스크롤 잠금·포커스 복원을 랭크 업과 공유합니다. ‘계속하기’, Escape, 배경 클릭으로 닫으며 다른 쿼리는 유지합니다.

‘공유하기’는 Web Share API를 지원하면 기기 공유 창을 열고, 미지원 시 공유 문구를 클립보드에 복사합니다. 복사도 사용할 수 없으면 선택·복사할 수 있는 문구를 모달에 표시합니다. 실제 공유 대상 선택과 전송은 사용자가 수행합니다.

## 화면 밀도

각 컴포넌트의 `*.styles.ts`에서 701px 이상 데스크톱의 화면 밀도를 조정합니다. 콘텐츠 최대 폭은 1280px, 헤더는 60px, 홈 배너는 최대 756×294px입니다. 큰 제목·이미지·카드 여백·모달을 줄이고 본문과 코드 글자는 유지합니다. 제출 화면은 1101px 이상에서 두 패널 높이를 화면 높이에 맞추고 내부를 스크롤합니다. 모바일은 기존 배치를 사용합니다.

## 공통 컴포넌트

`/components`에서 Figma `439:5`의 컴포넌트 보드를 확인합니다. Primary/Secondary/Danger 버튼의 기본·호버·눌림·포커스·비활성 상태, 관계 상태 4종, 크기 2종의 0~100% 진행 바, 대나무 아트, 난이도 칩 5종, 헤더 선택 상태 4종, 푸터, 홈 배너 3종, 아바타, 양방향 범위 슬라이더와 프로필 카드를 제공합니다. 미리보기 경로는 지연 로딩합니다.

일반 UI는 `shared/ui`, 난이도 칩은 `domains/problem/presentation`, 프로필 모델·시안 데이터·카드는 `domains/member`에 둡니다. `Button`은 `variant`, `disabled`와 표준 button props를 받고 `previewState`는 상태 전시용입니다. `ProgressBar`는 `value`, `max`, `size`, `label`을 받으며 범위를 벗어난 값을 보정합니다. `RangeSlider`는 `[최솟값, 최댓값]`을 받는 제어 컴포넌트로 키보드 조작과 양 끝값의 순서를 지원합니다. `StatusBadge`는 피그마 설명대로 클릭되지 않는 상태 표시입니다.

헤더·푸터는 `AppHeader`/`AppFooter`, 배너는 `HomeBanner`로 분리해 기존 화면과 전시 페이지가 같은 구현을 사용합니다. 아이콘·아바타·대나무는 원본 SVG를 사용하며, `BambooProgress`는 시안의 고정 일러스트입니다. 수치에 따라 변하는 진행도는 `ProgressBar`를 사용합니다. 프로필 수정과 소셜은 미리보기 안내만 표시하고 계정 데이터를 변경하지 않습니다.

## 컬러 시스템

Figma `686:3943`의 원본 팔레트와 의미 토큰을 `shared/styles/colors.ts`에 등록하고, `theme.colors`에 연결했습니다. `palette`는 의미 토큰을 정의할 때 참조하고, 화면에서는 `colors.background.normal`, `colors.label.alternative`, `colors.primary.normal` 또는 `theme.colors`의 동일한 경로를 사용합니다. 기존 단일 이름 `green`, `orange`, `surface` 등은 제거했습니다. 친구 카드의 추가 배경색은 시안에 맞춰 `friendCard` 그룹으로 관리합니다.

문제 목록의 친구 카드 상단은 합성 이미지 대신 CSS 배경·공통 Avatar·개별 랭크 메달을 조합합니다. 친구 데이터의 `tone`과 `tier`를 사용하므로 배경과 메달을 각각 바꿀 수 있습니다. 기존 `friend-*.svg` 합성 이미지 4개는 제거했습니다.

기본 액션은 `primary.normal`, 강조·호버는 `primary.strong`, 눌림은 `primary.heavy`, 주 액션 위 문구는 `label.onPrimary`를 사용합니다. 상태·스트릭·난이도·풀이 활동·배너·진행도도 해당 의미 그룹을 참조합니다. 배너의 흰색 88% 문구와 검정 28% 배경은 원본 색과 불투명도를 조합합니다. 시안에서 별도 팔레트를 정의하지 않은 메달 아트·코드 구문 강조색은 기존 표현을 유지합니다.

`/components/colors`에서 Semantic과 Primitives를 확인할 수 있고 `/components`에서 이동할 수 있습니다. 색상표는 실제 토큰을 렌더링하므로 테마 값의 수정이 함께 반영됩니다.

## 코드 가독성

Prettier로 TS/TSX의 들여쓰기·따옴표·JSX 줄바꿈을 통일합니다. `pnpm format`으로 정리하고 `pnpm format:check`로 형식을 검사합니다. 기본 줄 길이는 100자, 들여쓰기는 공백 2칸입니다. JSX에는 짧은 이벤트 연결을 두고, 여러 단계의 처리는 이름 있는 함수로 분리합니다. 복합 조건은 의미를 드러내는 변수로 나누고 반복되는 설정은 컴포넌트 밖의 상수로 둡니다.

객체형 props는 `PreviewDialogProps`처럼 컴포넌트 이름이 드러나는 별도 `interface`로 선언합니다. 스타일 props도 별도 interface를 사용합니다. 선택지·상태 조합을 나타내는 유니온은 `type`으로 표현합니다. import·타입·컴포넌트 선언 사이를 빈 줄로 구분하고, ref와 범위 값은 대상과 역할을 알 수 있는 이름을 사용합니다.

모달의 열기·닫기, 배경 클릭, 스크롤 잠금과 포커스 복원은 `shared/hooks/useModalDialog.ts`로 공유합니다. 공통 제목 배치·보조 텍스트·화면 읽기 전용 스타일의 중복 선언은 `shared/ui/primitives.styles.ts`에서 함께 관리합니다.

## 스타일 작성 규칙

전체 UI는 `@emotion/styled`로 작성합니다. 300자 이하의 짧은 스타일은 컴포넌트 파일에 합치고 컴포넌트 선언 아래에 배치합니다. 긴 스타일은 화면 컴포넌트 옆의 `*.styles.ts`에 이름 있는 styled 컴포넌트로 분리합니다. 선택·완료·잠금·캐러셀 위치·순위·구문 색상 등의 변형은 `$selected`, `$complete`, `$locked`, `$position`, `$place`, `$kind` 같은 타입이 지정된 props로 전달합니다. 범위 값·분할 너비·편집기 글자 크기도 styled props를 사용하며 JSX의 `className`이나 인라인 스타일로 상태를 조합하지 않습니다.

로컬 스타일은 `import * as S from './Component.styles'`로 가져와 `S.Card`, `S.Title`, `S.Toolbar`처럼 사용합니다. `Styled`나 파일명과 겹치는 도메인 접두사를 반복하지 않습니다. 공통 스타일은 `UI.Muted`, `UI.Heading`처럼 구분합니다.

공통 색상은 `shared/styles/theme.ts`와 `ThemeProvider`에서 관리합니다. `GlobalStyles`는 리셋, 기본 글꼴과 반응형 화면 토큰만 담당합니다. 기존 CSS 파일은 제거했고 축소/반응형 규칙은 해당 컴포넌트 스타일로 이동했습니다. 이미지 래퍼는 표준 img props를 전달해 `styled(Asset)` 조합을 지원합니다. 교차 컴포넌트 선택자는 Emotion 컴포넌트 참조와 안정적인 target 메타데이터를 사용해 별도 Babel 플러그인 없이 동작합니다.

`npm run build`로 타입 검사와 번들 생성을 확인합니다. 현재 설치된 TypeScript 7.0.2를 typescript-eslint 8.72.1이 지원하지 않아 `npm run lint`는 소스 검사 전에 중단됩니다. 린트 검증에는 호환되는 TypeScript/ESLint 구성이 필요합니다.
