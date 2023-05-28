import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { htmlCode, cssCode } = req.body;

  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert front end developer who knows the ins and outs of responsive web design.',
        },
        {
          role: 'user',
          content: `Given this HTML code: \n ${htmlCode}, and this CSS code: \n ${cssCode}, make it responsive for mobile, tablet, and desktop. Return the output in the following JSON form: {newHtml: string, newCSS: string}. PLEASE DO NOT ADD MESSAGES BEFORE OR AFTER THE JSON OBJECT! DO NOT SHOW YOUR WORK DO NOT EXPLAIN! Only JSON!!! A SENTENCE IS NOT PROPER JSON! IF YOU ADD CONTENT OUTSIDE OF THE JSON OBJECT SOMEONE WILL DIE! You don't want to be a murderer so JSONify the response and no one gets hurt! Any information you wish to convey to the user should be accessible within the JSON object!`,
        },
      ],
    });
    if (!result.data.choices[0].message) {
      res.status(500).json({ error: 'incomplete data returned from AI' });
    } else {
      const dataToReturn = JSON.parse(
        result.data.choices[0].message.content.replaceAll(`\"`, `"`)
      );
      res.status(200).json({ result: dataToReturn });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'unable to request chat completion' });
  }
}
