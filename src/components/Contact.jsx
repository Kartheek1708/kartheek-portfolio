import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

/* ====== MEE DETAILS: ikkada matrame marchandi ====== */
const EMAIL = "kartheekreddypallerla@gmail.com"; // <- mee email pettandi
const GITHUB = "https://github.com/Kartheek1708";
const LINKEDIN = "https://www.linkedin.com/in/kartheekreddypallerla/?isSelfProfile=true"; // <- mee LinkedIn link pettandi
const RESUME = "/resume.pdf"; // resume pettali ante public folder lo resume.pdf pettandi, ikkada "/resume.pdf" ani rayandi
const FORM_ENDPOINT = "https://formspree.io/f/mvkkzjrl"; // <- Formspree nunchi vachina link pettandi
/* =================================================== */

const btnPrimary =
    "inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-[#0a0a0a] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";
const btnGhost =
    "inline-flex items-center justify-center rounded-full border border-[#2b2c36] px-6 py-3 text-sm transition-colors hover:border-sig";
const inputCls =
    "w-full rounded-xl border border-[#23242c] bg-[#101018] px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-[#5d5e6c] focus:border-sig";

function Field({ label, name, type = "text", textarea = false }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm text-mute">{label}</span>
            {textarea ? (
                <textarea name={name} required rows={5} className={`${inputCls} resize-none`} />
            ) : (
                <input name={name} type={type} required className={inputCls} />
            )}
        </label>
    );
}

function ContactForm() {
    // status: idle | sending | success | error | notset
    const [status, setStatus] = useState("idle");

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget; // await tarvata e.currentTarget null avtundi, anduke mundu save chestam
        // Formspree link inka pettaledu ante, user ki clear ga cheptam
        if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
            setStatus("notset");
            return;
        }
        setStatus("sending");
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(form),
            });
            if (res.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <motion.div
                className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-sig/40 bg-[#0b0b10] p-8 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <span className="text-5xl">✅</span>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight">Message sent</h3>
                <p className="mt-2 max-w-xs text-mute">Thanks for reaching out. I will reply as soon as I can.</p>
                <button onClick={() => setStatus("idle")} className={`${btnGhost} mt-6`}>
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-[#1c1d25] bg-[#0b0b10] p-6 md:p-8">
            <Field label="Your name" name="name" />
            <Field label="Your email" name="email" type="email" />
            <Field label="Message" name="message" textarea />
            {/* Honeypot: manushulaki kanipinchadu, spam bots fill chestayi, Formspree adi block chestundi */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />

            <button type="submit" disabled={status === "sending"} className={`${btnPrimary} w-full`}>
                {status === "sending" ? "Sending..." : "Send message"}
            </button>

            <AnimatePresence>
                {status === "error" && (
                    <motion.p role="alert" className="text-sm text-[#ff8a8a]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Something went wrong. Please try again, or email me directly at {EMAIL}.
                    </motion.p>
                )}
                {status === "notset" && (
                    <motion.p role="alert" className="text-sm text-[#ffcf5c]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        The form is not connected yet. Please email me directly at {EMAIL}.
                    </motion.p>
                )}
            </AnimatePresence>
        </form>
    );
}

function CopyEmail() {
    const [copied, setCopied] = useState(false);
    async function copy() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard block ayite emi cheyam, mailto link undi */
        }
    }
    return (
        <button onClick={copy} className={btnGhost}>
            {copied ? "Copied ✓" : "Copy email"}
        </button>
    );
}

export default function Contact() {
    return (
        <>
            <section id="contact" className="relative overflow-hidden bg-bg px-[6vw] py-24 md:px-[5vw] md:py-32">
                <div className="pointer-events-none absolute left-1/2 top-0 h-[60vw] max-h-[700px] w-[60vw] max-w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,156,255,.14),transparent_65%)] blur-[20px]" />

                <div className="relative mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sig">Contact</p>
                        <h2 className="mt-3 text-[clamp(38px,6vw,76px)] font-extrabold leading-none tracking-[-0.045em]">
                            Let us <span className="outline-letter">work together</span>
                        </h2>
                        <p className="mt-5 inline-flex items-center gap-2.5 text-mute">
                            <span className="ping-dot h-2 w-2 rounded-full bg-sig" />
                            Open to fresher roles and internships
                        </p>
                    </motion.div>

                    <div className="mt-14 grid gap-8 md:grid-cols-[.9fr_1.1fr]">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="max-w-sm leading-relaxed text-mute">
                                Have a role, a project or a question about my work? Send a message and I will get back to you.
                            </p>

                            <div>
                                <p className="text-xs uppercase tracking-widest text-mute">Email</p>
                                <a href={`mailto:${EMAIL}`} className="mt-1 block break-all text-lg font-semibold transition-colors hover:text-sig">
                                    {EMAIL}
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <CopyEmail />
                                <a href={GITHUB} target="_blank" rel="noreferrer" className={btnGhost}>GitHub</a>
                                <a href={LINKEDIN} target="_blank" rel="noreferrer" className={btnGhost}>LinkedIn</a>
                                {RESUME && (
                                    <a href={RESUME} download className={btnPrimary}>Download resume</a>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.12 }}
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-[#1c1d25] bg-bg px-[6vw] py-8 text-sm text-mute md:px-[5vw]">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 md:flex-row">
                    <p>© {new Date().getFullYear()} Pallerla Kartheekreddy</p>
                    <p>Built with React, Tailwind CSS and Framer Motion</p>
                </div>
            </footer>
        </>
    );
}