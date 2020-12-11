import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios';

import Fav from '../components/Fav';
import Profile from '../components/Profile';

import { connect } from 'react-redux';

class subscriptions extends Component {
    
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            results: [],
            loadedNum: 0
        }
    }

    componentDidMount(){
      const following = this.props.user.following;
      following.forEach(element => {
        axios
        .get(`https://us-central1-favfay-ec70a.cloudfunctions.net/api/fav/sub/${element.username}`)
        .then(res => {
            console.log("RES");
            console.log(res);
            this.setState({results: this.state.results.concat(res.data), loadedNum: this.state.loadedNum+1})
          })
        .catch(err => {
            console.log(err);
            console.log("CANT GET favs");
          })
      });
    }

    renderResults = () => {
      if(!this.state.loadedNum || !this.props.user.following || this.state.loadedNum !== this.props.user.following.length){
        return;
      }

      const { results } = this.state;
      console.log("RESULTS");
      console.log(results);
      //console.log("NOT LOADDED");
      //console.log(loadUsers);
      
      results.sort(function(a, b) {
        var keyA = new Date(a.createdAt),
          keyB = new Date(b.createdAt);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      
     if(results && results.length > 0){
          return( 
              results.map( fav => {
                  return (
                      <Fav key={fav.favId} fav={fav}/>
                  )
              })
          );
     }
    }

    render() {
        return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
            { this.renderResults()}
            </Grid>
            <Grid item sm={4} xs={12}>
            <Profile />
            </Grid>
        </Grid>
        );
    }
}

subscriptions.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(subscriptions);
