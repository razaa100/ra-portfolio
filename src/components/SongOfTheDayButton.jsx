// src/components/SongOfTheDayButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

export default function SongOfTheDayButton({
    allSongs,
    currentSong,
    isPlaying,
    onPlay,
}) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const songIndex = dayOfYear % allSongs.length;

    const sotd = allSongs[songIndex];
    const sotdSrc = sotd.src;
    const sotdTitle = sotd.title;
    const sotdArtist = sotd.artist || "Unknown Artist";

    const isSotdActive = currentSong?.src === sotdSrc && currentSong?.isSongOfTheDay;
    const showPause = isSotdActive && isPlaying;

    const handleClick = () => {
        const songData = {
            src: sotdSrc,
            title: sotdTitle,
            artist: sotdArtist,
            isSongOfTheDay: true,
        };

        if (isSotdActive && isPlaying) {
            onPlay(songData); // toggles pause
        } else {
            onPlay(songData);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="relative group mx-auto mt-20 cursor-pointer outline-none"
            style={{ transform: "translateZ(0)" }} // tiny GPU hint
        >
            {/* Lightened blur layers – looks identical but much smoother */}
            <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-70 group-hover:opacity-100 animate-pulse pointer-events-none" />
            <div className="absolute inset-4 bg-purple-600 rounded-full blur-2xl opacity-60 pointer-events-none" />

            {/* Main button */}
            <div className="relative w-48 h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/30">
                <motion.div
                    key={showPause ? "pause" : "play"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center justify-center"
                >
                    {showPause ? (
                        <FaPause className="w-24 h-24 text-white drop-shadow-2xl" />
                    ) : (
                        <FaPlay className="w-24 h-24 text-white drop-shadow-2xl ml-4" />
                    )}
                </motion.div>
            </div>

            {/* Floating text */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
            >
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Song of the Day
                </p>
                <p className="text-sm text-gray-300 mt-2 opacity-90 max-w-xs truncate">
                    {sotdTitle} — {sotdArtist}
                </p>
            </motion.div>
        </button>
    );
}