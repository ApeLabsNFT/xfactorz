"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const TOTAL_FRAMES = 40;
const FRAME_DIGITS = 4; // '0001', '0002', etc.
const FRAME_PREFIX = "holobox_";
const FRAME_EXTENSION = ".png";

const getFramePath = (index: number) => {
    const paddedIndex = index.toString().padStart(FRAME_DIGITS, "0");
    return `/frames/holobox/${FRAME_PREFIX}${paddedIndex}${FRAME_EXTENSION}`;
};

export default function HoloboxScrollCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameIndexRef = useRef<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Preload images
    useEffect(() => {
        let isMounted = true;
        let loadedCount = 0;

        const preloadImages = async () => {
            const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = getFramePath(i + 1); // 1-indexed

                    img.onload = () => {
                        loadedCount++;
                        if (isMounted) {
                            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                        }
                        resolve(img);
                    };

                    img.onerror = () => {
                        // Even if an image fails, resolve to keep the promise chain going
                        // You might want to handle this more robustly in production
                        console.error(`Failed to load frame ${i + 1}`);
                        resolve(img);
                    };
                });
            });

            try {
                const loadedImages = await Promise.all(promises);
                if (isMounted) {
                    imagesRef.current = loadedImages;
                    setImagesLoaded(true);
                }
            } catch (error) {
                console.error("Error preloading images:", error);
            }
        };

        preloadImages();

        return () => {
            isMounted = false;
        };
    }, []);

    // Setup canvas
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { alpha: false }); // alpha: false for performance if background is solid
        if (!context) return;

        contextRef.current = context;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const { width, height } = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            context.scale(dpr, dpr);

            // Force redraw after resize
            renderFrame(frameIndexRef.current);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Initial setup

        return () => window.removeEventListener("resize", resizeCanvas);
    }, [imagesLoaded]);

    const renderFrame = (index: number) => {
        if (!contextRef.current || !canvasRef.current || imagesRef.current.length === 0) return;

        const img = imagesRef.current[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const canvas = canvasRef.current;
        const ctx = contextRef.current;

        // Using CSS width/height for calculations since canvas.width is scaled
        const canvasWidth = parseFloat(canvas.style.width);
        const canvasHeight = parseFloat(canvas.style.height);

        // Calculate 'cover' metrics instead of 'contain'
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight;
        if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
        }

        const x = (canvasWidth - drawWidth) / 2;
        const y = (canvasHeight - drawHeight) / 2;

        // Clear and draw
        // Using the graphite black requested (#0B0D10)
        ctx.fillStyle = "#0B0D10";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    // Sync scroll to frame
    useEffect(() => {
        if (!imagesLoaded) return;

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Small adjustment ensuring we hit the last frame
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(latest * TOTAL_FRAMES)
            );

            if (frameIndex !== frameIndexRef.current) {
                frameIndexRef.current = frameIndex;
                // Use requestAnimationFrame for smooth drawing
                requestAnimationFrame(() => renderFrame(frameIndex));
            }
        });

        // Draw initial frame
        renderFrame(0);

        return () => unsubscribe();
    }, [imagesLoaded, scrollYProgress]);


    // Text Overlay Animations
    // Section 1: 0% -> 18% (Centered)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);

    // Section 2: 30% -> 48% (Left aligned)
    const leftOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const leftY = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [20, 0, 0, -20]);

    // Section 3: 60% -> 78% (Right aligned)
    const rightOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
    const rightY = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [20, 0, 0, -20]);

    // Section 4: 90% -> 100% (Centered, final)
    const finalOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
    const finalY = useTransform(scrollYProgress, [0.85, 0.9, 1], [20, 0, 0]);


    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#0B0D10]">
            {/* Loading Screen */}
            {!imagesLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0D10] text-white">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white/90"></div>
                    <p className="text-sm tracking-widest text-white/60">LOADING HOLOBOX SEQUENCE...</p>
                    <div className="mt-4 w-48 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full bg-white/90 transition-all duration-300 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 block h-full w-full object-contain"
                />

                {/* Text Overlays Layer */}
                <div className="absolute inset-0 z-10 mx-auto max-w-7xl px-6 pointer-events-none">

                    {/* Section 1: Hero (Centered) */}
                    <motion.div
                        style={{ opacity: heroOpacity, y: heroY }}
                        className="absolute inset-x-0 top-1/4 flex flex-col items-center text-center px-4"
                    >
                        {/* Background glow to ensure text pops against white models */}
                        <div className="absolute inset-0 bg-black/40 blur-3xl rounded-full scale-150 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <h1 className="mb-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white drop-shadow-xl">
                                AI Experience Infrastructure<br className="hidden sm:block" /> <span className="text-white/80 drop-shadow-md">— In Physical Form.</span>
                            </h1>
                            <p className="mb-10 max-w-2xl text-lg sm:text-xl text-white/90 font-medium drop-shadow-lg">
                                Holobox turns any location into a guided, measurable, AI-powered journey.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto w-full sm:w-auto px-4 sm:px-0">
                                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base tracking-tight transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                                    Request Deployment Strategy
                                </Button>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 bg-black/20 rounded-full px-8 py-6 text-base tracking-tight backdrop-blur-md transition-all shadow-xl">
                                    Watch Demo
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 2: Beneath the Surface (Left on Desktop, Center Bottom on Mobile) */}
                    <motion.div
                        style={{ opacity: leftOpacity, y: leftY }}
                        className="absolute inset-x-6 md:inset-x-auto md:left-12 lg:left-24 bottom-24 md:top-1/3 md:bottom-auto flex flex-col items-center md:items-start text-center md:text-left mx-auto max-w-lg bg-black/40 md:bg-transparent p-6 rounded-3xl md:p-0 md:rounded-none backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none"
                    >
                        {/* Desktop backdrop glow */}
                        <div className="hidden md:block absolute inset-0 bg-black/50 blur-3xl scale-150 pointer-events-none" />

                        <div className="relative z-10 w-full flex flex-col items-center md:items-start">
                            <div className="mb-4 rounded-full border border-white/20 bg-black/60 md:bg-white/5 px-4 py-1.5 backdrop-blur-md">
                                <span className="text-xs font-medium uppercase tracking-widest text-white/90">System Architecture</span>
                            </div>
                            <h2 className="mb-4 md:mb-6 text-3xl font-medium tracking-tight text-white sm:text-5xl drop-shadow-xl">
                                Intelligence Beneath<br className="hidden md:block" /> the Surface.
                            </h2>
                            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed mb-6 md:mb-8 drop-shadow-md">
                                A premium object until it activates — then it reveals context, guidance, and intent.
                            </p>
                            <p className="text-xs font-semibold tracking-widest text-[#a86ef5] uppercase animate-pulse">
                                ↓ Scroll to reveal the system
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 3: Orchestrate (Right on Desktop, Center Bottom on Mobile) */}
                    <motion.div
                        style={{ opacity: rightOpacity, y: rightY }}
                        className="absolute inset-x-6 md:inset-x-auto md:right-12 lg:right-24 bottom-24 md:top-1/3 md:bottom-auto flex flex-col items-center md:items-end text-center md:text-right mx-auto max-w-lg bg-black/40 md:bg-transparent p-6 rounded-3xl md:p-0 md:rounded-none backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none"
                    >
                        {/* Desktop backdrop glow */}
                        <div className="hidden md:block absolute inset-0 bg-black/50 blur-3xl scale-150 pointer-events-none" />

                        <div className="relative z-10 w-full flex flex-col items-center md:items-end">
                            <h2 className="mb-6 md:mb-8 text-3xl font-medium tracking-tight text-white sm:text-5xl drop-shadow-xl">
                                Orchestrate.<br className="hidden md:block" /> Personalize. Measure.
                            </h2>
                            <ul className="flex flex-col gap-4 md:gap-6 text-base sm:text-lg text-white/90 font-medium w-full max-w-[300px] md:max-w-none mx-auto md:mx-0">
                                <li className="flex items-center gap-3 md:gap-4 flex-row md:flex-row-reverse border-b border-white/10 pb-3 md:pb-4 text-left md:text-right">
                                    <div className="h-2 w-2 shrink-0 rounded-full bg-[#8739f3]/80 shadow-[0_0_10px_#8739f3]" />
                                    <span className="drop-shadow-md">Conversational journeys by role</span>
                                </li>
                                <li className="flex items-center gap-3 md:gap-4 flex-row md:flex-row-reverse border-b border-white/10 pb-3 md:pb-4 text-left md:text-right">
                                    <div className="h-2 w-2 shrink-0 rounded-full bg-[#8739f3]/80 shadow-[0_0_10px_#8739f3]" />
                                    <span className="drop-shadow-md">Automation workflows across touchpoints</span>
                                </li>
                                <li className="flex items-center gap-3 md:gap-4 flex-row md:flex-row-reverse pb-3 md:pb-4 text-left md:text-right">
                                    <div className="h-2 w-2 shrink-0 rounded-full bg-[#8739f3]/80 shadow-[0_0_10px_#8739f3]" />
                                    <span className="drop-shadow-md">Analytics across locations</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 4: Final (Centered Bottom) */}
                    <motion.div
                        style={{ opacity: finalOpacity, y: finalY }}
                        className="absolute inset-x-0 bottom-16 sm:bottom-1/4 flex flex-col items-center text-center px-4"
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-black/50 blur-3xl rounded-full scale-150 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center w-full">
                            <h2 className="mb-4 sm:mb-6 max-w-3xl text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white drop-shadow-xl">
                                Deploy once.<br /> Scale across every site.
                            </h2>
                            <p className="mb-8 sm:mb-10 max-w-2xl text-base sm:text-xl text-white/90 font-medium drop-shadow-md">
                                Centralized control, consistent experience, measurable outcomes.
                            </p>
                            <div className="pointer-events-auto w-full sm:w-auto px-4 sm:px-0">
                                <Button size="lg" className="w-full sm:w-auto bg-[#8739f3] text-white hover:bg-[#722ada] rounded-full px-8 py-6 text-base tracking-tight transition-all shadow-[0_0_30px_-5px_rgba(135,57,243,0.5)] hover:shadow-[0_0_40px_-5px_rgba(135,57,243,0.7)] group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                                    <span className="relative z-10">Book a Live Walkthrough</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
