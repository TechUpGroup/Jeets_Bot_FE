'use client';

import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

import { Button, ImageCustom } from '@/components';
import { Box } from '@chakra-ui/react';

export const CopyButton = ({ text }: { text: string | undefined }) => {
  const [_, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    if (isCopied) return;
    copy(text ?? '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }

  if (isCopied) {
    return <ImageCustom src="/icons/copy-success.svg" alt="" width={21} height={5} />;
  }
  return (
    <Button onClick={handleCopy}>
      <ImageCustom src="/icons/copy.svg" alt="" width={4} height={4} ml={1} />
    </Button>
  );
};
