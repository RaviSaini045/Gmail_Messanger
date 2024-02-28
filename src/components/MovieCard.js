import { IMG_CDN_URL } from "../utils/constants";

const MovieCard=({movieData})=>{
    return (
      <div className="w-36 md:w-48 pr-4">
        <img src={IMG_CDN_URL + movieData?.poster_path} alt="movie_poster"/>
      </div>
    );
}

export default MovieCard;