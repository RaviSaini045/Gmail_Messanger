import {  useSelector } from "react-redux";
import useTrailer from "../hooks/useTrailers";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";

const VideoBackround = ({movieId}) => {
    useTrailer(movieId);
    const trailerVideo = useSelector((store) => store.movies?.trailer);
  return (
      <div className="w-screen">
      <iframe
      className="w-screen h-screen"
        src={YOUTUBE_VIDEO_URL + trailerVideo?.key+"?autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackround;
