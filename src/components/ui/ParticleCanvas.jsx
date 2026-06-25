import { useRef, useEffect, useCallback } from 'react';

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 1;
    this.opacity = Math.random() * 0.2 + 0.15;
    this.color = Math.random() > 0.5 ? '#c7d2fe' : '#e2e8f0';
  }

  update(width, height, mouseX, mouseY) {
    // Mouse repulsion
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80 && dist > 0) {
        const force = (80 - dist) / 80;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 0.3;
        this.vy += Math.sin(angle) * force * 0.3;
      }
    }

    // Dampen velocity
    this.vx *= 0.99;
    this.vy *= 0.99;

    // Clamp velocity
    const maxV = 0.6;
    this.vx = Math.max(-maxV, Math.min(maxV, this.vx));
    this.vy = Math.max(-maxV, Math.min(maxV, this.vy));

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function ParticleCanvas({ className = '', particleCount = 50 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const animFrameRef = useRef(null);

  const initParticles = useCallback((width, height) => {
    particlesRef.current = Array.from(
      { length: particleCount },
      () => new Particle(width, height)
    );
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const animate = () => {
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h, mx, my);
        particles[i].draw(ctx);
      }

      // Draw connections
      ctx.strokeStyle = 'rgba(199, 210, 254, 0.15)';
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 10000) { // 100px squared
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-auto ${className}`}
      style={{ display: 'block' }}
    />
  );
}
