'use client';

import { FlexCol, FlexContent, Title2, Wrapper } from '@/components';
import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import MyTokenTab from './MyTokenTab';
import TokenDevelopmentTab from './TokenDevelopmentTab';
import TokenListTab from './TokenListTab';

const tabs = ['Token List', 'Token Development', 'My Token'];

export default function ExchangeView() {
  return (
    <Wrapper
      as={Tabs}
      variant="unstyled"
      maxW={1680}
      flexDir={{ base: 'column', md: 'row' }}
      gap={6}
      bg="unset"
      alignItems="start"
      px={0}
      pt={{ base: 0, md: 6 }}
      isLazy
    >
      <FlexContent
        as={TabList}
        maxW={{ base: 'full', md: 300, lg: 320, xl: 350, '2xl': 402 }}
        w="full"
        flex="unset"
        gap={5}
      >
        <Title2>OTC Exchange</Title2>
        <SimpleGrid columns={{ base: 3, md: 1 }} gap={5} w="full">
          {tabs.map((name) => (
            <Tab
              key={name}
              w="full"
              _selected={{ color: 'white', bg: 'purple' }}
              bg="rgba(237, 247, 255, 1)"
              fontSize={{ base: 14, md: 20 }}
              lineHeight={1.4}
              px={{ base: 2, md: 5 }}
              py={{ base: 3, md: 5 }}
              rounded={10}
            >
              {name}
            </Tab>
          ))}
        </SimpleGrid>
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
