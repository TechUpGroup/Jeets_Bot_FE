'use client';

import {
  forwardRef,
  NumberInput as NumberInputChakra,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputProps,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const NumberInputFieldStyled = styled(NumberInputField)`
  &:not([aria-invalid='true']):not([data-invalid]):hover {
    border-color: initial;
  }
  &:focus {
    border-color: var(--chakra-colors-red-100);
  }
  &:not([aria-invalid='true']):not([data-invalid]):focus {
    border-color: initial;
  }
`;

export const NumberInputForm = forwardRef<NumberInputProps & { inputProps?: NumberInputFieldProps }, 'div'>(
  ({ inputProps, ...props }, ref) => {
    return (
      <NumberInputChakra
        border="1px solid"
        borderColor="colorMain"
        errorBorderColor="error"
        boxShadow="unset !important"
        ref={ref}
        {...props}
      >
        <NumberInputFieldStyled
          borderWidth={0}
          rounded={props.rounded ?? 0}
          boxShadow="unset !important"
          h="fit-content"
          fontSize="inherit"
          bg="white"
          p={'9px'}
          inputMode="text"
          onKeyPress={(event) => {
            if (!/[0-9.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          {...inputProps}
        />
      </NumberInputChakra>
    );
  },
);
