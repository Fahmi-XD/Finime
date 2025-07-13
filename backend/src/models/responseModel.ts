export interface ResponseModel<T> {
  status: number;
  result: T | null;
  error: any | null;
}