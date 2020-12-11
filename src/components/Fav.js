import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteFav from './DeleteFav';
import FavDialog from './FavDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux

import { connect } from 'react-redux';
import { Height } from '@material-ui/icons';
import { CardHeader } from '@material-ui/core';

const styles = theme => ({
  author: {
    position: 'absolute',
    //left: '85%',
    right: '1%',
    //float: 'right',
    //align: 'right',
    variant: "h6",
    marginTop: 5,
    //color: theme.palette.primary.type
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    //border-style: solid,
  },
  cardBook: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    marginRight: 30,
    borderStyle: 'solid',
    borderColor: 'red',
    backgroundColor: theme.palette.background,
    //flexDirection: 'column'
    //minWidth: '100%',
    //border-style: solid,
  },
  cardFilm: {
    color: theme.palette.primary.type,
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    marginRight: 30,
    borderStyle: 'solid',
    borderColor: 'blue',
    backgroundColor: theme.palette.background,
  },
  image: {
    minWidth: 128,
    minHeight: 200,
    //display: 'inline',
    //align: 'left'
    //float: 'left'
  },
  content: {
    //padding: 25,
    display: 'block'
    //objectFit: 'cover'
  },
  actionsFooter: {
    //bottom: '0%',
    //align: 'bottom',
    //float: 'bottom',
    //right: '50%',
    //display: 'inline'
    position: 'absolute',
    //objectFit: 'cover',
    display: 'block',
    bottom: '1%',
    right: '3%',
    //align: 'right',
    float: 'right',
    //justifyContent: 'space-between',
    //marginTop: '16',
  }
});

class Fav extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      fav: {
        body,
        createdAt,
        userImage,
        username,
        favId,
        likeCount,
        commentCount,
        type,
        data,
        star
      },
      user: {
        authenticated,
      }
    } = this.props;
    const deleteButton =
      authenticated && username === this.props.user.credentials.username ? (
        null
        //<DeleteFav favId={favId} />
      ) : null;
      if(type !== undefined && type === 1){
        return(
          <Card className={classes.cardBook}
          >
          <CardMedia
            image={data.imageUrl}
            title="Book image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
          <Rating name="read-only" value={star} readOnly />
          <Typography
              className={classes.author}
            >
              {data.author}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
            >
              {data.title}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            
          </CardContent>
          <CardActions className={classes.actionsFooter}>
            <LikeButton favId={favId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
            <FavDialog
              favId={favId}
              username={username}
              openDialog={this.props.openDialog}
            />
          </CardActions>
        </Card>
        )
      }
      if(type !== undefined && type === 2){
        return(
          <Card className={classes.cardFilm}
          >
          <CardMedia
            image={data.imageUrl}
            title="Film image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
          <Rating name="read-only" value={star} readOnly />
          <Typography
              className={classes.author}
            >
              {data.release}
            </Typography>
            <Typography
            >
              {data.title}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            
          </CardContent>
          <CardActions className={classes.actionsFooter}>
            <LikeButton favId={favId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
            <FavDialog
              favId={favId}
              username={username}
              openDialog={this.props.openDialog}
            />
          </CardActions>
        </Card>
        )
      }
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${username}`}
            color="primary"
          >
            {username}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton favId={favId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <FavDialog
            favId={favId}
            username={username}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Fav.propTypes = {
  user: PropTypes.object.isRequired,
  fav: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Fav));
