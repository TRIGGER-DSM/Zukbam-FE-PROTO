// The ranking frame is 1760px wide; its children inherit the responsive design unit.
export const rankingSize = (pixels: number) => `calc(${pixels} * var(--ranking-unit))`;

// Keep text and controls at 87.5% on 1440px screens and full size on 1920px screens.
export const rankingScale = (pixels: number) => `calc(${pixels} * var(--ranking-scale, 1px))`;
