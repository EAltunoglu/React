import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_FAV,
    UNLIKE_FAV,
    MARK_NOTIFICATIONS_READ,
    FOLLOW_USER,
    UNFOLLOW_USER
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
    following: [],
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
      case LIKE_FAV:
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              username: state.credentials.username,
              favId: action.payload.favId
            }
          ]
        };
      case UNLIKE_FAV:
        return {
          ...state,
          likes: state.likes.filter(
            (like) => like.favId !== action.payload.favId
          )
        };
      case MARK_NOTIFICATIONS_READ:
        state.notifications.forEach((not) => (not.read = true));
        return {
          ...state
        };
      case FOLLOW_USER:
        console.log("STATE:");
        console.log(state);
        console.log("ACTION:");
        console.log(action);
        return {
          ...state,
          following: [
            ...state.following,
            {
              username: action.payload.recipient,
            }
          ]
        };
      case UNFOLLOW_USER:
        console.log("UNFOLLOW_USER");
        console.log(state);
        console.log(action);
        return {
          ...state,
          following: state.following.filter(
            (follow) => follow.username !== action.payload.recipient
          )
        };
      default:
        return state;
    }
  }