import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { LikeButton } from './LikeButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = ({
    favImage: {
      maxWidth: '100%',
      height: 30,
      objectFit: 'cover',
    }
  });

export class Trend extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount(){
        axios.get("https://us-central1-favfay-ec70a.cloudfunctions.net/api/trends")
        .then(res => {
            this.setState({results: res.data});
        })
        .catch(err => {
            console.log(err);
            console.log("FFF");
        })
    }

    render() {
        const { results } = this.state;
        const { classes } = this.props;
        return (
            <Paper>
                <Typography>
                    Trending
                </Typography>
            {results.map(result => {
                return(
                    <div>
                        <img
                        src={result.data.imageUrl}
                        alt="image"
                        className={classes.favImage}
                        />
                        <Typography
                            variant="h6"
                            color="primary"
                            component={Link}
                            to={`/users/${result.username}/fav/${result.favId}`}
                        >
                            {result.data.title}
                        </Typography>
                        
                        <LikeButton favId={result.favId}/>
                    </div>
                )
            })
            }
            </Paper>
        )
    }
}

Trend.propTypes = {
    user: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {})(withStyles(styles)(Trend))
