import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

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
  }
  toast.error(
    messageToast,
    // <FlexCol>
    //   <Box>Error</Box>
    //   <Box color="white">{messageToast}</Box>
    // </FlexCol>
    { autoClose: 3_000 },
  );
};

export const toastSuccess = (message: ReactNode = 'Sucess') => {
  toast.success(message, { autoClose: 3_000 });
};
