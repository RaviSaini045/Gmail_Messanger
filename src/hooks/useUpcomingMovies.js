import { useEffect } from "react";
import { GET_MOVIES_API, OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";


const useUpcomingMovies= () => {
    const dispatch=useDispatch();
    const getUpcomingMovies = async () => {
        const data = await fetch(GET_MOVIES_API+"upcoming",OPTIONS);
        const parsedData = await data.json();
        dispatch(addUpcomingMovies(parsedData?.results));
    }
    useEffect(() => {
        getUpcomingMovies();
    },[]);
}
export default useUpcomingMovies;