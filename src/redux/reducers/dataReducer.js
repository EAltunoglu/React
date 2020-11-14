import {
    SET_FAVS,
    LIKE_FAV,
    UNLIKE_FAV,
    LOADING_DATA,
    DELETE_FAV,
    POST_FAV,
    SET_FAV,
    SUBMIT_COMMENT,
} from '../types';

const initialState = {
    users: [],
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
        let index2 = state.favs.findIndex(
            (fav) => fav.favId === action.payload
        );
        state.favs.splice(index2, 1);
        return {
            ...state
        };
    case POST_FAV:
        return {
            ...state,
            favs: [action.payload, ...state.favs]
        };
    case SUBMIT_COMMENT:
       /* console.log("ACTION");
        console.log(action);
        console.log("ACTION ENDED");
        console.log("STATE DATA");
        console.log(state);
        console.log("STATE DATA ENDED");
        */
        let temp = state.favs.findIndex(
            (fav) => fav.favId === action.payload.favId
        );
        /*console.log("INDEX");
        console.log(temp);
        console.log("INDEX");*/
        state.favs[temp].commentCount = state.favs[temp].commentCount + 1;
        //console.log(state.favs[temp].commentCount);
        return {
            ...state,
            fav: {
                ...state.fav,
                comments: [action.payload, ...state.fav.comments],
                commentCount: state.fav.commentCount + 1
            },
        };
    default:
        return state;
}
}
