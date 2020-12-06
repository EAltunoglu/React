import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import PropTypes from 'prop-types';

// Redux
//import { Provider } from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';
// import {} from './redux/'
import { connect } from 'react-redux';
// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import subscriptions from './pages/subscriptions';
import messages from './pages/messages';
import lists from './pages/lists';

const light = {
  palette:{
    primary: {
      light: '#33c9dc',
      main: '#11bcd4',
      dark: '#008394',
      contrastText: '#111',
      type: '#000'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#111'
    },
    typography: {
      useNextVariants: true
    },
    background: '#fff'
  },
};

const dark = {
  palette:{
    primary: {
      light: '#33c9dc',
      main: '#11bcd4',
      dark: '#101710',
      contrastText: '#fff',
      type: '#fff'
    },
    secondary: {
      light: '#101710',
      main: '#101710',
      dark: '#101710',
      contrastText: '#fff',
    },
    typography: {
      useNextVariants: true
    },
    background: '#000'
  },
};

const token = localStorage.FavIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){// Fixin date
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
    const appliedTheme = createMuiTheme(this.props.isDarkMode ? dark : light);
    return(
      <MuiThemeProvider theme={appliedTheme}>

        <div className="App">
          <Router>
          <Navbar/>
            <div className="container"> 
              <Switch>
                <Route path="/home" component={home}/>
                <AuthRoute path="/login" component={login}/>
                <AuthRoute path="/signup" component={signup}/>
                <Route exact path="/users/:username" component={user} />
                <Route
                  exact
                  path="/users/:username/fav/:favId"
                  component={user}
                />
                <Route
                  exact
                  path="/subscriptions"
                  component={subscriptions}
                />
                <Route
                  exact
                  path="/messages"
                  component={messages}
                />
                <Route
                  exact
                  path="/lists"
                  component={lists}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isDarkMode: state.UI.isDarkMode
});

export default connect(mapStateToProps)(App);
