import { useSelector } from "react-redux";
import MovieList from "./MovieList";


const SecondaryContainer=()=>{
    const moviesData=useSelector(store=>store.movies);
    return (
      <div className="bg-black">
        <div className=" mt-0 md:-mt-36 pl-4 md:pl-12 relative z-20">
          <MovieList
            title={"Now Playing"}
            movies={moviesData?.nowPlayingMovies}
          />
          <MovieList title={"Popular"} movies={moviesData?.nowPopularMovies} />
          <MovieList
            title={"Trending"}
            movies={moviesData?.nowTrendingMovies}
          />
          <MovieList title={"Top Rated"} movies={moviesData?.topRatedMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={moviesData?.upcomingMovies}
          />
        </div>
      </div>
    );
}

export default SecondaryContainer;