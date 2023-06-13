export const TICK_WIDTH = 0.01;
export const TICK_INCREMENT = 0.0001;
export const TICK_BASE = 1.0001;
export const MIN_TICK = -887272;
export const MAX_TICK = 887272;
export const MAX_RANGE = 2 ** 256;

export const YEAR = 31536000;

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}
