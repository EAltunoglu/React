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
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
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
  image: {
    minWidth: 128,
    minHeight: 200,
  },
  cardBook: {
    position: 'relative',
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'red',
    backgroundColor: theme.palette.background,
  },
  author: {
    position: 'absolute',
    right: '1%',
    variant: "h6",
    marginTop: 5,
  },
  actionsFooter: {
    position: 'absolute',
    display: 'block',
    bottom: '1%',
    right: '3%',
    float: 'right',
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
});

class PostFav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: "0",
      star: 1,
      query: "",
      data: null,
      results: {},
      open: false,
      body: "",
      errors: {},
    };
    this.cancel = "";
  }

  fetchSearchResults = (query) => {
    const { selected } = this.state;

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
      console.log("HEYYT");
      instance.get(SearchUrl)
          .then(res => {
              console.log(res);
              console.log("ASDDSAASD");
              console.log(res.data);
              this.setState({
                results: res.data.results
              })
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
    //this.setState({ open: false, errors: {} });
    this.resetStates();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetStates = () =>{
    this.setState({
      selected: "0",
      star: 1,
      query: "",
      data: null,
      results: {},
      open: false,
      body: "",
      errors: {},
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postFav({ body: this.state.body, data: this.state.data, star: this.state.star, type: parseInt(this.state.selected) });
    this.resetStates();
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
                <ul> {
                    results.map( result => {
                        var data = {
                            title: result.volumeInfo.title,
                            publisher: result.volumeInfo.publisher,
                            author: result.volumeInfo.authors,
                            imageUrl: result.volumeInfo.imageLinks.thumbnail ? result.volumeInfo.imageLinks.thumbnail : result.volumeInfo.imageLinks.smallThumbnail
                        }
                        data = JSON.stringify(data);
                        return(
                            <li key={data.imageUrl}>
                              <Button
                              value={data}
                              onClick={this.handleSetData}>
                                  {result.volumeInfo.title}
                              </Button>
                            </li>
                        )
                    })}
                </ul>
                )
            }
            else if(selected === "2"){
              return(
                <ul> {
                    results.map( result => {
                        var data = {
                            title: result.original_title,
                            release: result.release_date,
                            imageUrl: "https://image.tmdb.org/t/p/original" + result.poster_path 
                        }
                        data = JSON.stringify(data);
                        return(
                          <li>
                            <Button
                            value={data}
                            onClick={this.handleSetData}>
                                {result.original_title}
                            </Button>
                          </li>
                        )
                    })}
                </ul>
                )
            }
		}
	};

  renderData = () => {
    const {errors, selected, data, star} = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    if(selected === "1"){
      return(
        <Card className={classes.cardBook}>
          <CardMedia
            image={data.imageUrl}
            title="Book image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
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
            <TextField
                name="body"
                type="text"
                label="Fav!!"
                multiline
                rows="3"
                placeholder="Fav book"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Rating
            name="simple-controlled"
            value={star}
            onChange={(event, newValue) => {
              this.setState({star: newValue});
            }}
          />
          </CardContent>
            <CardActions>  
              <form onSubmit={this.handleSubmit}>
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
              </CardActions>
        </Card>
      )
    } else if(selected === "2"){
      return(
        <Card className={classes.cardFilm}>
          <CardMedia
            image={data.imageUrl}
            title="Book image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
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
            <TextField
                name="body"
                type="text"
                label="Fav!!"
                multiline
                rows="3"
                placeholder="Fav film"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Rating
            name="simple-controlled"
            value={star}
            onChange={(event, newValue) => {
              this.setState({star: newValue});
            }}
          />
          </CardContent>
            <CardActions>  
              <form onSubmit={this.handleSubmit}>
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
              </CardActions>
        </Card>
      )
    }
  }

  render() {
    const { errors, query, star, selected, data } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    if(data !== null){
      return(
        <Fragment>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          >
          {this.renderData()}
          </Dialog>
        </Fragment>
      )
    }
    if(selected !== "0"){
      return(
        <Fragment>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
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
            {this.renderSearchResults()}
          </Dialog>
        </Fragment>
      )
    }

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
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new fav</DialogTitle>
          <DialogContent>
            
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
