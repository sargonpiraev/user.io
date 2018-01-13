import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Container, Divider, Header, Icon, Image, Input, Loader } from 'semantic-ui-react'
import ProgressiveImage from 'react-progressive-image'

import { userNameChange } from './../store/action/userNameChange'
import { userNameEditorEnable } from './../store/action/userNameEditorEnable'
import { userReview } from './../store/action/userReview'
import { userUpdate } from './../store/action/userUpdate'
import { WithRouterProps } from 'react-router'
import { IState } from '../index'

import { placeholder } from './User'

export class UserUpdatePage extends React.Component<any, any> {

	constructor(props: any) {
		super(props)
		this.onNameChange = this.onNameChange.bind(this)
		this.onEditNameClick = this.onEditNameClick.bind(this)
		this.onNameUpdateClick = this.onNameUpdateClick.bind(this)
	}

	public render() {
		return (
			<Container style={ { padding: '1rem 0' } }>
				<Header as='h1'>User update page</Header>
				<Divider />
				{ this.props.user ? this.renderUser() : this.renderLoader() }
			</Container>
		)
	}

	public componentDidMount() {
		this.props.userReview(parseInt(this.props.id, 10))
	}

	public renderName() {
		return (
			<div>
				<span id='name'>{ this.props.user.name }</span>
				&nbsp;
				<Icon name='pencil' onClick={ this.onEditNameClick } />
			</div>
		)
	}

	public renderNameEditor() {
		return (
			<Input
				fluid
				size='mini'
				action={<Button onClick={ this.onNameUpdateClick } >Update</Button>}
				value={ this.props.user.name }
				placeholder='Enter name...'
				onChange={ this.onNameChange }
			/>
		)
	}

	public onNameUpdateClick() {
		this.props.userUpdate().then(() => {
			this.props.router.push('/')
		})
	}

	public onNameChange(e: React.FormEvent<HTMLInputElement>) {
		this.props.userNameChange(e.currentTarget.value)
	}

	public onEditNameClick() {
		this.props.userNameEditorEnable()
	}

	public onPrevPageClick() {
		this.props.userSearch('prev')
	}

	public onNextPageClick() {
		this.props.userSearch('next')
	}

	public renderUser() {
		return (
			<Card centered>
				<ProgressiveImage src={ this.props.user.avatarUrl } placeholder={ placeholder }>
					{ (src: string) => <Image width='100%' src={ src } /> }
				</ProgressiveImage>
				<Card.Content>
					<Card.Header>
						{ this.props.isUserNameEditorEnabled ? this.renderNameEditor() : this.renderName() }
					</Card.Header>
					<Card.Description>ID: { this.props.user.id }</Card.Description>
				</Card.Content>
			</Card>
		)
	}

	public renderLoader() {
		return <Loader>Loading</Loader>
	}

}

const mapStateToProps = (state: IState, { params }: WithRouterProps) => {
	return {
		...state.userUpdatePage,
		id: params.id
	}
}

const mapDispatchToProps = { userNameEditorEnable, userReview, userUpdate, userNameChange }

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdatePage)
