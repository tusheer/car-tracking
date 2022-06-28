import { Car } from './Car';
import { ImageType } from './Image';

export type City = {
    uid: string;
    name: string;
    createAt: Date;
    updateAt: Date;
    assignedCar: Car[];
    assignedOperator: [];
    longitude: number;
    latitude: number;
    zoomLavel: number;
    country: string;
    image: ImageType;
};
