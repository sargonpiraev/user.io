import { USER_NAME_CHANGE, IUserNameChangeAction } from './../action/userNameChange'
import { USER_NAME_EDITOR_ENABLE, IUserNameEditorEnableAction } from './../action/userNameEditorEnable'
import { USER_REVIEW_SUCCESS, IUserReviewAction } from './../action/userReview'
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, IUserUpdateAction } from './../action/userUpdate'
import { IUserState } from './'

export const DEFAULT_STATE = {
	isUpdating: false,
	isUserNameEditorEnabled: false,
	user: undefined
}

export interface IUserUpdatePageState {
	isUpdating: boolean,
	isUserNameEditorEnabled: boolean,
	user?: IUserState
}

export type UserUpdatePageAction =
	IUserNameChangeAction |
	IUserReviewAction |
	IUserUpdateAction |
	IUserNameEditorEnableAction

export default (state: IUserUpdatePageState = DEFAULT_STATE, action: UserUpdatePageAction) => {
	switch (action.type) {
		case USER_NAME_CHANGE:
			return {
				...state,
				user: {
					...state.user,
					name: action.value
				}
			}
		case USER_NAME_EDITOR_ENABLE:
			return {
				...state,
				isUserNameEditorEnabled: true
			}
		case USER_REVIEW_SUCCESS:
			return {
				...state,
				user: action.user
			}
		case USER_UPDATE_REQUEST:
			return {
				...state,
				isUpdating: true
			}
		case USER_UPDATE_SUCCESS:
			return {
				...state,
				isUpdating: false,
				isUserNameEditorEnabled: false
			}
		default:
			return state
	}
}
