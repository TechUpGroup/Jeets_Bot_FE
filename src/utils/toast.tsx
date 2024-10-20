import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { Box } from '@chakra-ui/react';

export const toastError = (message: ReactNode = 'Something when wrong', e?: unknown) => {
  let messageToast: ReactNode = message;
  if (e instanceof AxiosError) {
    if (typeof e?.response?.data.message === 'string') {
      messageToast = e?.response?.data.message;
    } else if (
      typeof e?.response?.data.message === 'object' &&
      Array.isArray(e?.response?.data.message) &&
      typeof e?.response?.data.message[0] === 'string'
    ) {
      messageToast = e?.response?.data.message[0];
    }
  } else if (e instanceof Error) {
    if (e.message === 'User rejected the request.') messageToast = e.message;
  }
  toast.error(
    <Box w="full" p={3}>
      {messageToast}
    </Box>,
    { autoClose: 3_000, containerId: 'toastError' },
  );
};

export const toastSuccess = (message: ReactNode, toastId?: string) => {
  toast.info(() => message, { autoClose: 3_000, containerId: 'toastInfo', toastId });
};
