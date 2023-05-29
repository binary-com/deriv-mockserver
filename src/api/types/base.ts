export interface Response<T extends object, U extends string> {
  echo_req: T;
  msg_type: U;
  req_id: number;
}

export interface GenericClientRequest extends Object {
  mock_server_id: string;
}
