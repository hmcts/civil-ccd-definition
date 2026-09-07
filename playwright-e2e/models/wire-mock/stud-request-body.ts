type StudRequestBody = {
  id?: string;
  request: {
    method: string;
    url?: string;
    urlPath?: string;
    urlPathPattern?: string;
  };
  response: {
    status: number;
    headers?: Record<string, string>;
    body?: string;
    bodyFileName?: string | null;
  };
};

export default StudRequestBody;
