'use client';

import { FlexContent, Title2, Wrapper } from '@/components';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import MyTokenTab from './MyTokenTab';
import TokenDevelopmentTab from './TokenDevelopmentTab';
import TokenListTab from './TokenListTab';

const tabs = ['Token List', 'Token Development', 'My Token'];

export default function ExchangeView() {
  return (
    <Wrapper as={Tabs} variant="unstyled" maxW={1680} flexDir="row" gap={6} bg="unset" alignItems="start">
      <FlexContent as={TabList} maxW={402} w="full" flex="unset" gap={5}>
        <Title2>OTC Exchange</Title2>
        {tabs.map((name) => (
          <Tab
            key={name}
            w="full"
            _selected={{ color: 'white', bg: 'purple' }}
            bg="rgba(237, 247, 255, 1)"
            fontSize={{ base: 16, md: 20 }}
            lineHeight={1.4}
            p={5}
            rounded={10}
          >
            {name}
          </Tab>
        ))}
      </FlexContent>
      <TabPanels>
        <TabPanel p={0}>
          <TokenListTab />
        </TabPanel>
        <TabPanel p={0}>
          <TokenDevelopmentTab />
        </TabPanel>
        <TabPanel p={0}>
          <MyTokenTab />
        </TabPanel>
      </TabPanels>
    </Wrapper>
  );
}
