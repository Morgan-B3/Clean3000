import { createSlice, prepareAutoBatched } from "@reduxjs/toolkit"
import clients from "../clients";


const initialState ={
    notices: JSON.parse(localStorage.getItem("notices")) || [],
    clients: JSON.parse(localStorage.getItem("clients")) || clients,
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
        }
    }
})

export const { addNotice, addClient } = dataSlice.actions;

export default dataSlice.reducer;