import { NumberStringProps, StringNumberProps } from ".";
export type CharactersProps = {
    [key: number]: {
        nameTextMapHash: number;
        element: string;
        image: string;
    };
};
export declare const characters: CharactersProps;
export declare const fightPropLoc: NumberStringProps;
export declare const characterMasterElementDamageProp: StringNumberProps;
