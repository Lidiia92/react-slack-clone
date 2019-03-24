import * as actionsTypes from './types';

export const setUser = user => {
    return {
        type: actionsTypes.SET_USER,
        payload: {
            currentUser: user
        }

    }
}

export const clearUser = user => {
    return {
        type: actionsTypes.CLEAR_USER,

    }
}