'use client';
import { ChakraProvider as CP, theme } from "@chakra-ui/react";
import React, { ReactNode } from 'react';

export const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return <CP theme={theme}>{children}</CP>;
};