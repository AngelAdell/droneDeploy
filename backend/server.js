require('dotenv').config();
//console.log('Environment variables loaded:', process.env);

const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

// OpenAI API key configuration
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set in your .env file
});
const openaiClient = new OpenAIApi(openaiConfig);

//console.log('OpenAI Client:', openaiClient);


// Create an endpoint for processing queries
app.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the drone data and answer this query: ${query}`,
      max_tokens: 150,
    });
    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
