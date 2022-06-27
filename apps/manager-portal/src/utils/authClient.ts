interface Token {
    token: string;
}

export const getToken = (): string | undefined =>
    (typeof window !== 'undefined' && localStorage.getItem('token')) || undefined;

export const getRefreshToken = (): string => localStorage.getItem('refreshToken') || '';

export const setToken = (token: Token): void => {
    localStorage.setItem('token', token.token);
};

export const removeToken = (): void => {
    localStorage.removeItem('token');
};
