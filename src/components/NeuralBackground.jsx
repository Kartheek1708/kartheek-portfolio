import { useEffect, useRef } from "react";

// Background lo move ayye dots + lines. Cursor daggaraki vaste brighter ga avtayi.
export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mouse = { x: -999, y: -999 };
        let w, h, points = [], raf;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            // Mobile lo takkuva dots (speed + battery kosam)
            const count = w < 820 ? 32 : 70;
            points = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
            }));
        }

        function onMove(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            if (!still) {
                for (const p of points) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                }
            }
            for (let i = 0; i < points.length; i++) {
                const a = points[i];
                const distMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                const glow = Math.max(0, 1 - distMouse / 220); // cursor daggara unte 1 ki daggaraga
                ctx.fillStyle = `rgba(124,156,255,${0.25 + glow * 0.75})`;
                ctx.beginPath();
                ctx.arc(a.x, a.y, 1.6 + glow * 1.8, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < points.length; j++) {
                    const b = points[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < 140) {
                        const near = Math.max(0, 1 - Math.min(distMouse, Math.hypot(b.x - mouse.x, b.y - mouse.y)) / 220);
                        ctx.strokeStyle = `rgba(124,156,255,${(1 - d / 140) * (0.1 + near * 0.5)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);
        // Cleanup: component remove ayyinappudu listeners apestam (memory leak raakunda)
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}