require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Create an endpoint for processing queries
app.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Basic input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid query',
        message: 'Query must be a non-empty string'
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that analyzes drone data and provides insights."
        },
        {
          role: "user",
          content: query.trim()
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error('Unexpected response format from OpenAI');
    }

    res.json({
      answer: completion.choices[0].message.content,
      model: completion.model,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Error processing the request:', error);

    if (error instanceof OpenAI.APIError) {
      return res.status(error.status || 500).json({
        error: 'OpenAI API Error',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});