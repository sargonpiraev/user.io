import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory, Route, Router, RouterState } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import userSearchPage, { IUserSearchPageState } from './store/reducer/userSearchPage'
import userUpdatePage, { IUserUpdatePageState } from './store/reducer/userUpdatePage'

import UserSearchPage, { } from './component/UserSearchPage'
import UserUpdatePage from './component/UserUpdatePage'

export interface IState {
	[ key: string ]: IUserSearchPageState | IUserUpdatePageState | RouterState,
	userSearchPage: IUserSearchPageState,
	userUpdatePage: IUserUpdatePageState,
	routing: RouterState
}

const store = createStore(
	combineReducers({
		routing: routerReducer,
		userSearchPage,
		userUpdatePage
	}),
	applyMiddleware(thunk)
)

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history }>
			<Route path='/' component={ UserSearchPage } />
			<Route path='/user/:id' component={ UserUpdatePage } />
		</Router>
	</Provider>,
	document.getElementById('root')
)
