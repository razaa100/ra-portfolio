import React from "react";
import { motion } from "framer-motion";

export default function Portfolio() {
    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans scroll-smooth">
            {/* Home Section */}
            <section
                id="home"
                className="flex flex-col justify-center items-center h-screen text-center p-8"
            >
                <h1 className="text-5xl font-bold mb-2">Ralph Adrian</h1>
                <h2 className="text-2xl text-gray-400 mb-6">Software Engineer</h2>
                <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg max-w-2xl">
                    <p className="text-gray-300 leading-relaxed">
                        I’m a software engineer passionate about building scalable
                        applications, exploring data, and creating elegant, efficient
                        solutions through technology.
                    </p>
                </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="py-24 space-y-24 px-8">
                {/* Part 1 */}
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="About Me 1"
                        className="rounded-2xl w-80 shadow-lg"
                    />
                    <p className="max-w-xl text-gray-300 leading-relaxed">
                        I started my journey in tech with a deep curiosity for how things
                        work. Over time, I discovered a passion for coding and
                        problem-solving that drives everything I do today.
                    </p>
                </div>

                {/* Part 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="About Me 2"
                        className="rounded-2xl w-80 shadow-lg"
                    />
                    <p className="max-w-xl text-gray-300 leading-relaxed">
                        Collaboration and adaptability have been key parts of my growth. I
                        enjoy working with teams that push creative and technical
                        boundaries.
                    </p>
                </div>

                {/* Part 3 */}
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="About Me 3"
                        className="rounded-2xl w-80 shadow-lg"
                    />
                    <p className="max-w-xl text-gray-300 leading-relaxed">
                        Outside of work, I stay inspired by exploring new technologies,
                        writing, and finding elegant ways to merge creativity with logic.
                    </p>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 px-8 flex flex-col items-center">
                <h2 className="text-3xl font-semibold mb-12">Skills</h2>

                <div className="relative w-full max-w-xl">
                    {/* 1st Card */}
                    <motion.div
                        className="absolute bg-neutral-800 p-8 rounded-2xl shadow-lg w-full top-0"
                        whileHover={{ y: -10 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                        <p className="text-gray-400 mb-2">Front End – HTML, CSS, JS</p>
                        <p className="text-gray-400 mb-2">
                            Back End – Node.js, Express.js, React.js, MongoDB
                        </p>
                        <p className="text-gray-400">Tools – Git, Sublime, Postman</p>
                    </motion.div>

                    {/* 2nd Card */}
                    <motion.div
                        className="absolute bg-neutral-800 p-8 rounded-2xl shadow-lg w-full top-10 left-5"
                        whileHover={{ y: -10 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            Data Analysis &amp; Machine Learning
                        </h3>
                        <p className="text-gray-400 mb-2">Python, Pandas, Seaborn</p>
                        <p className="text-gray-400 mb-2">Excel, PostgreSQL</p>
                        <p className="text-gray-400">TensorFlow, scikit-learn</p>
                    </motion.div>

                    {/* 3rd Card */}
                    <motion.div
                        className="absolute bg-neutral-800 p-8 rounded-2xl shadow-lg w-full top-20 left-10"
                        whileHover={{ y: -10 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Enterprise Platforms</h3>
                        <p className="text-gray-400">SAP, Salesforce</p>
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
