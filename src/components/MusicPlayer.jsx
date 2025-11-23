// MusicPlayer.jsx
import React, { useState } from "react";
import { FaPlay, FaPause, FaChevronDown } from "react-icons/fa";

export default function MusicPlayer({ categories, currentSong, setCurrentSong, isPlaying, setIsPlaying }) {
    const [openCategories, setOpenCategories] = useState({
        "Ito yung mga corny...": true,
        "Modern Corridos": false,
    });

    const toggleCategory = (title) => {
        setOpenCategories(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const handlePlayPause = (song) => {
        const formatted = {
            src: song.src,
            title: song.name.split(" - ")[0],
            artist: song.name.split(" - ").slice(1).join(" - ") || "Unknown Artist",
        };

        if (currentSong?.src === formatted.src) {
            // Toggle play/pause
            setIsPlaying(!isPlaying);
        } else {
            setCurrentSong(formatted);
            setIsPlaying(true);
        }
    };

    const formatSong = (name) => {
        const parts = name.split(" - ");
        if (parts.length >= 2) {
            return { title: parts[0].trim(), artist: parts.slice(1).join(" - ").trim() };
        }
        return { title: name, artist: "" };
    };

    const categoryStyles = {
        "Ito yung mga corny...": {
            gradient: "from-pink-900/30 via-purple-900/20 to-transparent",
            accent: "text-pink-400",
            hover: "hover:border-pink-500/40",
            glow: "shadow-pink-500/10",
        },
        "Modern Corridos": {
            gradient: "from-cyan-900/30 via-blue-900/20 to-transparent",
            accent: "text-cyan-400",
            hover: "hover:border-cyan-500/40",
            glow: "shadow-cyan-500/10",
        }
    };

    return (
        <section id="music" className="py-20 px-5 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Check out my playlists :)
            </h1>

            <div className="space-y-4">
                {categories.map((category) => {
                    const isOpen = openCategories[category.title] ?? false;
                    const style = categoryStyles[category.title] || categoryStyles["Ito yung mga corny..."];

                    return (
                        <div
                            key={category.title}
                            className={`rounded-2xl overflow-hidden border backdrop-blur-md bg-gradient-to-br ${style.gradient} border-white/10 ${style.hover} shadow-lg ${style.glow} transition-all duration-500 hover:scale-[1.02]`}
                        >
                            <button
                                onClick={() => toggleCategory(category.title)}
                                className="w-full px-5 py-4 flex items-center justify-between group"
                            >
                                <h2 className={`text-lg md:text-xl font-bold ${style.accent}`}>
                                    {category.title}
                                </h2>
                                <FaChevronDown className={`text-lg transition-transform duration-400 ${isOpen ? "rotate-180" : ""} ${style.accent}`} />
                            </button>

                            <div className={`transition-all duration-600 ease-out ${isOpen ? "opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                <div className="px-5 pb-5 pt-2 space-y-3">
                                    {category.songs.map((song) => {
                                        const { title, artist } = formatSong(song.name);
                                        const isActive = currentSong?.src === song.src;
                                        const isCurrentlyPlaying = isActive && isPlaying;

                                        return (
                                            <div key={song.globalIndex} className="flex items-center justify-between group/song py-2">
                                                <div className="flex-1 min-w-0 pr-3">
                                                    <p className={`text-base md:text-lg font-medium truncate transition-colors
                            ${isActive ? "text-white" : "text-gray-300"}
                            group-hover/song:text-white
                          `}>
                                                        {title}
                                                    </p>
                                                    {artist && (
                                                        <p className="text-xs md:text-sm text-gray-500 truncate">{artist}</p>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => handlePlayPause(song)}
                                                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300
                            ${isCurrentlyPlaying
                                                            ? "border-white/70 bg-white/10 scale-105"
                                                            : "border-white/20 group-hover/song:border-white/50"
                                                        }
                          `}
                                                >
                                                    {isCurrentlyPlaying ? (
                                                        <FaPause className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <FaPlay className="w-4 h-4 text-white/60 ml-0.5 group-hover/song:text-white" />
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}