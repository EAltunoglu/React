import React from 'react';
//import '../Search.css';
import axios from 'axios';
//import Loader from '../loader.gif';
// import 'bootstrap/dist/css/bootstrap.min.css';
//import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

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
                //console.log("aaa");
                console.log(error);
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
        console.log("results:");
        console.log(results)
		if ( results && Object.keys( results ).length && results.length ) {
			return (
				<ul className="results-container">
					{ results.map( result => {
						return (
							<li>
								{result.username}
							</li>
						)
					} ) }

				</ul>
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
                        placeholder="Search..."
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