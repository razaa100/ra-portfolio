// src/components/SongOfTheDayButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

export default function SongOfTheDayButton({
    allSongs, // Now receives allSongs to pull from all
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

    // Is the Song of the Day currently active and playing?
    const isSotdActive = currentSong?.src === sotdSrc && currentSong?.isSongOfTheDay;
    const showPause = isSotdActive && isPlaying;

    const handleClick = () => {
        const songData = {
            src: sotdSrc,
            title: sotdTitle,
            artist: sotdArtist,
            isSongOfTheDay: true,
        };

        // If it's already playing → pause
        if (isSotdActive && isPlaying) {
            onPlay(songData); // onPlay will just toggle isPlaying to false
        }
        // If it's paused or not the current song → play it
        else {
            onPlay(songData);
        }
    };

    return (
        <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.2, rotate: showPause ? -10 : 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative group mx-auto mt-20 cursor-pointer"
        >
            {/* 3D Neon Rings */}
            <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-70 group-hover:opacity-100 animate-pulse"></div>
            <div className="absolute inset-4 bg-purple-600 rounded-full blur-2xl opacity-60 group-hover:opacity-90"></div>
            <div className="absolute inset-8 bg-cyan-500 rounded-full blur-xl opacity-50"></div>

            {/* Main Button */}
            <div className="relative w-48 h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/30">
                <motion.div
                    key={showPause ? "pause" : "play"}
                    initial={{ scale: 0, rotate: showPause ? 180 : -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {showPause ? (
                        <FaPause className="w-24 h-24 text-white drop-shadow-2xl" />
                    ) : (
                        <FaPlay className="w-24 h-24 text-white drop-shadow-2xl ml-4" />
                    )}
                </motion.div>
            </div>

            {/* Floating Text */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
            >
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Song of the Day
                </p>
                <p className="text-sm text-gray-300 mt-2 opacity-90 max-w-xs truncate">
                    {sotdTitle} — {sotdArtist}
                </p>
            </motion.div>
        </motion.button>
    );
}