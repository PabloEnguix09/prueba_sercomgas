interface IReply<T> {
  200: {
    success: boolean;
    data: T;
  };
  201: {
    success: boolean;
    data: T;
  };
  204: {
    success: boolean;
  }
  302: { url: string };
  "4xx": { message: string };
  "5xx": { message: string };
  
}
export { IReply };