import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { UserUpdatePage } from './../UserUpdatePage'

test('userReview prop should be called after render', () => {
	const component = renderer.create(<UserUpdatePage id='1' userReview={ jest.fn() } />)
	expect(component.root.instance.props.userReview.mock.calls.length).toBe(1)
	expect(component.root.instance.props.userReview.mock.calls[0][0]).toBe(1)
})

test('user is not defined', () => {
	const tree = renderer.create(<UserUpdatePage id='1' userReview={ jest.fn() } />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('user is defined', () => {
	const user = { id: 1, name: 'John Doe', avatarUrl: 'https://www.google.com/favicon.ico' }
	const tree = renderer.create(
		<UserUpdatePage
			id='1'
			user={ user }
			userReview={ jest.fn() }
		/>
	).toJSON()
	expect(tree).toMatchSnapshot()
})
