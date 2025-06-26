import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import productoresSlice from "./slices/productoresSlice"
import visitasSlice from "./slices/visitasSlice"
import appSlice from "./slices/appSlice"
import dictamenesSlice from "./slices/dictamenesSlice"
import agendaSlice from "./slices/agendaSlice"
import prospectosSlice from "./slices/prospectosSlice"
import authSlice from "./slices/authSlice"

const rootReducer = combineReducers({
  productores: productoresSlice,
  visitas: visitasSlice,
  app: appSlice,
  dictamenes: dictamenesSlice,
  agenda: agendaSlice,
  prospectos: prospectosSlice,
  auth: authSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Save state to localStorage
store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem("agritech-state", JSON.stringify(state))
  } catch (error) {
    console.error("Error saving state:", error)
  }
})

// Load initial state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("agritech-state")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error("Error loading state:", error)
    return undefined
  }
}
