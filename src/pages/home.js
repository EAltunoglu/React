import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Fav from '../components/Fav';
import Profile from '../components/Profile';
import FavSkeleton from '../util/FavSkeleton';
import WhoToFollow from '../components/WhoToFollow';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { getFavs } from '../redux/actions/dataActions';

const styles = theme => ({
  color: {
    backgroundColor: theme.palette.background
  }
});

class home extends Component {
  componentDidMount() {
    this.props.getFavs();
  }
  render() {
    const { favs, loading } = this.props.data;
    const { classes } = this.props;
    let recentFavsMarkup = !loading ? (
      favs.map((fav) => <Fav key={fav.favId} fav={fav} />)
    ) : (
      <FavSkeleton />
    );
    return (
      <Grid container spacing={16} className={classes.color}>
        <Grid item sm={8} xs={12}>
          {recentFavsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
          <WhoToFollow/>
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
)(withStyles(styles)(home));
