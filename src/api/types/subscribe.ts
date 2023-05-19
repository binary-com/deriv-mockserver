import type { Response } from "./base";

export type SubscribeRequest = {
  subscribe: number;
};

export type SubscribeResponse = {
  subscription: {
    id: string;
  };
} & Response;
