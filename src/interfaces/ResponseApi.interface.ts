export interface ResponseApi<T> {
  count: number;
  next: string;
  prev: string;
  results: T
}