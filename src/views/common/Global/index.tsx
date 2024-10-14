'use client';

import ToastContainerGlobal from './ToastContainerGlobal';
import { useAuthSignMessage } from './useAuthSignMessage';
import { useFetchData } from './useFetchData';

function GlobalHooks() {
  useAuthSignMessage();
  useFetchData();
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
