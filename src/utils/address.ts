import { appConfig } from '@/config';

export function formatAddress(address: string | undefined, first = 4, last = 4) {
  return address ? address.slice(0, first) + '...' + address.slice(-last) : '';
}

export const solanaAddress = appConfig.isSolanaMainnet ? {} : {};
