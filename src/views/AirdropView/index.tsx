'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { FlexContent, Wrapper } from '@/components';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import MissionsView from '../MissionsView/index';
import PoolView from '../PoolView';
import VotingView from '../VotingView';
import ClaimTab from './ClaimTab';

const tabs = ['Missions', 'Voting', 'Pool', 'Claim'];

export default function AirdropView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tabIndex = useMemo(() => {
    const tab = Number(searchParams.get('tab'));
    if ([0, 1, 2, 3, 4].includes(tab)) return tab;
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
        // px={{ base: 5, md: 4 }}
        py={{ base: 5, md: 6 }}
        gap={{ base: 2.5, md: 5 }}
        justifyContent="center"
        flexWrap="wrap"
        flexDir={{ base: 'row', md: 'column' }}
      >
        {tabs.map((name) => (
          <Tab
            key={name}
            w={{ base: 'unset', md: 'full' }}
            flex="0 0 calc(33.33% - 10px)"
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
      </FlexContent>
      <TabPanels>
        {/* <TabPanel p={0}>
          <ConditionTab />
        </TabPanel> */}
        <TabPanel p={0}>
          <MissionsView />
        </TabPanel>
        <TabPanel p={0}>
          <VotingView />
        </TabPanel>
        <TabPanel p={0}>
          <PoolView />
        </TabPanel>
        <TabPanel p={0}>
          <ClaimTab />
        </TabPanel>
      </TabPanels>
    </Wrapper>
  );
}
