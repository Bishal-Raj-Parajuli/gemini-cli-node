const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Access command-line arguments
const args = process.argv.slice(2);
const userInput = args.join(' ');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  try {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = await response.text();

    // Log the generated text for debugging
    //console.log("Generated Text:\n", text);

    // Update the Markdown file
    updateMarkdownFile("response.md", text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Function to create or update the Markdown file
function updateMarkdownFile(fileName, content) {
  try {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    // Display the Markdown file using Glow
    displayWithGlow(filePath);
  } catch (error) {
    console.error("Error writing or reading the file:", error);
  }
}

// Function to display the Markdown file using Glow
function displayWithGlow(filePath) {
  try {
    execSync(`glow ${filePath}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error displaying the file with Glow:', error);
  }
}

// Run the main function
run();


