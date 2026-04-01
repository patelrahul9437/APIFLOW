import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
    name: "workspace",
    initialState: [],
    reducers: {
        createWorkspace: (state) => {
            state = state.map((item)=>({...item,active:false}))
            state.push({ id: Date.now(), url: "https://httpbin.org/status/404", method: "GET", params: [{ key: "", value: "" }], headers: [{ key: "Content-Type", value: "application/json" }], body: "", auth:"noAuth",active: true, activeTab: "params" })
            localStorage.setItem("workspace", JSON.stringify(state));
            console.log("updated state : ",state)
            return state;
        },
        loadWorkspace: (state) => {
            console.log("load state",state)
            const workspace = localStorage.getItem("workspace");
            if (workspace) {
                state = JSON.parse(workspace);
            }
            return state;
        },
        // setWorkspace: (state, action) => {
        //     console.log("setup run",action.payload)
        //     const existingWorkspace = state.find((item) => item.url === action.payload.url && item.method === action.payload.method);
        //     if (existingWorkspace) {
        //         return;
        //     }
        //     state = state.map((item) => ({ ...item, active: false }))
        //     state.push({ id: Date.now(), url: action.payload.url, method: action.payload.method, params: action.payload.params, headers: action.payload.headers, body: action.payload.body, active: true, activeTab:action.payload.activeTab ? action.payload.activeTab : "params" })
        //     console.log("final state",state)
        //     localStorage.setItem("workspace", JSON.stringify(state));
        // },
        clearWorkspace: (state, action) => {
            const id = action.payload;
            state = state.filter((item) => item.id !== id);
            localStorage.setItem("workspace", JSON.stringify(state));
        },
        changeWorkspace: (state, action) => {
            const id = action.payload;
            console.log("change Workspace",action.payload);
            state = state.map((item) => item.id === id ? { ...item, active: true } : { ...item, active: false });
            console.log("state",state);
            localStorage.setItem("workspace", JSON.stringify(state));
        },
        updateWorkspace: (state, action) => {
            console.log("update action",action.payload)
            const id = action.payload.id;
            if(!id){
                return;
            }
            state = JSON.parse(localStorage.getItem("workspace"));
            state = state.map((item) => item.id === id ? { id:id,url:action.payload.url,method:action.payload.method,params:action.payload.params,headers:action.payload.headers,body:action.payload.body,auth:action.payload.auth,active:true,activeTab:action.payload.activeTab} : item);
            localStorage.setItem("workspace", JSON.stringify(state));
        }
    },
});

export const { setWorkspace, loadWorkspace, clearWorkspace, changeWorkspace, updateWorkspace,createWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;