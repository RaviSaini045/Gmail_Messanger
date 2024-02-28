import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        nowPopularMovies:null,
        nowTrendingMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        trailer:null,
        y: {}
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addPopularMovies:(state,action)=>{
            state.nowPopularMovies=action.payload;
        },
        addTrendingMovies:(state,action)=>{
            state.nowTrendingMovies=action.payload;
        },
        addTopRatedMovie:(state,action)=>{
            state.topRatedMovies=action.payload;
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies=action.payload;
        },
        addTrailer:(state,action)=>{
            state.trailer=action.payload;
        },
        play: (state,action)=>{
            state.y= action.payload
        }
    }
});

export const {addNowPlayingMovies, addPopularMovies, addTrendingMovies, addTopRatedMovie, addUpcomingMovies, addTrailer, play}=movieSlice.actions;

export default movieSlice.reducer