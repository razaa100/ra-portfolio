// src/Portfolio.jsx
import React, { useState, useRef, useEffect } from "react";
import HomeBoxes from "./HomeBoxes";
import { Particles } from "./Particles";
import TypewriterHeader from "./TypewriterHeader";
import MainContent from "./MainContent";
import MusicPlayer from "./MusicPlayer";
import SongOfTheDayButton from "./SongOfTheDayButton";
import GlobalMusicBar from "./GlobalMusicBar";

export default function Portfolio() {
    const [showLine2, setShowLine2] = useState(false);
    const [showLine3, setShowLine3] = useState(false);
    const [headerDone, setHeaderDone] = useState(false);
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Global Music State
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Sync audio source and play/pause
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        audioRef.current.src = currentSong.src;
        audioRef.current.load();

        if (isPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        } else {
            audioRef.current.pause();
        }
    }, [currentSong]);

    // Sync global isPlaying state with actual audio events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            // Optional: auto-next or loop
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong]);

    const handleGlobalPlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const handleClosePlayer = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        setCurrentSong(null);
        setIsPlaying(false);
    };

    const handleGlobalSkip = () => {
        setShowLine2(true);
        setShowLine3(true);
        setHeaderDone(true);
        setSubmitted(true);
    };

    // Songs data (same as before)
    const romanticSongs = [
        { name: "L-O-V-E - Nat King Cole", src: "./music/L-O-V-E.opus", globalIndex: 7 },
        { name: "Blue - yung kai", src: "./music/yung kai - blue (official music video).opus", globalIndex: 11 },
        { name: "Way Back Into Love - Unknown", src: "./music/Way Back Into Love.opus", globalIndex: 10 },
        { name: "I Love You So / Until I Found You - Unknown", src: "./music/I Love You So x Until I Found You.opus", globalIndex: 5 },
        { name: "Fly Me to the Moon - Olivia Ong", src: "./music/FLY ME TO THE MOON - OLIVIA ONG (LYRICS).opus", globalIndex: 0 },
        { name: "Can't Take My Eyes Off You - Craymer & Ruthie Craft", src: "./music/Can_t Take My Eyes Off You (Craymer & Ruthie Craft).opus", globalIndex: 2 },
        { name: "My Love Mine All Mine - Mitski", src: "./music/Mitski - My Love Mine All Mine (Official Lyric Video).opus", globalIndex: 8 },
        { name: "At My Worst - Pink Sweat$", src: "./music/Pink Sweat$ - At My Worst (Lyrics).opus", globalIndex: 9 },
        { name: "Killing Me Softly - Unknown", src: "./music/Killing Me Softly.opus", globalIndex: 6 },
        { name: "Just The Two Of Us - Bill Withers", src: "./music/Bill Withers  - Just The Two Of Us (Lyrics).opus", globalIndex: 1 },
        { name: "Beanie - Chezile", src: "./music/Chezile - Beanie (Lyrics).opus", globalIndex: 3 },
        { name: "Coyote Theory - This Side Of Paradise", src: "./music/Coyote theory - This Side Of Paradise (Lyrics).opus", globalIndex: 4 }
    ];

    const punkSongs = [
        { name: "Un Día Entenderás - DannyLux", src: "./music/DannyLux - Un Día Entenderás (letra).opus", globalIndex: 13 },
        { name: "Mi Historia Entre Tus Dedos - Eslabon Armado", src: "./music/Eslabon Armado - Mi Historia Entre Tus Dedos (Letras_Lyrics).opus", globalIndex: 15 },
        { name: "Brindo - Mario Bautista", src: "./music/Mario Bautista - Brindo (Video Oficial).opus", globalIndex: 18 },
        { name: "Jugaste y Sufrí - Eslabon Armado Ft DannyLux", src: "./music/Jugaste y Sufrí - Eslabon Armado Ft DannyLux (letra).opus", globalIndex: 16 },
        { name: "Ella Baila Sola - Eslabon Armado & Peso Pluma", src: "./music/Eslabo Armado, Peso Pluma - Ella Baila Sola.opus", globalIndex: 14 },
        { name: "Me Prendes - Eslabon Armado", src: "./music/Me Prendes - Eslabon Armado.opus", globalIndex: 19 },
        { name: "Baby - Eslabon Armado", src: "./music/Baby - Eslabon Armado.opus", globalIndex: 12 },
        { name: "Solo Me Dejaste - Grupo Marca Registrada", src: "./music/Solo Me Dejaste - Grupo Marca Registrada [Audio Oficial].opus", globalIndex: 20 },
        { name: "1004 KM - Junior H", src: "./music/Junior H - 1004 KM (Letra_Lyrics).opus", globalIndex: 17 }
    ];

    const categories = [
        { title: "Ito yung mga corny...", songs: romanticSongs },
        { title: "Modern Corridos", songs: punkSongs },
    ];

    return (
        <div className="min-h-screen text-white font-sans scroll-smooth relative overflow-hidden">
            <Particles
                className="fixed inset-0 -z-10 neon-glow"
                quantity={30}
                staticity={50}
                ease={50}
                size={0.3}
                color="#E0FF4D"
                vx={0}
                vy={0}
            />

            {/* Hidden Global Audio */}
            <audio ref={audioRef} />

            {/* Home Section */}
            <section id="home" className="flex flex-col justify-center min-h-screen text-left pl-4 pr-4 sm:pl-12 sm:pr-16 lg:pl-48 lg:pr-16 relative z-10">
                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <TypewriterHeader text="Hi there..." onComplete={() => setShowLine2(true)} />
                </p>

                {showLine2 && (
                    <h1 className="text-5xl font-bold mb-2 font-raleway">
                        <TypewriterHeader text="This is my own little spot in the internet" onComplete={() => setShowLine3(true)} />
                    </h1>
                )}

                {showLine3 && (
                    <h2 className="text-2xl text-gray-400 mb-6 font-poppins" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <TypewriterHeader text="Welcome to my world!" onComplete={() => setHeaderDone(true)} />
                    </h2>
                )}

                {!submitted && (
                    <button onClick={handleGlobalSkip} className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Skip
                    </button>
                )}

                {headerDone && (
                    <HomeBoxes name={name} setName={setName} submitted={submitted} setSubmitted={setSubmitted} />
                )}
            </section>

            {/* Main Content */}
            {submitted && (
                <>
                    <section className="relative z-10"><MainContent name={name} /></section>

                    {/* Song of the Day Button */}
                    <section className="relative z-10 flex justify-center py-20">
                        <SongOfTheDayButton onPlay={(song) => {
                            setCurrentSong({ ...song, isSongOfTheDay: true });
                            setIsPlaying(true);
                        }} />
                    </section>

                    <section className="relative z-10"><MusicPlayer
                        categories={categories}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    /></section>
                </>
            )}

            {/* Global Music Bar */}
            <GlobalMusicBar
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handleGlobalPlayPause}
                onClose={handleClosePlayer}
            />
        </div>
    );
}