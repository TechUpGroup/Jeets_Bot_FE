import { FlexCol } from '@/components';
import { ITokenInfo } from '@/types/token.type';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ChatTab } from './ChatTab';
import { TradeTab } from './TradeTab';

export const TradeComponent = ({ token }: { token: ITokenInfo }) => {
  return (
    <FlexCol w="full" bg="rgba(249, 252, 255, 1)" rounded={16} p={5} gap={4} h="full">
      <FlexCol as={Tabs} variant="unstyled" colorScheme="unset" h="full" isLazy>
        <TabList gap={2}>
          {['Chat', 'Trades'].map((item, index) => (
            <Tab
              key={index}
              bg="rgba(143, 81, 236, 0.5)"
              color="white"
              _selected={{ bg: 'purple' }}
              rounded={12}
              fontSize={16}
              fontWeight={600}
            >
              {item}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <ChatTab token={token} />
          </TabPanel>
          <TabPanel p={0}>
            <TradeTab token={token} />
          </TabPanel>
        </TabPanels>
      </FlexCol>
    </FlexCol>
  );
};
