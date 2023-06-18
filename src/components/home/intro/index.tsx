import { Button, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/intro-animation.json';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export function HomeIntro() {
  const { height } = useWindowSize();
  const MotionHeading = motion(Heading);
  const router = useRouter();

  return (
    <Center
      w="full"
      h={{ base: 'auto', lg: `${height}px` }}
      minH="100vh"
      py={{ base: '10rem', lg: '2rem' }}
      px="2rem"
    >
      <Flex
        w="full"
        justify="space-between"
        align="center"
        direction={{ base: 'column', lg: 'row' }}
      >
        <VStack spacing="1rem" align={{ base: 'center', lg: 'flex-start' }}>
          <MotionHeading
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            color="#fff"
            fontSize={{ base: '2.5rem', lg: '4rem' }}
            textAlign={{ base: 'center', lg: 'start' }}
          >
            Responsive layout in one click.
          </MotionHeading>
          <Text
            color="gray.100"
            fontSize="1.5rem"
            textAlign={{ base: 'center', lg: 'start' }}
          >
            Input your HTML and CSS and our bot will optimize your code for
            mobile, tablet, and desktop.
          </Text>
          <Button
            variant="primary"
            w="40"
            onClick={() => router.push('/generate')}
          >
            Try it out
          </Button>
        </VStack>
        <Lottie
          play
          loop={false}
          animationData={animationData}
          renderer="svg"
          style={{ width: 450, height: 450 }}
        />
      </Flex>
    </Center>
  );
}
