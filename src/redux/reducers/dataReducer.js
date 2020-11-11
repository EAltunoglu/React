import {
    SET_FAVS,
    LIKE_FAV,
    UNLIKE_FAV,
    LOADING_DATA,
    DELETE_FAV,
    POST_FAV,
    SET_FAV,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    favs: [],
    fav: {},
    loading: false
};

export default function(state = initialState, action) {
switch (action.type) {
    case LOADING_DATA:
        return {
            ...state,
            loading: true
        };
    case SET_FAVS:
        return {
            ...state,
            favs: action.payload,
            loading: false
        };
    case SET_FAV:
        return {
            ...state,
            fav: action.payload
        };
    case LIKE_FAV:
    case UNLIKE_FAV:
        let index = state.favs.findIndex(
            (fav) => fav.favId === action.payload.favId
        );
        state.favs[index] = action.payload;
        if (state.fav.favId === action.payload.favId) {
            state.fav = action.payload;
        }
        return {
            ...state
        };
    case DELETE_FAV:
        index = state.favs.findIndex(
            (fav) => fav.favId === action.payload
        );
        state.favs.splice(index, 1);
        return {
            ...state
        };
    case POST_FAV:
        return {
            ...state,
            favs: [action.payload, ...state.favs]
        };
    case SUBMIT_COMMENT:
        return {
            ...state,
            fav: {
            ...state.fav,
            comments: [action.payload, ...state.fav.comments]
            }
        };
    default:
    return state;
}
}
