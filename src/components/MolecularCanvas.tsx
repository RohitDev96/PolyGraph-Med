import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label: string;
  type: 'drug' | 'enzyme' | 'pathway';
}

export const MolecularCanvas: React.FC<{ interactive?: boolean; className?: string }> = ({ 
  interactive = true, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 550;
    };

    window.addEventListener('resize', handleResize);

    // Botanical & Sage Palette
    const colors = {
      drug: '#2D5A3F',      // Primary botanical green
      enzyme: '#C48A45',    // Muted warm ochre
      pathway: '#7E9F85',   // Sage green
      protein: '#5F7161'    // Muted olive
    };

    const labels = [
      { name: 'Warfarin', type: 'drug' },
      { name: 'CYP3A4', type: 'enzyme' },
      { name: 'Simvastatin', type: 'drug' },
      { name: 'CYP2C9', type: 'enzyme' },
      { name: 'Amiodarone', type: 'drug' },
      { name: 'P-gp', type: 'enzyme' },
      { name: 'VKORC1', type: 'protein' },
      { name: 'Clopidogrel', type: 'drug' },
      { name: 'CYP2C19', type: 'enzyme' },
      { name: 'Phase I Clearance', type: 'pathway' },
      { name: 'Tramadol', type: 'drug' },
      { name: 'CYP2D6', type: 'enzyme' },
      { name: 'Fluoxetine', type: 'drug' },
      { name: 'OATP1B1', type: 'protein' },
      { name: 'Omeprazole', type: 'drug' },
      { name: 'Coagulation', type: 'pathway' }
    ];

    const particles: Particle[] = labels.map((item) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: item.type === 'drug' ? 4.5 : item.type === 'enzyme' ? 4 : 3.5,
      color: colors[item.type as keyof typeof colors] || '#2D5A3F',
      label: item.name,
      type: item.type as any
    }));

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (interactive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const angle = Math.atan2(dy, dx);
            const force = (140 - dist) / 140;
            p.vx -= Math.cos(angle) * force * 0.25;
            p.vy -= Math.sin(angle) * force * 0.25;
          }
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.08;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.08;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 30) { p.x = 30; p.vx *= -1; }
        if (p.x > width - 30) { p.x = width - 30; p.vx *= -1; }
        if (p.y < 30) { p.y = 30; p.vy *= -1; }
        if (p.y > height - 30) { p.y = height - 30; p.vy *= -1; }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 90, 63, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Soft Node Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}15`;
        ctx.fill();

        // Node Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Node Label
        ctx.font = '500 10.5px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillStyle = '#4A554E';
        ctx.fillText(p.label, p.x + 8, p.y + 3.5);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full block pointer-events-auto ${className}`}
    />
  );
};
