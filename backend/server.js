require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

//Open API configuration
const openApiConfig = new Configuration ({
  apiKey: 'process.env.OPENAI_API_KEY',
});
const openai = new OpenAIApi(openAPIConfig);

// Create an endpoint for processing queries
app.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the following drone data and answer this query: ${query}`,
      max_tokens: 150,
    });
    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request');
  }
});

// Start the server on port 5000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
