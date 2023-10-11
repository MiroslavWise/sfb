import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    preloadedState: {},
    reducer: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
