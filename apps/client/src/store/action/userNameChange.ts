export const USER_NAME_CHANGE = 'USER_NAME_CHANGE'
export type USER_NAME_CHANGE = typeof USER_NAME_CHANGE

export interface IUserNameChangeAction {
	type: USER_NAME_CHANGE,
	value: string
}

export const userNameChange = (value: string): IUserNameChangeAction => {
	return { type: USER_NAME_CHANGE, value }
}

export default userNameChange
