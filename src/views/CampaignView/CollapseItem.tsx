import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, List, ListItem, useDisclosure } from '@chakra-ui/react';

export const CollapseItem = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex onClick={onToggle} gap={1}>
        <Box>{isOpen ? <ChevronUpIcon boxSize={5} /> : <ChevronDownIcon boxSize={5} />}</Box>
        Hold $MOON & $SUN
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <List pt={2.5} fontWeight={400} lineHeight={1.4}>
          <ListItem>Hold 10,000 $MOON</ListItem>
          <ListItem>Hold 5,000 $SUN</ListItem>
        </List>
      </Collapse>
    </>
  );
};
