export const USER_NAME_EDITOR_ENABLE = 'USER_NAME_EDITOR_ENABLE'
export type USER_NAME_EDITOR_ENABLE = typeof USER_NAME_EDITOR_ENABLE

export interface IUserNameEditorEnableAction {
	type: USER_NAME_EDITOR_ENABLE
}

export const userNameEditorEnable = () => ({ type: USER_NAME_EDITOR_ENABLE })

export default userNameEditorEnable
