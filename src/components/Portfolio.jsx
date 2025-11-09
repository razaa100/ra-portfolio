import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import HomeBoxes from "./HomeBoxes";
import TypewriterHeader from "./TypewriterHeader";
import MainContent from "./MainContent";

export default function Portfolio() {
    const [headerDone, setHeaderDone] = useState(false);
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

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

                {/* Show HomeBoxes only after the header finishes typing */}
                {headerDone && (
                    <HomeBoxes
                        name={name}
                        setName={setName}
                        submitted={submitted}
                        setSubmitted={setSubmitted}
                    />
                )}
            </section>

            {/* Show MainContent (About, Skills, Projects) only after name is submitted */}
            {submitted && <MainContent />}
        </div>
    );
}
