import { useState } from 'react';
import { sendQuery } from '../services/api';
import { Card, Text, TextInput, Button, Badge } from '@tremor/react';

const QueryInterface = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenUsage, setTokenUsage] = useState<{
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');
    setTokenUsage(null);

    try {
      const result = await sendQuery(query);
      setResponse(result.answer);
      setTokenUsage(result.usage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    "What is the typical altitude range for the drone flights?",
    "Analyze the camera settings used across different images.",
    "What wildlife was captured in the images?",
    "How did the battery levels change during the flight?",
    "What types of terrain were photographed?"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Text className="text-gray-700">Ask questions AI about drone flight data from Yellowstone National Park</Text>

      <Card className="mt-6 bg-white shadow-md border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextInput
              placeholder="Enter your question about the drone data..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-black"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            loading={isLoading}
            className="w-full bg-black hover:bg-indigo-700 text-white"
          >
            {isLoading ? 'Processing...' : 'Ask Question'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <Text color="red">{error}</Text>
          </div>
        )}

        {response && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Text className="text-gray-900">{response}</Text>
            </div>
            {tokenUsage && (
              <div className="flex gap-2">
                <Badge color="indigo">
                  Tokens: {tokenUsage.total_tokens}
                </Badge>
              </div>
            )}
          </div>
        )}
      </Card>

      <Card className="mt-6 bg-white shadow-md border border-gray-100">
        <Text className="font-medium text-gray-900">Example Questions</Text>
        <div className="mt-4 space-y-2">
          {exampleQueries.map((exampleQuery, index) => (
            <Button
              key={index}
              variant="secondary"
              className="mr-2 mb-2 border-indigo-200 text-black hover:bg-indigo-50"
              onClick={() => setQuery(exampleQuery)}
            >
              {exampleQuery}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default QueryInterface;
