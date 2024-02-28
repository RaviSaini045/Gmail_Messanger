import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackround from "./VideoBackground";


const MainContainer=()=>{
    const Movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if(!Movies)
        return;
    const mainMovie=Movies[0];
    const {original_title,overview,id}=mainMovie;
    return(
        <div className=""> 
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackround movieId={id}/>
        </div>
    )
}
export default MainContainer;