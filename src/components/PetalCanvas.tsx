import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  swing: number;
  swingSpeed: number;
  type: 'petal' | 'leaf' | 'sparkle';
  color: string;
  opacity: number;
}

export const PetalCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Wind interaction from mouse
    let windOffset = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = width / 2;
      windOffset = ((e.clientX - centerX) / centerX) * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particleCount = width < 768 ? 28 : 48;
    const particles: Particle[] = [];

    const petalColors = [
      'rgba(245, 158, 11, 0.85)', // rich marigold orange (झेंडू)
      'rgba(251, 191, 36, 0.85)', // golden turmeric yellow
      'rgba(254, 240, 138, 0.8)', // soft yellow marigold
    ];

    const leafColors = [
      'rgba(255, 253, 245, 0.9)', // mogra / fragrant white jasmine petal
      'rgba(254, 243, 199, 0.85)', // ivory champak blossom
      'rgba(240, 253, 244, 0.75)', // sacred tulsi / mango leaf green accent
    ];

    const sparkleColors = [
      'rgba(217, 119, 6, 0.9)',   // royal saffron
      'rgba(180, 83, 9, 0.85)',   // kumkum / haldi gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: 'petal' | 'leaf' | 'sparkle' = 'petal';
      let color = petalColors[Math.floor(Math.random() * petalColors.length)];

      if (rand < 0.25) {
        type = 'leaf';
        color = leafColors[Math.floor(Math.random() * leafColors.length)];
      } else if (rand > 0.8) {
        type = 'sparkle';
        color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: type === 'sparkle' ? 2 + Math.random() * 3 : 12 + Math.random() * 14,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: 0.6 + Math.random() * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        swing: Math.random() * Math.PI,
        swingSpeed: 0.015 + Math.random() * 0.02,
        type,
        color,
        opacity: 0.4 + Math.random() * 0.5,
      });
    }

    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.fillStyle = p.color;
      c.beginPath();
      // Curved organic petal shape
      c.moveTo(0, 0);
      c.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size * 0.8, p.size * 0.2, 0, p.size);
      c.bezierCurveTo(-p.size * 0.8, p.size * 0.2, -p.size * 0.5, -p.size * 0.5, 0, 0);
      c.fill();
      c.restore();
    };

    const drawLeaf = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.fillStyle = p.color;
      c.beginPath();
      // Elegant slender leaf
      c.moveTo(0, -p.size * 0.7);
      c.quadraticCurveTo(p.size * 0.4, 0, 0, p.size * 0.7);
      c.quadraticCurveTo(-p.size * 0.4, 0, 0, -p.size * 0.7);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.fillStyle = p.color;
      c.beginPath();
      c.arc(0, 0, p.size, 0, Math.PI * 2);
      c.shadowBlur = 8;
      c.shadowColor = 'rgba(212, 175, 55, 0.8)';
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.swing += p.swingSpeed;
        p.x += Math.sin(p.swing) * 0.8 + p.speedX + windOffset;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.type === 'petal') {
          drawPetal(ctx, p);
        } else if (p.type === 'leaf') {
          drawLeaf(ctx, p);
        } else {
          drawSparkle(ctx, p);
        }

        // Wrap around when going off screen
        if (p.y > height + 20) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      style={{ opacity: 0.88 }}
    />
  );
};
