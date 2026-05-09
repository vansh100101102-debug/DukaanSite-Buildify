import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const templates = [
  {
    id: 1,
    title: 'Luxury Dining & Cafés',
    image: '/templates/restaurant.png',
    description: 'Elevate your culinary brand with a sophisticated, fine-dining digital experience.'
  },
  {
    id: 2,
    title: 'Modern Business Solutions',
    image: '/templates/business.png',
    description: 'Corporate-grade UI designed for high-performance SaaS and enterprise services.'
  },
  {
    id: 3,
    title: 'Elite Education Portals',
    image: '/templates/school.png',
    description: 'Interactive learning environments designed for schools and coaching centers.'
  },
  {
    id: 4,
    title: 'Premium E-Commerce',
    image: 'https://cdn.dribbble.com/userupload/42533812/file/original-722ee941112c69549d1cc0c5f4315ea1.jpg?resize=420x&vertical=center',
    description: 'A buttery-smooth shopping experience tailored for modern retail brands.'
  },
  {
    id: 5,
    title: 'Hotels & Travel',
    image: 'https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/0619136a3247ce199b69e6b11a87c2c875d056d3',
    description: 'Luxury bookings and seamless travel planning for world-class hospitality.'
  }
];

export default function TemplateSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % templates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % templates.length);
  const prev = () => setIndex((prev) => (prev - 1 + templates.length) % templates.length);

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Our Premium Templates</h2>
          <p className="text-lg opacity-70">Choose from a variety of professionally designed layouts.</p>
        </div>

        <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={templates[index].image}
                alt={templates[index].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl md:text-4xl font-bold text-white mb-2"
                >
                  {templates[index].title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/70 text-lg"
                >
                  {templates[index].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {templates.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === index ? 'w-8 bg-cyan' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
