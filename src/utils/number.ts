import BigNumber from 'bignumber.js';

export const roundedNumber = (val: BigNumber) => {
  return BigNumber(val.toFixed(2, BigNumber.ROUND_DOWN));
};

export const format = (val: string) => {
  if (!val) return '';
  const num = BigNumber(val);
  if (num.isNaN()) return '';
  return roundedNumber(num).toFormat() + (val.endsWith('.') ? '.' : '');
};
export const parse = (val: string) => val.replace(/^\$/, '');
