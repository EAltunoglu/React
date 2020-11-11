import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../redux/actions/dataActions';

export class FollowButton extends Component {
  followed = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.favId === this.props.favId
      )
    )
      return true;
    else return false;
  };
  likeFav = () => {
    this.props.followUser(this.props.favId);
  };
  unlikeFav = () => {
    this.props.unfollowUser(this.props.favId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.followed() ? (
      <MyButton tip="Unfollow" onClick={this.unfollowUser}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Follow" onClick={this.followUser}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  //favId: PropTypes.string.isRequired,
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
