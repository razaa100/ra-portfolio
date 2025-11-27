// src/Portfolio.jsx
import React, { useState, useRef, useEffect } from "react";
import HomeBoxes from "./HomeBoxes";
import { Particles } from "./Particles";
import TypewriterHeader from "./TypewriterHeader";
import MainContent from "./MainContent";
import MusicPlayer from "./MusicPlayer";
import SongOfTheDayButton from "./SongOfTheDayButton";
import GlobalMusicBar from "./GlobalMusicBar";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRandom } from "react-icons/fa";
import categories from "./MusicData";

export default function Portfolio() {
    const [showLine2, setShowLine2] = useState(false);
    const [showLine3, setShowLine3] = useState(false);
    const [headerDone, setHeaderDone] = useState(false);
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [introPhase, setIntroPhase] = useState("greeting");

    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playedSongs, setPlayedSongs] = useState(new Set());
    const [isShuffle, setIsShuffle] = useState(false);

    const audioRef = useRef(null);

    // Flatten all songs
    const uniqueSongsMap = new Map();
    categories.forEach(category => {
        category.songs.forEach(song => {
            if (!uniqueSongsMap.has(song.src)) {
                uniqueSongsMap.set(song.src, song);
            }
        });
    });
    const allSongs = Array.from(uniqueSongsMap.values());

    // AUDIO CONTROL
    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.src = currentSong.src;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(() => { });
            } else {
                audioRef.current.pause();
            }
        } else if (!currentSong) {
            audioRef.current?.pause();
        }
    }, [currentSong, isPlaying]);

    // AUTO PLAY NEXT + SHUFFLE
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playNextSong = () => {
            if (allSongs.length === 0) return;

            let nextSong;
            if (isShuffle) {
                do {
                    nextSong = allSongs[Math.floor(Math.random() * allSongs.length)];
                } while (allSongs.length > 1 && nextSong.src === currentSong?.src);
            } else {
                const currentIndex = allSongs.findIndex(s => s.src === currentSong?.src);
                const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % allSongs.length;
                nextSong = allSongs[nextIndex];
            }

            setCurrentSong({
                ...nextSong,
                isSongOfTheDay: nextSong.src === currentSong?.src && currentSong?.isSongOfTheDay
            });
            setIsPlaying(true);
            setPlayedSongs(prev => new Set(prev).add(nextSong.src));
        };

        audio.addEventListener("ended", playNextSong);
        return () => audio.removeEventListener("ended", playNextSong);
    }, [currentSong, allSongs, isShuffle]);

    // GLOBAL CONTROLS
    const handleGlobalPlayPause = () => setIsPlaying(prev => !prev);
    const handleClosePlayer = () => {
        setIsPlaying(false);
        setCurrentSong(null);
    };

    const skipEverything = () => {
        setShowLine2(true);
        setShowLine3(true);
        setHeaderDone(true);
        setSubmitted(true);
        setIntroPhase("main");
    };

    useEffect(() => {
        if (introPhase === "main") {
            setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
    }, [introPhase]);

    return (
        <div className={`min-h-screen text-white font-sans scroll-smooth relative overflow-hidden
            ${currentSong ? "pb-12 md:pb-10" : "pb-8"} 
            transition-padding duration-500`}
        >

            <Particles
                className="fixed inset-0 -z-10 neon-glow"
                quantity={30}
                color="#E0FF4D"
                currentSongSrc={currentSong?.src}
                isPlaying={!!currentSong && isPlaying}
            />

            <audio ref={audioRef} preload="auto" />

            {/* INTRO */}
            {introPhase === "greeting" && (
                <section id="home" className="flex flex-col justify-center min-h-screen text-left pl-4 pr-4 sm:pl-12 sm:pr-16 lg:pl-48 lg:pr-16 relative z-10">
                    {/* ... your intro code ... */}
                </section>
            )}

            {/* MAIN CONTENT */}
            {introPhase === "main" && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                    <MainContent name={name} />

                    <div className="mt-1 flex justify-center px-6">
                        <SongOfTheDayButton
                            allSongs={allSongs}
                            currentSong={currentSong}
                            isPlaying={isPlaying}
                            onPlay={(song) => {
                                const formatted = { ...song, isSongOfTheDay: true };
                                if (currentSong?.src === song.src && isPlaying) {
                                    setIsPlaying(false);
                                } else {
                                    setCurrentSong(formatted);
                                    setIsPlaying(true);
                                    setPlayedSongs(prev => new Set(prev).add(song.src));
                                }
                            }}
                        />
                    </div>

                    <section className="relative z-10 mt-32">
                        <MusicPlayer
                            categories={categories}
                            currentSong={currentSong}
                            setCurrentSong={setCurrentSong}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            playedSongs={playedSongs}
                            setPlayedSongs={setPlayedSongs}
                        />
                    </section>
                </motion.div>
            )}

            {/* GLOBAL MUSIC BAR */}
            <GlobalMusicBar
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handleGlobalPlayPause}
                onClose={handleClosePlayer}
                hasBeenPlayed={currentSong ? playedSongs.has(currentSong.src) : false}
                isShuffle={isShuffle}
                onToggleShuffle={() => setIsShuffle(prev => !prev)}
            />
        </div>
    );
}