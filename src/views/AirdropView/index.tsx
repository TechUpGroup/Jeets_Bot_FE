'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { FlexContent, Title2, Wrapper } from '@/components';
import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import CampaignView from '../CampaignView';
import MissionsView from '../MissionsView/index';
import PoolView from '../PoolView';
import VotingView from '../VotingView';
import ClaimTab from './ClaimTab';
import ConditionTab from './ConditionTab';

const tabs = ['Condition', 'Missions', 'Voting', 'Pool', 'Claim'];

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
        gap={5}
        px={{ base: 3, md: 4 }}
        py={{ base: 4, md: 6 }}
      >
        <SimpleGrid columns={{ base: 3, md: 1 }} gap={{ base: 3, md: 5 }} w="full">
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
          <ConditionTab />
        </TabPanel>
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
