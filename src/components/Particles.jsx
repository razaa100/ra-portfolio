// src/components/Particles.jsx   ← FINAL + SPEED BUG FIXED
import React, { useRef, useEffect } from "react";

export const Particles = ({
    className = "",
    quantity = 100,
    staticity = 50,
    ease = 50,
    size = 0.4,
    color = "#E0FF4D",
    currentSongSrc = null,
    isPlaying = false,
}) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const circles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const canvasSize = useRef({ w: 0, h: 0 });
    const dpr = window.devicePixelRatio || 1;

    const currentRGB = useRef({ r: 224, g: 255, b: 77 }); // #E0FF4D
    const targetRGB = useRef({ r: 224, g: 255, b: 77 });

    const PLAYING_COLORS = [
        // Hot & fiery
        "#ff006e", "#ff5e78", "#ff2e63", "#ff477e",
        "#ff0065", "#ff1d8e", "#ff3c9d",

        // Electric & magentas
        "#ff00d0", "#ff4dff", "#e100ff", "#c77dff",

        // Cyan & teal
        "#00f5ff", "#00d4ff", "#00b7eb", "#1ce", "#0ff",

        // Emerald & lime
        "#00ff9d", "#00ff88", "#39ff14", "#00ff6f",

        // peach
        "#ff6b6b", "#ff8e8e", "#ff5c8a", "#ff5e5e",

        // rand
        "#ff006e", "#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"
    ];

    // Picks new random color when a new song starts
    useEffect(() => {
        if (isPlaying && currentSongSrc) {
            const randomColor = PLAYING_COLORS[Math.floor(Math.random() * PLAYING_COLORS.length)];
            targetRGB.current = hexToRgb(randomColor);
        } else {
            targetRGB.current = hexToRgb(color);
        }
    }, [currentSongSrc, isPlaying, color]);

    const hexToRgb = (hex) => {
        const n = parseInt(hex.replace("#", ""), 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };

    // Smooth color interpolation
    useEffect(() => {
        const id = setInterval(() => {
            currentRGB.current.r += (targetRGB.current.r - currentRGB.current.r) * 0.1;
            currentRGB.current.g += (targetRGB.current.g - currentRGB.current.g) * 0.1;
            currentRGB.current.b += (targetRGB.current.b - currentRGB.current.b) * 0.1;
        }, 16);
        return () => clearInterval(id);
    }, []);

    const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvasSize.current = { w, h };
        canvasRef.current.width = w * dpr;
        canvasRef.current.height = h * dpr;
        canvasRef.current.style.width = `${w}px`;
        canvasRef.current.style.height = `${h}px`;
        ctxRef.current = canvasRef.current.getContext("2d");
        ctxRef.current.scale(dpr, dpr);
    };

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        const handleMouse = (e) => {
            const rect = canvasRef.current.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left - canvasSize.current.w / 2;
            mouse.current.y = e.clientY - rect.top - canvasSize.current.h / 2;
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    const createCircle = () => ({
        x: Math.random() * canvasSize.current.w,
        y: Math.random() * canvasSize.current.h,
        size: Math.random() * 2 + size,
        alpha: 0,
        targetAlpha: Math.random() * 0.5 + 0.2,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        translateX: 0,
        translateY: 0,
        magnetism: 1 + Math.random() * 3,
    });

    useEffect(() => {
        circles.current = Array.from({ length: quantity }, createCircle);
    }, [quantity, size]);

    // Main animation loop
    useEffect(() => {
        let animationId;

        const animate = () => {
            ctxRef.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

            // Change first number to control speed when playing, second number for default speed
            const speed = isPlaying ? 20 : 1;

            circles.current.forEach((c) => {
                c.alpha += c.alpha < c.targetAlpha ? 0.02 : -0.02;

                c.x += c.dx * speed;
                c.y += c.dy * speed;

                c.translateX += (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
                c.translateY += (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;

                if (c.x < -50 || c.x > canvasSize.current.w + 50 ||
                    c.y < -50 || c.y > canvasSize.current.h + 50) {
                    c.x = Math.random() * canvasSize.current.w;
                    c.y = Math.random() * canvasSize.current.h;
                }

                ctxRef.current.save();
                ctxRef.current.translate(c.translateX, c.translateY);
                ctxRef.current.beginPath();
                ctxRef.current.arc(c.x, c.y, c.size, 0, Math.PI * 2);
                ctxRef.current.fillStyle = `rgba(${Math.round(currentRGB.current.r)}, ${Math.round(currentRGB.current.g)}, ${Math.round(currentRGB.current.b)}, ${c.alpha})`;
                ctxRef.current.fill();
                ctxRef.current.restore();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [isPlaying, staticity, ease]); // ← isPlaying is in deps → speed resets correctly

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
            style={{
                transform: "translateZ(0)",
                // This makes the glow match the current particle color perfectly
                "--glow-color": `rgb(${Math.round(currentRGB.current.r)}, ${Math.round(currentRGB.current.g)}, ${Math.round(currentRGB.current.b)})`
            }}
        />
    );
};