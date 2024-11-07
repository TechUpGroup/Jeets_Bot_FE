'use client';

import ToastContainerGlobal from './ToastContainerGlobal';
import { useAuthSignMessage } from './useAuthSignMessage';
import { useFetchData } from './useFetchData';
import { useFetchDataSocket } from './useFetchDataSocket';

function GlobalHooks() {
  useAuthSignMessage();
  useFetchData();
  useFetchDataSocket();
  return null;
}

function GlobalComponents() {
  return <></>;
}

export default function Global() {
  return (
    <>
      <GlobalHooks />
      <GlobalComponents />
      <ToastContainerGlobal />
    </>
  );
}
