import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

/* ====== MEE DETAILS: ikkada matrame marchandi ====== */

// NxtWave lo nerchukunna skills (chips ga kanipistayi)
const NXTWAVE_SKILLS = [
    { name: "HTML" }, { name: "CSS" }, { name: "Bootstrap" }, { name: "Flexbox" },
    { name: "JavaScript" }, { name: "React" }, { name: "Tailwind CSS" }, { name: "Python" },
    { name: "SQL" }, { name: "Node.js", learning: true }, { name: "Express.js", learning: true }, { name: "MongoDB", learning: true }, { name: "DSA with Python", learning: true },
    { name: "GenAI" }, { name: "LLM apps" }, { name: "RAG" }, { name: "Agentic RAG" }, { name: "AI automation" },
];

/* KOTHA CERTIFICATE ADD CHEYADAM (chala easy):
   1. Certificate image ni public/certificates folder lo pettandi (ex: react-course.webp, png/jpg kuda ok)
   2. Kinda list lo TOP lo oka block add cheyandi (newest first untundi):
      { title: "Course peru", date: "Nov 2026", image: "/certificates/react-course.webp", verify: "link (ledu ante \"\")" },
   Anthe. Migatha automatic. */
const NXTWAVE_CERTS = [
    { title: "Build Your Own AI Vision Chatbot Workshop", tag: "Project completion", date: "Oct 2026", image: "/certificates/ai-vision-chatbot.webp", verify: "" },
    { title: "Responsive Web Design Using Flexbox", tag: "Flexbox", date: "Aug 2026", image: "/certificates/flexbox.webp", verify: "https://certificates.ccbp.in/academy/responsive-web-design-using-flexbox?id=YYCOCSREES" },
    { title: "JavaScript Essentials", tag: "JavaScript", date: "Aug 2026", image: "/certificates/javascript-essentials.webp", verify: "https://certificates.ccbp.in/academy/javascript-essentials?id=SWDJDHMWDT" },
    { title: "Build Your Own Dynamic Web Application", tag: "JavaScript", date: "Aug 2026", image: "/certificates/dynamic-web-application.webp", verify: "https://certificates.ccbp.in/academy/dynamic-web-application?id=XVUBVQIDVC" },
    { title: "Programming Foundations with Python", tag: "Python", date: "Jul 2026", image: "/certificates/python-foundations.webp", verify: "https://certificates.ccbp.in/academy/programming-foundations-with-python?id=HLMNOIQPFE" },
    { title: "Introduction to Databases", tag: "SQL", date: "Mar 2026", image: "/certificates/introduction-to-databases.webp", verify: "https://certificates.ccbp.in/academy/introduction-to-databases?id=OASNNTDCWZ" },
    { title: "Build Your Own Responsive Website", tag: "Bootstrap, Flexbox", date: "Mar 2026", image: "/certificates/responsive-website.webp", verify: "https://certificates.ccbp.in/academy/build-your-own-responsive-website?id=KCHTSDYASW" },
    { title: "Build Your Own Static Website", tag: "HTML, CSS, Bootstrap", date: "Mar 2026", image: "/certificates/static-website.webp", verify: "https://certificates.ccbp.in/academy/static-website?id=VKUXJQWFZC" },
];

// College nunchi achievements (degree card lo kanipistayi)
const COLLEGE_CERTS = [
    { title: "GGU Hack Fest'26, 24-hour national level hackathon", tag: "Participation", date: "Feb 2026", image: "/certificates/ggu-hackfest-2026.webp", verify: "" },
];
/* =================================================== */

const btnPrimary =
    "inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition-transform hover:-translate-y-0.5";
const btnGhost =
    "inline-flex items-center rounded-full border border-[#2b2c36] px-5 py-2.5 text-sm transition-colors hover:border-sig";

// Certificate pedda ga open ayye popup. Left/right arrows (keyboard kuda) tho okati tarvata okati chudochu.
function Lightbox({ items, index, onClose, onNav }) {
    const c = items[index];
    const many = items.length > 1;

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && many) onNav(1);
            if (e.key === "ArrowLeft" && many) onNav(-1);
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose, onNav, many]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={c.title}
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                <img src={c.image} alt={c.title} className="max-h-[68vh] w-full rounded-2xl object-contain" />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-semibold">{c.title}</p>
                        <p className="text-sm text-mute">
                            {c.date} · {c.tag}
                            {many && ` · ${index + 1} of ${items.length}`}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {c.verify && (
                            <a href={c.verify} target="_blank" rel="noreferrer" className={btnPrimary}>
                                Verify
                            </a>
                        )}
                        <button onClick={onClose} className={btnGhost}>Close</button>
                    </div>
                </div>

                {many && (
                    <>
                        <button
                            onClick={() => onNav(-1)}
                            aria-label="Previous certificate"
                            className="absolute left-2 top-[34%] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xl backdrop-blur transition-colors hover:border-sig md:-left-14"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => onNav(1)}
                            aria-label="Next certificate"
                            className="absolute right-2 top-[34%] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xl backdrop-blur transition-colors hover:border-sig md:-right-14"
                        >
                            →
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}

