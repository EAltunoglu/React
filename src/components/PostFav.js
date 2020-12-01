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
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Rating from '@material-ui/lab/Rating';
// Redux stuff
import { connect } from "react-redux";
import { postFav, clearErrors } from "../redux/actions/dataActions";
import axios from "axios";
import { SentimentVerySatisfiedOutlined } from "@material-ui/icons";

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

class PostFav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: "0",
      star: 1,
      query: "",
      data: {},
      results: {},
      open: false,
      body: "",
      errors: {},
    };
    this.cancel = "";
  }

  fetchSearchResults = (query) => {
    const { selected } = this.state;
    console.log("FETCH RESULTS");
    console.log(selected);
    console.log(query);

    var instance = axios.create();
    delete instance.defaults.headers.common["Authorization"];

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    if (selected === "1") {
      console.log("LOOKING BOOKS");
      const SearchUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
      instance
        .get(SearchUrl, {
          cancelToken: this.cancel.token,
        })
        .then((res) => {
          console.log("BOOK DATAS");
          console.log(res.data.items);
          this.setState({
            results: res.data.items,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log("ERROR WHILE FETCHING BOOKS");
        });
    } else if (selected === "2") {
      const SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=6f4f38852998869540a47e5ce5550a6b&query=${query}`;
      instance.get(SearchUrl)
          .then(res => {
              console.log(res);
              console.log("ASDDSAASD");
              console.log(res.data);

          })
          .catch(error => {
              console.log(error);
              console.log("ERROR WHILE FETCHING FILMS");
          })
    } else if (selected === "3") {
    
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
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
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postFav({ body: this.state.body, data: this.state.data, star: this.state.star });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    console.log("QUERY CHANGE");
    console.log(query);
    if (!query) {
      this.setState({ query, results: {} });
    } else {
      this.setState({ query }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  handleType = (event) => {
    const type = event.currentTarget.value;
    console.log("HANDLE TYPE");
    console.log(type);
    this.setState({selected: type});
  }

  renderSearchResults = () => {
		const { selected, results } = this.state;
		
        if( results && Object.keys( results ).length && results.length ) {
            if(selected === "1"){
                return(
                <div> {
                    results.map( result => {
                        var data = {
                            title: result.volumeInfo.title,
                            publisher: result.volumeInfo.publisher,
                            author: result.volumeInfo.authors,
                            imageUrl: result.volumeInfo.imageLinks.thumbnail ? result.volumeInfo.imageLinks.thumbnail : result.volumeInfo.imageLinks.smallThumbnail
                        }
                        data = JSON.stringify(data);
                        return(
                            <Button
                            value={data}
                            onClick={this.handleSetData}>
                                {result.volumeInfo.title}
                            </Button>
                        )
                    })}
                </div>
                )
            }
		}
	};

  render() {
    const { errors, query, star } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Fav!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
        <Rating
          name="simple-controlled"
          value={star}
          onChange={(event, newValue) => {
            this.setState({star: newValue});
          }}
        />

          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new fav</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Fav!!"
                multiline
                rows="3"
                placeholder="Fav film book etc"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                tip="Add a Book to list"
                value="1"
                onClick={this.handleType}
              >
                Add a Book
              </Button>
              <Button
                tip="Add a Film to list"
                value="2"
                onClick={this.handleType}
              >
                Add a Film
              </Button>
              <Button
                tip="Add a Music to list"
                value="3"
                onClick={this.handleType}
              >
                Add a Music
              </Button>
              {this.state.selected !== 0 && (
                <label className="search-label" htmlFor="search-input">
                  <input
                    type="text"
                    name="query"
                    value={query}
                    id="search-input"
                    placeholder="Search Content"
                    onChange={this.handleOnInputChange}
                  />
                </label>
              )}
              {this.renderSearchResults()}
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

PostFav.propTypes = {
  postFav: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postFav, clearErrors })(
  withStyles(styles)(PostFav)
);
