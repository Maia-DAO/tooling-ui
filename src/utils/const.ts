export const TICK_WIDTH = 0.01;
export const TICK_INCREMENT = 0.0001;
export const TICK_BASE = 1.0001;
export const MIN_TICK = -887272;
export const MAX_TICK = 887272;
export const MAX_RANGE = 2 ** 256;

export const MIN_UNIV2 = -6000;
export const MAX_UNIV2 = -MIN_UNIV2;

export const MIN_STABLE = -400;
export const MAX_STABLE = -MIN_STABLE;

export const YEAR = 31536000;

export const FEES_STRING = ["0.01%", "0.05%", "0.30%", "1.00%"];

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const FEE_STRING_TO_FEE_AMOUNT: { [fee: string]: FeeAmount } = {
  "0.01%": FeeAmount.LOWEST,
  "0.05%": FeeAmount.LOW,
  "0.30%": FeeAmount.MEDIUM,
  "1.00%": FeeAmount.HIGH,
};
