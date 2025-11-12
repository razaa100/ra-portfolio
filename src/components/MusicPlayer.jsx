import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicPlayer({ categories }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [clickedSongs, setClickedSongs] = useState(new Set()); // track clicked songs
    const audioRef = useRef(null);

    const allSongs = categories.flatMap(cat => cat.songs);

    const handlePlayPause = (index) => {
        setClickedSongs(prev => new Set(prev).add(index));

        if (currentSongIndex === index) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentSongIndex(index);
            setIsPlaying(true);
        }
    };

    // Autoplay next song when one ends
    const handleEnded = () => {
        const currentIndex = allSongs.findIndex(s => s.globalIndex === currentSongIndex);
        const nextIndex = (currentIndex + 1) % allSongs.length;
        setCurrentSongIndex(allSongs[nextIndex].globalIndex);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (currentSongIndex !== null && audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch(err => console.log(err));
        }
    }, [currentSongIndex]);

    return (
        <section id="music" className="py-24 px-8">
            {/* Main Header */}
            <h1 className="text-4xl font-bold mb-12 text-center text-white font-['Poppins']">
                These are the <span className="text-yellow-400">songs </span> that I listen to...
            </h1>

            <div className="flex flex-col md:flex-row gap-8 justify-center">
                {categories.map((category) => (
                    <div key={category.title} className="flex-1">
                        <h2 className="text-3xl font-semibold mb-6 text-center text-white font-['Poppins']">
                            {category.title}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {category.songs.map((song) => (
                                <div
                                    key={song.globalIndex}
                                    className={`flex items-center justify-between p-3 rounded-2xl shadow-lg ${clickedSongs.has(song.globalIndex)
                                        ? "bg-red-900"
                                        : "bg-neutral-800"
                                        }`}
                                >
                                    <p className="text-gray-200 font-['Raleway']">{song.name}</p>
                                    <button
                                        onClick={() => handlePlayPause(song.globalIndex)}
                                        className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-500"
                                    >
                                        {currentSongIndex === song.globalIndex && isPlaying ? (
                                            <FaPause />
                                        ) : (
                                            <FaPlay />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {currentSongIndex !== null && (
                <div className="mt-8 flex justify-center">
                    <audio ref={audioRef} controls onEnded={handleEnded}>
                        <source
                            src={allSongs.find(s => s.globalIndex === currentSongIndex)?.src}
                            type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </section>
    );
}