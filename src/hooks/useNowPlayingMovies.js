import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_MOVIES_API, OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch=useDispatch();
    const getMovieData=async ()=>{
        const data = await fetch(
          GET_MOVIES_API +"now_playing",
          OPTIONS
        );
        const parsedData=await data.json();
        dispatch(addNowPlayingMovies(parsedData?.results));
    }
    useEffect(()=>{
        getMovieData()
    },[]);
}

export default useNowPlayingMovies;