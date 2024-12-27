import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../hooks/useUser";

interface authState {
    isAuthenticated ?: boolean;
    user: IUser | null;
    authToken ?: string;
}

const initialState : authState = {
    isAuthenticated: false,
    user : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action:PayloadAction<authState>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setAuthenticated : (state)=>{
            state.isAuthenticated = true;
        },
        setAuthenticationToken : (state, action:PayloadAction<{authToken :string}>)=>{
            state.authToken = action.payload.authToken;
        },
    },
});
export const { setAuth, clearAuth, setAuthenticated, setAuthenticationToken } = authSlice.actions;
export default authSlice.reducer;
