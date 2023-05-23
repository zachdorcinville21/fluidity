import { useState, useEffect } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

export const useWindowSize = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
};
