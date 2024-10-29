import { Flex } from '@chakra-ui/react';
import { Pagination as PaginationNextUI, PaginationProps } from '@nextui-org/pagination';

export const Pagination = (props: PaginationProps) => {
  return (
    <Flex w="full" justifyContent="center" gap={2.5}>
      <PaginationNextUI
        size="sm"
        classNames={{
          wrapper: 'gap-2.5 font-inter font-medium',
          item: 'bg-[#F3EBFF] rounded-[5px]',
          cursor: 'bg-[#8F51EC] rounded-[5px]',
          prev: 'bg-[unset] rounded-[5px]',
          next: 'bg-[unset] rounded-[5px]',
        }}
        showControls
        {...props}
      />
    </Flex>
  );
};
