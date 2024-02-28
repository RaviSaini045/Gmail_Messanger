import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        toggleGPT:false,
        movieNames:null,
        movieResults:null,
    },
    reducers: {
        toggleGPTSearch: (state) =>{
            state.toggleGPT=!state.toggleGPT
        },
        addGPTMovies: (state,action) =>{
            const { movieNames, movieResults } = action.payload
            state.movieNames=movieNames
            state.movieResults=movieResults
        }
    }
})

export const { toggleGPTSearch, addGPTMovies  } =gptSlice.actions 

export default gptSlice.reducer;