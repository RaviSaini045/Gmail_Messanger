import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPopularMovies from "../hooks/useNowPopularMovies";
import useNowTrendingMovies from "../hooks/useNowTrendingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GPTSearch from "./GPTsearch";

const Browse=()=>{
    useNowPlayingMovies();
    useNowPopularMovies();
    useNowTrendingMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    const showGPT=useSelector((store) => store.gpt.toggleGPT);
    return (
      <div className="overscroll-x-none">
        <Header />
        {showGPT ? (
          <GPTSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </div>
    );
}
export default Browse;