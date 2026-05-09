import React, { useEffect, useRef } from 'react';

export default function InteractiveParticleRing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let particles = [];
    const numParticles = 400; // lots of little dots
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3; // responsive radius
    
    let mouse = { x: -1000, y: -1000, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const currentRadius = Math.min(canvas.width, canvas.height) * 0.35;
      const colors = ['#facc15', '#fde047', '#ffff00', '#fef08a'];
      
      for (let i = 0; i < numParticles; i++) {
        // Distribute them evenly in a circle
        const angle = (Math.PI * 2 * i) / numParticles;
        // Add random scatter band thickness
        const r = currentRadius + (Math.random() * 40 - 20);
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        
        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.5 + 1, // small dots
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Mouse repulsion logic
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * -7;
          let directionY = forceDirectionY * force * -7;
          
          p.vx += directionX;
          p.vy += directionY;
        }
        
        // Spring physics to pull back to circle
        p.vx += (p.baseX - p.x) * 0.05;
        p.vy += (p.baseY - p.y) * 0.05;
        
        // Friction
        p.vx *= 0.85;
        p.vy *= 0.85;
        
        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Draw constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let lineDx = p.x - p2.x;
          let lineDy = p.y - p2.y;
          let lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
          
          if (lineDistance < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Pure Yellow constellation lines
            ctx.strokeStyle = `rgba(250, 204, 21, ${0.4 - (lineDistance / 150)})`; 
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-10] pointer-events-none"
    />
  );
}
