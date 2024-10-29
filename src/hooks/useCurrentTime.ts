import { useState } from 'react';

import { useInterval } from '@chakra-ui/react';

const getCurrentTime = () => Math.floor(Date.now());

export const useCurrentTime = () => {
  var [currentTime, setCurrentTime] = useState(getCurrentTime());

  useInterval(() => setCurrentTime(getCurrentTime()), 1_000);

  return currentTime;
};
