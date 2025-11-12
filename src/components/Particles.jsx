// src/components/Particles.jsx
import React, { useRef, useEffect, useState } from "react";

export const Particles = ({
    className = "",
    quantity = 100,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const ctxRef = useRef(null);
    const circles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const canvasSize = useRef({ w: 0, h: 0 });
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // ---------- MOUSE ----------
    useEffect(() => {
        const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    // ---------- HEX → RGB ----------
    const hexToRgb = (hex) => {
        hex = hex.replace("#", "");
        if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
        const n = parseInt(hex, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const rgb = hexToRgb(color);

    // ---------- RESIZE ----------
    const resize = () => {
        if (!containerRef.current || !canvasRef.current) return;
        circles.current = [];
        canvasSize.current.w = containerRef.current.offsetWidth;
        canvasSize.current.h = containerRef.current.offsetHeight;
        canvasRef.current.width = canvasSize.current.w * dpr;
        canvasRef.current.height = canvasSize.current.h * dpr;
        canvasRef.current.style.width = `${canvasSize.current.w}px`;
        canvasRef.current.style.height = `${canvasSize.current.h}px`;
        if (ctxRef.current) ctxRef.current.scale(dpr, dpr);
    };

    // ---------- INIT ----------
    useEffect(() => {
        if (canvasRef.current) ctxRef.current = canvasRef.current.getContext("2d");
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [color]);

    useEffect(() => {
        resize();
    }, [refresh]);

    // ---------- UPDATE MOUSE ----------
    useEffect(() => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = mousePos.x - rect.left - w / 2;
        const y = mousePos.y - rect.top - h / 2;
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
            mouse.current.x = x;
            mouse.current.y = y;
        }
    }, [mousePos.x, mousePos.y]);

    // ---------- CIRCLE FACTORY ----------
    const createCircle = () => {
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const pSize = Math.floor(Math.random() * 2) + size;
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.1;
        const dy = (Math.random() - 0.5) * 0.1;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX: 0,
            translateY: 0,
            size: pSize,
            alpha: 0,
            targetAlpha,
            dx,
            dy,
            magnetism,
        };
    };

    // ---------- DRAW ----------
    const drawCircle = (c, update = false) => {
        if (!ctxRef.current) return;
        const { x, y, translateX, translateY, size, alpha } = c;
        ctxRef.current.translate(translateX, translateY);
        ctxRef.current.beginPath();
        ctxRef.current.arc(x, y, size, 0, Math.PI * 2);
        ctxRef.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
        ctxRef.current.fill();
        ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!update) circles.current.push(c);
    };

    const clear = () => {
        if (ctxRef.current)
            ctxRef.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    };

    const initParticles = () => {
        clear();
        for (let i = 0; i < quantity; i++) drawCircle(createCircle());
    };

    // ---------- ANIMATION ----------
    useEffect(() => {
        initParticles();
        const animate = () => {
            clear();
            circles.current.forEach((c, i) => {
                // edge fade
                const edge = [
                    c.x + c.translateX - c.size,
                    canvasSize.current.w - c.x - c.translateX - c.size,
                    c.y + c.translateY - c.size,
                    canvasSize.current.h - c.y - c.translateY - c.size,
                ];
                const closest = edge.reduce((a, b) => Math.min(a, b));
                const remap = closest < 20 ? closest / 20 : 1;
                c.alpha += remap > 1 ? 0.02 : 0;
                if (c.alpha > c.targetAlpha) c.alpha = c.targetAlpha;
                else c.alpha = c.targetAlpha * remap;

                // drift + base velocity
                c.x += c.dx + vx;
                c.y += c.dy + vy;

                // mouse pull
                c.translateX +=
                    (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
                c.translateY +=
                    (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;

                drawCircle(c, true);

                // respawn
                if (
                    c.x < -c.size ||
                    c.x > canvasSize.current.w + c.size ||
                    c.y < -c.size ||
                    c.y > canvasSize.current.h + c.size
                ) {
                    circles.current.splice(i, 1);
                    drawCircle(createCircle());
                }
            });
            requestAnimationFrame(animate);
        };
        const id = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(id);
    }, [quantity, staticity, ease, size, vx, vy, color]);

    return (
        <div
            ref={containerRef}
            className={`pointer-events-none ${className}`}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="size-full" />
        </div>
    );
};

Particles.displayName = "Particles";