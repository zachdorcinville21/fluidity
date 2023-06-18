import { CodeInputForm } from '@/components/generate/code-input-form';
import { Center } from '@chakra-ui/react';
import { useWindowSize } from '../../hooks/useWindowSize';

export default function Generate() {
  const { height } = useWindowSize();
  return (
    <Center
      w="full"
      h={{ base: 'auto', lg: `${height}px` }}
      minH='100vh'
      bg="background.100"
      px="2rem"
    >
      <CodeInputForm />
    </Center>
  );
}
