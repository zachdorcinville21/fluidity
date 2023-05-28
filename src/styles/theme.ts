import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    background: {
      100: '#1A202C',
    },
    gray: {
      100: '#A0AEC0',
    },
    blue: {
      100: '#0039a6',
      200: '#002D62',
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: '#0039a6',
        },
      },
      baseStyle: {
        color: '#fff',
        transition: 'ease 0.2s',
        '&:hover': {
          bg: '#002D62',
        },
      },
    },
    Alert: {
      variants: {
        success: {
          container: {
            color: '#fff',
            bg: '#2a4365',
          },
        },
      },
    },
  },
});
