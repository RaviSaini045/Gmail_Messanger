import { useEffect } from "react";
import { GET_MOVIES_API, OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const useNowPopularMovies=()=>{
    const dispatch=useDispatch();
    const getPopularMovies=async ()=>{
        const data=await fetch(GET_MOVIES_API+"popular",OPTIONS);
        const parsedData=await data.json();
        dispatch(addPopularMovies(parsedData?.results));
    }
    useEffect(()=>{
        getPopularMovies();
    },[]);
}

export default useNowPopularMovies;