export interface Quest {
  id: string;
  title: string;
  current: number;
  target: number;
}

export function questProgress(quest: Quest) {
  return Math.min(100, Math.max(0, (quest.current / quest.target) * 100));
}
