'use client';

import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

import styled from '@emotion/styled';

const StyledCurrencyInput = styled(CurrencyInput)`
  border-radius: 12px;
  border: 1px solid rgba(16, 16, 16, 1);
  height: 40px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &&:focus-visible {
    outline: unset;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

export const InputCurrency = (props: CurrencyInputProps) => {
  return <StyledCurrencyInput decimalSeparator="." groupSeparator="," decimalsLimit={9} {...props} />;
};
