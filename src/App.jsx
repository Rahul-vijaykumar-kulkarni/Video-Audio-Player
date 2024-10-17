import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import VideoPlayer from './components/VideoPlayer';
import AudioRecorder from './components/AudioRecorder';
import DialogueDisplay from './components/DialogueDisplay';

const App = () => {
  const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4"; // Sample video URL
  const [audioPlaybackState, setAudioPlaybackState] = useState({ isPlaying: false, currentTime: 0 });

  return (
    <AppProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Video and Audio Recorder App</h1>
        <VideoPlayer videoSrc={sampleVideo} audioPlaybackState={audioPlaybackState} />
        <AudioRecorder setAudioPlaybackState={setAudioPlaybackState} />
        <DialogueDisplay />
      </div>
    </AppProvider>
  );
};

export default App;
