import { SKRSContext2D } from "@napi-rs/canvas";
import { CardConfig, Character, ReliquarySlots, Weapon } from "./types";
export declare function drawCharacter(ctx: SKRSContext2D, config: CardConfig, character: Character): Promise<void>;
export declare function drawCharacterProps(ctx: SKRSContext2D, config: CardConfig, character: Character): Promise<void>;
export declare function drawReliquaries(ctx: SKRSContext2D, config: CardConfig, reliquaries: ReliquarySlots, avatarId: number): Promise<void>;
export declare function drawWeapon(ctx: SKRSContext2D, config: CardConfig, weapon: Weapon): Promise<void>;
