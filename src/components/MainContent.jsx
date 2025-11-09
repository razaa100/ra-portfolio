import React from "react";
import { motion } from "framer-motion";

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
    SiPostman,
} from "react-icons/si";

import PythonIcon from "../assets/python.png";
import PandasIcon from "../assets/Pandas.png";
import ExcelIcon from "../assets/excel.png";
import PostgreSQLIcon from "../assets/PostgresSQL.png";
import TensorFlowIcon from "../assets/TensorFlow.png";
import ScikitIcon from "../assets/scikit-learn.png";
import SAPIcon from "../assets/sap.png";
import SalesforceIcon from "../assets/Salesforce.png";

export default function MainContent() {
    return (
        <>
            {/* About Me Section */}
            <section id="about" className="py-24">
                <div className="max-w-5xl mx-auto px-4 space-y-6">
                    {/* Part 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <img src={gibson_sg} alt="About Me 1" className="rounded-2xl w-60" />
                        <p className="max-w-xl text-gray-300 leading-relaxed">
                            I love music, technology, and dogs, and whatever else catches my interest. I like creating things, figuring stuff out, and just seeing where my curiousity takes me.
                        </p>
                    </div>

                    {/* Part 2 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                        <img src={lightning_icons} alt="About Me 2" className="rounded-2xl w-60" />
                        <p className="max-w-xl text-gray-300 leading-relaxed">
                            I like to understand how things fit together. I enjoy learning for the sake of understanding the things that I am curious about.
                        </p>
                    </div>

                    {/* Part 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <img src={rock_and_roll} alt="About Me 3" className="rounded-2xl w-60" />
                        <p className="max-w-xl text-gray-300 leading-relaxed">
                            I don't take life seriously, (I don't think you should too). I am bored out of my mind most of the time but that's what drives my curiosity. I also don't enjoy living in the daily grind. I think there's much more to life than working, so I focus on experiences, ideas, and things that actually matter.
                        </p>
                    </div>
                </div>
            </section>

        </>
    );
}
