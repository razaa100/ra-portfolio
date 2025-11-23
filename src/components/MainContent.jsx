// MainContent.jsx 
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function MainContent({ name = "" }) {
    const specialNames = ["bianca", "bia", "kakie"];
    const isSpecial = specialNames.includes(name.trim().toLowerCase());
    const [isOpen, setIsOpen] = useState(true);

    return (
        <section id="about" className="py-24 px-5">
            {/* Title */}
            <div className="text-center mb-20">
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

            <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0% round 3rem)" }}
                animate={{ clipPath: isOpen ? "inset(0% 0% 0% 0% round 3rem)" : "inset(0% 0% 100% 0% round 3rem)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="overflow-hidden"
            >
                <div className="max-w-7xl mx-auto pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 80, scale: 0.9 }}
                            animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
                            transition={{
                                duration: 0.8,
                                delay: isOpen ? 0.2 : 0,
                                ease: [0.2, 0.8, 0.3, 1],
                            }}
                            className="bg-yellow-400 rounded-3xl p-10 shadow-lg relative overflow-hidden flex flex-col justify-between"
                        >
                            <p className="text-neutral-900 font-medium text-lg leading-relaxed text-center">
                                I love music, technology, and dogs, and whatever else catches my interest. I like creating things, figuring stuff out, and just seeing where my curiosity takes me.


                            </p>
                        </motion.div>

                        {/* CARD 2 — Emerald */}
                        <motion.div
                            initial={{ opacity: 0, y: 80, scale: 0.9 }}
                            animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
                            transition={{
                                duration: 0.8,
                                delay: isOpen ? 0.35 : 0,
                                ease: [0.2, 0.8, 0.3, 1],
                            }}
                            className="bg-emerald-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-lg"
                        >
                            <p className="text-gray-200 text-lg leading-relaxed text-center">
                                I’m a Software Engineer specializing in Web Development and Data Analysis. My goal is to be a Machine Learning Engineer someday. <br /><br />I enjoy understanding the things that I am curious about.
                                {isSpecial && " And lately, that includes you"}
                            </p>
                        </motion.div>

                        {/* CARD 3 — Rose */}
                        <motion.div
                            initial={{ opacity: 0, y: 80, scale: 0.9 }}
                            animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
                            transition={{
                                duration: 0.8,
                                delay: isOpen ? 0.5 : 0,
                                ease: [0.2, 0.8, 0.3, 1],
                            }}
                            className="bg-rose-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-lg"
                        >
                            <p className="text-gray-200 text-lg leading-relaxed text-center">
                                I am bored out of my mind most of the time but that's what drives my curiosity.<br /><br />I dread going to work, even though I work from home most of the time. I think there's much more to life than working, so I focus on experiences, ideas, and things that actually matter.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}