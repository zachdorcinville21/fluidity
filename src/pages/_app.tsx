import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative">
        {router.pathname === '/generate' && (
          <ArrowBackIcon
            onClick={() => router.push('/')}
            position="absolute"
            top={6}
            left={6}
            color="#fff"
            w={8}
            h={8}
            cursor="pointer"
          />
        )}
        <Button
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
          position="absolute"
          top={6}
          right={6}
          bg="blue.100"
          _active={{ bg: 'blue.200' }}
          onClick={() =>
            window.open('https://www.buymeacoffee.com/zacharyd', '_blank')
          }
        >
          <Image src="/coffee-icon.svg" alt="coffee" width={20} height={20} />
          Buy me a coffee
        </Button>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
