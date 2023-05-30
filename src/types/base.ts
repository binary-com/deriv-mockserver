export interface GenericResponse<T> {
  echo_req: T & {
    req_id: number;
  };
  msg_type: string;
}

export interface ErrorResponse<T> extends GenericResponse<T> {
  error: {
    code: string;
    details: Record<string, string>;
  };
}
