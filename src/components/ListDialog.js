import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import ListItems from './ListItems';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
// Redux stuff
import { connect } from 'react-redux';
import axios from 'axios';
import ButtonGroupList from './ButtonGroupList';
import { ButtonGroup } from '@material-ui/core';

const styles = ({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

class ListDialog extends Component {
  state = {
    open: false,
    items: []
  };
  componentDidMount() {
    console.log("HELLO");
    console.log(this.props);
    /*
    if (this.props.openDialog) {
      this.handleOpen();
    }
    */
   console.log(this.props.list.listId);
    axios.get(`https://us-central1-favfay-ec70a.cloudfunctions.net/api/lists/${this.props.list.listId}/get`)
        .then(res => {
          console.log(res.data);
          this.setState({items: res.data});
        })
        .catch(err => {
          console.log(err);
        })
  }
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    //window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    //this.props.clearErrors();
  };

  render() {
    const {
      classes,
      list: {
        listId,
        body,
        createdAt,
        imageUrl,
        username,
        //public,
        updatedAt,
        title
      },
      UI: { loading }
    } = this.props;

    console.log("ANANA");
    console.log(this.state.items);
    console.log(this.props);
    console.log("PROPS");
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${username}`}
          >
            @{username}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <ButtonGroupList listId={listId}>

          </ButtonGroupList>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <ListItems items={this.state.items} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand List"
          tipClassName={classes.expandButton}
        >
        <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ListDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(ListDialog));
