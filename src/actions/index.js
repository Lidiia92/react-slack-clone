import * as actionsTypes from './types';
import Channels from '../components/SidePanel/Channels';

/* User Actions */
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

/*Channel Actions */
export const setCurrentChannel = channel => {
    return {
        type: actionsTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

export const setPrivateChannel = isPrivateChannel => {
    return {
        type: actionsTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
}