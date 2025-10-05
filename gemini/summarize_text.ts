// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI, Type
} from '@google/genai';

export type GeminiResponse = {
  title: string;
  summary: string;
}

export async function summarize_text(input: string): Promise<GeminiResponse> {
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
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
        },
        summary: {
          type: Type.STRING,
        },
      },
      propertyOrdering: ["title", "summary"],
    },
      
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
    var response_json: GeminiResponse = {title: "", summary: ""};
    try {
      if (response.text) {
        response_json = JSON.parse(response.text);
      }
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      throw e;
    }
    return response_json;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
}