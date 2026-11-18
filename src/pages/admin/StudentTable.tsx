import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';
import { Asset } from '../../shared/ui/Asset';
import { PreviewDialog } from '../../shared/ui/PreviewDialog';
import type { Student } from './dashboardData';

const columns = [
  { key: 'name', label: '학생' },
  { key: 'number', label: '학번' },
  { key: 'groups', label: '그룹' },
  { key: 'solved', label: '풀이 수' },
  { key: 'correct', label: '정답' },
  { key: 'wrong', label: '오답' },
  { key: 'rate', label: '정답률' },
  { key: 'minutesSinceSubmission', label: '최근 제출' },
] as const;

type SortKey = Exclude<(typeof columns)[number]['key'], 'groups'>;

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean }>({
    key: 'solved',
    descending: true,
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const sortedStudents = students.toSorted((first, second) => {
    const firstValue = first[sort.key];
    const secondValue = second[sort.key];
    const comparison =
      sort.key === 'minutesSinceSubmission'
        ? second.minutesSinceSubmission - first.minutesSinceSubmission
        : typeof firstValue === 'number'
          ? firstValue - Number(secondValue)
          : firstValue.localeCompare(String(secondValue), 'ko');
    return sort.descending ? -comparison : comparison;
  });

  function sortBy(key: SortKey) {
    setSort((previous) => ({
      key,
      descending: key === previous.key ? !previous.descending : !['name', 'number'].includes(key),
    }));
  }

  return (
    <>
      <Scroll role="region" aria-label="학생별 풀이 현황 표" tabIndex={0}>
        <Table>
          <thead>
            <tr>
              {columns.map(({ key, label }) => {
                if (key === 'groups')
                  return (
                    <th key={key} scope="col">
                      {label}
                    </th>
                  );
                const active = sort.key === key;
                return (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={active ? (sort.descending ? 'descending' : 'ascending') : undefined}
                  >
                    <SortButton type="button" onClick={() => sortBy(key)}>
                      {label}
                      <img
                        alt=""
                        width={16}
                        height={16}
                        src={active ? '/images/admin/sort-down.svg' : '/images/admin/sort.svg'}
                      />
                    </SortButton>
                  </th>
                );
              })}
              <th scope="col" aria-label="상세" />
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student) => (
              <tr key={student.number}>
                <th scope="row">
                  <Name>
                    <Asset name="avatar.svg" width={32} height={32} />
                    {student.name}
                  </Name>
                </th>
                <td>{student.number}</td>
                <td>
                  <Badges>
                    <span>{student.groups[0]}</span>
                    {student.groups.length > 1 && <span>+{student.groups.length - 1}</span>}
                  </Badges>
                </td>
                <td>
                  <strong>{student.solved}</strong>
                </td>
                <Correct>{student.correct}</Correct>
                <Wrong>{student.wrong}</Wrong>
                <td>{student.rate.toFixed(1)}%</td>
                <Recent>{student.lastSubmission}</Recent>
                <td>
                  <Detail
                    type="button"
                    aria-label={`${student.name} 상세`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    상세 <span aria-hidden="true">›</span>
                  </Detail>
                </td>
              </tr>
            ))}
            {sortedStudents.length === 0 && (
              <tr>
                <Empty colSpan={9}>조건에 맞는 학생이 없어요.</Empty>
              </tr>
            )}
          </tbody>
        </Table>
      </Scroll>
      {selectedStudent && (
        <PreviewDialog
          title={`${selectedStudent.name} 학생 풀이 현황`}
          onClose={() => setSelectedStudent(null)}
        >
          <p>
            {selectedStudent.number} · {selectedStudent.groups.join(', ')}
          </p>
          <p>
            풀이 {selectedStudent.solved}건 · 정답 {selectedStudent.correct}건 · 오답{' '}
            {selectedStudent.wrong}건
          </p>
          <p>
            정답률 {selectedStudent.rate.toFixed(1)}% · 최근 제출 {selectedStudent.lastSubmission}
          </p>
        </PreviewDialog>
      )}
    </>
  );
}

const Scroll = styled.div`
  overflow-x: auto;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1rem;
`;

const Table = styled.table`
  width: 100%;
  min-width: 730px;
  border-collapse: collapse;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding-inline: clamp(0.5rem, 0.63vw, 12px);
    text-align: left;
  }
  tr > :first-child {
    padding-left: clamp(0.75rem, 1.25vw, 24px);
    width: 18%;
  }
  tr > :nth-child(2) {
    width: 12%;
  }
  tr > :nth-child(3) {
    width: 15%;
  }
  tr > :nth-child(n + 4):nth-child(-n + 7) {
    text-align: right;
  }
  tr > :last-child {
    text-align: right;
    padding-right: clamp(0.75rem, 1.25vw, 24px);
  }
  thead {
    height: clamp(2.75rem, 2.5vw, 48px);
    background: ${colors.background.alternative};
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
  tbody tr {
    height: clamp(3.25rem, 3.33vw, 64px);
    border-top: 1px solid ${colors.line.alternative};
  }
`;

const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
  th[aria-sort] & {
    color: ${colors.label.strong};
  }
  th[aria-sort='ascending'] & img {
    transform: rotate(180deg);
  }
`;

const Name = styled.span`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const Badges = styled.span`
  display: inline-flex;
  gap: 0.375rem;
  color: ${colors.label.neutral};
  font-size: 0.875rem;
  font-weight: 700;
  > span {
    padding: 0.1875rem 0.625rem;
    border-radius: 0.5rem;
    background: ${colors.fill.normal};
  }
`;

const Correct = styled.td`
  color: ${colors.primary.normal};
`;
const Wrong = styled.td`
  color: ${colors.status.negative};
`;
const Recent = styled.td`
  color: ${colors.label.alternative};
`;

const Detail = styled.button`
  color: ${colors.primary.normal};
  font-size: 0.875rem;
  font-weight: 700;
`;

const Empty = styled.td`
  && {
    padding: 1rem;
    text-align: center;
    color: ${colors.label.alternative};
  }
`;
