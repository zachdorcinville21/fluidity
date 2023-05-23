import { Button, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/intro-animation.json';
import { motion } from 'framer-motion';

export function HomeIntro() {
  const { height } = useWindowSize();
  const MotionHeading = motion(Heading);

  return (
    <Center w="full" h={`${height}px`} px="2rem" py="2rem">
      <Flex w="full" justify="space-between" align="center">
        <VStack spacing="1rem" align="flex-start">
          <MotionHeading
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            color="#fff"
            fontSize="4rem"
          >
            Responsive layout in one click.
          </MotionHeading>
          <Text color="gray.100" fontSize="1.5rem">
            Input your HTML and CSS and our bot will optimize your code for
            mobile, tablet, and desktop.
          </Text>
          <Button variant='primary' w='40'>
            Try it out
          </Button>
        </VStack>
        <Lottie
          play
          animationData={animationData}
          renderer="svg"
          style={{ width: 450, height: 450 }}
        />
      </Flex>
    </Center>
  );
}
