import React, { useEffect, useRef } from 'react';

interface Props {
  active: boolean;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'circle' | 'square' | 'star' | 'text';
  text?: string;
  scaleY: number;
  wobbleSpeed: number;
  wobbleAngle: number;
}

const COLORS = [
  '#DE2910', // Brand Red / China Red
  '#FFDE00', // Imperial Gold / Yellow
  '#10B981', // Emerald Green 
  '#3B82F6', // Royal Blue
  '#EC4899', // Spark Pink
  '#F59E0B', // Amber Orange
  '#8B5CF6', // Purple
];

const CHINESE_CHARS = ['中', '学', '好', '福', '囍', '⭐', '🎉', '🔥'];

export const Confetti: React.FC<Props> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const particles: Particle[] = [];
    const isMobile = displayWidth < 768;
    const particleCount = isMobile ? 120 : 220;

    // Helper to generate a particle
    const createParticle = (originX: number, originY: number, angleRange: [number, number], speedRange: [number, number]): Particle => {
      const angle = angleRange[0] + Math.random() * (angleRange[1] - angleRange[0]);
      const speed = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
      const typeIndex = Math.random();
      let type: Particle['type'] = 'square';
      let text = '';

      if (typeIndex < 0.25) {
        type = 'circle';
      } else if (typeIndex < 0.5) {
        type = 'star';
      } else if (typeIndex < 0.75) {
        type = 'text';
        text = CHINESE_CHARS[Math.floor(Math.random() * CHINESE_CHARS.length)];
      }

      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 4 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        type,
        text,
        scaleY: Math.random() * 2 - 1,
        wobbleSpeed: 0.05 + Math.random() * 0.1,
        wobbleAngle: Math.random() * Math.PI * 2,
      };
    };

    // Shoot fountains from bottom-left and bottom-right corners
    // And some sparkles from global center
    // Left bottom corner shooting up and right (angle in radians: -Math.PI/6 to -Math.PI/3)
    for (let i = 0; i < particleCount / 2.5; i++) {
      particles.push(
        createParticle(
          0,
          displayHeight - 10,
          [-Math.PI / 2.5, -Math.PI / 10],
          [14, 26]
        )
      );
    }

    // Right bottom corner shooting up and left (angle in radians: -Math.PI * 0.9 to -Math.PI * 0.6)
    for (let i = 0; i < particleCount / 2.5; i++) {
      particles.push(
        createParticle(
          displayWidth,
          displayHeight - 10,
          [-Math.PI * 0.9, -Math.PI * 0.6],
          [14, 26]
        )
      );
    }

    // Center splash
    for (let i = 0; i < particleCount / 5; i++) {
      particles.push(
        createParticle(
          displayWidth / 2,
          displayHeight * 0.45,
          [0, Math.PI * 2],
          [5, 15]
        )
      );
    }

    let animationFrameId: number;
    let elapsedFrames = 0;
    const maxFrames = 240; // ~4 seconds at 60 FPS

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, opacity: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.opacity <= 0) continue;

        aliveCount++;

        // Update physics
        p.vy += 0.38; // gravity
        p.vx *= 0.985; // drag
        p.vy *= 0.985; // drag
        
        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.wobbleAngle += p.wobbleSpeed;
        p.scaleY = Math.sin(p.wobbleAngle);

        // Gradually fade out over time or if falling below screen
        if (p.y > displayHeight + 20) {
          p.opacity -= 0.08;
        } else if (elapsedFrames > maxFrames * 0.5) {
          p.opacity -= 0.015;
        }

        if (p.opacity <= 0) continue;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        ctx.fillStyle = p.color;

        if (p.type === 'circle') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, Math.abs(p.radius * p.scaleY), 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'square') {
          const w = p.radius * 2;
          const h = p.radius * 2 * p.scaleY;
          ctx.fillRect(-w / 2, -h / 2, w, h);
        } else if (p.type === 'text' && p.text) {
          ctx.font = `bold ${Math.round(p.radius * 2.3)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.text, 0, 0);
        } else if (p.type === 'star') {
          // Restore context translated state and draw star at 0,0
          ctx.restore();
          drawStar(p.x, p.y, 5, p.radius * 1.5, p.radius * 0.7, p.color, p.opacity);
          continue;
        }

        ctx.restore();
      }

      elapsedFrames++;

      // Resize observer check if window size changed
      if (window.innerWidth !== displayWidth || window.innerHeight !== displayHeight) {
        displayWidth = window.innerWidth;
        displayHeight = window.innerHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      if (aliveCount > 0 && elapsedFrames < maxFrames) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
};
