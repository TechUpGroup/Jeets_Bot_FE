import { FlexBetween, FlexCol, LinkCustom } from '@/components';
import { ITokenInfo } from '@/types/token.type';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import { Box, Flex } from '@chakra-ui/react';

import { useQueryHolders } from './hooks/useQueryHolders';

export const HoldersDistribution = ({ token }: { token: ITokenInfo }) => {
  const { data } = useQueryHolders(token.mint);

  return (
    <FlexCol w="full" bg="rgba(249, 252, 255, 1)" rounded={16} p={5} gap={6} fontSize={14}>
      <Box fontSize={20} fontWeight={600} pb={2}>
        Holders Distribution
      </Box>
      {data?.docs.map((item, i) => (
        <FlexBetween key={i}>
          <Flex alignItems="center" gap={2}>
            <Box minW={5} fontWeight={500}>
              {i + 1}.
            </Box>
            <LinkCustom href={getTransactionHashUrl(item.account, 'address')} target="_blank" color="purple">
              {formatAddress(item.account)}
            </LinkCustom>
            {item.account === token.creator && (
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
