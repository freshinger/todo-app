import { SWRProvider } from "@/providers/swr-provider";
import { ChakraProvider } from "@/providers/chakra-provider";
import { fonts } from "@/lib/fonts";

import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fonts.rubik.className}>
        <SWRProvider>
          <ChakraProvider>
            <main>{children}</main>
          </ChakraProvider>
        </SWRProvider>
      </body>
    </html>
  );
}