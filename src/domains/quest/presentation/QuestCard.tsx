import * as S from './QuestCard.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import { questProgress, type Quest } from '../domain/quest';
import { Asset } from '../../../shared/ui/Asset';

const questIcons: Record<string, string> = {
  solve: 'water-cup.svg',
  xp: 'xp.svg',
  difficulty: 'water-bottle.svg',
};

interface QuestCardProps {
  quests: Quest[];
}

export function QuestCard({ quests }: QuestCardProps) {
  return (
    <S.Card aria-labelledby="quest-title">
      <UI.Heading>
        <h2 id="quest-title">오늘의 퀘스트</h2>
        <S.Timer>
          <Asset name="clock.svg" />
          14시간 남음
        </S.Timer>
      </UI.Heading>
      <S.s>
        {quests.map((quest) => {
          const complete = quest.current >= quest.target;
          return (
            <li key={quest.id}>
              <Asset name={questIcons[quest.id]} />
              <S.Name>{quest.title}</S.Name>
              <S.Progress
                $complete={complete}
                role="progressbar"
                aria-label={quest.title}
                aria-valuenow={quest.current}
                aria-valuemin={0}
                aria-valuemax={quest.target}
                $progress={`${questProgress(quest)}%`}
              >
                <S.Fill />
                <span>{complete ? '완료!' : `${quest.current} / ${quest.target}`}</span>
              </S.Progress>
              <Asset name={complete ? 'chest-open.svg' : 'chest.svg'} />
            </li>
          );
        })}
      </S.s>
    </S.Card>
  );
}
