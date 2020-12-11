import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    search: {
      position: 'fixed',
      //left: '85%',
	  right: '1%',
	  top: '1.3%',
	  marginTop: 5,
	},
	results: {
		backgroundColor: 'red',
	}
});

class SearchUser extends React.Component {

	constructor( props ) {
		super( props );
		
		this.state = {
			query: '',
			results: {},
			loading: false,
		};

		this.cancel = ''
	}
/*
	handleOpen = (event) => {
		this.setState({ anchorEl: event.target });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};
*/
	fetchSearchResults = ( query ) => {
        //console.log("query:");
        //console.log(query);

		if( this.cancel ) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();

		axios.post('https://us-central1-favfay-ec70a.cloudfunctions.net/api/search/user', {
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
		const { classes } = this.props;
			if( results && Object.keys( results ).length && results.length ) {
				return(
				<ul className={classes.results}> {
				results.map( result => {
					return(
						/*
						<MenuItem key={result.username} onClick={this.handleClose}>
							<Typography
								component={Link}
								color="default"
								variant="body1"
								to={`/users/${result.username}`}
							>
								{result.username}
							</Typography>
						</MenuItem>
						*/
						<li>
							<Button component={Link} to={`/users/${result.username}`} >
								{result.username}
							</Button>
						</li>
					)
				})}
				</ul>
				)
		}
	};

	render() {
		const { query, loading, message } = this.state;
		const { classes } = this.props;
		return (
			<div className={classes.search}>
                <label>
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
						
						{/*
						
						<Menu
							open={this.state.query !== ''}
							onClose={this.handleClose}
						>
							{ this.renderSearchResults() }
						</Menu>
							Result*/}
						
						{this.renderSearchResults()}
			</div>
		)
	}
}

export default withStyles(styles)(SearchUser);