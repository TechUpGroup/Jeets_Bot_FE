import { appConfig } from '@/config';

export function formatAddress(address: string | undefined, first = 4, last = 4) {
  return address ? address.slice(0, first) + '...' + address.slice(-last) : '';
}

export const solanaAddress = appConfig.isSolanaMainnet
  ? {
      launchpad: '',
      asg: '',
      accel: '',
      usdc: '',
      authority: '',
    }
  : {
      launchpad: 'BU8cGWixCVPhhJ64UtCSsMHTk1eA8pamjjTdmriwWmHG',
      asg: 'FiHGhC3YXNGSUUbVE6M6FtjLS4jdBi9n9wQzhXxwDgXf',
      accel: 'FKqFBTQLjxKXrAKRc8GKDGRz8tHerZnmoowMky2GjFp5',
      usdc: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
      authority: '5FKTCdrAZ9GZfMh2ALTg76DEXx4BoF1XpdCVCLGLBqMt',
    };
