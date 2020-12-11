import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeFav, unlikeFav } from '../redux/actions/dataActions';

export class LikeButton extends Component {
  constructor(){
    super();
    this.state = {
      authenticated: null
    }
  }
  likedFav = () => {
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
    this.props.likeFav(this.props.favId);
  };
  unlikeFav = () => {
    this.props.unlikeFav(this.props.favId);
  };

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    console.log("EHEHEHEH");
    console.log(nextProps);
    if (nextProps.user) {
        this.setState({ authenticated: nextProps.user.authenticated });
    }
  }

  render() {
    console.log("RENDER");
    console.log(this.props);

    if(this.props.user !== undefined){
      const { authenticated } = this.props.user;
      const likeButton = !authenticated ? (
        <Link to="/login">
          <MyButton tip="Like">
            <FavoriteBorder color="primary" />
          </MyButton>
        </Link>
      ) : this.likedFav() ? (
        <MyButton tip="Undo like" onClick={this.unlikeFav}>
          <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likeFav}>
          <FavoriteBorder color="primary" />
        </MyButton>
      );
      return likeButton;
    } else {
      return(
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
          
        </MyButton>
      )
    }
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  favId: PropTypes.string.isRequired,
  likeFav: PropTypes.func.isRequired,
  unlikeFav: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeFav,
  unlikeFav
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
