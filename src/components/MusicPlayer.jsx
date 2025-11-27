// src/components/MusicPlayer.jsx
import React, { useState, useCallback, memo } from "react";
import { FaPlay, FaPause, FaChevronDown } from "react-icons/fa";

// Memoized song item — prevents re-render unless truly needed
const SongItem = memo(({ song, isActive, isPlaying, hasBeenPlayed, onPlayPause }) => {
    const isCurrentlyPlaying = isActive && isPlaying;

    const titleColor = isCurrentlyPlaying
        ? "text-emerald-400 font-bold drop-shadow-sm"
        : hasBeenPlayed
            ? "text-emerald-600 font-medium"
            : "text-gray-300";

    return (
        <div className="flex items-center justify-between group/song py-2 px-1 rounded-lg hover:bg-white/5 transition-all duration-200">
            <div className="flex-1 min-w-0 pr-3">
                <p className={`text-base md:text-lg truncate transition-all group-hover/song:text-white ${titleColor}`}>
                    {song.title}
                </p>
                {song.artist && (
                    <p className="text-xs md:text-sm text-gray-500 truncate group-hover/song:text-gray-300 transition-colors">
                        {song.artist}
                    </p>
                )}
            </div>

            <button
                onClick={onPlayPause}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${isCurrentlyPlaying
                    ? "border-emerald-400 bg-emerald-400/20 scale-110 shadow-emerald-400/50"
                    : "border-white/20 group-hover/song:border-white/50 hover:scale-105"
                    }`}
            >
                {isCurrentlyPlaying ? (
                    <FaPause className="w-4 h-4 text-emerald-300" />
                ) : (
                    <FaPlay className="w-4 h-4 text-white/60 ml-0.5 group-hover/song:text-white transition-colors" />
                )}
            </button>
        </div>
    );
});

export default function MusicPlayer({
    categories,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    playedSongs,
    setPlayedSongs,
}) {
    const [openCategories, setOpenCategories] = useState({});

    const toggleCategory = useCallback((title) => {
        setOpenCategories(prev => ({ ...prev, [title]: !prev[title] }));
    }, []);

    const handlePlayPause = useCallback((song) => {
        if (currentSong?.src === song.src) {
            setIsPlaying(prev => !prev);
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
            setPlayedSongs(prev => new Set(prev).add(song.src));
        }
    }, [currentSong?.src, setCurrentSong, setIsPlaying, setPlayedSongs]);

    const getCategoryStyle = useCallback((title) => {
        const styles = {
            "Corny af": { accent: "text-pink-400", hover: "hover:border-pink-500/40" },
            "Classic Rock": { accent: "text-orange-400", hover: "hover:border-orange-500/40" },
            "Electro": { accent: "text-purple-400", hover: "hover:border-purple-500/40" },
            "Modern Corridos": { accent: "text-cyan-400", hover: "hover:border-cyan-500/40" },
            "Nerdy Music": { accent: "text-green-400", hover: "hover:border-green-500/40" },
            "OPM": { accent: "text-yellow-400", hover: "hover:border-yellow-500/40" },
            "Indie": { accent: "text-blue-400", hover: "hover:border-blue-500/40" },
        };
        return styles[title] || { accent: "text-purple-400", hover: "hover:border-purple-500/40" };
    }, []);

    return (
        <section id="music" className="py-20 px-5 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-raleway">
                Check out my playlists :)
            </h1>

            <div className="space-y-4">
                {categories.map((category) => {
                    const isOpen = !!openCategories[category.title];
                    const style = getCategoryStyle(category.title);

                    return (
                        <div
                            key={category.title}
                            className={`rounded-2xl overflow-hidden border backdrop-blur-md bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-transparent border-white/10 ${style.hover} shadow-lg transition-all duration-300`}
                        >
                            <button
                                onClick={() => toggleCategory(category.title)}
                                className="w-full px-5 py-4 flex items-center justify-between group hover:bg-white/5 transition-colors"
                            >
                                <h2 className={`text-lg md:text-xl font-bold ${style.accent} group-hover:text-white transition-colors`}>
                                    {category.title}
                                </h2>
                                <FaChevronDown
                                    className={`text-lg transition-transform duration-400 ${isOpen ? "rotate-180" : ""} ${style.accent} group-hover:text-white`}
                                />
                            </button>

                            <div
                                className={`transition-all duration-500 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"} scrollbar-custom`}
                                style={{ overflowY: isOpen ? "auto" : "hidden" }}
                            >
                                <div className="px-5 pb-5 pt-2 space-y-3">
                                    {category.description && (
                                        <p className="text-sm text-gray-400 italic pb-4 border-b border-white/10 leading-relaxed">
                                            {category.description}
                                        </p>
                                    )}

                                    {category.songs.map((song) => (
                                        <SongItem
                                            key={song.src}
                                            song={song}
                                            isActive={currentSong?.src === song.src}
                                            isPlaying={isPlaying}
                                            hasBeenPlayed={playedSongs.has(song.src)}
                                            onPlayPause={() => handlePlayPause(song)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}