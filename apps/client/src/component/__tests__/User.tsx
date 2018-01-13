import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import * as React from 'react'
import * as renderer from 'react-test-renderer'
import User from './../User'

test('User', () => {
	const component = renderer.create(
		<User id={ 1 } name='John Doe' avatarUrl='https://ya.ru/favicon.ico' />
	)
	const tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
