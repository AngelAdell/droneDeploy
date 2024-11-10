export interface QueryResponse {
  answer: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface QueryError {
  error: string;
  message: string;
}