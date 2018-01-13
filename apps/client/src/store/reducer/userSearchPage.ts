import { USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS } from './../action/userSearch'
import { IUserState } from './'
import { IUserSearchAction } from '../action/userSearch'

export interface IUserSearchPageState {
	[key: string]: any,
	users?: IUserState[],
	nextPageUrl?: string,
	prevPageUrl?: string
}

export default (state: IUserSearchPageState = {}, action: IUserSearchAction) => {
	switch (action.type) {
		case USER_SEARCH_REQUEST:
			return {
				...state,
				users: null
			}
		case USER_SEARCH_SUCCESS:
			const { result, nextPageUrl, prevPageUrl } = action.res
			return {
				...state,
				nextPageUrl,
				prevPageUrl,
				users: result
			}
		default:
			return state
	}
}
