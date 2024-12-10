import { ObjectId } from "mongodb";

export type Funko = {
  _id: ObjectId;
  show: string;
  tvShow: string;
  character: string;
  numberInLine: number;
  imageUrl: string;
  yearReleased: number | string;
};
export interface FunkoProps {
  funkos: Funko[];
}
export interface EditFunkoProps {
  funko: Funko
}
