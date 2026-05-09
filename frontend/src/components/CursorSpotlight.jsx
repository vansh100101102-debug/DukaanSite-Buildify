import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Use springs for smooth following effect
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] -ml-[250px] -mt-[250px] rounded-full pointer-events-none z-[100] mix-blend-screen transition-opacity duration-500"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: mousePosition.x === -1000 ? 0 : 1,
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(234, 179, 8, 0.05) 40%, transparent 70%)',
      }}
    />
  );
}
