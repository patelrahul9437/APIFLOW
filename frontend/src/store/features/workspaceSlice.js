import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
    name: "workspace",
    initialState: [],
    reducers: {
        loadWorkspace: (state) => {
            const workspace = localStorage.getItem("workspace");
            if (workspace) {
                state = JSON.parse(workspace);
            }
            return state;
        },
        setWorkspace: (state, action) => {
            const existingWorkspace = state.find((item) => item.url === action.payload.url && item.method === action.payload.method);
            if (existingWorkspace) {
                return;
            }
            state = state.map((item) => ({ ...item, active: false }));
            state.push({ id: Date.now(), url: action.payload.url, method: action.payload.method, active: true });
            localStorage.setItem("workspace", JSON.stringify(state));
        },
        clearWorkspace: (state, action) => {
            const id = action.payload;
            state = state.filter((item) => item.id !== id);
            localStorage.setItem("workspace", JSON.stringify(state));
        },
        changeWorkspace: (state, action) => {
            const id = action.payload;
            state = state.map((item) => item.id === id ? { ...item, active: true } : { ...item, active: false });
            localStorage.setItem("workspace", JSON.stringify(state));
        }
    },
});

export const { setWorkspace, loadWorkspace, clearWorkspace, changeWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;