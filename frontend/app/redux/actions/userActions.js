export const LOGIN = 'LOGIN';

export const login = (userData) => {
    return {
        type: LOGIN,
        payload: userData,
    };
};

export const logoutUser = () => {
    return {
        type: 'LOGOUT',
    };
};
