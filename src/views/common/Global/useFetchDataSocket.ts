'use client';

import { useEffect } from 'react';

import { appConfig } from '@/config';
import { useDataShallow } from '@/store/useDataStore';
import { sleep } from '@/utils';

export enum EVENT_SOCKET {
  MINTED = 'TokenCreatedEvent',
  UPDATED = 'TokenUpdatedEvent',
  TRADED = 'TradingEvent',
  CHATBOX = 'ChatCreatedEvent',
}

export const SOCKET_ROOM = 'Soljeets';

export const useFetchDataSocket = () => {
  const [setLastestToken, setLastestTokenUpdated, setTradeLatest, setChatLatest] = useDataShallow((state) => [
    state.setLastestToken,
    state.setLastestTokenUpdated,
    state.setTradeLatest,
    state.setChatLatest,
  ]);
  useEffect(() => {
    let socket: WebSocket;
    const connectSocket = () => {
      socket = new WebSocket(appConfig.publicSocketUrl);
      socket.onopen = () => {
        console.log('Connected to WebSocket server');
        socket.send(JSON.stringify({ event: 'joinRoom', data: SOCKET_ROOM })); // Tham gia một room cụ thể
      };

      socket.onmessage = (message) => {
        try {
          const { event, data } = JSON.parse(message.data);
          if (event === EVENT_SOCKET.MINTED) {
            setLastestToken(data);
          } else if (event === EVENT_SOCKET.UPDATED) {
            setLastestTokenUpdated(data);
          } else if (event === EVENT_SOCKET.CHATBOX) {
            setChatLatest(data);
          } else if (event === EVENT_SOCKET.TRADED) {
            setTradeLatest(data);
          }
        } catch {}
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        socket.close();
      };

      socket.onclose = () => {
        sleep(3_000).then(() => connectSocket());
        console.log('WebSocket connection closed');
      };
    };
    connectSocket();
    return () => socket?.close();
  }, [setChatLatest, setTradeLatest, setLastestToken, setLastestTokenUpdated]);
};
