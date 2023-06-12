import { TICK_INCREMENT } from "./const";

/**
 * The default factory tick spacings by fee amount.
 */
export const FEE_TO_TICK_SPACING: { [fee: number]: number } = {
  100: 1,
  500: 10,
  3000: 60,
  10000: 200,
};

export function getLargerInTicks(
  tickSpacing: number,
  minWidth: number
): number {
  return Math.max(
    tickSpacing,
    Math.floor(minWidth / tickSpacing) * tickSpacing
  );
}

export function positionEfficiency(feeTier: number, minWidth: number): number {
  const tickSpacing = FEE_TO_TICK_SPACING[feeTier];
  return (
    1 /
    (1 -
      (1 / (1 + TICK_INCREMENT * getLargerInTicks(tickSpacing, minWidth))) **
        (1 / 4))
  );
}

export function convertBasedOnEfficiency(
  amount: number,
  feeTier: number,
  minWidth: number
): number {
  return (
    (amount * positionEfficiency(feeTier, 0)) /
    positionEfficiency(feeTier, minWidth)
  );
}

export function tickToPrices(tick: number): number {
  return 1.0001 ** tick;
}
