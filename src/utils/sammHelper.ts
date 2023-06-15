import { incentiveEfficiencyVsUniswapV2 } from "./uniHelpers";

const total = 5.66;
const assetNumber = 2;

function univ2Inverse(x: number, D: number, N: number): number {
  if (x <= 0) return 0;

  return Math.pow(D, 2) / (x * Math.pow(N, 2));
}

function hermesInverse(x: number, D: number, N: number): number {
  if (x <= 0) return 0;

  const root = Math.pow(
    Math.sqrt(
      4 * Math.pow(x, 8) +
        27 * Math.pow(D, 2 * (N + 2)) * Math.pow(N, 2 * (-N - 1))
    ) /
      (2 * Math.pow(3, 3 / 2) * x) +
      Math.pow(D, N + 2) / (2 * Math.pow(N, N + 1) * x),
    1 / 3
  );

  return root - Math.pow(x, 2) / (3 * root);
}

function inverseVolatileAMM(price: number): number {
  return univ2Inverse(price, total, assetNumber);
}

function inverseStableAMM(price: number): number {
  return hermesInverse(price, total, assetNumber);
}

function liquidityDifference(
  inverseFunction: (price: number) => number,
  priceUpper: number
): number {
  return inverseFunction(priceUpper);
}

function efficiencyRatio(priceUpper: number): number {
  const liquidityDiffVolatileAMM = liquidityDifference(
    inverseVolatileAMM,
    priceUpper
  );
  const liquidityDiffStableAMM = liquidityDifference(
    inverseStableAMM,
    priceUpper
  );

  return Math.abs(liquidityDiffVolatileAMM / liquidityDiffStableAMM);
}

export function incentiveEfficiencyVssAMM(
  feeTier: number,
  minWidth: number,
  priceUpper: number
): number {
  const efficiencyStableAMM = efficiencyRatio(priceUpper);

  const efficiencyVolatileAMM = incentiveEfficiencyVsUniswapV2(
    feeTier,
    minWidth,
    priceUpper
  );

  return efficiencyVolatileAMM / efficiencyStableAMM;
}
