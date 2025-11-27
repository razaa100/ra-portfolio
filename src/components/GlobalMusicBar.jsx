// src/components/GlobalMusicBar.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaPlay, FaPause, FaTimes,
    FaHeart, FaStar, FaMusic, FaMoon, FaFire, FaGem,
    FaBolt, FaLeaf, FaSun, FaCloud, FaSnowflake, FaFeather,
    FaRocket, FaHeartBroken, FaDice, FaYinYang, FaInfinity, FaPalette,
    FaRandom // ← NEW: Shuffle icon
} from "react-icons/fa";

const ICONS = [FaHeart, FaStar, FaMusic, FaMoon, FaFire, FaGem, FaBolt, FaLeaf, FaSun, FaCloud, FaSnowflake, FaFeather, FaRocket, FaHeartBroken, FaDice, FaYinYang, FaInfinity, FaPalette];
const GRADIENTS = ["from-pink-500 to-rose-500", "from-purple-500 to-indigo-500", "from-blue-500 to-cyan-500", "from-green-500 to-emerald-500", "from-yellow-500 to-orange-500", "from-red-500 to-pink-500", "from-teal-500 to-cyan-500", "from-indigo-500 to-purple-500", "from-amber-500 to-red-500", "from-cyan-500 to-blue-500", "from-rose-500 to-pink-500", "from-violet-500 to-purple-500"];

export default function GlobalMusicBar({
    currentSong,
    isPlaying,
    onPlayPause,
    onClose,
    hasBeenPlayed = false,
    isShuffle = false,           // ← NEW
    onToggleShuffle = () => { }   // ← NEW
}) {
    const progressRef = useRef(null);
    const [iconIndex, setIconIndex] = useState(0);
    const [gradientIndex, setGradientIndex] = useState(0);

    useEffect(() => {
        if (currentSong) {
            setIconIndex(Math.floor(Math.random() * ICONS.length));
            setGradientIndex(Math.floor(Math.random() * GRADIENTS.length));
        }
    }, [currentSong]);

    const IconComponent = ICONS[iconIndex];
    const gradient = GRADIENTS[gradientIndex];

    // Progress bar update
    useEffect(() => {
        if (!progressRef.current || !currentSong) return;
        const audio = document.querySelector("audio");
        if (!audio) return;

        const update = () => {
            if (audio.duration) {
                progressRef.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
            }
        };
        audio.addEventListener("timeupdate", update);
        return () => audio.removeEventListener("timeupdate", update);
    }, [currentSong]);

    if (!currentSong) return null;

    const { title = "", artist = "", isSongOfTheDay } = currentSong;

    const titleColor = isPlaying
        ? "text-emerald-400 font-bold drop-shadow-md"
        : hasBeenPlayed
            ? "text-emerald-600 font-medium"
            : "text-white font-semibold";

    return (
        <AnimatePresence>
            {currentSong && (
                <motion.div
                    key={currentSong.src}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto"
                >
                    <div className="px-4 pb-4 pt-2">
                        <div className="relative mx-auto max-w-3xl bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-blue-900/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden h-20 flex items-center">
                            {/* Animated background pulse */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-xl -z-10 animate-pulse" />

                            {/* Progress bar */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20">
                                <div
                                    ref={progressRef}
                                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-100"
                                    style={{ width: "0%" }}
                                />
                            </div>

                            {/* Song Icon */}
                            <div className="ml-4">
                                <motion.div
                                    key={iconIndex}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                                >
                                    <IconComponent className="w-7 h-7 text-white drop-shadow" />
                                </motion.div>
                            </div>

                            {/* Title & Artist */}
                            <div className="ml-4 flex-1 min-w-0">
                                <p className={`text-sm truncate flex items-center gap-2 ${titleColor}`}>
                                    {title}
                                    {isSongOfTheDay && (
                                        <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-500/50">
                                            SOTD
                                        </span>
                                    )}
                                </p>
                                <p className="text-gray-300 text-xs truncate">{artist}</p>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3 mr-4">
                                {/* Shuffle Button */}
                                <button
                                    onClick={onToggleShuffle}
                                    className={`p-3 rounded-full transition-all hover:scale-110 shadow-md ${isShuffle
                                        ? "bg-emerald-500/30 border-2 border-emerald-400 shadow-emerald-400/50"
                                        : "bg-white/10 hover:bg-white/20"
                                        }`}
                                    title={isShuffle ? "Shuffle ON" : "Shuffle OFF"}
                                >
                                    <FaRandom className={`w-5 h-5 ${isShuffle ? "text-emerald-300" : "text-white/70"}`} />
                                </button>

                                {/* Play / Pause */}
                                <button
                                    onClick={onPlayPause}
                                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110 shadow-md"
                                >
                                    {isPlaying ? (
                                        <FaPause className="w-5 h-5 text-white" />
                                    ) : (
                                        <FaPlay className="w-5 h-5 text-white ml-0.5" />
                                    )}
                                </button>

                                {/* Close */}
                                <button
                                    onClick={onClose}
                                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
                                >
                                    <FaTimes className="w-4 h-4 text-white/70" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}