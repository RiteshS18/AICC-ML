import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ParticleCanvas (Hero Section)
//
// • Scatter phase       : dots float freely initially with neural-net connection lines
// • Auto-form phase     : after a short delay, dots form the AIML logo automatically
// • Neural graph lines  : nearby floating nodes connect with luminous gradient lines
// • Mouse interactive  : repels dots and forms responsive neural web
// • Reduced motion      : respects user accessibility settings
// ─────────────────────────────────────────────────────────────────────────────

const COUNT = 3200;
const BACKGROUND_COUNT = 900;
const LOGO_COUNT = COUNT - BACKGROUND_COUNT;
const SAMPLE_STEP = 3;
const LOGO_COVER = 0.62;
const MOUSE_RADIUS = 130;
const MOUSE_FORCE = 4.5;
const FRICTION = 0.88;
const NEURAL_CONNECT_DIST = 70;

function drawDot(ctx, x, y, radius, color, alpha) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
  ctx.fill();
  ctx.globalAlpha = 1;
}

export default function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    neuralNodes: [],
    logoPixels: [],
    logoLoaded: false,
    animId: null,
    width: 0,
    height: 0,
    mouse: { x: -9999, y: -9999 },
    targetActive: 0,
    isForming: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    s.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const formTimeout = setTimeout(() => {
      s.isForming = true;
    }, s.reducedMotion ? 100 : 900);

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.width = w;
      s.height = h;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Mouse ────────────────────────────────────────────────────────────────
    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      s.mouse.x = e.clientX - r.left;
      s.mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      s.mouse.x = -9999;
      s.mouse.y = -9999;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // ── Seed particles ───────────────────────────────────────────────────────
    function seed() {
      const w = s.width || window.innerWidth;
      const h = s.height || window.innerHeight;

      s.particles = Array.from({ length: COUNT }, (_, i) => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const isLogoDot = i < LOGO_COUNT;

        return {
          x,
          y,
          vx: (Math.random() - 0.5) * (s.reducedMotion ? 0.3 : 1.4),
          vy: (Math.random() - 0.5) * (s.reducedMotion ? 0.3 : 1.4),
          tx: x,
          ty: y,
          baseColor: '#6366f1',
          logoColor: '#818cf8',
          radius: Math.random() * 0.9 + 0.5,
          alpha: Math.random() * 0.45 + 0.25,
          isLogoDot,
        };
      });

      // Distinct ambient nodes for drawing neural network connecting lines
      s.neuralNodes = Array.from({ length: 85 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 1.5 + 1.2,
      }));
    }

    // ── Sample logo pixels & colors ──────────────────────────────────────────
    function sampleLogo() {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/aiml-logo.jpg';
      img.onload = () => {
        const size = Math.min(s.width, s.height) * LOGO_COVER;
        const offW = Math.round(size);
        const offH = Math.round(size);
        const offX = (s.width - offW) / 2;
        const offY = (s.height - offH) / 2;

        const off = document.createElement('canvas');
        off.width = offW;
        off.height = offH;
        const oc = off.getContext('2d');
        oc.drawImage(img, 0, 0, offW, offH);

        const { data } = oc.getImageData(0, 0, offW, offH);
        const pixels = [];

        for (let py = 0; py < offH; py += SAMPLE_STEP) {
          for (let px = 0; px < offW; px += SAMPLE_STEP) {
            const i = (py * offW + px) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a > 25) {
              pixels.push({
                x: offX + px,
                y: offY + py,
                color: `rgb(${r},${g},${b})`,
              });
            }
          }
        }

        // Shuffle for organic convergence
        for (let k = pixels.length - 1; k > 0; k--) {
          const j = (Math.random() * (k + 1)) | 0;
          [pixels[k], pixels[j]] = [pixels[j], pixels[k]];
        }

        s.logoPixels = pixels;
        s.logoLoaded = true;

        let pixelIndex = 0;
        s.particles.forEach((p) => {
          if (p.isLogoDot && pixels.length > 0) {
            const t = pixels[pixelIndex % pixels.length];
            p.tx = t.x;
            p.ty = t.y;
            p.logoColor = t.color;
            pixelIndex++;
          }
        });
      };
    }

    seed();
    sampleLogo();

    // ── Render loop ──────────────────────────────────────────────────────────
    function loop() {
      const { width, height, particles, neuralNodes, mouse } = s;

      if (s.isForming) {
        s.targetActive += (1 - s.targetActive) * (s.reducedMotion ? 0.08 : 0.022);
      }

      ctx.clearRect(0, 0, width, height);

      // ── 1. Draw neural network connection lines between ambient nodes ──
      const nodeCount = neuralNodes.length;
      for (let i = 0; i < nodeCount; i++) {
        const n = neuralNodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = neuralNodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < NEURAL_CONNECT_DIST) {
            const lineAlpha = (1 - dist / NEURAL_CONNECT_DIST) * 0.16;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connection to mouse
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const mAlpha = (1 - mdist / 140) * 0.28;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw the ambient node
        drawDot(ctx, n.x, n.y, n.radius, '#818cf8', 0.4);
      }

      // ── 2. Draw particle array (logo-forming + scattered) ──────────────────
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repelled = false;
        if (dist < MOUSE_RADIUS && dist > 0.5) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) ** 2;
          p.vx += (dx / dist) * force * MOUSE_FORCE;
          p.vy += (dy / dist) * force * MOUSE_FORCE;
          repelled = true;
        }

        if (s.targetActive < 0.01 || !p.isLogoDot) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= FRICTION;
          p.vy *= FRICTION;

          if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.2;
          if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.2;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          drawDot(ctx, p.x, p.y, p.radius, p.baseColor, p.alpha * 0.7);
        } else {
          const pull = 0.08 * s.targetActive;
          p.vx += (p.tx - p.x) * pull;
          p.vy += (p.ty - p.y) * pull;
          p.vx *= FRICTION;
          p.vy *= FRICTION;

          p.vx += (Math.random() - 0.5) * 0.15;
          p.vy += (Math.random() - 0.5) * 0.15;

          p.x += p.vx;
          p.y += p.vy;

          const color = s.targetActive > 0.5 && !repelled ? p.logoColor : p.baseColor;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = Math.min(1, Math.max(0, p.alpha * (0.6 + s.targetActive * 0.4)));
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      s.animId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      clearTimeout(formTimeout);
      cancelAnimationFrame(s.animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
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
