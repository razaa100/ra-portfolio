// MainContent.jsx - FIXED VERSION
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function MainContent({ name = "" }) {
    const specialNames = ["bianca", "bia", "kakie"];
    const isSpecial = specialNames.includes(name.trim().toLowerCase());
    const [isOpen, setIsOpen] = useState(false); // Start closed for better flow

    return (
        <section id="about" className="py-24 px-5">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 bg-clip-text text-transparent">
                    A little bit about me
                </h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mt-8 group flex mx-auto"
                >
                    <ChevronDownIcon
                        className={`w-12 h-12 text-amber-400 transition-all duration-500 
                                   group-hover:text-rose-400 
                                   ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>
            </div>

            {/* Truly Collapsible Content */}
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? "2rem" : 0
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="max-w-7xl mx-auto pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-yellow-400 rounded-3xl p-10 shadow-lg text-center text-neutral-900 font-medium text-lg"
                        >
                            I love music, technology, and dogs, and whatever else catches my interest.
                            I like creating things, figuring stuff out, and just seeing where my curiosity takes me.
                        </motion.div>

                        {/* CARD 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="bg-emerald-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-lg text-center text-gray-200 text-lg font-medium"
                        >
                            I’m a Software Engineer specializing in Web Development and Data Analysis.
                            My goal is to be a Machine Learning Engineer someday.
                            <br /><br />I enjoy understanding the things that I am curious about.
                            {isSpecial && " And lately, that includes you"}
                        </motion.div>

                        {/* CARD 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-rose-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-lg text-center text-gray-200 text-lg font-medium"
                        >
                            I am bored out of my mind most of the time but that's what drives my curiosity.
                            <br /><br />
                            I dread going to work, even though I work from home most of the time.
                            I think there's much more to life than working, so I focus on experiences, ideas, and things that actually matter.
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}