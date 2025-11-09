import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import HomeBoxes from "./HomeBoxes";
import TypewriterHeader from "./TypewriterHeader";
import MainContent from "./MainContent";
import MusicPlayer from "./MusicPlayer";

export default function Portfolio() {
    const [headerDone, setHeaderDone] = useState(false);
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Songs array must be declared outside of JSX
    const songs = [
        { name: "Fly Me to the Moon - Olivia Ong", src: "/music/FLY ME TO THE MOON - OLIVIA ONG (LYRICS).opus" },
        { name: "Song 2", src: "/music/song2.mp3" },
    ];

    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans scroll-smooth">
            {/* Home Section */}
            <section
                id="home"
                className="flex flex-col justify-center h-screen text-left pl-48 pr-16"
            >
                <p className="text-gray-400 text-sm mb-1">
                    <TypewriterHeader text="Hi there..." />
                </p>

                <h1 className="text-5xl font-bold mb-2">
                    <TypewriterHeader
                        text="This is my own little spot in the internet"
                        onComplete={() => setHeaderDone(true)}
                    />
                </h1>

                <h2 className="text-2xl text-gray-400 mb-6">
                    <TypewriterHeader text="Welcome to my world!" />
                </h2>

                {/* Show HomeBoxes only after header finishes typing */}
                {headerDone && (
                    <HomeBoxes
                        name={name}
                        setName={setName}
                        submitted={submitted}
                        setSubmitted={setSubmitted}
                    />
                )}
            </section>

            {submitted && (
                <>
                    <MainContent />
                    {/* Music Player Section */}
                    <MusicPlayer songs={songs} />
                </>
            )}
        </div>
    );
}
