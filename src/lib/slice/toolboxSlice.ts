import { createSlice } from "@reduxjs/toolkit";
import { COLORS, MENU_ITEMS } from "../constants";

const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3,
    },
    [MENU_ITEMS.ERASER]: {
        color: '#FFF',
        size: 3,
    },
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
};
export const toolboxSlice = createSlice({
    name: "Toolbox",
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size;
        }
    }
});

export const { changeColor, changeBrushSize } = toolboxSlice.actions;
export default toolboxSlice.reducer