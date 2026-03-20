import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { question } = req.body;

    const context = `
    Documentation:
    - To deploy a Node.js app:
      1. Install dependencies
      2. Build project
      3. Run server
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

    res.status(200).json({
      answer: response.content[0].text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}