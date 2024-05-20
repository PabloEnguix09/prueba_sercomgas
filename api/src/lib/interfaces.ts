import { MarketerType, OperationType } from "../lib/types";

interface IReply<T> {
  201: {
    success: boolean;
    data: T;
  };
  302: { url: string };
  "4xx": { error: string };
  "5xx": { error: string };
  200: {
    success: boolean;
    data: T;
  };
}
export { IReply };