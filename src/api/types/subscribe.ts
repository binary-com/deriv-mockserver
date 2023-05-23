import type { Response } from "./base";

export type SubscribeRequest = {
  subscribe: number;
};

export interface SubscribeResponse<U extends string>
  extends Response<SubscribeRequest, U> {
  subscription: {
    id: string;
  };
}
