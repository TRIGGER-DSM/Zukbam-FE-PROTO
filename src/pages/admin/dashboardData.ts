export interface Student {
  name: string;
  number: number;
  groups: string[];
  solved: number;
  correct: number;
  wrong: number;
  rate: number;
  lastSubmission: string;
  minutesSinceSubmission: number;
}

const classGroup = '1학년 3반';
const algorithmGroup = '알고리즘 스터디';
const codingGroup = '코딩 동아리';

export const groups = [classGroup, algorithmGroup, codingGroup];

export const students: Student[] = [
  {
    name: '박지훈',
    number: 1309,
    groups: [classGroup, algorithmGroup],
    solved: 86,
    correct: 71,
    wrong: 15,
    rate: 82.6,
    lastSubmission: '오늘 14:02',
    minutesSinceSubmission: 58,
  },
  {
    name: '최유진',
    number: 1321,
    groups: [classGroup],
    solved: 74,
    correct: 58,
    wrong: 16,
    rate: 78.4,
    lastSubmission: '오늘 09:41',
    minutesSinceSubmission: 319,
  },
  {
    name: '김민서',
    number: 1304,
    groups: [classGroup, algorithmGroup, codingGroup],
    solved: 61,
    correct: 42,
    wrong: 19,
    rate: 68.9,
    lastSubmission: '어제 21:16',
    minutesSinceSubmission: 1064,
  },
  {
    name: '한준호',
    number: 1325,
    groups: [classGroup],
    solved: 55,
    correct: 39,
    wrong: 16,
    rate: 71.2,
    lastSubmission: '어제 18:03',
    minutesSinceSubmission: 1257,
  },
  {
    name: '배지민',
    number: 1311,
    groups: [algorithmGroup, codingGroup],
    solved: 33,
    correct: 20,
    wrong: 13,
    rate: 60.1,
    lastSubmission: '3일 전',
    minutesSinceSubmission: 4320,
  },
  {
    name: '윤도현',
    number: 1317,
    groups: [classGroup],
    solved: 21,
    correct: 11,
    wrong: 10,
    rate: 52.4,
    lastSubmission: '5일 전',
    minutesSinceSubmission: 7200,
  },
];

export const weeklySubmissions = [
  { correct: 80, wrong: 40 },
  { correct: 95, wrong: 55 },
  { correct: 110, wrong: 55 },
  { correct: 98, wrong: 42 },
  { correct: 125, wrong: 55 },
  { correct: 120, wrong: 55 },
  { correct: 140, wrong: 60 },
  { correct: 150, wrong: 65 },
];
