const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const prompt = require('prompt-sync')();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  console.log("What d you want to ask ?")
  const q = prompt("-> ");

  const result = await model.generateContent(q);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();