'use client';

import { includes } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { FlexCol, FlexContent, Title2, Wrapper } from '@/components';
import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import MyTokenTab from './MyTokenTab';
import TokenDevelopmentTab from './TokenDevelopmentTab';
import TokenListTab from './TokenListTab';

const tabs = ['Token List', 'Launch A Token', 'My Token'];

export default function LaunchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tabIndex = useMemo(() => {
    const tab = Number(searchParams.get('tab'));
    if ([0, 1, 2].includes(tab)) return tab;
    return 0;
  }, [searchParams]);

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
      index={tabIndex}
      onChange={(index) => router.push(`${pathname}?tab=${index}`)}
      isLazy
    >
      <FlexContent
        as={TabList}
        maxW={{ base: 'full', md: 300, lg: 320, xl: 350, '2xl': 402 }}
        w="full"
        flex="unset"
        gap={5}
      >
        <Title2>Launch</Title2>
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
              textAlign="center"
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
