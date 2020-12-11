import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import PostFav from './PostFav';
import Notifications from './Notifications';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import SearchUser from './SearchUser';
import CreateList from './CreateList';
import withStyles from '@material-ui/core/styles/withStyles';

import {changeTheme} from '../redux/actions/dataActions';

const styles = theme => ({
    searchh: {
      position: 'fixed',
      top: '2%',
      right: '1%',
      //marginTop: 5,
      objectFit: 'cover',
      align: 'center'
    }
});

class Navbar extends Component {

  render() {
    const { authenticated, isDarkMode, classes } = this.props;
    return (
      <AppBar color='primary'>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostFav />
              <CreateList/>
              <Link to="/home">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
              <Link to="/subscriptions">
                SUBSCRIPTIONS
              </Link>
              <Link to="lists">
                Lists
              </Link>
              <Switch
                checked={isDarkMode}
                onChange={this.props.changeTheme}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <div className={classes.search}>
                <SearchUser/>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  isDarkMode: state.UI.isDarkMode
});

export default connect(mapStateToProps, {changeTheme})(withStyles(styles)(Navbar));
