import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useCodeSocial = () => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const isTwitter = !!code && state === 'twitter';
    const isTelegram = !!code && state === 'telegram';
    return {
      state,
      code,
      isTwitter,
      isTelegram,
    };
  }, [searchParams]);
};

export default useCodeSocial;
