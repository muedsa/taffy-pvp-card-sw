export type StringStringProps = {
    [key: string]: string;
};
export type NumberStringProps = {
    [key: number]: string;
};
export type StringNumberProps = {
    [key: string]: number;
};
export interface LocProps {
    [key: string]: StringStringProps;
}
export type CharactersProps = {
    [key: number]: {
        nameTextMapHash: number;
        element: string;
        image: string;
    };
};
export type WeaponsProps = {
    [key: number]: {
        type: string;
        nameTextMapHash: number;
    };
};
export type ReliquariesProps = {
    [key: number]: {
        nameTextMapHash: number;
        setId?: number;
        setNameTextMapHash?: number;
    };
};
export type ReliquarySetProps = {
    [key: number]: {
        nameTextMapHash: number;
    };
};
export type FileTypeMap = {
    characters: CharactersProps;
    loc: LocProps;
    weapons: WeaponsProps;
    reliquaries: ReliquariesProps;
    "reliquary-set": ReliquarySetProps;
    "reliquaries-loc": LocProps;
};
