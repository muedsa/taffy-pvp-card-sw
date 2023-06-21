import { CardConfig } from "./types";
export declare const cardWidth: number;
export declare const cardHeight: number;
export declare const cardConfig: CardConfig;
export declare const globalConfig: {
    cacheDir: string;
    logger: {
        info: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        warn: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        error: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
};
