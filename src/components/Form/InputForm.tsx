import { forwardRef, Input, InputProps } from '@chakra-ui/react';

type Props = InputProps;
export const InputForm = forwardRef<Props, 'input'>((props, ref) => {
  return (
    <Input
      ref={ref}
      outline="unset"
      border="1px solid"
      borderColor="rgba(192, 192, 192, 1)"
      errorBorderColor="error"
      rounded={8}
      bg="white"
      _hover={{
        borderColor: 'rgba(192, 192, 192, 1)',
      }}
      {...props}
    />
  );
});
