'use client';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalOverlayProps,
  ModalProps,
} from '@chakra-ui/react';

type Props = ModalProps & {
  hideClose?: boolean;
  bgOverlay?: ModalOverlayProps['bg'];
  minW?: ModalContentProps['minW'];
};

export const ModalBase = ({ children, hideClose, bgOverlay, minW, ...props }: Props) => {
  return (
    <Modal closeOnOverlayClick={!hideClose} {...props}>
      <ModalOverlay />
      <ModalContent
        maxW="530px"
        w="full"
        mx={2.5}
        p={{ base: 4, md: 6 }}
        minW={minW ?? 300}
        color="colorMain"
        bg="white"
        rounded={{ base: 8, md: 24 }}
      >
        {!hideClose && <ModalCloseButton />}
        <ModalBody p={0} fontFamily="sfPro" fontWeight={800} lineHeight={1.4}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
