import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Neural Constellation Canvas (Hero Background)
//
// • Deep cyber-dark ambiance with indigo and violet neural nodes
// • Dynamic synaptic connection lines between nearby nodes
// • Interactive mouse attraction and repulsion network
// • Optimized for 60fps performance and accessibility (prefers-reduced-motion)
// ─────────────────────────────────────────────────────────────────────────────

const NODE_COUNT = 110;
const CONNECT_DIST = 115;
const MOUSE_CONNECT_DIST = 160;
const MOUSE_REPEL_DIST = 75;

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node colors: cyan/indigo/violet palette
    const colors = ['#6366f1', '#818cf8', '#a78bfa', '#c084fc', '#38bdf8'];

    // Resize handler with devicePixelRatio support
    function handleResize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    handleResize();

    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    // Initialize nodes
    const speedMultiplier = reducedMotion ? 0.2 : 0.65;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      vx: (Math.random() - 0.5) * speedMultiplier,
      vy: (Math.random() - 0.5) * speedMultiplier,
      radius: Math.random() * 1.6 + 1.0,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: Math.random() * 0.4 + 0.35,
    }));

    // Mouse listeners
    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    function render() {
      ctx.clearRect(0, 0, width, height);

      // 1. Update node positions & soft boundary wrap
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Soft repulsion from cursor
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < MOUSE_REPEL_DIST && mdist > 0.1) {
          const repelForce = ((MOUSE_REPEL_DIST - mdist) / MOUSE_REPEL_DIST) * 1.8;
          n.x += (mdx / mdist) * repelForce;
          n.y += (mdy / mdist) * repelForce;
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }

      // 2. Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connection to mouse cursor
        const mdx = n1.x - mouse.x;
        const mdy = n1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < MOUSE_CONNECT_DIST) {
          const mAlpha = (1 - mdist / MOUSE_CONNECT_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${mAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // 3. Draw individual node
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = n1.color;
        ctx.globalAlpha = n1.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-auto ${className}`}
      style={{ display: 'block' }}
    />
  );
}
