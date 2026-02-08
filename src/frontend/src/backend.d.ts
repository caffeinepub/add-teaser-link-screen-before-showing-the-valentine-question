import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    addMessage(message: string): Promise<void>;
    getMessage(user: Principal): Promise<string | null>;
    getMessageCount(): Promise<bigint>;
    hasMessage(user: Principal): Promise<boolean>;
}
