import { Action, Dispatch } from 'redux'
import { IState } from './../../'
import { IUserState } from '../reducer/index'

export const USER_SEARCH_REQUEST = 'USER_SEARCH_REQUEST'
export type USER_SEARCH_REQUEST = typeof USER_SEARCH_REQUEST
const userSearchRequest = () => ({ type: USER_SEARCH_REQUEST })

export const USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS'
export type USER_SEARCH_SUCCESS = typeof USER_SEARCH_SUCCESS
const userSearchSuccess = (res: IUserSearchResponse) => ({ type: USER_SEARCH_SUCCESS, res })

export const USER_SEARCH_FAILURE = 'USER_SEARCH_FAILURE'
export type USER_SEARCH_FAILURE = typeof USER_SEARCH_FAILURE
const userSearchFailure = (err: Response) => ({ type: USER_SEARCH_FAILURE, err })

export type Direction = 'prev' | 'next'

export interface IUserSearchRequestAction {
	type: USER_SEARCH_REQUEST
}

export interface IUserSearchSuccessAction {
	type: USER_SEARCH_SUCCESS,
	res: IUserSearchResponse
}

export interface IUserSearchFailureAction {
	type: USER_SEARCH_FAILURE,
	err: Response
}

export type IUserSearchAction = IUserSearchRequestAction | IUserSearchSuccessAction | IUserSearchFailureAction

export interface IUserSearchResponse {
	result: IUserState[],
	nextPageUrl: string,
	prevPageUrl: string
}

export const userSearch = (direction: Direction) => (dispatch: Dispatch<Action>, getState: () => IState) => {
	dispatch(userSearchRequest())
	const urlProp: string = direction === 'prev' ? 'prevPageUrl' : 'nextPageUrl'
	const url: string = getState().userSearchPage[urlProp as string] || '/api/users'
	return fetch(`${ url }`).then((res: Response) => res.json()).then((res: IUserSearchResponse) => {
		dispatch(userSearchSuccess(res))
	}).catch((err: Response) => {
		dispatch(userSearchFailure(err))
	})
}

export default userSearch
