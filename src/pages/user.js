import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Fav from '../components/Fav';
import StaticProfile from '../components/StaticProfile';
import Grid from '@material-ui/core/Grid';

import FavSkeleton from '../util/FavSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    favIdParam: null
  };
  componentDidMount() {
    const username = this.props.match.params.username;
    const favId = this.props.match.params.favId;

    if (favId) this.setState({ favIdParam: favId });

    this.props.getUserData(username);
    axios
      .get(`/user/${username}`)
      .then((res) => {
          console.log(res.data.user);
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { favs, loading } = this.props.data;
    const { favIdParam } = this.state;

    const favsMarkup = loading ? (
      <FavSkeleton />
    ) : favs === null ? (
      <p>No favs from this user</p>
    ) : !favIdParam ? (
      favs.map((fav) => <Fav key={fav.favId} fav={fav} />)
    ) : (
      favs.map((fav) => {
        if (fav.favId !== favIdParam)
          return <Fav key={fav.favId} fav={fav} />;
        else return <Fav key={fav.favId} fav={fav} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {favsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
