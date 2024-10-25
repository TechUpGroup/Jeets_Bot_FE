'use client';

import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { FC } from 'react';

import { Tooltip } from '@chakra-ui/react';

type Value = string | number | undefined | null | BigNumber | bigint;

type Props = {
  value: Value;
  isWei?: boolean;
  decimalNumber?: number;
  rounded?: boolean;
  decimal?: number;
  isPositive?: boolean;
  roundingMode?: BigNumber.RoundingMode;
  isKmb?: boolean;
  prefix?: string;
  suffix?: string;
};

const getValue = (props: Props) => {
  const {
    value,
    isWei,
    rounded,
    decimal = 3,
    decimalNumber,
    isPositive,
    roundingMode = BigNumber.ROUND_FLOOR,
    isKmb,
    prefix,
    suffix,
  } = props;
  let valueShow = '---';
  let fullValue = '---';
  let isRounded = false;
  try {
    if (!isNil(value)) {
      const valueTemp = value instanceof BigNumber ? value.toFixed() : value.toString();
      const numberDecimal = isWei ? 6 : decimalNumber;
      const valTemp =
        numberDecimal !== undefined ? BigNumber(valueTemp).dividedBy(Math.pow(10, numberDecimal)) : valueTemp;
      let valueBig = BigNumber(valTemp);

      if (valueBig.isNaN()) {
        throw new Error();
      } else if (isPositive && valueBig.isNegative()) {
        // valueBig = valueBig.negated();
        valueBig = BigNumber(0);
      }
      const valueStr = valueBig.toFixed(decimal, roundingMode);
      valueShow = BigNumber(valueStr).toFormat();
      fullValue = valueBig.toFormat();
      isRounded = valueShow !== fullValue;

      if (isKmb) {
        if (valueBig.gte(1e9)) {
          valueShow = BigNumber(valueBig.dividedBy(1e9).toFixed(decimal)).toFixed() + 'B';
          isRounded = true;
        } else if (valueBig.gte(1e6)) {
          valueShow = BigNumber(valueBig.dividedBy(1e6).toFixed(decimal)).toFixed() + 'M';
          isRounded = true;
        } else if (valueBig.gte(1e3)) {
          valueShow = BigNumber(valueBig.dividedBy(1e3).toFixed(decimal)).toFixed() + 'K';
          isRounded = true;
        }
      }

      if (rounded) {
        if (valueBig.gt(10 ** 3)) {
          valueShow = '> 1,000';
          isRounded = true;
        } else if (valueBig.lt(10 ** -3)) {
          valueShow = '< 0.001';
          isRounded = true;
        }
      } else if (valueBig.gt(0) && valueBig.lt(BigNumber(10).pow(-decimal))) {
        valueShow = `< ${BigNumber(10).pow(-decimal).toFixed()}`;
        isRounded = true;
      }
    }
  } catch {
    valueShow = '---';
    fullValue = '---';
    isRounded = false;
  }
  return {
    value: `${prefix ?? ''}${valueShow}${suffix ?? ''}`,
    fullValue: `${prefix ?? ''}${fullValue}${suffix ?? ''}`,
    isRounded,
  };
};

export const Currency: FC<Props> = (props) => {
  const { value: valueShow, isRounded, fullValue } = getValue(props);
  if (!isRounded) return <>{valueShow}</>;
  return <Tooltip label={fullValue}>{valueShow}</Tooltip>;
};
