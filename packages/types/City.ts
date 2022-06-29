import { Car } from './Car';
import { ImageType } from './Image';
import { User } from './User';

export type City = {
    uid: string;
    name: string;
    createAt: Date;
    updateAt: Date;
    assignedCar: Car[];
    assignedOperator: User[];
    longitude: number;
    latitude: number;
    zoomLavel: number;
    country: string;
    image: ImageType;
};
