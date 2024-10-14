'use client';

import { ImageLoaderProps } from 'next/image';
import { useState } from 'react';

import { getAssetUrl } from '@/utils';
import { Image as ImageChakra, ImageProps } from '@chakra-ui/next-js';
import { forwardRef } from '@chakra-ui/react';

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const fallbackSrc = 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export const ImageCustom = forwardRef<ImageProps, 'img'>(({ src, ...props }, ref) => {
  const [isError, setIsError] = useState(false);
  const handleError = () => setIsError(true);

  return (
    <ImageChakra
      ref={ref}
      src={isError ? fallbackSrc : getAssetUrl(src)}
      onError={handleError}
      // loader={imageLoader}
      {...props}
    />
  );
});
