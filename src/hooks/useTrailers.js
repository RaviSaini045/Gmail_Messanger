import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OPTIONS, VIDEO_DATA_URL_1, VIDEO_DATA_URL_2 } from "../utils/constants";
import { addTrailer } from "../utils/movieSlice";

const useTrailer=(id)=>{
    const dispatch = useDispatch();
    const getMovieData = async (dispatch, id) => {
      const data = await fetch(VIDEO_DATA_URL_1 + id + VIDEO_DATA_URL_2, OPTIONS);
      const parsedData = await data.json();
      const trailers = parsedData?.results.filter((arr) =>
        arr?.name.includes("Trailer")
      );
      const trailer = trailers ? trailers[0] : parsedData?.results[0];
      dispatch(addTrailer(trailer));
    };
    
    useEffect(() => {
      getMovieData(dispatch, id);
    }, []);
}
export default useTrailer;