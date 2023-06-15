import { incentiveEfficiencyVsUniswapV2 } from "./uniHelpers";

const total = 4.9 * 1e18;
const assetNumber = 2;

function univ2Inverse(x: number, D: number, N: number): number {
  if (x <= 0) return 0;

  return Math.pow(D, 2) / (x * Math.pow(N, 2));
}

function iroot(base: bigint, root: bigint) {
  let s = base + 1n;
  let k1 = root - 1n;
  let u = base;
  while (u < s) {
    s = u;
    u = (u * k1 + base / u ** k1) / root;
  }
  return s;
}

function hermesInverse(x: bigint, D: bigint, N: bigint): number {
  if (x <= BigInt(0)) return 0;

  const root = iroot(
    iroot(
      4n * x ** 8n + (27n * D ** (2n * (N + 2n)) * 1n) / N ** (2n * (N + 1n)),
      2n
    ) /
      BigInt(Math.floor(2 * 10.392304845 * Number(x))) +
      D ** (N + 2n) / (2n * N ** (N + 1n) * x),
    3n
  );

  return Number(root - x ** 2n / (3n * root));
}

function inverseVolatileAMM(price: number): number {
  return univ2Inverse(price * 1e18, total, assetNumber) / 1e18;
}

function inverseStableAMM(price: number): number {
  return (
    hermesInverse(
      BigInt(Math.floor(price * 1e18)),
      BigInt(total),
      BigInt(assetNumber)
    ) / 1e18
  );
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
