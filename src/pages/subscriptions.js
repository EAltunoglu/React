import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios';

import Fav from '../components/Fav';
import Profile from '../components/Profile';

import { connect } from 'react-redux';

class subscriptions extends Component {
    
    constructor(){
        super();
        this.state = {
            results: []
        }
    }
    /*
    getData = () => {
        const following = this.props.user.following;
        let favs = [];
        following.forEach(follow => {
            axios
            .get(`/fav/sub/${follow.username}`)
            .then(res => {
                console.log("RES");
                console.log(res);
                //favs = favs.concat(res.data);
                this.setState({results: this.state.results.concat(res.data)})
            })
            .catch(err => {
                console.log(err);
                console.log("CANT GET favs");
            })
        });
        //favs.map((fav) => <Fav key={fav.favId} fav={fav} />
    }
    */
    renderResults = () => {

        const { results } = this.state;
        console.log("RESULTS");
        console.log(results);
        /*
        favs.sort(function(a, b) {
            var keyA = new Date(a.createdAt),
              keyB = new Date(b.createdAt);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        */
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
            {this.renderResults()}
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
