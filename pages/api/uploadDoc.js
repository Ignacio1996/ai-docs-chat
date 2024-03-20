import { ChatOpenAI } from "@langchain/openai";

export default async function handler(req, res) {
  try {
    console.log("uploadDoc.js 4 | uploading doc...");
    const data = JSON.parse(req.body);
    console.log("chat.js 11 | req body", data.content, data.fileName);
    res.status(200).json({ docUploaded: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
