import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import axios from "axios";

const styles = {
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
};

class CreateList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      body: "",
      title: "",
      errors: {},
    };
    this.cancel = "";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", title:"", open: false, errors: {} });
    }
  }

  handleSetData = (event) => {
    const data = JSON.parse(event.currentTarget.value);
    this.setState({data: data});
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  resetStates = () =>{
    this.setState({
      title: "",
      open: false,
      body: "",
      errors: {},
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const PostUrl = "https://us-central1-favfay-ec70a.cloudfunctions.net/api/lists";
    axios.post(PostUrl, {
      public: true,
      body: this.state.body,
      title: this.state.title
    })
    .then(res => {
      console.log("LIST CREATED");
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      console.log("CREATE LIST ERROR");
    })
    this.resetStates();
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create a List!!!!">
          Create List
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
          <DialogTitle>Create a new list</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
            <TextField
                name="title"
                type="text"
                label="Title of List!!"
                placeholder="Fav film book etc"
                error={errors.title ? true : false}
                helperText={errors.title}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="body"
                type="text"
                label="Body of List!!"
                placeholder="Fav film book etc"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreateList.propTypes = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(
  withStyles(styles)(CreateList)
);
