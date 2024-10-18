import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useCodeSocial = () => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const url = typeof window !== 'undefined' ? window.location.hash : undefined;
    const state = searchParams.get('state');
    const code = searchParams.get('code');

    const hashIndex = url?.indexOf('#tgAuthResult=');
    const tgAuthResult = url?.slice(hashIndex ?? 0 + '#tgAuthResult='.length);

    const isTwitter = !!code && state === 'twitter';
    return {
      state,
      code,
      isTwitter,
      tgAuthResult,
    };
  }, [searchParams]);
};

export default useCodeSocial;
