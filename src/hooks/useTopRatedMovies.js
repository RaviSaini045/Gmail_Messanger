import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GET_MOVIES_API, OPTIONS } from '../utils/constants';
import { addTopRatedMovie } from '../utils/movieSlice';

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch(GET_MOVIES_API+"top_rated",OPTIONS);
    const parsedData = await data.json();
    dispatch(addTopRatedMovie(parsedData?.results));
  }
  useEffect(()=>{
    getTopRatedMovies();
  },[]);
}

export default useTopRatedMovies;