import { Flex, VStack, Center, Button, Text, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';
import { getResponsifiedCode } from '../../../../util/crud/getResponsifiedCode';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Lottie from 'react-lottie-player';
import loadingAnimation from '@/animations/loading-bot.json';
import { useToast } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

export function CodeInputForm() {
  const [htmlCode, setHtmlCode] = useState('<div>hey man</div>');
  const [cssCode, setCssCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { height } = useWindowSize();
  const toast = useToast();

  const onFluidifyClick = async () => {
    setLoading(true);

    const result = await getResponsifiedCode(htmlCode, cssCode);

    if (result) {
      setLoading(false);
      setHtmlCode(result.newHtml);
      setCssCode(result.newCSS);
      toast({
        title: 'Success.',
        description: 'Your responsified code is below.',
        variant: 'success',
        icon: <CheckIcon />,
        duration: 4000,
        isClosable: false,
        position: 'top',
      });
    } else {
      setLoading(false);
      toast({
        title: 'Oops',
        description: 'Something went wrong. Please try again.',
        variant: 'subtle',
        status: 'error',
        duration: 4000,
        isClosable: false,
        position: 'top',
      });
    }
  };

  if (loading) {
    return (
      <VStack w="full" h={`${height}px`} spacing="1rem" justify="center">
        <Lottie
          play
          loop
          animationData={loadingAnimation}
          renderer="svg"
          style={{ width: 350, height: 350 }}
        />
        <Text color="#fff" fontSize="1.5rem">
          Fluidifying your code, hang tight.
        </Text>
      </VStack>
    );
  }

  return (
    <Center
      w="full"
      pt={{ base: '10rem', lg: 0 }}
      pb={{ base: '10rem', lg: 0 }}
    >
      <VStack w="full" spacing="4rem">
        <Flex
          w="full"
          align="center"
          justify="center"
          gap="4rem"
          direction={{ base: 'column', lg: 'row' }}
        >
          <VStack w={{ base: '100%', lg: '50%' }} align="flex-start">
            <Heading color="#fff" fontSize="1.5rem">
              HTML
            </Heading>
            <CodeEditor
              value={htmlCode}
              language="html"
              placeholder="HTML"
              onChange={(e) => setHtmlCode(e.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: '#181818',
                width: '100%',
                height: '450px',
                overflow: 'scroll',
              }}
            />
          </VStack>
          <VStack w={{ base: '100%', lg: '50%' }} align="flex-start">
            <Heading color="#fff" fontSize="1.5rem">
              CSS
            </Heading>
            <CodeEditor
              value={cssCode}
              language="css"
              placeholder="CSS"
              onChange={(e) => setCssCode(e.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: '#181818',
                width: '100%',
                height: '450px',
                overflow: 'scroll',
              }}
            />
          </VStack>
        </Flex>
        <Button
          variant="primary"
          w={{ base: '70%', lg: '18%' }}
          onClick={onFluidifyClick}
        >
          Fluidify
        </Button>
      </VStack>
    </Center>
  );
}
