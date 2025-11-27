// src/components/MainContent.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaPaperPlane } from "react-icons/fa";
import TypewriterHeader from "./TypewriterHeader";

export default function MainContent({ name = "" }) {
    const specialNames = ["bianca", "bia", "kakie"];
    const isSpecial = specialNames.includes(name.trim().toLowerCase());

    const [isOpen, setIsOpen] = useState(false);
    const [currentPara, setCurrentPara] = useState(0);
    const [typingTrigger, setTypingTrigger] = useState(0);

    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    const paragraphs = [
        `Hi! I'm RA. I'm a Software Engineer specializing in Web Development and Data Analysis. I love music, technology, dogs, and whatever else catches my interest. I like to build stuff, figuring things out, or mostly just seeing where my curiosity takes me.`,

        `I am bored out of my mind most of the time, and I think that's what drives my curiosity. I don't really have much in terms of plans for the future. I do aim to be a Machine Learning Engineer someday (that's my career goal), but when it comes to my own life outside of work, I don't really have much.\n\nI haven't really figured out this part yet. Hey, I'm just as lost as everyone else at this age ¯\_(ツ)_/¯`,

        `I will figure things out eventually. So, for now, I just aim to enjoy life and not take things too seriously. And just like this website, we're all a work-in-progress. Plans change all the time so there's no need to stress myself about these things.\n\nAnyway, this is what I have built so far for this website. I hope you enjoy what you see!`
    ];

    useEffect(() => {
        if (contentRef.current && isOpen) {
            setHeight(contentRef.current.offsetHeight + 100);
        }
    }, [isOpen, currentPara, typingTrigger]);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
            setCurrentPara(0);
            setTypingTrigger(prev => prev + 1);
        }
    };

    const nextParagraph = () => {
        if (currentPara < paragraphs.length - 1) {
            setCurrentPara(prev => prev + 1);
            setTypingTrigger(prev => prev + 1);
        }
    };

    return (
        <section id="about" className="py-24 px-5">
            <div className="text-center mb-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 bg-clip-text text-transparent"
                >
                    A little bit about me
                </motion.h2>

                <button onClick={toggleOpen} className="mt-10 group flex mx-auto">
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <ChevronDownIcon className="w-12 h-12 text-amber-400 group-hover:text-rose-400 transition-colors" />
                    </motion.div>
                </button>
            </div>

            <div
                style={{ height: isOpen ? height : 0 }}
                className="transition-all duration-800 ease-[cubic-bezier(0.4,0,0.1,1)] overflow-hidden"
            >
                <div ref={contentRef} className="max-w-4xl mx-auto pt-8 pb-24">
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="space-y-12">
                                    {paragraphs.slice(0, currentPara + 1).map((text, index) => (
                                        <motion.p
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.15, duration: 0.7 }}
                                            className="leading-loose text-gray-100 whitespace-pre-line"
                                        >
                                            {index === currentPara ? (
                                                <TypewriterHeader
                                                    text={text}
                                                    speed={28}
                                                    resetKey={typingTrigger}
                                                    className="text-base md:text-lg inline-block"
                                                />
                                            ) : (
                                                <span className="text-base md:text-lg inline-block">
                                                    {text}
                                                </span>
                                            )}
                                        </motion.p>
                                    ))}
                                </div>

                                {/* YOUR ORIGINAL MINIMAL SEND BUTTON — ONLY ICON */}
                                {currentPara < paragraphs.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex justify-end mt-20"
                                    >
                                        <button
                                            onClick={nextParagraph}
                                            className="group relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                                        >
                                            <FaPaperPlane />
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}