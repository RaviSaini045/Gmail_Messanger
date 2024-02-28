import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/movieSlice";


const useNowTrendingMovies = () => {
    const dispatch=useDispatch();
    const getTrendingMovies= async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/all/week',OPTIONS)
        const parsedData = await data.json();
        dispatch(addTrendingMovies(parsedData?.results));
    }
    useEffect(()=>{
        getTrendingMovies();
    },[])
}

export default useNowTrendingMovies