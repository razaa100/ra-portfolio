import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicPlayer({ songs }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = (index) => {
        if (currentSongIndex === index) {
            // Toggle play/pause
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            // Switch to a new song
            setCurrentSongIndex(index);
            setIsPlaying(true);
            setTimeout(() => {
                audioRef.current.play();
            }, 100); // wait for audioRef.src to update
        }
    };

    return (
        <section id="music" className="py-24 px-8 text-center">
            <h2 className="text-3xl font-semibold mb-6">These are the songs that I like</h2>

            <div className="flex flex-col items-center space-y-4">
                {songs.map((song, index) => (
                    <div
                        key={index}
                        className="w-full max-w-md p-4 bg-neutral-800 rounded-2xl flex justify-between items-center shadow-lg"
                    >
                        <p className="text-gray-200">{song.name}</p>
                        <button
                            onClick={() => handlePlayPause(index)}
                            className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-500"
                        >
                            {currentSongIndex === index && isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                    </div>
                ))}
            </div>

            {currentSongIndex !== null && (
                <audio
                    ref={audioRef}
                    src={songs[currentSongIndex].src}
                    onEnded={() => setIsPlaying(false)}
                />
            )}
        </section>
    );
}
