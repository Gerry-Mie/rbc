import { configureStore } from '@reduxjs/toolkit'
import nav from './slice/navbar.slice'
import user from  './slice/user.slice'

 const store = configureStore({
	reducer: {
		nav, user
	},
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
