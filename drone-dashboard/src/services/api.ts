import axios from 'axios';
import { QueryResponse } from '../types/query';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendQuery = async (query: string): Promise<QueryResponse> => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant analyzing drone flight data from Yellowstone National Park. The data includes information about images taken, including image ID, timestamp, location, altitude, camera settings, and environmental conditions."
          },
          {
            role: "user",
            content: query
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      answer: response.data.choices[0].message.content,
      model: response.data.model,
      usage: response.data.usage
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error('Failed to process query');
  }
};