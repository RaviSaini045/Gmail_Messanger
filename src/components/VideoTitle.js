import { useState } from "react";

const VideoTitle=({title,overview})=>{
    const [showDesc,setshowDesc]=useState(false);
    const showDescription = ()=>{
        setshowDesc(!showDesc);
    }
    return(
        <div className="pt-36 px-12 absolute w-screen aspect-video text-white bg-gradient-to-r to-black">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="w-1/2 text-lg py-6">{showDesc && overview}</p>
            <div className="">
                <button className="bg-white text-black p-4 px-10 bg-opacity-50 text-xl font-bold hover:bg-opacity-70 rounded-lg">▶️ Play</button>
                <button className="bg-gray-600 text-white p-4 px-10 bg-opacity-35 text-xl font-bold rounded-lg mx-4" onMouseOver={showDescription}> ℹ️ More Info</button>
            </div>
        </div>
    );
}

export default VideoTitle;