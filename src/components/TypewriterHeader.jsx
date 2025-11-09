import React, { useState, useEffect, useRef } from "react";

export default function TypewriterHeader({ text, className = "", speed = 50, onComplete }) {
    const [typedText, setTypedText] = useState("");
    const hasTyped = useRef(false); // track if typing already happened

    useEffect(() => {
        if (!text || hasTyped.current) return;

        let index = 0;
        let typed = "";
        setTypedText("");

        const interval = setInterval(() => {
            typed += text.charAt(index);
            setTypedText(typed);
            index++;
            if (index >= text.length) {
                clearInterval(interval);
                hasTyped.current = true; // mark as typed
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return <span className={className}>{typedText}</span>;
}