export default function CopilotSection() {
    return (
        <section className="relative w-full bg-[#0B0D10] overflow-hidden flex flex-col items-center justify-center">

            {/* Desktop View (Current Image) */}
            <div className="hidden md:flex w-full h-[800px] justify-center items-center">
                <img
                    src="/section3.png"
                    alt="Copilot Interface"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Mobile View (Preserved Image Scale) */}
            <div className="flex md:hidden w-full justify-center items-center min-h-[400px]">
                <img
                    src="/section3.png"
                    alt="Copilot Interface"
                    className="w-full h-auto object-contain object-center"
                />
            </div>

        </section>
    );
}
