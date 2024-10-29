import { Currency } from '@/components';
import { ICampaign } from '@/services/campaign';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, List, ListItem, UnorderedList, useDisclosure } from '@chakra-ui/react';

export const CollapseItem = ({ campaign }: { campaign: ICampaign }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex onClick={onToggle} gap={1}>
        <Box>{isOpen ? <ChevronUpIcon boxSize={5} /> : <ChevronDownIcon boxSize={5} />}</Box>
        {campaign.name?.replace('$MOON', '$🌕').replace('$SUN', '$☀️')}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <UnorderedList pt={2.5} fontWeight={400} lineHeight={1.4}>
          {campaign.details.map((e) => (
            <ListItem ml={1.5} key={e.symbol}>
              Hold <Currency value={e.amount} decimalNumber={e.decimal} />{' '}
              {e.symbol?.replace('$MOON', '$🌕').replace('$SUN', '$☀️')}
            </ListItem>
          ))}
        </UnorderedList>
      </Collapse>
    </>
  );
};
