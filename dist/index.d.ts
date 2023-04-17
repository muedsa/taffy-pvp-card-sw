import { Canvas } from "@napi-rs/canvas";
import { CardConfig, Character } from "./types";
export declare const defaultCardConfig: CardConfig;
export declare function generateCard(character: Character, config?: CardConfig): Promise<Canvas>;
