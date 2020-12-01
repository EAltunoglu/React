import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    CHANGE_THEME
  } from '../types';
  
  const initialState = {
    isDarkMode: localStorage.getItem('FavTheme') === 'true' ? true : false,
    loading: false,
    errors: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: null
        };
      case LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        };
      case CHANGE_THEME:
        localStorage.setItem("FavTheme", !state.isDarkMode);
        return{
          ...state,
          isDarkMode: !state.isDarkMode
          // loading
        }
      default:
        return state;
    }
  }
  