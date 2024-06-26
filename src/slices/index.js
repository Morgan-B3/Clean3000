import { createSlice, prepareAutoBatched } from "@reduxjs/toolkit"
import clients from "../clients";


const initialState ={
    notices: JSON.parse(localStorage.getItem("notices")) || [],
    clients: JSON.parse(localStorage.getItem("clients")) || clients,
    isMobile: window.innerWidth < 800 ? true : false,
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addNotice: (state, {payload}) => {
            state.notices.push({
                id: payload.id,
                client: payload.client,
                date: payload.date,
                observation: payload.observation,
            });
            localStorage.setItem("notices", JSON.stringify([...state.notices]));
        },
        addClient: (state, {payload}) => {
            state.clients.push(payload);
            localStorage.setItem("clients", JSON.stringify([...state.clients]));
        },
        removeNotice: (state, {payload}) => {
            const index = state.notices.findIndex(notice => notice.id == payload);
            state.notices.splice(index, 1);
            localStorage.setItem("notices", JSON.stringify([...state.notices]));
        },
        setIsMobile: (state, {payload}) => {
            state.isMobile = payload;
        }
    }
})

export const { addNotice, addClient, removeNotice, setIsMobile } = dataSlice.actions;

export default dataSlice.reducer;