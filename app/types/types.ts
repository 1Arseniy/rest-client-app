export interface TypeHeader {
  key: string;
  value: string;
}

export interface TypeResponse {
  status: string;
  data?: string;
  error?: string;
  requestDuration?: number;
  responseStatusCode?: number;
  responseSize?: number;
  requestSize?: number;
  endpoint?: string;
  errorDetails?: string;
}

export interface TypeRequest {
  method: string;
  request: string;
  headers: TypeHeader[];
  body: string;
  typeTextarea: string;
}

export interface RequestHistory {
  id: string;
  userId: string;
  method: string;
  url: string;
  headers: TypeHeader[];
  body: string;
  typeTextarea: string;
  requestDuration: number;
  responseStatusCode: number;
  requestTimestamp: number;
  requestSize: number;
  responseSize: number;
  errorDetails: string | null;
  endpoint: string;
}

export interface RequestHistoryResponse {
  requests: RequestHistory[];
  totalCount: number;
}
