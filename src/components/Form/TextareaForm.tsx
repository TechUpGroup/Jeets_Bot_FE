import { forwardRef, Textarea, TextareaProps } from '@chakra-ui/react';

type Props = TextareaProps;
export const TextareaForm = forwardRef<Props, 'input'>((props, ref) => {
  return (
    <Textarea
      ref={ref}
      outline="unset"
      border="1px solid"
      borderColor="rgba(192, 192, 192, 1)"
      bg="white"
      rounded={8}
      _hover={{
        borderColor: 'rgba(192, 192, 192, 1)',
      }}
      {...props}
    />
  );
});
