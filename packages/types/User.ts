export type User = {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    createAt: Date;
    updateAt: Date;
    password: string;
    userType: 'MANAGER' | 'OPERATOR';
};
