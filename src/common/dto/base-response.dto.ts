interface Meta {
  status: number;
  message: string;
}

interface ErrorResponse {
  path: string;
  message: string;
}

export interface BaseResponse<T> {
  meta: Meta;
  data: T;
  error: null;
}

export interface ErrorBaseResponse {
  meta: Meta;
  data: null;
  error: ErrorResponse;
}
