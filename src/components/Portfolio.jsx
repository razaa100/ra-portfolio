import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import HomeBoxes from "./HomeBoxes";
import TypewriterHeader from "./TypewriterHeader";

import gibson_sg from "../assets/gibson_sg.png";
import lightning_icons from "../assets/lightning_icons.png";
import rock_and_roll from "../assets/rock_and_roll.png";
import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiNodedotjs,
    SiExpress,
    SiReact,
    SiMongodb,
    SiGit,
    SiSublimetext,
    SiPostman
} from "react-icons/si";

import PythonIcon from '../assets/python.png';
import PandasIcon from '../assets/Pandas.png';
import ExcelIcon from '../assets/excel.png';
import PostgreSQLIcon from '../assets/PostgresSQL.png';
import TensorFlowIcon from '../assets/TensorFlow.png';
import ScikitIcon from '../assets/scikit-learn.png';
import SAPIcon from '../assets/sap.png';
import SalesforceIcon from '../assets/Salesforce.png';

export default function Portfolio() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [headerDone, setHeaderDone] = React.useState(false);

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
                        onComplete={() => setHeaderDone(true)} // mark header as done
                    />
                </h1>

                <h2 className="text-2xl text-gray-400 mb-6">
                    <TypewriterHeader text="Welcome to my world!" />
                </h2>

                {/* Only show HomeBoxes after header is done */}
                {headerDone && <HomeBoxes />}
            </section>


            {/* About Me Section */}
            <section id="about" className="py-24">
                <div className="max-w-5xl mx-auto px-4 space-y-6">
                    {/* Part 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <img src={gibson_sg} alt="About Me 1" className="rounded-2xl w-60" />
                        <p className="max-w-xl text-gray-300 leading-relaxed">
                            I started my journey in tech with a deep curiosity for how things
                            work. Over time, I discovered a passion for coding and
                            problem-solving that drives everything I do today.
                        </p>
                    </div>

                    {/* Part 2 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                        <img src={lightning_icons} alt="About Me 2" className="rounded-2xl w-60" />
                        <p className="max-w-xl text-gray-300 leading-relaxed">
                            Collaboration and adaptability have been key parts of my growth. I
                            enjoy working with teams that push creative and technical
                            boundaries.
                        </p>
                    </div>

                    {/* Part 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <img src={rock_and_roll} alt="About Me 3" className="rounded-2xl w-60" />
                        <p className="max-w-xl text-gray-300 leading-relaxed">
                            Outside of work, I stay inspired by exploring new technologies,
                            writing, and finding elegant ways to merge creativity with logic.
                        </p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 px-4 flex flex-col items-center bg-neutral-900">
                <h2 className="text-3xl font-semibold mb-12 text-white">Skills</h2>

                <div className="flex justify-center items-end space-x-6">
                    {/* 1st Card - Web Development */}
                    <motion.div
                        className="bg-orange-900 border border-neutral-700 rounded-3xl shadow-2xl w-64 h-96 p-6 rotate-[-5deg] flex flex-col justify-between"
                        whileHover={{ y: -10 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">Web Development</h3>
                        <div className="grid grid-cols-3 gap-4 text-center text-gray-300 text-sm">
                            <div className="flex flex-col items-center">
                                <SiHtml5 className="w-8 h-8 mb-1" color="#E34F26" />
                                <p>HTML</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiCss3 className="w-8 h-8 mb-1" color="#1572B6" />
                                <p>CSS</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiJavascript className="w-8 h-8 mb-1" color="#F7DF1E" />
                                <p>JS</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiNodedotjs className="w-8 h-8 mb-1" color="#339933" />
                                <p>Node.js</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiExpress className="w-8 h-8 mb-1" color="#000000" />
                                <p>Express.js</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiReact className="w-8 h-8 mb-1" color="#61DAFB" />
                                <p>React.js</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiMongodb className="w-8 h-8 mb-1" color="#47A248" />
                                <p>MongoDB</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiGit className="w-8 h-8 mb-1" color="#F05032" />
                                <p>Git</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiSublimetext className="w-8 h-8 mb-1" color="#FF9800" />
                                <p>Sublime</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <SiPostman className="w-8 h-8 mb-1" color="#FF6C37" />
                                <p>Postman</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2nd Card - Data Analysis */}
                    <motion.div
                        className="bg-blue-900 border border-neutral-700 rounded-3xl shadow-2xl w-64 h-96 p-6 flex flex-col justify-between"
                        whileHover={{ y: -10 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">Data Analysis & Machine Learning</h3>
                        <div className="grid grid-cols-2 gap-4 text-center text-gray-300 text-sm">
                            <div className="flex flex-col items-center">
                                <img src={PythonIcon} alt="Python" className="w-8 h-8 mb-1" />
                                <p>Python</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={PandasIcon} alt="Pandas" className="w-8 h-8 mb-1" />
                                <p>Pandas</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={ExcelIcon} alt="Excel" className="w-8 h-8 mb-1" />
                                <p>Excel</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={PostgreSQLIcon} alt="PostgreSQL" className="w-8 h-8 mb-1" />
                                <p>PostgreSQL</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={TensorFlowIcon} alt="TensorFlow" className="w-8 h-8 mb-1" />
                                <p>TensorFlow</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={ScikitIcon} alt="scikit-learn" className="w-8 h-8 mb-1" />
                                <p>scikit-learn</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3rd Card - Enterprise Platforms */}
                    <motion.div
                        className="bg-yellow-800 border border-neutral-700 rounded-3xl shadow-2xl w-64 h-96 p-6 rotate-[5deg] flex flex-col"
                        whileHover={{ y: -10 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">Enterprise Platforms</h3>
                        <div className="grid grid-cols-2 gap-4 text-center text-gray-300 text-sm">
                            <div className="flex flex-col items-center">
                                <img src={SAPIcon} alt="SAP" className="w-8 h-8 mb-1" />
                                <p>SAP</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={SalesforceIcon} alt="Salesforce" className="w-8 h-8 mb-1" />
                                <p>Salesforce</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-8 text-center">
                <h2 className="text-3xl font-semibold mb-6">Projects</h2>
                <p className="text-gray-400">Coming soon…</p>
            </section>
        </div>
    );
}
