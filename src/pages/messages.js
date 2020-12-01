
import React, { Component }  from 'react';
//import './messages.css';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowMessages from '../components/ShowMessages';

/*

*/


class messages extends Component{
  constructor(props){
    super(props);
    console.log(props);
    console.log(this.props);
  }

  render(){
    return(
      <div>
        
      </div>
    );
  }
}

messages.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(messages);
