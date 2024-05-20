interface IReply<T> {
  201: {
    success: boolean;
    data: T;
  };
  302: { url: string };
  "4xx": { message: string };
  "5xx": { message: string };
  200: {
    success: boolean;
    data: T;
  };
}
export { IReply };