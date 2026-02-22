"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
    {
        id: "pre-entry",
        label: "PRE-ENTRY READINESS",
        headline: "Visitors are cleared before they arrive.",
        subCopy: "Automate approvals, compliance, and identity verification before a visitor steps on site.",
        steps: [
            {
                title: "Digital invitations with secure QR credentials",
                description: "Automated pre-registration links sent via email/SMS."
            },
            {
                title: "AI-powered identity verification",
                description: "ID capture, facial match, document validation."
            },
            {
                title: "Policy acknowledgement & safety induction",
                description: "HSE modules, NDA, compliance forms with digital signature."
            },
            {
                title: "Host approvals & access rule validation",
                description: "Role-based clearance logic before access is granted."
            }
        ],
        impacts: [
            "Reduced gate congestion",
            "Zero incomplete documentation",
            "Lower compliance risk exposure",
            "Faster on-site processing time"
        ],
        // The user provided an image showing a hand holding a phone, we'll assume this is for tab 1
        image: "/section4_tab1.png"
    },
    {
        id: "secure-entry",
        label: "SECURE ENTRY CONTROL",
        headline: "Intelligent access. Zero manual bottlenecks.",
        subCopy: "Seamless verification at arrival with automated routing and compliance tracking.",
        steps: [
            {
                title: "QR / facial recognition check-in",
                description: "Instant validation against pre-approved records."
            },
            {
                title: "Real-time blacklist & compliance screening",
                description: "Automatic access denial based on rule engine."
            },
            {
                title: "Badge / digital pass issuance",
                description: "Dynamic, time-bound access credentials."
            },
            {
                title: "Automated host notification",
                description: "Instant alert on arrival and entry confirmation."
            }
        ],
        impacts: [
            "Reduced frontline workload",
            "Faster lobby throughput",
            "Enhanced security visibility",
            "Centralized visitor logs across locations"
        ],
        image: "/section4_tab2.png" // Fallback to same image for now
    },
    {
        id: "guided-movement",
        label: "GUIDED ON-SITE MOVEMENT",
        headline: "AI-guided navigation across complex spaces.",
        subCopy: "Deliver contextual assistance and enforce movement policies within facilities.",
        steps: [
            {
                title: "AI concierge guidance (voice/chat)",
                description: "Wayfinding, meeting room routing, department assistance."
            },
            {
                title: "Zone-based access monitoring",
                description: "Restrict movement based on clearance level."
            },
            {
                title: "Contextual safety reminders",
                description: "Triggered alerts based on visitor role or area."
            },
            {
                title: "Real-time movement analytics",
                description: "Track dwell time and location flow patterns."
            }
        ],
        impacts: [
            "Reduced on-site confusion",
            "Improved safety compliance",
            "Smarter facility management",
            "Measurable visitor engagement insights"
        ],
        image: "/section4_tab3.png"
    },
    {
        id: "audit-exit",
        label: "AUDIT-READY EXIT",
        headline: "Automated closure. Complete compliance trail.",
        subCopy: "Ensure every visit ends with verified documentation and centralized reporting.",
        steps: [
            {
                title: "Digital sign-out verification",
                description: "Automated exit logging."
            },
            {
                title: "Equipment return confirmation",
                description: "Asset validation before exit."
            },
            {
                title: "Visit duration & activity summary",
                description: "Automated report generation."
            },
            {
                title: "Audit-ready documentation export",
                description: "Centralized dashboard & compliance logs."
            }
        ],
        impacts: [
            "Complete audit traceability",
            "Reduced compliance penalties",
            "Operational transparency",
            "Enterprise-wide reporting control"
        ],
        image: "/section4_tab4.png"
    }
];

