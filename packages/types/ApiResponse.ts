export type ApiResponse<T> = {
    message: string;
    result: T;
    statusCode: number;
};
