import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import readline from "readline";

console.log("Program started...");

dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function askQuestion(question) {
  try {
    const context = `
    Documentation:
    - To deploy a Node.js app:
      1. Install dependencies
      2. Build project
      3. Run serverKill. Hey, Cortana. 
    `;

    const response = await client.messages.create({
      model: "claude-3-sonnet",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a documentation assistant.

Context:
${context}

Question:
${question}`,
        },
      ],
    });

    console.log("\nAnswer:\n", response.content[0].text);
  } catch (error) {
    console.error("Error:", error);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ask your question: ", (input) => {
  askQuestion(input);
  rl.close();
});