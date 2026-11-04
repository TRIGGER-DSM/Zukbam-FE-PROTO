import { Link } from 'react-router';
import { colors, palette } from '../../shared/styles/colors';
import * as S from './ColorsPage.styles';

const display = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/level(\d)/, 'level-$1');

const references = new Map(
  Object.entries(palette).flatMap(([group, values]) =>
    Object.entries(values).map(
      ([step, value]) => [value as string, `${display(group)}/${step}`] as const,
    ),
  ),
);

const description = (value: string) =>
  value === colors.banner.sub
    ? '#FFFFFF · 88%'
    : value === colors.banner.pill
      ? '#000000 · 28%'
      : `${references.get(value) ?? ''} ${value}`;

export default function ColorsPage() {
  return (
    <S.Root>
      <S.Main id="main">
        <S.Header>
          <h1>컬러 시스템</h1>
          <p>
            Semantic(다크 전용)은 화면에서 실제로 쓰는 이름이에요. 값은 모두 Primitives를 참조해요.
          </p>
          <Link to="/components">컴포넌트 보기 →</Link>
        </S.Header>
        <S.Title>
          <h2>Semantic</h2>
          <p>화면에서는 이 토큰만 사용해요. 값은 Primitives를 참조해요.</p>
        </S.Title>
        {Object.entries(colors).map(([group, values]) => (
          <S.Group key={group} aria-label={`Semantic ${group}`}>
            <h3>{group}</h3>
            <S.Grid>
              {Object.entries(values).map(([name, value]) => (
                <S.Swatch key={name}>
                  <S.Sample $color={value} aria-label={`${group}/${display(name)} ${value}`} />
                  <strong>{display(name)}</strong>
                  <span>{description(value)}</span>
                </S.Swatch>
              ))}
            </S.Grid>
          </S.Group>
        ))}
        <S.Title>
          <h2>Primitives</h2>
          <p>원본 색 팔레트예요. 화면에 직접 쓰지 않고 Semantic이 참조해요.</p>
        </S.Title>
        {Object.entries(palette).map(([group, values]) => (
          <S.Group key={group} aria-label={`Primitives ${display(group)}`}>
            <h3>{display(group)}</h3>
            <S.Grid>
              {Object.entries(values).map(([step, value]) => (
                <S.Swatch key={step}>
                  <S.Sample $color={value} aria-label={`${display(group)}/${step} ${value}`} />
                  <strong>
                    {display(group)}/{step}
                  </strong>
                  <span>{value}</span>
                </S.Swatch>
              ))}
            </S.Grid>
          </S.Group>
        ))}
      </S.Main>
    </S.Root>
  );
}
