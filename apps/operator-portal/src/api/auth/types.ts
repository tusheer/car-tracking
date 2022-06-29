import { ApiResponse, User } from 'types';

export type LoginRespose = ApiResponse<Omit<User, 'assignedCar' | 'assignedCity'>> & { authToken: string };
