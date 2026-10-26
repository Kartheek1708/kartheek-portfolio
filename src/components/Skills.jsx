// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";

/* ====== MEE SKILLS: ikkada matrame marchandi ======
   learning: true ante "learning" badge vastundi (nerchukuntunna skills kosam).
   Nijanga vachina skills matrame pettandi, interview lo adugutaru. */
const GROUPS = [
    {
        title: "Frontend",
        note: "What users see and click",
        icon: "🎨",
        skills: [
            { name: "HTML" },
            { name: "CSS (Flexbox)" },
            { name: "Bootstrap" },
            { name: "JavaScript" },
            { name: "React" },
            { name: "Tailwind CSS" },
        ],
    },
    {
        title: "Backend and data",
        note: "APIs and databases",
        icon: "⚙️",
        skills: [
            { name: "Python" },
            { name: "DSA with Python", learning: true },
            { name: "FastAPI", learning: true },
            { name: "Node.js", learning: true },
            { name: "Express.js", learning: true },
            { name: "SQL" },
            { name: "MongoDB", learning: true },
        ],
    },
    {
        title: "GenAI and LLM apps",
        note: "My main focus right now",
        icon: "🧠",
        wide: true,
        skills: [
            { name: "Building LLM applications" },
            { name: "RAG" },
            { name: "Agentic RAG" },
            { name: "AI automation" },
            { name: "LangChain" },
            { name: "FAISS" },
            { name: "HuggingFace Embeddings" },
            { name: "Groq" },
            { name: "Google Gemini" },
            { name: "Streamlit" },
        ],
    },
    {
        title: "Tools and deployment",
        note: "Shipping what I build",
        icon: "🚀",
        wide: true,
        skills: [
            { name: "Git" },
            { name: "GitHub" },
            { name: "GitHub Pages" },
            { name: "Streamlit Cloud" },
            { name: "Render" },
        ],
    },
];
/* =================================================== */

// Marquee lo scroll ayye names (GROUPS nunchi automatic ga vastayi)
const MARQUEE = GROUPS.flatMap((g) => g.skills.map((s) => s.name));

function Marquee() {
    const reduce = useReducedMotion();
    // List ni rendu sarlu pettali, appudu loop smooth ga kanipistundi (0% nunchi -50% varaku move)
    const items = [...MARQUEE, ...MARQUEE];
    return (
        <div
            className="relative mt-12 overflow-hidden border-y border-[#1c1d25] py-4"
            style={{
                WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            }}
        >
            <motion.div
                className="flex w-max gap-10 whitespace-nowrap text-lg font-semibold text-mute"
                animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
                {items.map((name, i) => (
                    <span key={i} className="flex items-center gap-10">
                        {name}
                        <span className="text-sig">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="relative bg-bg px-[6vw] py-24 md:px-[5vw] md:py-32">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sig">Skills</p>
                    <h2 className="mt-3 text-[clamp(38px,6vw,76px)] font-extrabold leading-none tracking-[-0.045em]">
                        What I <span className="outline-letter">work with</span>
                    </h2>
                    <p className="mt-5 max-w-xl text-mute">
                        Full stack web development with a growing focus on GenAI. Everything below is something I
                        have used in a project or am learning right now.
                    </p>
                </motion.div>

                <Marquee />

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {GROUPS.map((g, gi) => (
                        <motion.div
                            key={g.title}
                            className={`rounded-3xl border bg-[#0b0b10] p-6 transition-[border-color,box-shadow] duration-300 hover:border-sig/60 md:p-8 ${g.wide ? "md:col-span-2" : ""
                                } ${g.title.startsWith("GenAI") ? "border-sig/40 shadow-[0_20px_60px_-25px_rgba(124,156,255,.45)]" : "border-[#1c1d25]"}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: (gi % 2) * 0.12 }}
                        >
                            <div className="flex items-center gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#23242c] bg-[#101018] text-2xl">
                                    {g.icon}
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">{g.title}</h3>
                                    <p className="text-sm text-mute">{g.note}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {g.skills.map((s, si) => (
                                    <motion.span
                                        key={s.name}
                                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${s.learning
                                                ? "border-dashed border-sig/60 text-ink"
                                                : "border-[#23242c] text-ink hover:border-sig hover:text-sig"
                                            }`}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.15 + si * 0.05 }}
                                        whileHover={{ y: -3 }}
                                    >
                                        {s.name}
                                        {s.learning && (
                                            <span className="rounded-full bg-sig/15 px-2 py-0.5 text-[11px] font-semibold text-sig">
                                                learning
                                            </span>
                                        )}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}