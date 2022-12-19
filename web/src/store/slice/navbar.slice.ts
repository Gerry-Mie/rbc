import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LinkId} from '../../types/links';

interface NavStore{
	open: boolean
	selected: LinkId
}

const initialState: NavStore = {
	open: false,
	selected: 'Dashboard'
}

const navbarSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		toggle_nav(state, action: PayloadAction<boolean>){
			state.open=action.payload
		},
		set_selected_nav_item(state, action: PayloadAction<LinkId>){
			state.selected=action.payload
			state.open = false
		}
	}
})

export const {toggle_nav, set_selected_nav_item} = navbarSlice.actions

export default navbarSlice.reducer

