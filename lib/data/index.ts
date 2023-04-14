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
