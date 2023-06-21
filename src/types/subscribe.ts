import type { GenericResponse } from './base.type';

export type SubscribeRequest = {
    subscribe: number;
};

export type SubscribeResponse<T> = {
    subscription: {
        id: string;
    };
} & GenericResponse<T>;
