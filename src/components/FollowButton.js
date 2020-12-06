import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../redux/actions/userActions';

export class FollowButton extends Component {
  followed = () => {
    if (
      this.props.user.following &&
      this.props.user.following.find(
        (follow) => follow.username === this.props.username
      )
    )
      return true;
    else return false;
  };
  followUser = () => {
    this.props.followUser(this.props.username);
  };
  unfollowUser = () => {
    this.props.unfollowUser(this.props.username);
  };
  render() {
    const { authenticated } = this.props.user;
    const flag = this.followed();
    //console.log(flag);
    const followButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Follow">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : flag ? (
      <MyButton tip="Unfollow" onClick={this.unfollowUser}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Follow" onClick={this.followUser}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return followButton;
  }
}

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  followUser,
  unfollowUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FollowButton);
