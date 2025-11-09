import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function HomeBoxes({ name, setName, submitted, setSubmitted }) {
    const boxes = [
        { id: "b1", text: "I'm RA!", color: "bg-neutral-800" },
        { id: "b2", text: "Nice to meet you!", color: "bg-blue-900" },
        { id: "b3", text: "What's your name?", color: "bg-neutral-800", isInput: true },
    ];

    const [currentBox, setCurrentBox] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const box = boxes[currentBox];
        const fullText = box?.text ?? "";
        if (!fullText) return;

        setTypedText(""); // reset for new box
        setIsTyping(true);

        let index = 0;
        let typed = "";

        const interval = setInterval(() => {
            typed += fullText[index];
            setTypedText(typed);
            index++;

            if (index >= fullText.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [currentBox]);

    const handleNext = () => {
        const box = boxes[currentBox];
        if (box.isInput) {
            if (name.trim()) {
                setSubmitted(true); // <-- use the lifted state from props
            }
        } else {
            setCurrentBox((prev) => prev + 1);
        }
    };

    return (
        <div className="space-y-4">
            {boxes.slice(0, currentBox + 1).map((box, i) => (
                <motion.div
                    key={box.id}
                    className={`${box.color} p-3 rounded-2xl shadow-lg w-fit flex items-center space-x-2`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {box.isInput ? (
                        <>
                            <p className="text-gray-300 whitespace-nowrap">
                                {i === currentBox ? typedText : box.text}
                            </p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="p-2 rounded-lg bg-neutral-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                            />
                        </>
                    ) : (
                        <p className="text-gray-300 leading-relaxed">
                            {i === currentBox ? typedText : box.text}
                        </p>
                    )}
                </motion.div>
            ))}

            {!submitted && (
                <button
                    onClick={handleNext}
                    disabled={isTyping || (boxes[currentBox]?.isInput && !name.trim())}
                    className="p-2 bg-neutral-600 rounded-lg hover:bg-neutral-500 text-white inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPaperPlane />
                </button>
            )}

            {submitted && (
                <motion.div
                    className="bg-red-800 p-3 rounded-2xl shadow-lg w-fit"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <p className="text-gray-300">
                        Nice to meet you, {name}! This is for you
                    </p>
                </motion.div>
            )}
        </div>
    );
}
