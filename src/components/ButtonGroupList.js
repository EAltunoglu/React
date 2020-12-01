import React, { Component } from "react";
//import MyButton from '../util/MyButton';
import Button from "@material-ui/core/Button";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ButtonGroup } from "@material-ui/core";
import { submitItem } from "../redux/actions/dataActions";

export class ButtonGroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      query: "",
      results: {},
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
      instance
        .get(SearchUrl)
        .then((res) => {
          console.log(res);
          console.log("ASDDSAASD");
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log("ERROR WHILE FETCHING FILMS");
        });
    } else if (selected === 3) {
    }
  };

  handleType = (event) => {
    const type = event.currentTarget.value;
    this.setState({ selected: type });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, results: {} });
    } else {
      this.setState({ query }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  submitBook = (event) => {
    const data = JSON.parse(event.currentTarget.value);
    this.props.submitItem(this.props.listId, {
        type: parseInt(this.state.selected),
        data,
      });
  };

  renderSearchResults = () => {
    const { selected, results } = this.state;

    if (results && Object.keys(results).length && results.length) {
      if (selected === "1") {
        return (
          <div>
            {" "}
            {results.map((result) => {
              var data = {
                title: result.volumeInfo.title,
                publisher: result.volumeInfo.publisher,
                author: result.volumeInfo.authors,
                imageUrl:
                  typeof result.volumeInfo.imageLinks.thumbnail !== "undefined"
                    ? result.volumeInfo.imageLinks.thumbnail
                    : "no-img.png",
              };
              data = JSON.stringify(data);
              return (
                <Button value={data} onClick={this.submitBook}>
                  {result.volumeInfo.title}
                </Button>
              );
            })}
          </div>
        );
      }
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <Button tip="Add a Book to list" value="1" onClick={this.handleType}>
          Add a Book
        </Button>
        <Button tip="Add a Film to list" value="2" onClick={this.handleType}>
          Add a Film
        </Button>
        <Button tip="Add a Music to list" value="3" onClick={this.handleType}>
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
      </div>
    );
  }
}

ButtonGroupList.propTypes = {
  submitItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { submitItem })(ButtonGroupList);
//export default ButtonGroupList;
