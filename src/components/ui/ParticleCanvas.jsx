import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Gold Constellation Canvas (Hero Background)
//
// • Warm gold-tinted neural nodes with synaptic connections
// • Interactive mouse attraction/repulsion network
// • Dynamic theme-aware: adapts to light/dark mode changes seamlessly
// • 60fps performance, reduced-motion aware
// ─────────────────────────────────────────────────────────────────────────────

const NODE_COUNT = 85;
const CONNECT_DIST = 120;
const MOUSE_CONNECT_DIST = 150;
const MOUSE_REPEL_DIST = 70;

function getThemeColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    return {
      colors: [
        'rgba(245, 215, 110, 0.7)',
        'rgba(212, 175, 55, 0.65)',
        'rgba(253, 251, 247, 0.5)',
        'rgba(184, 134, 11, 0.5)',
        'rgba(230, 193, 90, 0.55)',
      ],
      lineColor: 'rgba(212, 175, 55,',
      mouseLineColor: 'rgba(245, 215, 110,',
    };
  } else {
    return {
      colors: [
        'rgba(184, 134, 11, 0.65)',
        'rgba(201, 151, 22, 0.60)',
        'rgba(158, 116, 9, 0.55)',
        'rgba(136, 97, 5, 0.60)',
        'rgba(223, 178, 53, 0.50)',
      ],
      lineColor: 'rgba(184, 134, 11,',
      mouseLineColor: 'rgba(158, 116, 9,',
    };
  }
}

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

    let currentTheme = getThemeColors();

    function handleResize() {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (width !== w || height !== h) {
        width = w;
        height = h;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }
    handleResize();

    const parent = canvas.parentElement;
    const ro = new ResizeObserver(handleResize);
    if (parent) {
      ro.observe(parent);
    }
    window.addEventListener('resize', handleResize);

    const speedMultiplier = reducedMotion ? 0.15 : 0.45;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      vx: (Math.random() - 0.5) * speedMultiplier,
      vy: (Math.random() - 0.5) * speedMultiplier,
      radius: Math.random() * 1.6 + 0.8,
      color: currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)],
      baseAlpha: Math.random() * 0.35 + 0.25,
    }));

    // Listen to theme mutations on document.documentElement
    const themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') {
          currentTheme = getThemeColors();
          nodes.forEach((n) => {
            n.color = currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)];
          });
        }
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

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

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < MOUSE_REPEL_DIST && mdist > 0.1) {
          const repelForce = ((MOUSE_REPEL_DIST - mdist) / MOUSE_REPEL_DIST) * 1.5;
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

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `${currentTheme.lineColor} ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Mouse connection
        const mdx = n1.x - mouse.x;
        const mdy = n1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < MOUSE_CONNECT_DIST) {
          const mAlpha = (1 - mdist / MOUSE_CONNECT_DIST) * 0.4;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${currentTheme.mouseLineColor} ${mAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Draw node
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
      themeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto z-0 ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
        backgroundColor: 'transparent',
      }}
      aria-hidden="true"
    />
  );
}
