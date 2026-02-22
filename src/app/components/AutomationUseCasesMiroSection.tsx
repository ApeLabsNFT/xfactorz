"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";

const InsightCard = ({ label, items, delay = 0 }: { label: string, items: string[], delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[280px] rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
            <div className="mb-4 inline-block rounded border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold tracking-wider text-white/50 uppercase">
                {label}
            </div>
            <ul className="flex flex-col gap-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8739f3]/60" />
                        <span className="leading-snug">{item}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default function AutomationUseCasesMiroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // A subtle SVG background pattern
    const DotGrid = () => (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dotPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.15)"></circle>
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)"></rect>
            </svg>
        </div>
    );

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden bg-[#0B0D10] py-32 lg:py-48">
            <DotGrid />

            <div className="relative z-10 mx-auto max-w-7xl px-6">

                {/* Header Section */}
                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 text-4xl font-medium tracking-tight text-white/90 sm:text-5xl"
                    >
                        AI Automation Use Cases <span className="text-white/40">— By Industry</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-white/60 sm:text-xl"
                    >
                        From visitor workflows to training, compliance, and in-store guidance — mapped into repeatable automation systems.
                    </motion.p>
                </div>

                {/* Miro-Style Flow Layout */}
                <div className="relative flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-8">

                    {/* SVG Connecting Lines (Desktop only for simplicity, hidden on mobile) */}
                    <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <motion.path
                                d="M 280 150 C 450 150, 400 300, 560 300"
                                fill="none"
                                stroke="rgba(135,57,243,0.3)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 280 300 C 450 300, 450 300, 560 300"
                                fill="none"
                                stroke="rgba(135,57,243,0.3)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 280 450 C 450 450, 400 300, 560 300"
                                fill="none"
                                stroke="rgba(135,57,243,0.3)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
                            />

                            <motion.path
                                d="M 700 300 L 900 300"
                                fill="none"
                                stroke="rgba(135,57,243,0.3)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {/* Left Column: Insight Stack */}
                    <div className="flex w-full flex-col items-center gap-6 lg:w-auto lg:items-start">
                        <InsightCard
                            delay={0.2}
                            label="Retail"
                            items={[
                                "Assist browsing with AI concierge",
                                "Route intent to sales / CRM",
                                "Measure dwell + engagement"
                            ]}
                        />
                        <InsightCard
                            delay={0.3}
                            label="Banking"
                            items={[
                                "Lobby guidance & FAQs",
                                "Tokening + service routing",
                                "Compliance-ready visitor logs"
                            ]}
                        />
                        <InsightCard
                            delay={0.4}
                            label="Industrial / Energy"
                            items={[
                                "Visitor clearance workflows",
                                "Safety briefings & acknowledgements",
                                "Audit-ready reporting"
                            ]}
                        />
                    </div>

                    {/* Center Column: Flow Node */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="relative z-10 flex w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border border-[#8739f3]/30 bg-[#160b2b]/50 p-6 text-center backdrop-blur-xl shadow-[0_0_40px_rgba(135,57,243,0.15)]"
                    >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#8739f3]/20 border border-[#8739f3]/40">
                            <div className="h-4 w-4 rounded-sm bg-[#8739f3] animate-pulse" />
                        </div>
                        <h3 className="mb-2 text-base font-semibold text-white/90">Run Automation</h3>
                        <p className="text-xs text-[#8739f3]/80 leading-relaxed font-medium">
                            Convert activity into tracked workflows with outcomes.
                        </p>
                    </motion.div>

                    {/* Right Column: Outcome Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 1.2 }}
                        className="relative z-10 w-full max-w-[320px] rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-gradient-to-br from-white/5 to-transparent"
                    >
                        <h3 className="mb-6 text-xl font-medium tracking-tight text-white/90">Operational Impact</h3>
                        <ul className="flex flex-col gap-5">
                            {[
                                "Faster processing",
                                "Lower frontline load",
                                "Higher engagement conversion",
                                "Standardization across locations"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-white/80">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/50 border border-white/5">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>

                {/* Bottom CTA Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="mt-24 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-sm font-medium transition-all shadow-lg hover:shadow-white/20">
                        Explore Industry Playbooks
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium transition-all backdrop-blur-sm">
                        Talk to a Solutions Architect
                    </Button>
                </motion.div>

            </div>
        </section>
    );
}
