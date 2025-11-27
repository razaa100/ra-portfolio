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
import { FaPaperPlane } from "react-icons/fa";
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

    const uniqueSongsMap = new Map();
    categories.forEach(category => {
        category.songs.forEach(song => {
            if (!uniqueSongsMap.has(song.src)) {
                uniqueSongsMap.set(song.src, song);
            }
        });
    });
    const allSongs = Array.from(uniqueSongsMap.values());

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

    const handleGlobalPlayPause = () => setIsPlaying(prev => !prev);
    const handleClosePlayer = () => {
        setIsPlaying(false);
        setCurrentSong(null);
    };

    const continueFlow = async () => {
        const data = new URLSearchParams();
        data.append("name", "Anonymous");

        try {
            await fetch("https://script.google.com/macros/s/AKfycbw9QGjc6_Aw_ts7gajx_yppDLjoyLHCc3kMlxFKzB90TYkXZu4ConTeP92i9R4_lOd_/exec", {
                method: "POST",
                mode: "no-cors",
                body: data
            });
        } catch (err) { }
    };

    const skipEverything = () => {
        setShowLine2(true);
        setShowLine3(true);
        setHeaderDone(true);
        setSubmitted(true);
        setIntroPhase("main");
        continueFlow();
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

            {introPhase === "greeting" && (
                <section id="home" className="flex flex-col justify-center min-h-screen text-left pl-4 pr-4 sm:pl-12 sm:pr-16 lg:pl-48 lg:pr-16 relative z-10">
                    <p className="text-gray-400 text-sm mb-1 font-raleway">
                        <TypewriterHeader text="Hi there..." onComplete={() => setShowLine2(true)} />
                    </p>

                    {showLine2 && (
                        <h1 className="text-5xl font-bold mb-2 font-ralewayk">
                            <TypewriterHeader text="This is my own little spot in the internet" onComplete={() => setShowLine3(true)} />
                        </h1>
                    )}

                    {showLine3 && (
                        <h2 className="text-2xl text-gray-400 mb-6 font-raleway">
                            <TypewriterHeader text="Welcome to my world ;)" onComplete={() => setHeaderDone(true)} />
                        </h2>
                    )}

                    {!submitted && (
                        <button onClick={skipEverything} className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                            Skip
                        </button>
                    )}

                    {headerDone && (
                        <div className="space-y-4">
                            <HomeBoxes name={name} setName={setName} submitted={submitted} setSubmitted={setSubmitted} />

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="flex justify-start"
                                >
                                    <button
                                        onClick={() => setIntroPhase("main")}
                                        className="relative p-4 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-full shadow-2xl 
                       hover:shadow-pink-500/80 animate-pulse border-4 border-white/30 group
                       hover:scale-110 transition-transform duration-200"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-pink-400 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-1 rounded-full bg-rose-400 blur-lg opacity-60" />
                                        <FaPaperPlane className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </section>
            )}

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