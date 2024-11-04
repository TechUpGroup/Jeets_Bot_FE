import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const state = request.nextUrl.searchParams.get('state');
  if (state && state.startsWith('mission-x-')) {
    let params = '';
    searchParams.forEach((_, key) => {
      params = `${params ? `${params}&` : '?'}${key}=`;
    });
    return NextResponse.redirect(origin + '/airdrop?tab=1&' + searchParams);
  } else if (state && state === 'retwitter') {
    let params = '';
    searchParams.forEach((_, key) => {
      params = `${params ? `${params}&` : '?'}${key}=`;
    });
    return NextResponse.redirect(origin + '/airdrop?' + searchParams);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/login',
};
