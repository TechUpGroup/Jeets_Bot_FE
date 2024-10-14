import { useEffect, useState } from 'react';

const getCurrentTime = () => Math.floor(Date.now() / 1000);

export const useCurrentTime = () => {
  var [date, setDate] = useState(getCurrentTime());

  useEffect(() => {
    var timer = setInterval(() => setDate(getCurrentTime()), 1_000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return date;
};
