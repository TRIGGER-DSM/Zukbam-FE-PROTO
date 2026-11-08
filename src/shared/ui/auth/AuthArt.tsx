import * as S from './Auth.styles';

interface LanguageBadge {
  name: string;
  image: string;
  position: S.BadgePosition;
}

const languageBadges: LanguageBadge[] = [
  { name: 'Java', image: 'java.svg', position: 'java' },
  { name: 'C', image: 'c.png', position: 'c' },
  { name: 'Python', image: 'python.svg', position: 'python' },
  { name: 'C++', image: 'cpp.svg', position: 'cpp' },
  { name: 'JavaScript', image: 'javascript.svg', position: 'javascript' },
];

const imageDirectory = '/images/login';

interface AuthArtProps {
  className?: string;
}

export function AuthArt({ className }: AuthArtProps) {
  return (
    <S.Art className={className} aria-label="죽빰 소개">
      <S.Brand to="/" aria-label="죽빰 홈">
        <img src={`${imageDirectory}/wordmark.svg`} alt="" width="480" height="85" />
      </S.Brand>
      <S.Tagline>매일 한 문제, 대나무처럼 쑥쑥 코딩 실력을 키워보세요</S.Tagline>
      <S.Mascot src={`${imageDirectory}/mascot.png`} alt="" width="700" height="600" />
      {languageBadges.map(({ name, image, position }) => (
        <S.Badge key={position} $position={position}>
          <S.BadgeMark>
            <S.BadgeIcon $narrow={position === 'c'} src={`${imageDirectory}/${image}`} alt="" />
          </S.BadgeMark>
          {name}
        </S.Badge>
      ))}
    </S.Art>
  );
}
