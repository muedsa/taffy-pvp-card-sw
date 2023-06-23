import { FileTypeMap } from "./data/types";
type FileNames = keyof FileTypeMap;
export declare function getCache<T extends FileNames = FileNames>(fileName: T): FileTypeMap[T];
export declare function updateCache(updateRemote?: boolean): Promise<void>;
export declare function checkCache(): Promise<unknown>;
export {};
