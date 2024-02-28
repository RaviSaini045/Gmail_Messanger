import MovieSuggestions from "./MovieSuggestions";
import SearchBar from "./SearchBar";
import { BG_IMG } from "../utils/constants";

const GPTSearch = () =>{
    return (
      <div className="">
        <div className="absolute -z-10">
          <img src={BG_IMG} alt="bg-img" />
        </div>
        
        <SearchBar />
        <MovieSuggestions />
      </div>
    );
} 

export default GPTSearch;