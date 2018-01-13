import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import * as _ from 'lodash'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { UserSearchPage } from './../UserSearchPage'

const users = _.times(10, (i) => ({
	avatarUrl: 'https://www.google.com/favicon.ico',
	id: i,
	name: 'John Doe'
}))

test('userSearch prop should be called after render', () => {
	const component = renderer.create(<UserSearchPage userSearch={ jest.fn() } />)
	expect(component.root.instance.props.userSearch.mock.calls.length).toBe(1)
})

test('when users are not defined', () => {
	const tree = renderer.create(<UserSearchPage userSearch={ jest.fn() } />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('when users are defined', () => {
	const tree = renderer.create(
		<UserSearchPage
			users={ users }
			userSearch={ jest.fn() }
		/>
	).toJSON()
	expect(tree).toMatchSnapshot()
})

test('prev button should be disabled when prev page not defined', () => {
	const tree = renderer.create(
		<UserSearchPage
			userSearch={ jest.fn() }
			users={ users }
		/>
	).toJSON()
	expect(tree).toMatchSnapshot()
})

test('prev button should be enabled when prev page defined', () => {
	const tree = renderer.create(
		<UserSearchPage
			userSearch={ jest.fn() }
			users={ users }
			prevPageUrl='/api/users?offset=10'
		/>
	).toJSON()
	expect(tree).toMatchSnapshot()
})

test('next button should be disabled when next page not defined', () => {
	const tree = renderer.create(
		<UserSearchPage
			userSearch={ jest.fn() }
			users={ users }
		/>
	).toJSON()
	expect(tree).toMatchSnapshot()
})

test('next button should be enabled when next page defined', () => {
	const tree = renderer.create(
		<UserSearchPage
			userSearch={ jest.fn() }
			users={ users }
			nextPageUrl='/api/users?offset=10'
		/>
	).toJSON()
	expect(tree).toMatchSnapshot()
})

test('userSearch prop should be called on prev button click', () => {
	const component = renderer.create(
		<UserSearchPage
			userSearch={ jest.fn() }
			users={ users }
		/>
	)
	component.root.instance.onPrevPageClick()
	expect(component.root.instance.props.userSearch.mock.calls.length).toBe(2)
	expect(component.root.instance.props.userSearch.mock.calls[1][0]).toBe('prev')
})

test('userSearch prop should be called on next button click', () => {
	const component = renderer.create(
		<UserSearchPage
			userSearch={ jest.fn() }
			users={ users }
		/>
	)
	component.root.instance.onNextPageClick()
	expect(component.root.instance.props.userSearch.mock.calls.length).toBe(2)
	expect(component.root.instance.props.userSearch.mock.calls[1][0]).toBe('next')
})
