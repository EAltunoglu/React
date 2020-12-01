import React, { Component } from 'react'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FollowButon from './FollowButton';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = ({
    userImage: {
      maxWidth: '100%',
      height: 30,
      objectFit: 'cover',
      borderRadius: '50%'
    }
  });

export class WhoToFollow extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount(){
        axios.get("https://us-central1-favfay-ec70a.cloudfunctions.net/api/whotofollow")
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
                    Who To Follow
                </Typography>
            {results.map(result => {
                return(
                    <div>
                        <img
                        src={result.imageUrl}
                        alt="comment"
                        className={classes.userImage}
                        />
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${result.username}`}
                            color="primary"
                        >
                            {result.username}
                        </Typography>
                        <FollowButon username={result.username}/>
                    </div>
                )
            })
            }
            </Paper>
        )
    }
}

export default withStyles(styles)(WhoToFollow)
