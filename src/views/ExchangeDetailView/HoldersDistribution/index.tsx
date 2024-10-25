import { FlexBetween, FlexCol, LinkCustom } from '@/components';
import { formatAddress } from '@/utils/address';
import { Box, Flex } from '@chakra-ui/react';

export const HoldersDistribution = () => {
  return (
    <FlexCol w="full" bg="rgba(249, 252, 255, 1)" rounded={16} p={5} gap={6} fontSize={14}>
      <Box fontSize={20} fontWeight={600} pb={2}>
        Holders Distribution
      </Box>
      {Array.from({ length: 10 }).map((_, i) => (
        <FlexBetween key={i}>
          <Flex alignItems="center" gap={2}>
            <Box minW={5} fontWeight={500}>
              {i + 1}.
            </Box>
            <LinkCustom href={'#'} target="_blank" color="purple">
              {formatAddress('sdgdsgsdgsdgdgdggggggg')}
            </LinkCustom>
            {true && (
              <Box
                fontSize={10}
                fontWeight={600}
                py={0.5}
                px={1.5}
                rounded={6}
                bg="rgba(15, 175, 125, 0.2)"
                color="rgba(0, 209, 96, 1)"
              >
                Creator
              </Box>
            )}
          </Flex>
          <Box fontWeight={500}>{(0.2 * 100).toFixed(2)}%</Box>
        </FlexBetween>
      ))}
    </FlexCol>
  );
};
