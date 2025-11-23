// src/components/SongOfTheDayButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const songs = [
    "./music/L-O-V-E.opus",
    "./music/yung kai - blue (official music video).opus",
    "./music/Way Back Into Love.opus",
    "./music/I Love You So x Until I Found You.opus",
    "./music/FLY ME TO THE MOON - OLIVIA ONG (LYRICS).opus",
    "./music/Can_t Take My Eyes Off You (Craymer & Ruthie Craft).opus",
    "./music/Mitski - My Love Mine All Mine (Official Lyric Video).opus",
    "./music/Pink Sweat$ - At My Worst (Lyrics).opus",
    "./music/Killing Me Softly.opus",
    "./music/Bill Withers  - Just The Two Of Us (Lyrics).opus",
    "./music/Chezile - Beanie (Lyrics).opus",
    "./music/Coyote theory - This Side Of Paradise (Lyrics).opus",
    "./music/DannyLux - Un Día Entenderás (letra).opus",
    "./music/Eslabo Armado, Peso Pluma - Ella Baila Sola.opus",
    // Add all your .opus paths here
];

const songNames = [
    "L-O-V-E - Nat King Cole",
    "Blue - yung kai",
    "Way Back Into Love",
    "I Love You So / Until I Found You",
    "Fly Me to the Moon - Olivia Ong",
    "Can't Take My Eyes Off You",
    "My Love Mine All Mine - Mitski",
    "At My Worst - Pink Sweat$",
    "Killing Me Softly",
    "Just The Two Of Us - Bill Withers",
    "Beanie - Chezile",
    "This Side Of Paradise - Coyote Theory",
    "Un Día Entenderás - DannyLux",
    "Ella Baila Sola - Eslabon Armado & Peso Pluma",
    // Match order above
];

export default function SongOfTheDayButton({ onPlay }) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const songIndex = dayOfYear % songs.length;

    const handleClick = () => {
        const title = songNames[songIndex].split(" - ")[0];
        const artist = songNames[songIndex].split(" - ").slice(1).join(" - ") || "Unknown Artist";
        onPlay({
            src: songs[songIndex],
            title,
            artist,
            isSongOfTheDay: true,
        });
    };

    return (
        <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative group mx-auto mt-20"
        >
            {/* 3D Neon Rings */}
            <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-70 group-hover:opacity-100 animate-pulse"></div>
            <div className="absolute inset-4 bg-purple-600 rounded-full blur-2xl opacity-60 group-hover:opacity-90"></div>
            <div className="absolute inset-8 bg-cyan-500 rounded-full blur-xl opacity-50"></div>

            {/* Main Button */}
            <div className="relative w-48 h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/30">
                <FaPlay className="w-24 h-24 text-white drop-shadow-2xl ml-4" />
            </div>

            {/* Floating Text */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Song of the Day
                </p>
            </motion.div>
        </motion.button>
    );
}