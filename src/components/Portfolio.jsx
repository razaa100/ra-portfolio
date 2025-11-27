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
    const audioRef = useRef(null);

    // ──────────────────────────────────────────────────────────────
    // ALL PLAYLISTS & SONGS
    // ──────────────────────────────────────────────────────────────
    const romanticSongs = [
        { name: "L-O-V-E - Nat King Cole", src: "./music/L-O-V-E.opus" },
        { name: "Blue - yung kai", src: "./music/yung kai - blue (official music video).opus" },
        { name: "Way Back Into Love - Unknown", src: "./music/Way Back Into Love.opus" },
        { name: "I Love You So / Until I Found You - Unknown", src: "./music/I Love You So x Until I Found You.opus" },
        { name: "Fly Me to the Moon - Olivia Ong", src: "./music/FLY ME TO THE MOON - OLIVIA ONG (LYRICS).opus" },
        { name: "Can't Take My Eyes Off You - Craymer & Ruthie Craft", src: "./music/Can_t Take My Eyes Off You (Craymer & Ruthie Craft).opus" },
        { name: "My Love Mine All Mine - Mitski", src: "./music/Mitski - My Love Mine All Mine (Official Lyric Video).opus" },
        { name: "At My Worst - Pink Sweat$", src: "./music/Pink Sweat$ - At My Worst (Lyrics).opus" },
        { name: "Killing Me Softly - Unknown", src: "./music/Killing Me Softly.opus" },
        { name: "Just The Two Of Us - Bill Withers", src: "./music/Bill Withers  - Just The Two Of Us (Lyrics).opus" },
        { name: "Beanie - Chezile", src: "./music/Chezile - Beanie (Lyrics).opus" },
        { name: "This Side Of Paradise - Coyote Theory", src: "./music/Coyote theory - This Side Of Paradise (Lyrics).opus" }
    ];

    const punkSongs = [
        { name: "La Víctima - Xavi", src: "./music/Xavi - La Víctima.opus" },
        { name: "La Diabla - Xavi", src: "./music/Xavi - La Diabla.opus" },
        { name: "¿Dime Porque", src: "./music/¿Dime Porque_.opus" },
        { name: "Ando Más Que Mal", src: "./music/Ando Más Que Mal.opus" },
        { name: "Un Día Entenderás - DannyLux", src: "./music/DannyLux - Un Día Entenderás (letra).opus" },
        { name: "Mi Historia Entre Tus Dedos - Eslabon Armado", src: "./music/Eslabon Armado - Mi Historia Entre Tus Dedos (Letras_Lyrics).opus" },
        { name: "Brindo - Mario Bautista", src: "./music/Mario Bautista - Brindo (Video Oficial).opus" },
        { name: "Jugaste y Sufrí - Eslabon Armado Ft DannyLux", src: "./music/Jugaste y Sufrí - Eslabon Armado Ft DannyLux (letra).opus" },
        { name: "Ella Baila Sola - Eslabon Armado & Peso Pluma", src: "./music/Eslabo Armado, Peso Pluma - Ella Baila Sola.opus" },
        { name: "Me Prendes - Eslabon Armado", src: "./music/Me Prendes - Eslabon Armado.opus" },
        { name: "Baby - Eslabon Armado", src: "./music/Baby - Eslabon Armado.opus" },
        { name: "Solo Me Dejaste - Grupo Marca Registrada", src: "./music/Solo Me Dejaste - Grupo Marca Registrada [Audio Oficial].opus" },
        { name: "1004 KM - Junior H", src: "./music/Junior H - 1004 KM (Letra_Lyrics).opus" }
    ];

    const categories = [
        { title: "Corny af", songs: romanticSongs },
        { title: "Modern Corridos", songs: punkSongs },
    ];

    // ──────────────────────────────────────────────────────────────
    // AUDIO CONTROL
    // ──────────────────────────────────────────────────────────────
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

    // ──────────────────────────────────────────────────────────────
    // RENDER
    // ──────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen text-white font-sans scroll-smooth relative overflow-hidden">
            {/* Beautiful particles that change color with every new song */}
            <Particles
                className="fixed inset-0 -z-10 neon-glow"
                quantity={30}
                color="#E0FF4D"                    // default lime when paused
                currentSongSrc={currentSong?.src}   // triggers new random color
                isPlaying={!!currentSong && isPlaying}
            />

            <audio ref={audioRef} preload="auto" />

            {/* INTRO */}
            {introPhase === "greeting" && (
                <section id="home" className="flex flex-col justify-center min-h-screen text-left pl-4 pr-4 sm:pl-12 sm:pr-16 lg:pl-48 lg:pr-16 relative z-10">
                    <p className="text-gray-400 text-sm mb-1">
                        <TypewriterHeader text="Hi there..." onComplete={() => setShowLine2(true)} />
                    </p>

                    {showLine2 && (
                        <h1 className="text-5xl font-bold mb-2 font-raleway">
                            <TypewriterHeader text="This is my own little spot in the internet" onComplete={() => setShowLine3(true)} />
                        </h1>
                    )}

                    {showLine3 && (
                        <h2 className="text-2xl text-gray-400 mb-6">
                            <TypewriterHeader text="Welcome to my world!" onComplete={() => setHeaderDone(true)} />
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

            {/* MAIN CONTENT */}
            {introPhase === "main" && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                    <MainContent name={name} />

                    <div className="mt-12 flex justify-center px-6">
                        <SongOfTheDayButton
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
            />
        </div>
    );
}