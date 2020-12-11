import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Profile from "../components/Profile";
import List from '../components/List';

import { connect } from "react-redux";

import axios from "axios";

class lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      loading: true,
    };
  }
  componentDidMount() {
    const username = this.props.user.credentials.username;

    axios
      .get(`https://us-central1-favfay-ec70a.cloudfunctions.net/api/lists/${username}`)
      .then((res) => {
        this.setState({lists: res.data, loading: false});
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { lists, loading } = this.state;

    let listsMarkup = !loading ? (
      lists.map((list) => <List key={list.listId} list={list}/>)
      

    ) : (
      <div>
          HELLO
      </div>
    );
    
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {listsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

lists.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(lists);
