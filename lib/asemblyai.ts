import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
  baseUrl: "https://api.assemblyai.com", // Set the baseUrl to the US endpoint
});
