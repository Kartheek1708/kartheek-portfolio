import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, MotionConfig } from "framer-motion";
import NeuralBackground from "./NeuralBackground";

/* ====== MEE DETAILS: ikkada matrame marchandi ====== */
const NAME_1 = "Pallerla";
const NAME_2 = "Kartheekreddy";
const ROLES = ["Full stack developer", "GenAI developer", "LLM app builder", "MERN stack learner"];
const LINKS = {
    github: "https://github.com/YOUR-USERNAME",      // <- mee GitHub link pettandi
    linkedin: "https://linkedin.com/in/YOUR-USERNAME", // <- mee LinkedIn link pettandi
};
const NAV = ["Projects", "Skills", "Education", "Contact"];
/* =================================================== */

// 1) Typing effect: words okkokkati type avtu, delete avtu cycle avtayi
function useTyping(words) {
    const [text, setText] = useState("");
    useEffect(() => {
        let word = 0, char = 0, deleting = false, timer;
        function tick() {
            const current = words[word];
            setText(current.slice(0, char));
            if (!deleting && char === current.length) {
                deleting = true;
                timer = setTimeout(tick, 1400); // full word type ayyaka konchem aagutundi
                return;
            }
            if (deleting && char === 0) {
                deleting = false;
                word = (word + 1) % words.length;
            }
            char += deleting ? -1 : 1;
            timer = setTimeout(tick, deleting ? 35 : 70);
        }
        timer = setTimeout(tick, 2000); // page load animation ayyaka modalavutundi
        return () => clearTimeout(timer);
    }, [words]);
    return text;
}

// 2) Name letters kindi nunchi paiki rise avtayi
function RiseText({ text, outline = false, offset = 0 }) {
    return (
        <span className="block w-max overflow-hidden whitespace-nowrap pb-[0.08em]">
            {[...text].map((ch, i) => (
                <motion.span
                    key={i}
                    className={`inline-block ${outline ? "outline-letter" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 + (i + offset) * 0.055 }}
                >
                    {ch}
                </motion.span>
            ))}
        </span>
    );
}

// 3) Fade-in helper: paiki konchem jarugutu appear avtundi
function Fade({ delay = 0, className = "", children }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
        >
            {children}
        </motion.div>
    );
}

// 4) Magnetic button: mouse ni konchem follow avtundi
function Magnetic({ href, className, children }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    function onMove(e) {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35 });
    }
    return (
        <motion.a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className={className}
            onMouseMove={onMove}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            animate={pos}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
            {children}
        </motion.a>
    );
}

export default function Hero() {
    const typed = useTyping(ROLES);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [scrolled, setScrolled] = useState(false);

    // Page konchem scroll ayyaka navbar ki glass background vastundi
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // 5) Mouse position batti photo tilt avtundi
    function onMouseMove(e) {
        setTilt({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    }

    return (
        // MotionConfig: user phone lo "reduce motion" on unte animations automatic ga taggutayi
        <MotionConfig reducedMotion="user">
            <section onMouseMove={onMouseMove} className="relative min-h-screen overflow-hidden bg-bg">
                <NeuralBackground />

                {/* Navbar */}
                <nav
                    className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[6vw] transition-all duration-300 md:px-[5vw] ${scrolled ? "border-b border-[#1c1d25] bg-bg/70 py-4 backdrop-blur-xl" : "border-b border-transparent py-7"
                        }`}
                >
                    <div className="text-[22px] font-extrabold tracking-tight">
                        PK<span className="text-sig">.</span>
                    </div>
                    <ul className="hidden gap-8 text-[15px] text-mute md:flex">
                        {NAV.map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase()}`} className="transition-colors hover:text-ink">{item}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="relative z-10 grid min-h-screen items-end px-[6vw] md:grid-cols-[1.15fr_.85fr] md:px-[5vw]">
                    {/* Phota venaka glow */}
                    <div className="glow-pulse pointer-events-none absolute -right-[10%] top-20 -z-0 h-[90vw] w-[90vw] rounded-full bg-[radial-gradient(circle,rgba(124,156,255,.24),transparent_62%)] blur-[20px] md:right-[8%] md:top-auto md:bottom-[30%] md:h-[46vw] md:max-h-[640px] md:w-[46vw] md:max-w-[640px]" />

                    {/* LEFT: text */}
                    <div className="relative z-20 mt-[48vh] pb-[6vh] md:mt-0 md:pb-[9vh]">
                        <Fade delay={0.1}>
                            <div className="mb-[3.2vh] inline-flex items-center gap-2.5 rounded-full border border-[#23242c] px-3.5 py-2 text-sm text-mute">
                                <span className="ping-dot h-2 w-2 rounded-full bg-sig" />
                                Open to fresher roles
                            </div>
                        </Fade>

                        <h1 className="text-[clamp(38px,12.4vw,90px)] font-extrabold leading-[0.92] tracking-[-0.055em] md:text-[clamp(50px,9.2vw,150px)]">
                            <RiseText text={NAME_1} />
                            <RiseText text={NAME_2} outline offset={8} />
                        </h1>

                        <Fade delay={1.3} className="mt-[4vh] min-h-[1.3em] text-[clamp(20px,2.1vw,30px)] font-semibold tracking-tight">
                            I'm a <span className="text-sig">{typed}</span>
                            <span className="cursor-blink ml-[3px] inline-block h-[1em] w-0.5 bg-sig align-[-0.12em]" />
                        </Fade>

                        <Fade delay={1.5} className="mt-3.5 max-w-[520px] text-[clamp(15px,1.25vw,18px)] leading-relaxed text-mute">
                            I build web apps and LLM tools, from RAG pipelines to agents and automation, that keep working after the demo ends.
                        </Fade>

                        <Fade delay={1.7} className="mt-[4vh] flex flex-wrap gap-3.5">
                            <Magnetic href="#projects" className="rounded-full bg-ink px-6 py-[15px] text-base font-bold text-[#0a0a0a]">
                                See my projects
                            </Magnetic>
                            <Magnetic href={LINKS.github} className="rounded-full border border-[#2b2c36] px-[22px] py-[15px] text-base transition-colors hover:border-sig">
                                GitHub
                            </Magnetic>
                            <Magnetic href={LINKS.linkedin} className="rounded-full border border-[#2b2c36] px-[22px] py-[15px] text-base transition-colors hover:border-sig">
                                LinkedIn
                            </Magnetic>
                        </Fade>

                        <Fade delay={1.9} className="mt-[5vh] max-w-[540px] text-sm leading-[1.8] text-mute">
                            <span className="mr-4 inline-block"><span className="text-ink">Web:</span> React, Node.js, Express, MongoDB, Tailwind</span>
                            <span className="mr-4 inline-block"><span className="text-ink">Data:</span> Python, SQL</span>
                            <span className="inline-block"><span className="text-ink">AI:</span> LLM apps, RAG, agents</span>
                        </Fade>
                    </div>

                    {/* RIGHT: photo (mobile lo paina, desktop lo kudi vaipu) */}
                    <div
                        className="absolute right-0 top-[70px] z-0 h-[46vh] w-[78%] md:relative md:top-auto md:-mr-[5vw] md:h-[92vh] md:w-full md:max-w-[640px] md:justify-self-end"
                        style={{ perspective: 900 }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotateY: tilt.x * 8, rotateX: -tilt.y * 5 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        >
                            <motion.img
                                src="/profile.jpg"
                                alt="Pallerla Kartheekreddy"
                                className="photo-mask absolute bottom-0 right-0 h-full w-auto max-w-none"
                                initial={{ opacity: 0, x: 30, scale: 1.03 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 1.4, delay: 1 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    );
}