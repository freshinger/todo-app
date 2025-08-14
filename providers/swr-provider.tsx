'use client';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export const SWRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};