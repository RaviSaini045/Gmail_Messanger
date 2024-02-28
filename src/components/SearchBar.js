import { useDispatch, useSelector } from "react-redux";
import { LANG } from "../utils/langConstant";
import { useRef } from "react";
import openai from "../utils/openai";
import { OPTIONS, SEARCH_MOVIE_BY_NAME } from "../utils/constants";
import { addGPTMovies } from "../utils/gptSlice";

const SearchBar = () =>{
    const language = useSelector((store) => store.config.language);
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const fetchMovies = async (movie) =>{
        const data = await fetch(SEARCH_MOVIE_BY_NAME + movie , OPTIONS );
        const parsedData = await data.json();
        return parsedData?.results;
    }

    const handleGPTSearch = async ()=>{
      const gptQuery =
        "Act as a movie reccomendation Sysstem suggest me some movies for the querye " +
        searchText.current.value +
        ". only give me the names of 5 movies, comma separated like the example given ahead [Don, 12th Fail, Shershah, Border, Dunki] .";
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      console.log(gptResults.choices);
      const gptMovies = gptResults?.choices[0]?.message?.content?.split(", ");
      console.log(gptMovies);
      const promiseArray = gptMovies.map((movie)=>fetchMovies(movie));
      const gptRecommendations = await Promise.all(promiseArray);
      console.log(gptRecommendations)
      dispatch(addGPTMovies({movieNames: gptMovies, movieResults: gptRecommendations}));
    }

    return (
      <div className=" pt-48 flex justify-center">
        <form className=" bg-black w-1/2 grid grid-cols-12 " onSubmit={(e)=>e.preventDefault()}>
          <input
            ref={searchText}
            className="p-6 m-2 col-span-9 "
            type="text"
            placeholder={LANG[language].gptPlaceholder}
          />
          <button className="bg-red-700 py-2 m-2 col-span-3 px-6 text-white rounded-lg " onClick={handleGPTSearch}>{LANG[language].Search} </button>
        </form>
      </div>
    );
}

export default SearchBar;