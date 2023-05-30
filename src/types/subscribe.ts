import type { GenericResponse } from "./base";

export type SubscribeRequest = {
  subscribe: number;
};

export type SubscribeResponse<T> = {
  subscription: {
    id: string;
  };
} & GenericResponse<T>;
