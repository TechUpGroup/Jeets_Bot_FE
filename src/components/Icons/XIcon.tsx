'use client';

import { Icon, IconProps } from '@chakra-ui/icons';

export const XIcon = (props: IconProps) => (
  <Icon w={8} h="auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_807_4723)">
      <mask
        id="mask0_807_4723"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <path d="M0 0H32V32H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_807_4723)">
        <path
          d="M24.4334 2.66675H28.9319L19.1052 13.9614L30.6667 29.3334H21.6153L14.5208 20.0123L6.41223 29.3334H1.90956L12.4193 17.2485L1.33337 2.66885H10.6153L17.0183 11.1871L24.4334 2.66675ZM22.8515 26.6264H25.3448L9.25337 5.23295H6.57985L22.8515 26.6264Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_807_4723">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
