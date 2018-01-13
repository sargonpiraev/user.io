import { Action, Dispatch } from 'redux'
import { IUserState } from '../reducer'

export const USER_REVIEW_REQUEST = 'USER_REVIEW_REQUEST'
export type USER_REVIEW_REQUEST = typeof USER_REVIEW_REQUEST
const userReviewRequest = () => ({ type: USER_REVIEW_REQUEST })

export const USER_REVIEW_SUCCESS = 'USER_REVIEW_SUCCESS'
export type USER_REVIEW_SUCCESS = typeof USER_REVIEW_SUCCESS
const userReviewSuccess = (user: IUserState) => ({ type: USER_REVIEW_SUCCESS, user })

export const USER_REVIEW_FAILURE = 'USER_REVIEW_FAILURE'
export type USER_REVIEW_FAILURE = typeof USER_REVIEW_FAILURE
const userReviewFailure = (err: Response) => ({ type: USER_REVIEW_FAILURE, err })

export interface IUserReviewRequestAction {
	type: USER_REVIEW_REQUEST
}

export interface IUserReviewSuccessAction {
	type: USER_REVIEW_SUCCESS,
	user: IUserState
}

export interface IUserReviewFailureAction {
	type: USER_REVIEW_FAILURE,
	err: Response
}

export type IUserReviewAction = IUserReviewRequestAction | IUserReviewSuccessAction | IUserReviewFailureAction

export const userReview = (id: number) => (dispatch: Dispatch<Action>) => {
	dispatch(userReviewRequest())
	return fetch(`/api/user/${ id }`)
		.then((res: Response) => res.json()).then((res) => res.result).then((user: IUserState) => {
		dispatch(userReviewSuccess(user))
	}).catch((err: Response) => {
		dispatch(userReviewFailure(err))
	})
}

export default userReview
