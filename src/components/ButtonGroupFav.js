import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';

export class ButtonGroupList extends Component {
    constructor(props){
        super(props);

        this.state = {
            selected: 0,
            query: '',
            results: {}
        }

        this.cancel = ''
    }
    
    fetchSearchResults = (query) => {
        const {selected} = this.state;
        console.log("FETCH RESULTS");
        console.log(selected);
        console.log(query);
        
        var instance = axios.create();
        delete instance.defaults.headers.common['Authorization'];

        if( this.cancel ) {
			this.cancel.cancel();
		}

        this.cancel = axios.CancelToken.source();

        if(selected === "1"){
            console.log("LOOKING BOOKS");
            const SearchUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
            instance.get(SearchUrl, {
                cancelToken: this.cancel.token
            })
            .then(res => {
                console.log("BOOK DATAS");
                console.log(res.data.items);
                this.setState({
                    results: res.data.items
                })
            })
            .catch(error => {
                console.log(error);
                console.log("ERROR WHILE FETCHING BOOKS");
            })
        } else if(selected === 2){

        } else if(selected === 3){

        }
    }

    handleType = (event) => {
        const type = event.currentTarget.value;
        console.log("HANDLE TYPE");
        console.log(type);
        this.setState({selected: type});
    }

    handleOnInputChange = ( event ) => {
        const query = event.target.value;
        console.log("QUERY CHANGE");
        console.log(query);
		if ( !query ) {
			this.setState( { query, results: {}} );
		} else {
			this.setState( { query }, () => {
				this.fetchSearchResults( query );
			} );
		}
	};

    submitBook = (event) => {
        const data = JSON.parse(event.currentTarget.value);
        
        axios.post(`https://us-central1-favfay-ec70a.cloudfunctions.net/api/lists/${this.props.listId}/add`,{
                type: parseInt(this.state.selected),
                data
        })
        .then(res => {

        })
        .catch(error => {
            console.log("ERRROR");
        })
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
                            onClick={this.submitBook}>
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
        const { query } = this.state;
        return (
            <div>
                <Button tip="Fav a Book" value="1" onClick={this.handleType}>
                    Add a Book
                </Button>
                <Button tip="Fav a Film" value="2" onClick={this.handleType}>
                    Add a Film  
                </Button>
                <Button tip="Fav a Music" value="3" onClick={this.handleType}>
                    Add a Music  
                </Button>
                {this.state.selected !== 0 &&
                    <label className="search-label" htmlFor="search-input">
                        <input
                            type="text"
                            name="query"
                            value={ query }
                            id="search-input"
                            placeholder="Search Content"
                            onChange={this.handleOnInputChange}
                        />
                    </label>
                }

                {this.renderSearchResults()}
            </div>
        )
    }
}

export default ButtonGroupList
