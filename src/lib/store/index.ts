import { configureStore } from "@reduxjs/toolkit";
import menuSlice from '../slice/menuSlice';
import toolboxSlice from "../slice/toolboxSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            menu: menuSlice,
            toolbox: toolboxSlice,
        },
    })
}


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];