import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import UserInterface from '../../types/user-interface';
import {UserStateInterface} from '../../types';
import UserPermissionInterface from '../../types/user-permission-interface';



interface User {
    state: UserStateInterface
    data: UserInterface | null,
    permissions: UserPermissionInterface | null
}

const initialState: User = {
    state: 'loading',
    data: null,
    permissions: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set_user(state, action: PayloadAction<User>) {
            return  action.payload
        },
        set_user_state(user, action: PayloadAction<UserStateInterface>){
            user.state = action.payload
        },

        clear_user(user){
            user.state = 'empty'
            user.data = null
            user.permissions = null
        }
    }
})

export const {set_user, set_user_state, clear_user} = userSlice.actions

export default userSlice.reducer
