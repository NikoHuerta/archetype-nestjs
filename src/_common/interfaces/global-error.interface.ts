export interface GlobalErrorInterface {
  message: string;
  statusCode: number;
  timestamp: Date;
  method: string;
  url: string;
  body: string;
  externalRequest: {
    method: string;
    url: string;
    data: string;
  };
  sql: {
    query: string;
    message: string;
    parameters: string;
  };
}
