export enum httpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export type PromiseHandler<T> = Promise<[T?, Error?]>;