export default function VisitorAutomationSection() {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    return (
        <section className="w-full bg-[#0B0D10] py-32 text-white border-y border-white/5">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header Sequence */}
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#8739f3] mb-4">
                        End-to-End Intelligent Visitor Automation System
                    </h2>
                </div>

                {/* Pill Navigation */}
                <div className="flex justify-start md:justify-center mb-16 md:mb-24 relative z-20 overflow-x-auto pb-4 sm:pb-0 hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-xl backdrop-blur-md min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTabId(tab.id)}
                                className={cn(
                                    "px-4 sm:px-6 py-2.5 rounded-full text-[0.7rem] sm:text-[0.8rem] font-bold uppercase tracking-wider transition-all duration-300 relative whitespace-nowrap",
                                    activeTabId === tab.id
                                        ? "text-black"
                                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                                )}
                            >
                                {activeTabId === tab.id && (
                                    <motion.div
                                        layoutId="visitorTabBadgeDark"
                                        className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Area */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16"
                        >
                            {/* Left Column: Copy & Timeline */}
                            <div className="flex-1 flex flex-col">
                                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-6">
                                    {activeTab.label}
                                </div>
                                <h3 className="text-4xl font-semibold tracking-tight leading-[1.15] mb-6 max-w-md text-white/90">
                                    {activeTab.headline}
                                </h3>
                                <p className="text-lg text-white/50 font-medium mb-12 max-w-md">
                                    {activeTab.subCopy}
                                </p>

                                {/* Steps Timeline */}
                                <div className="relative flex flex-col gap-8 ml-2">
                                    {activeTab.steps.map((step, idx) => (
                                        <div key={idx} className="relative flex gap-8 group">
                                            {/* Number indicator */}
                                            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/40 transition-colors group-hover:bg-[#8739f3] group-hover:text-white group-hover:border-[#8739f3]">
                                                {idx + 1}
                                            </div>
                                            {/* Connecting dashed line */}
                                            {idx < activeTab.steps.length - 1 && (
                                                <div className="absolute left-[15px] top-8 bottom-[-32px] w-px border-l-[1.5px] border-dashed border-white/10" />
                                            )}
                                            {/* Step Content */}
                                            <div className="flex flex-col pt-1.5 pb-2">
                                                <h4 className="text-[0.95rem] font-semibold text-white/90 mb-1 leading-snug">{step.title}</h4>
                                                <p className="text-sm text-white/40 leading-relaxed max-w-sm">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="flex-1 flex items-center justify-center">
                                {/* Using the provided image styling logic */}
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="w-full relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl shadow-black/50"
                                >
                                    {/* Try to load the image, otherwise fallback to placeholder */}
                                    <div className="aspect-[4/3] w-full bg-black/20 flex items-center justify-center">
                                        <img
                                            src={activeTab.image}
                                            alt={activeTab.headline}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23ffffff'%3EImage Placeholder: ${activeTab.label}%3C/text%3E%3C/svg%3E`;
                                            }}
                                        />
                                    </div>
                                    {/* Subtle vignette over the image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100 duration-500" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Impact Bar */}
                <div className="w-full rounded-[1.5rem] md:rounded-full bg-white/[0.02] border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl mt-8 md:mt-12 overflow-hidden relative">
                    {/* Subtle shine effect on the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 lg:gap-12 relative z-10">
                        <div className="flex flex-row md:flex-col whitespace-nowrap md:border-r border-white/10 md:pr-8 lg:pr-12 gap-2 md:gap-0 border-b md:border-b-0 pb-4 md:pb-0 w-full md:w-auto">
                            <h4 className="text-xl md:text-2xl font-bold text-white/90 leading-none mb-1">Business</h4>
                            <h4 className="text-xl md:text-2xl font-bold text-white/90 leading-none">Impact</h4>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
                            <AnimatePresence mode="popLayout">
                                {activeTab.impacts.map((impact, idx) => (
                                    <motion.div
                                        key={`${activeTab.id}-impact-${idx}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className="flex items-center gap-4 border-l-2 border-[#8739f3]/40 pl-4 py-1"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
                                            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-semibold text-white/80 leading-tight">{impact}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
