import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
    theme: localStorage.getItem("theme") === "true",
    Text_Color: localStorage.getItem("theme") === "true" ? "black" : "white",
    Background_Color: localStorage.getItem("theme") === "true" ? "white" : "black",
    shadow: localStorage.getItem("theme") === "true" ? `shadow-${localStorage.getItem("theme") == "true" ? "white" : "black"}` : "shadow-sm"
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
            if(action.payload === true){
                state.Text_Color = "black"
                state.Background_Color = "white"
                state.shadow = "shadow-sm"
            }else{
                state.Text_Color = "white"
                state.Background_Color = "black"
                state.shadow = "shadow-lg"
            }
        }
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer