// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ChatOpenAI } from "@langchain/openai";

export default async function handler(req, res) {
  // llega el query - where did alice meet the mad hatter?
  // mandamos a chatgpt - (done)
  // responde chatgpt
  // mandamos de vuelta la respuesta
  const chatModel = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_KEY });

  try {
    const data = JSON.parse(req.body);
    console.log("chat.js 11 | req body", data.message);
    const response = await chatModel.invoke(data.message);

    console.log("chat.js 16 | response", response.content);

    res.status(200).json({ answer: response.content });
  } catch (error) {
    console.log("chat.js 18 | error", error.message);
    res.status(400).json({ error: error.message });
  }
}
