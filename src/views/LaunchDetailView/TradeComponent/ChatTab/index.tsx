import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Button, FlexCol, ImageRatio, LinkCustom, ModalBase, Pagination, TextareaForm } from '@/components';
import useWalletActive from '@/hooks/useWalletActive';
import { postCreateChat } from '@/services/chatbox';
import { ITokenInfo } from '@/types/token.type';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { toastError, toastSuccess } from '@/utils/toast';
import {
  Box,
  Flex,
  FormControl,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

import { useQueryChat } from './hooks/useQueryChat';

export const ChatTab = ({ token }: { token: ITokenInfo }) => {
  const [page, setPage] = useState(1);
  const { address } = useWalletActive();
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [comment, setComment] = useState('');

  const { data } = useQueryChat(token.mint, token.network, page);

  const handleComment = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await postCreateChat({ mint: token.mint, network: token.network, description: comment });
      toastSuccess('Comment success');
      onClose();
      setComment('');
    } catch (e: any) {
      toastError('Comment error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexCol w="full" bg="rgba(249, 252, 255, 1)" rounded={16} p={5} gap={4}>
      <FlexCol pb={2} gap={2}>
        {!!address && (
          <Button onClick={onOpen} textDecor="underline">
            [Post a reply]
          </Button>
        )}
      </FlexCol>
      {data?.docs.map((item, index) => (
        <Flex
          justify="space-between"
          alignItems="center"
          key={index}
          w="full"
          bg="rgba(237, 247, 255, 1)"
          rounded={16}
          px={5}
          py={3}
          gap={2}
        >
          <FlexCol gap={2}>
            <Popover trigger={isMobile ? 'click' : 'hover'} placement="bottom-start">
              <PopoverTrigger>
                <Button>
                  <Flex alignItems="center" gap={1.5}>
                    <ImageRatio
                      originalImage
                      src={item.avatar ?? 'https://placehold.co/100x100/png'}
                      ratio={1}
                      w={4}
                      rounded="full"
                      overflow="hidden"
                      alt=""
                    />
                    <Box fontSize={14} fontWeight={500} color="purple">
                      {item.username}
                    </Box>
                  </Flex>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody p={0}>
                  <FlexCol py={1.5} pt={8}>
                    <LinkCustom
                      href={getTransactionHashUrl(item.account, 'address')}
                      target="_blank"
                      _hover={{ bg: 'gray.200' }}
                      px={3}
                      py={1.5}
                    >
                      Wallet: {formatAddress(item.account)}
                    </LinkCustom>
                    <LinkCustom
                      href={`https://x.com/${item.username}`}
                      target="_blank"
                      _hover={{ bg: 'gray.200' }}
                      px={3}
                      py={1.5}
                    >
                      X: {item.username}
                    </LinkCustom>

                    <LinkCustom
                      href={`https://t.me/${item.telegram_username}`}
                      target="_blank"
                      _hover={{ bg: 'gray.200' }}
                      px={3}
                      py={1.5}
                    >
                      Telegram: {item.telegram_username}
                    </LinkCustom>
                  </FlexCol>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Box py={2} px={3} fontWeight={500} bg="white" roundedEnd={16} roundedBottomStart={16} minW={100}>
              {item.description}
            </Box>
          </FlexCol>
          <Box fontSize={12} color="light.400" fontWeight={600}>
            {dayjs(item.createdAt).fromNow()}
          </Box>
        </Flex>
      ))}

      {!!data?.totalPages && data?.totalPages > 1 && (
        <Pagination page={page} onChange={setPage} total={data?.totalPages ?? 0} />
      )}
      <ModalBase isOpen={isOpen} onClose={onClose} isCentered>
        <FlexCol gap={4}>
          <FormControl>
            <Box fontSize={14} pb={4}>
              Add a comment
            </Box>
            <TextareaForm
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              fontSize={16}
              fontWeight={500}
            />
          </FormControl>

          <Button
            bg="makeColor"
            onClick={handleComment}
            disabled={!comment}
            isLoading={loading}
            rounded={8}
            w="full"
            h={10}
            px={5}
            color="white"
          >
            OK
          </Button>
        </FlexCol>
      </ModalBase>
    </FlexCol>
  );
};
