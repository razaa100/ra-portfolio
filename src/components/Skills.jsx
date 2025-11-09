import React from "react";
import { motion } from "framer-motion";
import { SiHtml5, SiCss3, SiJavascript, SiNodedotjs, SiExpress, SiReact, SiMongodb, SiGit, SiSublimetext, SiPostman } from "react-icons/si";
import PythonIcon from "../assets/python.png";
import PandasIcon from "../assets/Pandas.png";
import ExcelIcon from "../assets/excel.png";
import PostgreSQLIcon from "../assets/PostgresSQL.png";
import TensorFlowIcon from "../assets/TensorFlow.png";
import ScikitIcon from "../assets/scikit-learn.png";
import SAPIcon from "../assets/sap.png";
import SalesforceIcon from "../assets/Salesforce.png";

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-4 flex flex-col items-center bg-neutral-900 overflow-x-hidden">
            <h2 className="text-3xl font-semibold mb-12 text-white">My Skills</h2>

            <div className="flex justify-center items-end flex-wrap gap-6 max-w-full">
                {/* Web Development Card */}
                <motion.div
                    className="bg-orange-900 border border-neutral-700 rounded-3xl shadow-2xl w-full sm:w-64 h-96 p-6 rotate-0 sm:rotate-[-5deg] flex flex-col justify-between"
                    whileHover={{ y: -10 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-white">Web Development</h3>
                    <div className="grid grid-cols-3 gap-4 text-center text-gray-300 text-sm">
                        {[{ icon: SiHtml5, label: "HTML", color: "#E34F26" },
                        { icon: SiCss3, label: "CSS", color: "#1572B6" },
                        { icon: SiJavascript, label: "JS", color: "#F7DF1E" },
                        { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
                        { icon: SiExpress, label: "Express.js", color: "#000000" },
                        { icon: SiReact, label: "React.js", color: "#61DAFB" },
                        { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
                        { icon: SiGit, label: "Git", color: "#F05032" },
                        { icon: SiSublimetext, label: "Sublime", color: "#FF9800" },
                        { icon: SiPostman, label: "Postman", color: "#FF6C37" }].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <item.icon className="w-8 h-8 mb-1" color={item.color} />
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Data Analysis Card */}
                <motion.div
                    className="bg-blue-900 border border-neutral-700 rounded-3xl shadow-2xl w-full sm:w-64 h-96 p-6 rotate-0 flex flex-col justify-between"
                    whileHover={{ y: -10 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-white">Data Analysis & Machine Learning</h3>
                    <div className="grid grid-cols-2 gap-4 text-center text-gray-300 text-sm">
                        {[{ icon: PythonIcon, label: "Python" },
                        { icon: PandasIcon, label: "Pandas" },
                        { icon: ExcelIcon, label: "Excel" },
                        { icon: PostgreSQLIcon, label: "PostgreSQL" },
                        { icon: TensorFlowIcon, label: "TensorFlow" },
                        { icon: ScikitIcon, label: "scikit-learn" }].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <img src={item.icon} alt={item.label} className="w-8 h-8 mb-1" />
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Enterprise Platforms Card */}
                <motion.div
                    className="bg-yellow-800 border border-neutral-700 rounded-3xl shadow-2xl w-full sm:w-64 h-96 p-6 rotate-0 sm:rotate-[5deg] flex flex-col"
                    whileHover={{ y: -10 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-white">Enterprise Platforms</h3>
                    <div className="grid grid-cols-2 gap-4 text-center text-gray-300 text-sm">
                        {[{ icon: SAPIcon, label: "SAP" }, { icon: SalesforceIcon, label: "Salesforce" }].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <img src={item.icon} alt={item.label} className="w-8 h-8 mb-1" />
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}