import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ParticleCanvas (Hero Section)
//
// • Scatter phase  : dots float freely initially
// • Auto-form phase: after a short delay, dots form the logo automatically
// • Mouse Repel    : hovering over the logo scatters the dots away
// ─────────────────────────────────────────────────────────────────────────────

const COUNT = 3500;
const BACKGROUND_COUNT = 1000; // Dots that never form the logo
const LOGO_COUNT = COUNT - BACKGROUND_COUNT;
const SAMPLE_STEP = 3;
const LOGO_COVER = 0.65;
const MOUSE_RADIUS = 120; // How far the mouse scatters dots
const MOUSE_FORCE = 4.5;
const FRICTION = 0.88;

// Draw a smooth circular dot
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
    logoPixels: [],
    logoLoaded: false,
    animId: null,
    width: 0,
    height: 0,
    mouse: { x: -9999, y: -9999 },
    targetActive: 0, // 0 to 1 smooth transition to formed logo
    isForming: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    // Automatically start forming the logo after 1 second
    const formTimeout = setTimeout(() => {
      s.isForming = true;
    }, 1000);

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      const dpr = window.devicePixelRatio || 1;
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
    function onLeave() { s.mouse.x = -9999; s.mouse.y = -9999; }
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
          x, y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          tx: x, ty: y,
          baseColor: '#888888', // Grey when scattered
          logoColor: '#4285F4', // Will be replaced by actual image pixel color
          radius: Math.random() * 0.8 + 0.5, // Small dots
          alpha: Math.random() * 0.5 + 0.3,
          isLogoDot,
        };
      });
    }

    // ── Sample logo pixels & colors ──────────────────────────────────────────
    function sampleLogo() {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Ensure CORS doesn't block getImageData
      img.src = '/aicc-logo.webp';
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
            
            // Just use alpha to detect the logo shape
            if (a > 20) {
              pixels.push({ 
                x: offX + px, 
                y: offY + py,
                color: `rgb(${r},${g},${b})`
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
            p.logoColor = t.color; // Save the exact color of the pixel!
            pixelIndex++;
          }
        });
      };
    }

    seed();
    sampleLogo();

    // ── Render loop ──────────────────────────────────────────────────────────
    function loop() {
      const { width, height, particles, mouse } = s;
      
      // Smoothly interpolate the target active state
      if (s.isForming) {
        s.targetActive += (1 - s.targetActive) * 0.02; // Slow organic forming
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Mouse repulsion - scatter dots when hovered
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
          // Pure drift for scattered dots, or all dots when not forming
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= FRICTION;
          p.vy *= FRICTION;
          
          // Maintain a constant movement for scattered dots
          if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.2;
          if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.2;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
          
          drawDot(ctx, p.x, p.y, p.radius, p.baseColor, p.alpha);
        } else {
          // Pull logo dots toward their targets
          const pull = 0.08 * s.targetActive;
          
          // If repelled by mouse, the pull is temporarily overcome by the huge mouse force
          p.vx += (p.tx - p.x) * pull;
          p.vy += (p.ty - p.y) * pull;
          p.vx *= FRICTION;
          p.vy *= FRICTION;
          
          // Add some slight organic noise even when formed
          p.vx += (Math.random() - 0.5) * 0.15;
          p.vy += (Math.random() - 0.5) * 0.15;
          
          p.x += p.vx;
          p.y += p.vy;
          
          // Determine color based on targetActive state and whether it's currently repelled
          // When scattered by mouse, it loses its logo color momentarily!
          const color = (s.targetActive > 0.5 && !repelled) ? p.logoColor : p.baseColor;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = Math.min(1, Math.max(0, p.alpha * (0.5 + s.targetActive * 0.5)));
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
