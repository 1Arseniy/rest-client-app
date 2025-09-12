export interface TypeResponse {
  status: string;
  data?: string;
  error?: string;
}

export interface TypeRequest {
  method: string;
  request: string;
  header: {
    key: string;
    velue: string;
  };
}
