import * as S from './BannerCarousel.styles';
import { useRef, useState, type PointerEvent } from 'react';
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

const dragStartThreshold = 6;
const slideChangeThreshold = 50;

interface BannerCarouselProps {
  onProblem: (title: string) => void;
}

interface DragStart {
  pointerId: number;
  clientX: number;
  clientY: number;
}

export function BannerCarousel({ onProblem }: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef<DragStart | null>(null);
  const didDrag = useRef(false);

  function moveSlide(direction: number) {
    setActiveIndex((index) => (index + direction + banners.length) % banners.length);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    didDrag.current = false;
    const { pointerId, clientX, clientY } = event;
    dragStart.current = { pointerId, clientX, clientY };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const distanceX = event.clientX - start.clientX;
    const distanceY = event.clientY - start.clientY;
    const stage = event.currentTarget;

    if (!didDrag.current) {
      const horizontalDistance = Math.abs(distanceX);
      const verticalDistance = Math.abs(distanceY);
      if (verticalDistance > dragStartThreshold && verticalDistance >= horizontalDistance) {
        dragStart.current = null;
        return;
      }
      if (horizontalDistance <= dragStartThreshold) return;
      didDrag.current = true;
      stage.setPointerCapture(event.pointerId);
      stage.dataset.dragging = '';
    }

    stage.style.setProperty('--drag-offset', `${distanceX}px`);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    dragStart.current = null;
    const stage = event.currentTarget;
    delete stage.dataset.dragging;
    stage.style.removeProperty('--drag-offset');

    const distanceX = event.clientX - start.clientX;
    if (
      event.type === 'pointerup' &&
      didDrag.current &&
      Math.abs(distanceX) >= slideChangeThreshold
    ) {
      moveSlide(distanceX < 0 ? 1 : -1);
    }
  }

  return (
    <S.Hero
      aria-label="추천 소식"
      aria-roledescription="캐러셀"
      onKeyDown={(event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        moveSlide(event.key === 'ArrowRight' ? 1 : -1);
      }}
    >
      <S.Stage
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={(event) => {
          if (event.target === event.currentTarget) finishDrag(event);
        }}
        onPointerLeave={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) finishDrag(event);
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!didDrag.current || event.detail === 0) return;
          event.preventDefault();
          event.stopPropagation();
          didDrag.current = false;
        }}
      >
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;
          const isNext = index === (activeIndex + 1) % banners.length;
          const sidePosition = isNext ? 'next' : 'previous';
          const position = isActive ? 'active' : sidePosition;
          const handleClick = () => {
            if (!isActive) {
              setActiveIndex(index);
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
            onClick={() => setActiveIndex(index)}
            aria-label={`${index + 1}번 배너: ${banner.highlight}`}
            aria-pressed={activeIndex === index}
            $selected={activeIndex === index}
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
  const isHot = variant === 'hot';
  const Copy = isHot ? S.HotCopy : S.Copy;
  const Pill = isHot ? S.HotPill : S.Pill;
  return (
    <S.Banner
      $variant={banner.id}
      $position={position}
      tabIndex={position === 'active' ? 0 : -1}
      aria-hidden={position !== 'active'}
      aria-label={`${banner.title} ${banner.highlight}`}
      onClick={onClick}
    >
      {isHot ? (
        <S.HotArt aria-hidden="true">
          <Asset name="hot-deco.svg" />
          <Asset name="hot-yellow.svg" />
          <Asset name="hot-cyan.svg" />
          <S.Tag $slot="today">TODAY</S.Tag>
          <S.Tag $slot="hot">HOT 문제</S.Tag>
          <S.Tag $slot="reward">정답 보상</S.Tag>
          <S.Tag $slot="xp">+20 XP</S.Tag>
        </S.HotArt>
      ) : (
        <S.Art>
          <Asset name={`${banner.id}-deco.svg`} />
          <Asset
            name={`${banner.id}-mascot.png`}
            sizes="(max-width: 700px) calc(100vw - 2rem), (max-width: 1365px) 68vw, 928px"
            loading={position === 'active' ? 'eager' : 'lazy'}
            fetchPriority={position === 'active' ? 'high' : 'low'}
          />
        </S.Art>
      )}
      <Copy>
        <S.Eyebrow>{banner.eyebrow}</S.Eyebrow>
        <strong>
          <span>{banner.title}</span>
          {!isHot && <br />}
          <em>{banner.highlight}</em>
        </strong>
      </Copy>
      <Pill>{banner.pill}</Pill>
      {banner.id === 'recommend' && (
        <S.Board>
          <span>오늘의 추천 문제</span>
          <strong>1912. 연속합</strong>
        </S.Board>
      )}
    </S.Banner>
  );
}
