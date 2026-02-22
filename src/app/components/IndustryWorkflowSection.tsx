"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const industries = [
    {
        id: "retail",
        name: "Industry 01 — Retail",
        problem: {
            title: "Retail Store Friction",
            items: [
                "Browsing without assistance",
                "Staff overload",
                "Untracked engagement",
                "Missed upsell opportunities",
            ]
        },
        workflow: [
            "Visitor Enters",
            "AI Concierge Engages",
            "Product Recommendation Engine",
            "Intent Captured",
            "CRM Routed"
        ],
        outcome: [
            "Guided in-store journey",
            "Higher conversion rates",
            "Engagement analytics dashboard",
            "Centralized campaign control"
        ]
    },
    {
        id: "banking",
        name: "Industry 02 — Banking",
        problem: {
            title: "Branch Bottlenecks",
            items: [
                "Lobby congestion",
                "Repetitive service queries",
                "Compliance friction",
                "Manual visitor logging"
            ]
        },
        workflow: [
            "Visitor Check-In",
            "Identity Verification",
            "AI FAQ + Routing",
            "Token Generation",
            "Compliance Logging"
        ],
        outcome: [
            "Faster processing",
            "Reduced frontline load",
            "Audit-ready records",
            "Standardized branch experience"
        ]
    },
    {
        id: "industrial",
        name: "Industry 03 — Industrial / Energy",
        problem: {
            title: "Site Access Risks",
            items: [
                "Safety compliance delays",
                "Manual clearance process",
                "Visitor risk exposure",
                "Training inconsistency"
            ]
        },
        workflow: [
            "Pre-Entry Registration",
            "Safety Module Completion",
            "Policy Acknowledgment",
            "Digital Pass Issued",
            "Site Access Authorized"
        ],
        outcome: [
            "Zero-entry risk",
            "Automated audit trails",
            "Reduced on-site congestion",
            "Measurable compliance"
        ]
    }
];

export default function IndustryWorkflowSection() {
    const [activeTab, setActiveTab] = useState(industries[0].id);

    const activeIndustry = industries.find(ind => ind.id === activeTab) || industries[0];

    return (
        <section className="relative w-full bg-[#0B0D10] py-32 overflow-hidden border-y border-white/5 min-h-[800px]">
            {/* Subtle dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6 z-10">
                {/* Header Subhead */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-4xl font-medium tracking-tight text-white/90 sm:text-5xl lg:text-6xl mb-6">
                        Industry Workflows.<br /> Automated End-to-End.
                    </h2>
                    <p className="text-xl text-white/60 font-light">
                        AI systems mapped to real operational bottlenecks — <br className="hidden sm:block" />not generic features.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-start md:justify-center mb-16 md:mb-20 relative z-20 overflow-x-auto pb-4 sm:pb-0 hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md shadow-2xl shadow-black/50 min-w-max">
                        {industries.map((ind) => (
                            <button
                                key={ind.id}
                                onClick={() => setActiveTab(ind.id)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative",
                                    activeTab === ind.id
                                        ? "text-white"
                                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                )}
                            >
                                {activeTab === ind.id && (
                                    <motion.div
                                        layoutId="activeTabBadge"
                                        className="absolute inset-0 rounded-full bg-[#8739f3] shadow-[0_0_20px_rgba(135,57,243,0.3)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{ind.name.split(" — ")[1]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Industry Flow */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndustry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-16 pt-4"
                        >
                            {/* LEFT: Problem */}
                            <div className="flex flex-col items-start lg:items-end lg:text-right pt-2 lg:pt-6">
                                <div className="mb-4 lg:mb-6 inline-flex items-center rounded-full border border-[#8739f3]/20 bg-[#8739f3]/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#8739f3]">
                                    {activeIndustry.name}
                                </div>
                                <h3 className="mb-6 lg:mb-8 text-xl lg:text-2xl font-medium tracking-tight text-white/90">{activeIndustry.problem.title}</h3>
                                <ul className="flex flex-col gap-4 lg:gap-5 w-full">
                                    {activeIndustry.problem.items.map((item, j) => (
                                        <li key={j} className="flex items-start lg:justify-end gap-3 text-[0.95rem] tracking-wide text-white/50">
                                            <span className="lg:order-2 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-[0.6rem] text-red-500">×</span>
                                            <span className="lg:order-1">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CENTER: Workflow System */}
                            <div className="flex flex-col items-center justify-center relative py-10 px-4 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-[inset_0_0_80px_rgba(255,255,255,0.015)]">
                                {activeIndustry.workflow.map((step, j) => (
                                    <div key={j} className="flex flex-col items-center w-full relative z-10">
                                        {/* Node */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: j * 0.1 }}
                                            className="w-full max-w-[280px] rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_20px_rgba(135,57,243,0.15)] group"
                                        >
                                            <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition-colors">{step}</span>
                                        </motion.div>

                                        {/* Connector Line */}
                                        {j < activeIndustry.workflow.length - 1 && (
                                            <div className="w-px h-10 bg-white/10 my-1 relative">
                                                <motion.div
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    transition={{ duration: 0.3, delay: j * 0.1 + 0.2 }}
                                                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#8739f3]/0 via-[#8739f3] to-[#8739f3]/0 origin-top opacity-60"
                                                />
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8739f3] animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_#8739f3]" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Subtle glowing orb under the workflow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#8739f3]/5 rounded-full blur-[100px] pointer-events-none" />
                            </div>

                            {/* RIGHT: Outcome */}
                            <div className="flex flex-col pt-2 lg:pt-6">
                                <h3 className="mb-6 lg:mb-8 text-xl lg:text-2xl font-medium tracking-tight text-white/90">Automated Outcome</h3>
                                <ul className="flex flex-col gap-4 lg:gap-6">
                                    {activeIndustry.outcome.map((item, j) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: j * 0.1 }}
                                            key={j}
                                            className="flex flex-col gap-1.5 lg:gap-1.5"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-[0.95rem] font-medium tracking-wide text-white/80">{item}</span>
                                            </div>
                                            <div className="h-px w-full bg-gradient-to-r from-white/5 to-transparent ml-8" />
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
