import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class SearchUser extends React.Component {

	constructor( props ) {
		super( props );
		
		this.state = {
			query: '',
			results: {},
			loading: false,
		};

		this.cancel = ''
	}

	fetchSearchResults = ( query ) => {
        console.log("query:");
        console.log(query);

		if( this.cancel ) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();

		axios.post('/search/user', {
            cancelToken: this.cancel.token,
            username: query
		})
			.then( res => {
                console.log(res);
				this.setState( {
					results: res.data,
					loading: false
				} )
			} )
			.catch( error => {
                //console.log(error);
				if ( axios.isCancel(error) || error ) {
					this.setState({
						loading: false,
					})
				}
			} )
	};

	handleOnInputChange = ( event ) => {
		const query = event.target.value;
		if ( !query ) {
			this.setState( { query, results: {}} );
		} else {
			this.setState( { query, loading: true}, () => {
				this.fetchSearchResults( query );
			} );
		}
	};

	renderSearchResults = () => {
		const { results } = this.state;
		
			if( results && Object.keys( results ).length && results.length ) {
				return(
				<div> {
				results.map( result => {
					return(
						<Button variant="h5" component={Link} to={`/users/${result.username}`}>
							{result.username}
						</Button>
					)
				})}
				</div>
				)
		}
	};

	render() {
		const { query, loading, message } = this.state;
		return (
			<div className="container">
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query"
                        value={ query }
                        id="search-input"
                        placeholder="Search Username"
                        onChange={this.handleOnInputChange}
                    />
                    <i className="fa fa-search search-icon" aria-hidden="true"/>
                </label>

						{/*	Error Message*/}
							{message && <p className="message">{ message }</p>}

						{/*	Loader*/}
						
						{/*	Result*/}
						{ this.renderSearchResults() }
			</div>
		)
	}
}