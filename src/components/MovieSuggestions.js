import { useSelector } from "react-redux";
import MovieList from "./MovieList"

const MovieSuggestions = () =>{
    const {movieNames, movieResults } = useSelector((store)=>store.gpt)
    if(!movieNames) return;
    return (
        <div className="p-4 m-4 bg-gray-900 text-white">
            <div>
                {movieNames.map((movie,i)=>(
                <MovieList key={movie}  title={movie} movies={movieResults[i]} />
                ))}
            </div>
        </div>
    )
}

export default MovieSuggestions;