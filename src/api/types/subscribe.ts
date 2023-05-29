import type { GenericClientRequest, Response } from "./base";

export type SubscribeRequest = {
  subscribe: number;
} & GenericClientRequest;

export interface SubscribeResponse<U extends string>
  extends Response<SubscribeRequest, U> {
  subscription: {
    id: string;
  };
}
