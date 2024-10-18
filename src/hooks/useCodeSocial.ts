import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useCodeSocial = () => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const tgAuthResult = searchParams.get('tgAuthResult');
    const isTwitter = !!code && state === 'twitter';
    const isTelegram = !!tgAuthResult;
    return {
      state,
      code,
      isTwitter,
      isTelegram,
      tgAuthResult,
    };
  }, [searchParams]);
};

export default useCodeSocial;
