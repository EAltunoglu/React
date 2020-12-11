import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import ListDialog from './ListDialog';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    marginRight: 30,
    backgroundColor: theme.palette.background,
    //flexDirection: 'column'
    //minWidth: '100%',
    //border-style: solid,
  },
  image: {
    minWidth: 128,
    minHeight: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
});

class List extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      list: {
        body,
        createdAt,
        username,
        listId,
        //public,
        title,
        updatedAt,
        imageUrl
      },
      user: {
        authenticated,
      }
    } = this.props;

    /// HANDDLE
    //console.log(this.props);
    const deleteButton =
      authenticated && username === this.props.user.credentials.username ? (
        null
        //<DeleteFav favId={favId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
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
          <Typography
            variant="h6"
            color="secondary"
          >
            {title}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <ListDialog
            list={this.props.list}
            username={username}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

List.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(List));
