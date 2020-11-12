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
    SUBMIT_COMMENT
} from '../types';
import axios from 'axios';
  
// Get all favs
export const getFavs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/favs')
    .then((res) => {
      //console.log("BBB");
      //console.log(res.data);
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
  //console.log("AGDDSADFADS");
  //console.log(favId);
  axios
    .get(`/fav/${favId}/like`)
    .then((res) => {
      //console.log("HAHAHAH");
      //console.log(res);
      //console.log("@22");
      //console.log(res.data);
      dispatch({
        type: LIKE_FAV,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a fav
export const unlikeFav = (favId) => (dispatch) => {
  //console.log("ASDSADSASD");
  //console.log(favId);
  axios
    .get(`/fav/${favId}/unlike`)
    .then((res) => {
      //console.log("GAGA");
      //console.log(res);
      //console.log("EEEE");
      //console.log(res.data);
      dispatch({
        type: UNLIKE_FAV,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a fav
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