// Certificate thumbnails grid (NxtWave and college rendu chotla vaadataru)
function CertGrid({ items, onOpen, cols = "grid-cols-2 lg:grid-cols-4" }) {
    return (
        <div className={`grid gap-3 ${cols}`}>
            {items.map((c, i) => (
                <motion.button
                    key={c.title}
                    onClick={() => onOpen(i)}
                    className="group overflow-hidden rounded-xl border border-[#23242c] bg-[#101018] text-left transition-colors hover:border-sig"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                    whileHover={{ y: -4 }}
                >
                    <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-3">
                        <p className="line-clamp-2 text-[13px] font-semibold leading-snug">{c.title}</p>
                        <p className="mt-1 text-xs text-mute">{c.date}</p>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}

// Timeline lo oka entry (left lo dot, right lo card)
function Entry({ children }) {
    return (
        <motion.div
            className="relative pl-10 md:pl-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
        >
            <span className="ping-dot absolute left-[7px] top-8 h-3.5 w-3.5 rounded-full bg-sig md:left-[15px]" />
            {children}
        </motion.div>
    );
}

function PresentBadge() {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-sig/15 px-3 py-1 text-xs font-semibold text-sig">
            <span className="h-1.5 w-1.5 rounded-full bg-sig" /> Present
        </span>
    );
}

export default function Education() {
    // lightbox: ye list lo, ye certificate open undo
    const [box, setBox] = useState(null); // { items, index }
    const open = (items) => (index) => setBox({ items, index });
    const close = () => setBox(null);
    const nav = (d) => setBox((b) => (b ? { ...b, index: (b.index + d + b.items.length) % b.items.length } : b));

    // Timeline line scroll chesthe kindiki draw avtundi
    const lineRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 75%", "end 60%"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

    return (
        <section id="education" className="relative bg-bg px-[6vw] py-24 md:px-[5vw] md:py-32">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sig">Education</p>
                    <h2 className="mt-3 text-[clamp(38px,6vw,76px)] font-extrabold leading-none tracking-[-0.045em]">
                        Where I <span className="outline-letter">learn</span>
                    </h2>
                    <p className="mt-5 max-w-xl text-mute">
                        A B.Tech in AI and ML, plus hands-on training at NxtWave where every skill was tested
                        with exams and certified.
                    </p>
                </motion.div>

                <div ref={lineRef} className="relative mt-14 space-y-10">
                    {/* Timeline line: grey base + blue fill */}
                    <div className="absolute bottom-0 left-[13px] top-0 w-px bg-[#1c1d25] md:left-[21px]" />
                    <motion.div
                        className="absolute bottom-0 left-[13px] top-0 w-px origin-top bg-sig md:left-[21px]"
                        style={{ scaleY }}
                    />

                    {/* 1) DEGREE */}
                    <Entry>
                        <div className="rounded-3xl border border-[#1c1d25] bg-[#0b0b10] p-6 md:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm text-mute">2024 to 2028</span>
                                <PresentBadge />
                            </div>
                            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">B.Tech CSE (AI and ML)</h3>
                            <p className="mt-1 text-mute">Godavari Global University, Rajamahendravaram, Andhra Pradesh</p>

                            <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-5">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-mute">CGPA</p>
                                    <p className="text-5xl font-extrabold tracking-tight text-sig">9.07</p>
                                </div>
                                <div className="min-w-[200px] flex-1">
                                    <p className="mb-2 text-xs uppercase tracking-widest text-mute">Currently in year 3 of 4</p>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, 4].map((y) => (
                                            <span
                                                key={y}
                                                className={`h-2 flex-1 rounded-full ${y < 3 ? "bg-sig" : y === 3 ? "bg-sig/50 ping-dot" : "bg-[#1c1d25]"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-sig">Achievements</h4>
                                <CertGrid items={COLLEGE_CERTS} onOpen={open(COLLEGE_CERTS)} cols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4" />
                                <p className="mt-2 text-xs text-mute">Participation certificate, GGU School of Computing.</p>
                            </div>
                        </div>
                    </Entry>

                    {/* 2) NXTWAVE */}
                    <Entry>
                        <div className="rounded-3xl border border-sig/40 bg-[#0b0b10] p-6 shadow-[0_20px_60px_-25px_rgba(124,156,255,.45)] md:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm text-mute">Jan 2026 to Present</span>
                                <PresentBadge />
                                <span className="rounded-full border border-[#2b2c36] px-3 py-1 text-xs text-mute">Training program</span>
                            </div>
                            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">CCBP 4.0 Academy</h3>
                            <p className="mt-1 text-mute">
                                NxtWave, with training and placement support until I get a job.
                            </p>

                            <div className="mt-6">
                                <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-sig">What I learned</h4>
                                <div className="flex flex-wrap gap-2">
                                    {NXTWAVE_SKILLS.map((s) => (
                                        <span
                                            key={s.name}
                                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm ${s.learning ? "border-dashed border-sig/60" : "border-[#23242c]"
                                                }`}
                                        >
                                            {s.name}
                                            {s.learning && (
                                                <span className="rounded-full bg-sig/15 px-2 py-0.5 text-[11px] font-semibold text-sig">learning</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="mb-1 text-sm font-semibold uppercase tracking-widest text-sig">
                                    Certifications ({NXTWAVE_CERTS.length})
                                </h4>
                                <p className="mb-4 text-xs text-mute">Earned by passing NxtWave exams. Click to enlarge, use Verify to check each one.</p>
                                <CertGrid items={NXTWAVE_CERTS} onOpen={open(NXTWAVE_CERTS)} />
                            </div>
                        </div>
                    </Entry>
                </div>
            </div>

            <AnimatePresence>
                {box && <Lightbox items={box.items} index={box.index} onClose={close} onNav={nav} />}
            </AnimatePresence>
        </section>
    );
}