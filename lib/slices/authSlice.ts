import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  userCode: string | null
  userRole: "tecnico" | "manager" | null
  loading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  userCode: null,
  userRole: null,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    loginSuccess: (state, action: PayloadAction<{ code: string; role: "tecnico" | "manager" }>) => {
      state.isAuthenticated = true
      state.userCode = action.payload.code
      state.userRole = action.payload.role
      state.loading = false
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userCode = null
      state.userRole = null
      state.loading = false
    },
    setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setLoading, loginSuccess, logout, setAuthState } = authSlice.actions
export default authSlice.reducer
