import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAppContext } from "../context/AppContext";

const AudioRecorder = ({ setAudioPlaybackState }) => {
  const { recording, setRecording, setAudioBlob } = useAppContext();
  const wavesurferRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#ddd",
      progressColor: "#007bff",
    });

    return () => wavesurferRef.current.destroy();
  }, []);

  const startRecording = async () => {
    try {
      // Access the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create a MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        wavesurferRef.current.load(audioUrl);
      };

      // Update recording state
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    audioChunksRef.current = [];
    setRecording(false);
  };

  const playAudio = () => {
    wavesurferRef.current.play();
    setAudioPlaybackState({
      isPlaying: true,
      currentTime: wavesurferRef.current.getCurrentTime(),
    });

    wavesurferRef.current.on("audioprocess", () => {
      setAudioPlaybackState({
        isPlaying: true,
        currentTime: wavesurferRef.current.getCurrentTime(),
      });
    });
  };

  const pauseAudio = () => {
    wavesurferRef.current.pause();
    setAudioPlaybackState({
      isPlaying: false,
      currentTime: wavesurferRef.current.getCurrentTime(),
    });
  };

  return (
    <div className="audio-recorder mb-4">
      <button
        onClick={startRecording}
        disabled={recording}
        className={`bg-green-500 text-white px-4 py-2 rounded ${
          recording && "opacity-50 cursor-not-allowed"
        }`}
      >
        Start Recording
      </button>
      <button
        onClick={stopRecording}
        disabled={!recording}
        className={`bg-red-500 text-white px-4 py-2 rounded ${
          !recording && "opacity-50 cursor-not-allowed"
        }`}
      >
        Stop Recording
      </button>
      <button
        onClick={playAudio}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Play Audio
      </button>
      <button
        onClick={pauseAudio}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
      >
        Pause Audio
      </button>
      <div id="waveform" className="mt-4"></div>
    </div>
  );
};

export default AudioRecorder;
