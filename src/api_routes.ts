const PREFIX = '/api';

export const GET_USER = (username: string) => `${PREFIX}/user/${username}`;