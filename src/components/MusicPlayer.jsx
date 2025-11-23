// src/components/MusicPlayer.jsx
import React, { useState } from "react";
import { FaPlay, FaPause, FaChevronDown } from "react-icons/fa";

export default function MusicPlayer({
    categories,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    playedSongs,
    setPlayedSongs,
}) {
    const [openCategories, setOpenCategories] = useState({
        "Corny af": false,
        "Modern Corridos": false,
    });

    const toggleCategory = (title) => {
        setOpenCategories(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const handlePlayPause = (song) => {
        const formattedSong = {
            src: song.src,
            title: song.name.split(" - ")[0].trim(),
            artist: song.name.split(" - ").slice(1).join(" - ").trim() || "Unknown Artist",
        };

        // Same song clicked
        if (currentSong?.src === song.src) {
            setIsPlaying(!isPlaying); // Toggle play/pause
        }
        // Different song → switch to it
        else {
            setCurrentSong(formattedSong);
            setIsPlaying(true);
            setPlayedSongs(prev => new Set(prev).add(song.src));
        }
    };

    const formatSong = (name) => {
        const parts = name.split(" - ");
        return parts.length >= 2
            ? { title: parts[0].trim(), artist: parts.slice(1).join(" - ").trim() }
            : { title: name, artist: "" };
    };

    const categoryStyles = {
        "Corny af": { accent: "text-pink-400", hover: "hover:border-pink-500/40" },
        "Modern Corridos": { accent: "text-cyan-400", hover: "hover:border-cyan-500/40" }
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
                        <div key={category.title} className={`rounded-2xl overflow-hidden border backdrop-blur-md bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-transparent border-white/10 ${style.hover} shadow-lg transition-all duration-300`}>
                            <button
                                onClick={() => toggleCategory(category.title)}
                                className="w-full px-5 py-4 flex items-center justify-between group hover:bg-white/5 transition-colors"
                            >
                                <h2 className={`text-lg md:text-xl font-bold ${style.accent} group-hover:text-white transition-colors`}>
                                    {category.title}
                                </h2>
                                <FaChevronDown className={`text-lg transition-transform duration-400 ${isOpen ? "rotate-180" : ""} ${style.accent} group-hover:text-white`} />
                            </button>

                            <div
                                className={`transition-all duration-500 ease-out ${isOpen ? "max-h-96 opacity-100 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full" : "max-h-0 opacity-0 overflow-hidden"} 
                scrollbar-thumb-purple-500/50 scrollbar-track-transparent hover:scrollbar-thumb-purple-400/70`}
                                style={{
                                    scrollbarColor: "#a78bfa transparent", // fallback for Firefox 
                                }}
                            >
                                <div className="px-5 pb-5 pt-2 space-y-3">
                                    {category.songs.map((song) => {
                                        const { title, artist } = formatSong(song.name);
                                        const isActive = currentSong?.src === song.src;
                                        const isCurrentlyPlaying = isActive && isPlaying;
                                        const hasBeenPlayed = playedSongs.has(song.src);

                                        const titleColor = isCurrentlyPlaying
                                            ? "text-emerald-400 font-bold drop-shadow-sm"
                                            : hasBeenPlayed
                                                ? "text-emerald-600 font-medium"
                                                : "text-gray-300";

                                        return (
                                            <div
                                                key={song.src}
                                                className="flex items-center justify-between group/song py-2 px-1 rounded-lg hover:bg-white/5 transition-all duration-200"
                                            >
                                                <div className="flex-1 min-w-0 pr-3">
                                                    <p className={`text-base md:text-lg truncate transition-all group-hover/song:text-white ${titleColor}`}>
                                                        {title}
                                                    </p>
                                                    {artist && (
                                                        <p className="text-xs md:text-sm text-gray-500 truncate group-hover/song:text-gray-300 transition-colors">
                                                            {artist}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handlePlayPause(song)}
                                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md
                                                        ${isCurrentlyPlaying
                                                            ? "border-emerald-400 bg-emerald-400/20 scale-110 shadow-emerald-400/50"
                                                            : "border-white/20 group-hover/song:border-white/50 hover:scale-105"
                                                        }
                                                    `}
                                                >
                                                    {isCurrentlyPlaying ? (
                                                        <FaPause className="w-4 h-4 text-emerald-300" />
                                                    ) : (
                                                        <FaPlay className="w-4 h-4 text-white/60 ml-0.5 group-hover/song:text-white transition-colors" />
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