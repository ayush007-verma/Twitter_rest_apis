import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isLoading: false,
    error: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        logout: (state) => {
            return initialState;
        },
        changeProfile: (state, action) => {
            state.currentUser.profilePic = action.payload
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    changeProfile
} = userSlice.actions

export default userSlice.reducer