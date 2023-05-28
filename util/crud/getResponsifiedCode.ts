import axios from 'axios';

interface FluidifyReturn {
  newCSS: string;
  newHtml: string;
}

export async function getResponsifiedCode(
  htmlCode: string,
  cssCode: string
): Promise<FluidifyReturn | null> {
  try {
    const result = await axios.post('/api/fluidify', {
      htmlCode,
      cssCode,
    });
    return result.data.result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
