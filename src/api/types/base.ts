

export interface Response<T extends object, U extends string> {
  echo_req: T;
  msg_type: U;
  req_id: number;
}
