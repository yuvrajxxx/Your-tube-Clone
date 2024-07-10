import React, { useRef } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  const handleClick = (event) => {
    if (!videoRef.current) return;

    const videoRect = videoRef.current.getBoundingClientRect();
    const clickX = event.clientX - videoRect.left;
    const tolerance = 50;

    if (clickX > videoRect.width / 2 - tolerance && clickX < videoRect.width / 2 + tolerance) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  return (
    <div className="custom-video-player" onClick={handleClick}>
      <video 
        ref={videoRef}
        src={src} 
        controls 
        width="100%" 
        height="100%" 
      />
    </div>
  );
}

export default VideoPlayer;