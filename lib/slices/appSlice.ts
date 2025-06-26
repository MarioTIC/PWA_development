import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AppState {
  isOnline: boolean
  darkMode: boolean
  syncing: boolean
  lastSync: string | null
}

const initialState: AppState = {
  isOnline: true,
  darkMode: false,
  syncing: false,
  lastSync: null,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.syncing = action.payload
    },
    setLastSync: (state, action: PayloadAction<string>) => {
      state.lastSync = action.payload
    },
    setAppState: (state, action: PayloadAction<Partial<AppState>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setOnlineStatus, toggleDarkMode, setDarkMode, setSyncing, setLastSync, setAppState } = appSlice.actions
export default appSlice.reducer
