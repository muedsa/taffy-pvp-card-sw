import { Canvas } from "@napi-rs/canvas";
import { CardConfig, Character } from "./types";
export declare function generateCard(character: Character, config?: CardConfig): Promise<Canvas>;
