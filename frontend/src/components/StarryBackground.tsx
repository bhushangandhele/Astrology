import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  twinkleDir: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create stars
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.05 + 0.01,
      alpha: Math.random(),
      twinkleDir: Math.random() > 0.5 ? 1 : -1
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.fillStyle = '#030208';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle glowing purple/blue nebula gradients in background
      const grad1 = ctx.createRadialGradient(
        width * 0.3,
        height * 0.3,
        0,
        width * 0.3,
        height * 0.3,
        width * 0.6
      );
      grad1.addColorStop(0, 'rgba(88, 28, 135, 0.15)'); // deep purple
      grad1.addColorStop(1, 'rgba(0,0,0,0)');
      
      const grad2 = ctx.createRadialGradient(
        width * 0.7,
        height * 0.7,
        0,
        width * 0.7,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(30, 58, 138, 0.12)'); // deep blue
      grad2.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      ctx.fillStyle = '#ffffff';
      for (const star of stars) {
        // Update twinkling
        star.alpha += star.speed * star.twinkleDir * 0.5;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        // Drifting stars (slow scrolling down)
        star.y += star.speed * 1.5;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-overlay" />;
};
