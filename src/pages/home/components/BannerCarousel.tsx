import * as S from './BannerCarousel.styles';
import { useState } from 'react';
import { Asset } from '../../../shared/ui/Asset';

const banners = [
  {
    id: 'recommend',
    eyebrow: '풀기 전 잠깐 멈춰!',
    title: '나에게 딱 맞는',
    highlight: '오늘의 추천 문제',
    pill: '~ 26.11.30',
  },
  {
    id: 'hot',
    eyebrow: '오늘 가장 많이 푼 문제는?',
    title: '1287. 계단 오르기',
    highlight: '2,431명 도전 중!',
    pill: '매일 자정 갱신',
  },
  {
    id: 'live',
    eyebrow: '매일 푸는 건 실력이란 뜻',
    title: '오늘도',
    highlight: '1,284명 풀이 중',
    pill: '실시간 집계',
  },
] as const;

interface BannerCarouselProps {
  onProblem: (title: string) => void;
}

export function BannerCarousel({ onProblem }: BannerCarouselProps) {
  const [active, setActive] = useState(0);
  return (
    <S.Hero aria-label="추천 소식" aria-roledescription="캐러셀">
      <S.Stage>
        {banners.map((banner, index) => {
          const position =
            index === active ? 'active' : index === (active + 1) % 3 ? 'next' : 'previous';
          const handleClick = () => {
            if (position !== 'active') {
              setActive(index);
              return;
            }
            onProblem(banner.id === 'recommend' ? '1912. 연속합' : banner.title);
          };
          return (
            <HomeBanner
              key={banner.id}
              variant={banner.id}
              position={position}
              onClick={handleClick}
            />
          );
        })}
      </S.Stage>
      <S.Dots role="group" aria-label="배너 선택">
        {banners.map((banner, index) => (
          <S.Dot
            key={banner.id}
            onClick={() => setActive(index)}
            aria-label={`${index + 1}번 배너: ${banner.highlight}`}
            aria-pressed={active === index}
            $selected={active === index}
          />
        ))}
      </S.Dots>
    </S.Hero>
  );
}

interface HomeBannerProps {
  variant: (typeof banners)[number]['id'];
  position?: 'active' | 'next' | 'previous';
  onClick: () => void;
}

export function HomeBanner({ variant, position = 'active', onClick }: HomeBannerProps) {
  const banner = banners.find((item) => item.id === variant)!;
  return (
    <S.Banner
      $variant={banner.id}
      $position={position}
      tabIndex={position === 'active' ? 0 : -1}
      aria-hidden={position !== 'active'}
      aria-label={`${banner.title} ${banner.highlight}`}
      onClick={onClick}
    >
      <S.Art>
        <Asset name={`${banner.id}-deco.svg`} />
        {banner.id !== 'hot' ? (
          <Asset name={`${banner.id}-mascot.png`} />
        ) : (
          <>
            <Asset name="hot-yellow.svg" />
            <Asset name="hot-cyan.svg" />
            <S.YellowTag>
              <small>TODAY</small>HOT 문제
            </S.YellowTag>
            <S.CyanTag>
              <small>정답 보상</small>+20 XP
            </S.CyanTag>
          </>
        )}
      </S.Art>
      <S.Copy>
        <S.Eyebrow>{banner.eyebrow}</S.Eyebrow>
        <strong>
          {banner.title}
          <br />
          <em>{banner.highlight}</em>
        </strong>
      </S.Copy>
      <S.Pill>{banner.pill}</S.Pill>
      {banner.id === 'recommend' && (
        <S.Board>
          <span>오늘의 추천 문제</span>
          <strong>1912. 연속합</strong>
        </S.Board>
      )}
    </S.Banner>
  );
}
