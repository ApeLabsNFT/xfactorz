import HoloboxScrollCanvas from "./components/HoloboxScrollCanvas";
import IndustryWorkflowSection from "./components/IndustryWorkflowSection";
import CopilotSection from "./components/CopilotSection";
import VisitorAutomationSection from "./components/VisitorAutomationSection";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0B0D10] selection:bg-[#8739f3]/30 selection:text-white pt-20">
      {/* SECTION 01: Scrollytelling Canvas Hero */}
      <HoloboxScrollCanvas />

      {/* SECTION 02: Industry Workflows (Three-column Vertical) */}
      <IndustryWorkflowSection />

      {/* SECTION 03: Copilot Interface (Avatar + Chat) */}
      <CopilotSection />

      {/* SECTION 04: Visitor Automation Tabbed System */}
      <VisitorAutomationSection />

      {/* SECTION 05: Enterprise Case Studies */}
      <section className="bg-white py-32 border-t border-black/5 text-[#1a1a2e]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 flex flex-col items-start gap-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#8739f3]">
              Proven at Scale
            </h2>
            <h3 className="text-4xl font-medium tracking-tight sm:text-5xl max-w-2xl">
              Infrastructure trusted by global operations.
            </h3>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                company: "Global Automotive Brand",
                metric: "40%",
                metricText: "Reduction in showroom wait times",
                title: "Reimagining the showroom experience with conversational AI.",
              },
              {
                company: "National Bank",
                metric: "100+",
                metricText: "Branches deployed in 60 days",
                title: "Standardizing compliance and routing across retail banking.",
              },
              {
                company: "Industrial Energy Corp",
                metric: "Zero",
                metricText: "Unauthorized site entries",
                title: "Automating safety inductions for 10,000+ contractors.",
              },
            ].map((story, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-start">
                <div className="w-full h-[1px] bg-black/10 mb-8 transition-all group-hover:bg-[#8739f3]" />
                <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-8">
                  {story.company}
                </div>
                <div className="mb-6 flex flex-col gap-1">
                  <span className="text-5xl font-light tracking-tighter text-[#8739f3]">
                    {story.metric}
                  </span>
                  <span className="text-sm font-medium text-black/60">
                    {story.metricText}
                  </span>
                </div>
                <h4 className="text-xl font-medium leading-snug text-[#1a1a2e] group-hover:text-[#8739f3] transition-colors">
                  {story.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: Final CTA + Contact */}
      <section className="bg-[#0B0D10] py-32 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8739f3]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:gap-24 items-start">

            <div className="max-w-2xl pt-10">
              <h2 className="mb-8 text-5xl font-medium tracking-tight text-white/90 sm:text-6xl lg:text-7xl leading-tight">
                Architect your<br /> physical AI layer.
              </h2>
              <p className="text-xl text-white/50 mb-12 max-w-lg font-light">
                Speak with our engineering team to map out deployment requirements for your facilities.
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/40 font-medium uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8739f3]" />
                  Enterprise Security
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8739f3]" />
                  SOC2 Compliant
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8739f3]" />
                  Global Support
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 lg:p-10 backdrop-blur-2xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2rem] pointer-events-none" />
              <form className="relative flex flex-col gap-5 z-10">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Full Name</label>
                  <input type="text" id="name" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#8739f3] focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-[#8739f3] transition-all" placeholder="Enter your name" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Work Email</label>
                  <input type="email" id="email" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#8739f3] focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-[#8739f3] transition-all" placeholder="you@company.com" />
                </div>

                <div className="flex flex-col gap-1.5 mb-2">
                  <label htmlFor="company" className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Company</label>
                  <input type="text" id="company" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#8739f3] focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-[#8739f3] transition-all" placeholder="Organization name" />
                </div>

                <button type="button" className="w-full rounded-xl bg-white text-black font-semibold py-4 hover:bg-white/90 transition-colors shadow-lg mt-2">
                  Request Strategy Call
                </button>
                <p className="text-center text-xs text-white/30 mt-2">
                  Our team typically responds within 24 hours.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0D10] py-12 text-center border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-widest text-white">XFACTORZ</span>
            <span className="text-white/20">|</span>
            <span className="text-xs text-white/40 uppercase tracking-widest">Enterprise AI</span>
          </div>
          <p className="text-xs text-white/40 font-medium tracking-wide">
            © {new Date().getFullYear()} XFactorz Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
