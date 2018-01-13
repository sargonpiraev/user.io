import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Grid, Header, Loader } from 'semantic-ui-react'
import { IState } from './..'
import { IUserState } from './../store/reducer'

import User from './User'

import { userSearch, Direction } from './../store/action/userSearch'
import { Action, Dispatch } from 'redux'

export interface IProps {
	userSearch: (direction?: Direction) => (dispatch: Dispatch<Action>, getState: () => IState) => Promise<void>,
	users?: IUserState[],
	nextPageUrl?: string,
	prevPageUrl?: string
}

export class UserSearchPage extends React.Component<IProps, {}> {

	constructor(props: IProps) {
		super(props)
		this.onNextPageClick = this.onNextPageClick.bind(this)
		this.onPrevPageClick = this.onPrevPageClick.bind(this)
	}

	public render() {
		return (
			<Container style={ { padding: '1rem 0' } }>
				<Header as='h1'>User search page</Header>
				<Divider />
				{ this.props.users ? this.renderGrid() : this.renderLoader() }
			</Container>
		)
	}

	public componentDidMount() {
		this.props.userSearch('next')
	}

	public onPrevPageClick() {
		this.props.userSearch('prev')
	}

	public onNextPageClick() {
		this.props.userSearch('next')
	}

	public renderGrid() {
		const { users, prevPageUrl, nextPageUrl } = this.props
		return (
			<div>
				<Grid>{ (users || []).map(this.renderColumn) }</Grid>
				<Divider />
				<Button disabled={ !prevPageUrl } floated='left' onClick={ this.onPrevPageClick } id='prev'>Prev page</Button>
				<Button disabled={ !nextPageUrl } floated='right' onClick={ this.onNextPageClick } id='next'>Next page</Button>
			</div>
		)
	}

	public renderColumn(user: IUserState) {
		return (
			<Grid.Column width={ 4 } key={ user.id } >
				<User { ...user } />
			</Grid.Column>
		)
	}

	public renderLoader() {
		return <Loader>Loading</Loader>
	}

}

const mapStateToProps = (state: IState) => {
	return { ...state.userSearchPage }
}

const mapDispatchToProps = { userSearch }

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchPage)
