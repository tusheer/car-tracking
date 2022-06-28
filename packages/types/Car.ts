import { ImageType } from './Image';

export type Car = {
    uid: string;
    modelName: string;
    numberPlate: string;
    createAt: Date;
    updateAt: Date;
    longitude: number;
    latitude: number;
    image: ImageType;
};
