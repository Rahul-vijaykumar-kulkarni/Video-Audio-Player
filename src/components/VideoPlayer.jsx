import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoSrc, audioPlaybackState }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleProgress = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    progressRef.current.value = progress;
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  useEffect(() => {
    videoRef.current.addEventListener('timeupdate', handleProgress);
    return () => {
      videoRef.current.removeEventListener('timeupdate', handleProgress);
    };
  }, []);

  // Sync video playback with audio playback
  useEffect(() => {
    if (audioPlaybackState.isPlaying) {
      videoRef.current.currentTime = audioPlaybackState.currentTime;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [audioPlaybackState]);

  return (
    <div className="video-player mb-4">
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-auto rounded-lg shadow-lg"
        controls
        onError={(e) => console.error('Error loading video', e)}
      />
      <div className="flex justify-between items-center mt-2">
        <button onClick={handlePlayPause} className="bg-blue-500 text-white px-4 py-2 rounded">
          Play/Pause
        </button>
        <input
          type="range"
          ref={progressRef}
          onChange={handleSeek}
          className="w-full mx-2"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
