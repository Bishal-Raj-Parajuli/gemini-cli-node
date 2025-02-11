import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Access command-line arguments
const args = process.argv.slice(2);
const userInput = args.join(" ");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Loading spinner animation frames
const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

// Function to create loading spinner
function startLoading(loadingText = "Wait I need some time thinking 🤔") {
  let i = 0;
  return setInterval(() => {
    const frame = frames[(i = ++i % frames.length)];
    process.stdout.write(`\r${loadingText}.. ${frame}`);
  }, 80);
}

// Function to stop loading spinner
function stopLoading(loadingSpinner) {
  clearInterval(loadingSpinner);
  process.stdout.write("\r\x1b[K"); // Clear the loading text
}

// Function to create typing effect
function typeText(text, speed = 15) {
  return new Promise((resolve) => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        process.stdout.write(text[i]);
        i++;
      } else {
        clearInterval(typing);
        process.stdout.write("\n");
        resolve();
      }
    }, speed);
  });
}

async function run() {
  try {
    // Start the loading spinner
    const loadingSpinner = startLoading();

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        "You are a AI Assistant for helping user with problem./n Your answer should be simple and short but deliver the correct information.",
    });

    const result = await model
      .generateContent(userInput)
      .then((result) => result.response)
      .then((response) => response.text())
      .catch((error) => console.error(error));

    // Stop the loading spinner
    stopLoading(loadingSpinner);

    // Create typing effect for the output
    console.log("\n=== Generated Response ===\n");
    await typeText(result);
  } catch (error) {
    console.error("\nError generating content:", error);
  }
}

// Run the main function
run();
