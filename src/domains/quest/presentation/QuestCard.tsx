import * as S from './QuestCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { Quest } from '../domain/quest';
import { Asset } from '../../../shared/ui/Asset';
import { ProgressBar } from '../../../shared/ui/ProgressBar';

interface QuestArt {
  icon: string;
  reward: string;
}

const questArt: Record<string, QuestArt> = {
  solve: { icon: 'water-cup.svg', reward: 'quest-chest-gold.svg' },
  xp: { icon: 'xp.svg', reward: 'quest-chest-silver.svg' },
  difficulty: { icon: 'water-bottle.svg', reward: 'quest-chest-bronze.svg' },
};

interface QuestCardProps {
  quests: Quest[];
}

export function QuestCard({ quests }: QuestCardProps) {
  return (
    <S.Card aria-labelledby="quest-title">
      <UI.Heading>
        <S.Title>
          <h2 id="quest-title">오늘의 퀘스트</h2>
        </S.Title>
        <S.Timer>
          <Asset name="clock.svg" />
          14시간 남음
        </S.Timer>
      </UI.Heading>
      <S.List>
        {quests.map((quest) => {
          const art = questArt[quest.id] ?? questArt.solve;
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
                      quest.current >= quest.target ? '완료!' : `${quest.current} / ${quest.target}`
                    }
                  />
                  <S.Reward name={art.reward} />
                </S.Meter>
              </S.Details>
            </S.Item>
          );
        })}
      </S.List>
    </S.Card>
  );
}
