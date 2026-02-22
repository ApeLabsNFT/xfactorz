export default function CopilotSection() {
    return (
        <section className="relative w-full bg-[#0B0D10] overflow-hidden flex flex-col items-center justify-center">

            {/* Desktop View (Provided Custom Graphic) */}
            <div className="hidden md:flex w-full justify-center items-center h-[600px] lg:h-[800px] bg-white">
                <img
                    src="/desktop-copilot.png"
                    alt="Copilot Interface Desktop"
                    className="w-full h-full object-contain object-center"
                />
            </div>

            {/* Mobile View (Provided Custom Graphic) */}
            <div className="flex md:hidden w-full justify-center items-center min-h-[400px] bg-white">
                <img
                    src="/mobile-copilot.png"
                    alt="Copilot Interface Mobile"
                    className="w-full h-auto object-contain object-center scale-100"
                />
            </div>

        </section>
    );
}
