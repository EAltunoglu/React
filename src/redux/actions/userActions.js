import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    UNFOLLOW_USER,
    FOLLOW_USER
} from '../types';
import axios from 'axios';

axios.defaults.baseURL = "https://us-central1-favfay-ec70a.cloudfunctions.net/api"

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/login', userData)
        .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
dispatch({ type: LOADING_UI });
axios
    .post('/signup', newUserData)
    .then((res) => {
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
    })
    .catch((err) => {
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data
    });
    });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FavIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user')
        .then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
        })
        .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
dispatch({ type: LOADING_USER });
    axios
        .post('/user/image', formData)
        .then(() => {
        dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
dispatch({ type: LOADING_USER });
    axios
        .post('/user', userDetails)
        .then(() => {
        dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
        .post('/notifications', notificationIds)
        .then((res) => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        });
        })
        .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
    const FavIdToken = `Bearer ${token}`;
    localStorage.setItem('FavIdToken', FavIdToken);
    axios.defaults.headers.common['Authorization'] = FavIdToken;
};

// Like a fav
export const followUser = (username) => (dispatch) => {
    console.log("follow user:");
    console.log(username);
    axios
      .get(`/follow/${username}`)
      .then((res) => {
        dispatch({
          type: FOLLOW_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a fav
export const unfollowUser = (username) => (dispatch) => {
    console.log("unfollowUSer:");
    console.log(username);
    axios
    .get(`/unfollow/${username}`)
    .then((res) => {
    dispatch({
        type: UNFOLLOW_USER,
        payload: res.data
    });
    })
    .catch((err) => console.log(err));
};