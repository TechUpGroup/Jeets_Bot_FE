'use client';

import { Icon, IconProps } from '@chakra-ui/icons';

export const XIconBlack = (props: IconProps) => (
  <Icon w={6} h="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1688_748)">
      <mask
        id="mask0_1688_748"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1688_748)">
        <path
          d="M18.325 2H21.6989L14.3289 10.471L23 22H16.2114L10.8906 15.0091L4.80914 22H1.43214L9.31443 12.9363L1 2.00158H7.96143L12.7637 8.39029L18.325 2ZM17.1386 19.9697H19.0086L6.94 3.92465H4.93486L17.1386 19.9697Z"
          fill="#201B03"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1688_748">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
