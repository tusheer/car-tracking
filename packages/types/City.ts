import { ImageType } from './Image';

export type City = {
    uid: string;
    name: string;
    createAt: Date;
    updateAt: Date;
    assignedCar: [];
    assignedOperator: [];
    longitude: number;
    latitude: number;
    zoomLavel: number;
    country: string;
    image: ImageType;
};
