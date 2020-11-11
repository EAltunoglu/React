import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette:{
    primary: {
      light: '#33c9dc',
      main: '#11bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
    typography: {
      useNextVariants: true
    }
  },
  navbar: {
    color: 'red'
  }
});

 axios.defaults.baseURL = "https://us-central1-favfay-ec70a.cloudfunctions.net/api";
// axios.defaults.baseURL = "http://localhost:5000/favfay-ec70a/us-central1/api";

const token = localStorage.FavIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){// Nanosec
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return(
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <div className="App">
          <Router>
          <Navbar/>
            <div className="container"> 
              <Switch>
                <Route path="/home" component={home}/>
                <AuthRoute path="/login" component={login}/>
                <AuthRoute path="/signup" component={signup}/>
              </Switch>
            </div>
          </Router>
        </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;
