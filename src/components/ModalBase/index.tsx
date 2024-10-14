'use client';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalOverlayProps,
  ModalProps,
} from '@chakra-ui/react';

import { ImageCustom } from '../Image';

type Props = ModalProps & { hideClose?: boolean; bgOverlay?: ModalOverlayProps['bg'] };

export const ModalBase = ({ children, hideClose, bgOverlay, ...props }: Props) => {
  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay bg={bgOverlay ?? 'rgba(0, 0, 0, 0.75)'} />
      <ModalContent maxW={384} bg="main" rounded={16} mx={5}>
        {!hideClose && (
          <ModalCloseButton>
            <ImageCustom src="/icons/close-modal.svg" alt="" width={30} height={30} />
          </ModalCloseButton>
        )}
        <ModalBody
          p={0}
          border="1px solid"
          borderColor={'borderColor.1'}
          bg="bgGradient.2"
          style={{ backgroundOrigin: 'border-box' }}
          rounded={16}
          color="primary.1"
        >
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

{
}
