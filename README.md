# Gemini AI Content Generator

This script uses Google’s Generative AI (Gemini 1.5) to generate text-based content based on user input. It writes the generated content to a Markdown file (`response.md`) and optionally displays it using the **Glow** CLI tool.

## Features

- Utilizes **Google Generative AI** to process user input and generate meaningful text.
- Automatically saves the AI-generated response to a Markdown file (`response.md`).
- Optionally displays the Markdown file in the terminal using the **Glow** tool.

---

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system.
2. **Glow**: Install the [Glow](https://github.com/charmbracelet/glow) CLI tool for viewing Markdown files in the terminal.
3. **API Key**: Obtain an API key for Google Generative AI and set it in your environment variables.

---

## Setup

1. Clone the repository or copy the script to your local machine.

2. Install the required dependencies:

   ```zsh
   npm install
3. Run the program

    ```zsh
    npm run start Hello

## Extra Fun Setup

If you want to use this on your terminal in some fancy way. Add the file on you root directory then make a terminal alias.

Example:
```zsh
    alias gem='node ~/gemini-cli/index.js'
```
Now you can use this like '**gem Hello**' within your terminal.