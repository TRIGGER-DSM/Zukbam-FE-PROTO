import * as S from './QuestCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { Quest } from '../domain/quest';
import { Asset } from '../../../shared/ui/Asset';
import { ProgressBar } from '../../../shared/ui/ProgressBar';
import { useEffect, useState, type ReactNode } from 'react';
import { questResetTime } from '../infrastructure/questApi';

interface QuestArt {
  icon: string;
}

const questArt: Record<string, QuestArt> = {
  solve: { icon: 'water-cup.svg' },
  xp: { icon: 'xp.svg' },
  difficulty: { icon: 'water-bottle.svg' },
};

interface QuestCardProps {
  quests: Quest[];
  showPlaceholder?: boolean;
  resetAt?: string;
  pendingId?: string;
  onClaim?: (quest: Quest) => void;
  children?: ReactNode;
}

export function QuestCard({
  quests,
  showPlaceholder = false,
  resetAt,
  pendingId,
  onClaim,
  children,
}: QuestCardProps) {
  return (
    <S.Card aria-labelledby="quest-title">
      <UI.Heading>
        <S.Title>
          <h2 id="quest-title">오늘의 퀘스트</h2>
        </S.Title>
        {resetAt && <QuestTimer resetAt={resetAt} />}
      </UI.Heading>
      <S.List>
        {showPlaceholder
          ? Object.values(questArt).map((art) => (
              <S.Item key={art.icon}>
                <S.Icon name={art.icon} />
                <S.Details>
                  <strong>-</strong>
                  <S.Meter>
                    <ProgressBar value={0} label="0%" name="퀘스트 진행도" />
                    <S.Reward name="chest.svg" alt="닫힌 상자" $inactive />
                  </S.Meter>
                </S.Details>
              </S.Item>
            ))
          : quests.map((quest) => {
              const art =
                questArt[quest.id] ??
                (quest.difficulty === 'HARD'
                  ? questArt.difficulty
                  : quest.difficulty === 'NORMAL'
                    ? questArt.xp
                    : questArt.solve);
              const complete = quest.completed ?? quest.current >= quest.target;
              const rewardImage = quest.rewarded ? 'chest-open.svg' : 'chest.svg';
              const rewardAlt = quest.rewarded ? '열린 상자' : '닫힌 상자';
              return (
                <S.Item key={quest.id}>
                  <S.Icon name={art.icon} />
                  <S.Details>
                    <strong>{quest.title}</strong>
                    <S.Meter>
                      <ProgressBar
                        value={quest.current}
                        max={quest.target}
                        name={quest.title}
                        label={
                          pendingId === quest.id
                            ? '수령 중…'
                            : quest.rewarded
                              ? '수령 완료'
                              : complete
                                ? '보상 받기'
                                : `${quest.current} / ${quest.target}`
                        }
                      />
                      {onClaim && complete && !quest.rewarded ? (
                        <button
                          type="button"
                          onClick={() => onClaim(quest)}
                          disabled={Boolean(pendingId)}
                          aria-label={`${quest.title} 보상 받기`}
                          title={`${quest.rewardXp ?? 0} XP 받기`}
                        >
                          <S.Reward name={rewardImage} alt={rewardAlt} $claimable={!pendingId} />
                          <UI.HiddenText>
                            {pendingId === quest.id
                              ? '보상 수령 중'
                              : '상자를 눌러 보상을 받으세요'}
                          </UI.HiddenText>
                        </button>
                      ) : (
                        <S.Reward name={rewardImage} alt={rewardAlt} />
                      )}
                    </S.Meter>
                  </S.Details>
                </S.Item>
              );
            })}
      </S.List>
      {children}
    </S.Card>
  );
}

function QuestTimer({ resetAt }: { resetAt: string }) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const deadline = questResetTime(resetAt);
  if (!Number.isFinite(deadline)) return null;
  const minutes = Math.max(0, Math.ceil((deadline - now) / 60_000));
  const hours = Math.floor(minutes / 60);
  return (
    <S.Timer>
      <Asset name="clock.svg" />
      {hours ? `${hours}시간 ` : ''}
      {minutes % 60}분 남음
    </S.Timer>
  );
}
