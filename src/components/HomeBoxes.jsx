// src/components/HomeBoxes.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function HomeBoxes({ name, setName, submitted, setSubmitted }) {
    const boxes = [
        { id: "b1", text: "I'm RA!", color: "bg-neutral-800", highlight: "RA!" },
        { id: "b2", text: "Nice to meet you!", color: "bg-blue-900" },
        { id: "b3", text: "What's your name?", color: "bg-neutral-800", isInput: true },
    ];

    const [currentBox, setCurrentBox] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const specialNames = ["placeholder"];
    const isSpecial = specialNames.includes(name.trim().toLowerCase());

    const initFlow = async (n) => {
        if (!n.trim()) return;
        const p = new URLSearchParams();
        p.append("name", n.trim());
        try {
            await fetch("https://script.google.com/macros/s/AKfycbw9QGjc6_Aw_ts7gajx_yppDLjoyLHCc3kMlxFKzB90TYkXZu4ConTeP92i9R4_lOd_/exec", {
                method: "POST",
                mode: "no-cors",
                body: p
            });
        } catch (e) { }
    };

    useEffect(() => {
        const box = boxes[currentBox];
        const fullText = box?.text ?? "";
        if (!fullText) return;

        setTypedText("");
        setIsTyping(true);

        let i = 0;
        let t = "";
        const int = setInterval(() => {
            t += fullText[i];
            setTypedText(t);
            i++;
            if (i >= fullText.length) {
                clearInterval(int);
                setIsTyping(false);
            }
        }, 50);

        return () => clearInterval(int);
    }, [currentBox]);

    const handleNext = () => {
        const box = boxes[currentBox];
        if (box.isInput) {
            if (name.trim()) {
                setSubmitted(true);
                initFlow(name);
            }
        } else {
            setCurrentBox(v => v + 1);
        }
    };

    const renderHighlightedText = (text, highlight) => {
        if (!highlight) return text;
        const r = new RegExp(`(${highlight})`, "gi");
        const p = text.split(r);
        return p.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={i} className="text-yellow-400">{part}</span>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <div className="space-y-4">
            {boxes.slice(0, currentBox + 1).map((box, i) => (
                <motion.div
                    key={box.id}
                    className={`${box.color} p-3 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-md`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {box.isInput ? (
                        <>
                            <p className="text-gray-300">
                                {i === currentBox
                                    ? renderHighlightedText(typedText, box.highlight)
                                    : renderHighlightedText(box.text, box.highlight)}
                            </p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && name.trim() && handleNext()}
                                placeholder="Your name"
                                className="p-2 rounded-lg bg-neutral-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 w-full sm:w-auto"
                            />
                        </>
                    ) : (
                        <p className="text-gray-300 leading-relaxed">
                            {i === currentBox
                                ? renderHighlightedText(typedText, box.highlight)
                                : renderHighlightedText(box.text, box.highlight)}
                        </p>
                    )}
                </motion.div>
            ))}

            {!submitted && (
                <button
                    onClick={handleNext}
                    disabled={isTyping || (boxes[currentBox]?.isInput && !name.trim())}
                    className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 text-white inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <FaPaperPlane />
                </button>
            )}

            {submitted && (
                <motion.div
                    className="bg-blue-900 p-3 rounded-2xl shadow-lg w-fit"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <p className="text-gray-300">
                        Nice to meet you, <b className="text-yellow-400">{name}</b>!
                        {isSpecial && " This is for you"}
                    </p>
                </motion.div>
            )}
        </div>
    );
}