import React from "react";
import Demo from "../assets/Demo.mp4"; // Adjust path as needed

export default function Video() {
  return (
    <div className="flex justify-centre items-center h-screen ">
      <video
        className="w-full max-w-xl rounded-lg"
        autoPlay // Automatically starts playing
        muted // Required for autoplay in most browsers
        loop // Loops the video
        style={{ objectFit: "cover" }} // Ensures the video covers the container
      >
        <source src={Demo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
