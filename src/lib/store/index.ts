import { configureStore } from "@reduxjs/toolkit";
import menuSlice from '../slice/menuSlice';
export const makeStore = () => {
    return configureStore({
        reducer: {
            menu: menuSlice,
        },
    })
}


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];