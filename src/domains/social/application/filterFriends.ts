import type { Friend } from '../domain/friend';

export function filterFriends<T extends Pick<Friend, 'id' | 'name'>>(
  friends: T[],
  query: string,
): T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return friends.filter(
    (friend) =>
      friend.name.toLocaleLowerCase().includes(normalizedQuery) ||
      friend.id.includes(normalizedQuery),
  );
}
