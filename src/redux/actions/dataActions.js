import {
    SET_FAVS,
    LOADING_DATA,
    LIKE_FAV,
    UNLIKE_FAV,
    DELETE_FAV,
    SET_ERRORS,
    POST_FAV,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_FAV,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    CHANGE_THEME,
    SUBMIT_ITEM
} from '../types';
import axios from 'axios';

axios.defaults.baseURL = "https://us-central1-favfay-ec70a.cloudfunctions.net/api"

// Get all favs
export const getFavs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/favs')
    .then((res) => {
      dispatch({
        type: SET_FAVS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_FAVS,
        payload: []
      });
    });
};
export const getFav = (FavId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/fav/${FavId}`)
    .then((res) => {
      dispatch({
        type: SET_FAV,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a fav
export const postFav = (newFav) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/fav', newFav)
    .then((res) => {
      dispatch({
        type: POST_FAV,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a fav
export const likeFav = (favId) => (dispatch) => {
  axios
    .get(`/fav/${favId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_FAV,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a fav
export const unlikeFav = (favId) => (dispatch) => {
  axios
    .get(`/fav/${favId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_FAV,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const submitComment = (favId, commentData) => (dispatch) => {
  axios
    .post(`/fav/${favId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const submitItem = (listId, itemData) => (dispatch) => {
  axios
    .post(`/lists/${listId}/add`, itemData)
    .then((res) => {
      dispatch({
        type: SUBMIT_ITEM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteFav = (favId) => (dispatch) => {
  axios
    .delete(`/fav/${favId}`)
    .then(() => {
      dispatch({ type: DELETE_FAV, payload: favId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (username) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: SET_FAVS,
        payload: res.data.favs
      });
    })
    .catch(() => {
      dispatch({
        type: SET_FAVS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const changeTheme = () => (dispatch) => {
  dispatch({ type: CHANGE_THEME });
}