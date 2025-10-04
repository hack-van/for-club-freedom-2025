// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

export async function summarize_text(input: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    systemInstruction: [
        {
          text: `You are an AI Assistant tasked with summarizing content within one paragraph. You will get text as input. There is no need to include sources.`,
        }
    ],
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: input,
        },
      ],
    },
  ];
  try {
    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    return response.text ?? '';
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
}