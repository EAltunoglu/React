import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Fav from '../components/Fav';
import Profile from '../components/Profile';
import FavSkeleton from '../util/FavSkeleton';

import { connect } from 'react-redux';
import { getFavs } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getFavs();
  }
  render() {
    const { favs, loading } = this.props.data;
    let recentFavsMarkup = !loading ? (
      favs.map((fav) => <Fav key={fav.favId} fav={fav} />)
    ) : (
      <FavSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentFavsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getFavs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getFavs }
)(home);
