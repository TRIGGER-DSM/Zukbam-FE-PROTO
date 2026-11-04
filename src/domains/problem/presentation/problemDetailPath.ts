// Publishing preview: only the stair problem has a complete detail fixture.
// Keep its known IDs; show that published screen for the other catalogue entries.
export function problemDetailPath(problemId: number) {
  return `/problems/${problemId === 2579 ? 2579 : 1287}`;
}
