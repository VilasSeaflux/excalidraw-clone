import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "../constants";

const initialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null,
}

export const menuSlice = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        menuItemClick: (state, action) => {
            state.activeMenuItem = action.payload;
        },
        actionItemClick: (state, action) => {
            state.actionMenuItem = action.payload;
        },
        clearActionItem: (state) => {
            state.actionMenuItem = null;
        }
    }
});

export const { menuItemClick, actionItemClick, clearActionItem } = menuSlice.actions;
export default menuSlice.reducer;