import { IState } from '../../index'
import { Action, Dispatch} from 'redux'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export type USER_UPDATE_REQUEST = typeof USER_UPDATE_REQUEST
const userUpdateRequest = () => ({ type: USER_UPDATE_REQUEST })

export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export type USER_UPDATE_SUCCESS = typeof USER_UPDATE_SUCCESS
const userUpdateSuccess = (res: Response) => ({ type: USER_UPDATE_SUCCESS, res })

export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE'
export type USER_UPDATE_FAILURE = typeof USER_UPDATE_FAILURE
const userUpdateFailure = (err: Response) => ({ type: USER_UPDATE_FAILURE, err })

export interface IUserUpdateRequestAction {
	type: USER_UPDATE_REQUEST
}

export interface IUserUpdateSuccessAction {
	type: USER_UPDATE_SUCCESS,
	res: Response
}

export interface IUserUpdateFailureAction {
	type: USER_UPDATE_FAILURE,
	err: Response
}

export type IUserUpdateAction = IUserUpdateRequestAction | IUserUpdateSuccessAction | IUserUpdateFailureAction

export const userUpdate = () => (dispatch: Dispatch<Action>, getState: () => IState) => {
	const user = getState().userUpdatePage.user
	if (!user) { return }
	const { id, name, avatarUrl } = user
	dispatch(userUpdateRequest())
	return fetch(`/api/user/${ id }`, {
		body: JSON.stringify({ name, avatarUrl }),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST'
	}).then((res) => res.json()).then((res) => {
		dispatch(userUpdateSuccess(res))
	}).catch((err) => {
		dispatch(userUpdateFailure(err))
	})
}

export default userUpdate
