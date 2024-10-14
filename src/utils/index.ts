import BigNumber from 'bignumber.js';

import { appConfig } from '@/config';

export function getAssetUrl(src: unknown) {
  if (!appConfig.basePath) return src as string;
  return typeof src === 'string' && !src.startsWith('http') ? appConfig.basePath + src : (src as string);
}

export function getPercent(w1: number, w2: number) {
  return (w1 / w2) * 100 + '%';
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatUnits(value: BigNumber.Value, decimal: number) {
  try {
    return BigNumber(value).div(BigNumber(10).pow(decimal)).toFixed();
  } catch {
    return '';
  }
}

export const getTransactionHashUrl = (txsHash: string | undefined) => {
  if (!txsHash) return '';
  return `https://explorer.solana.com/tx/${txsHash}${!appConfig.isSolanaMainnet ? '?cluster=devnet' : ''}`;
};
