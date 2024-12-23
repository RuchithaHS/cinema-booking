"use client"


import { Armchair, Ticket, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleBookClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    
    // Trigger the animation
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push('/seats');
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Transition overlay */}
      <motion.div
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: isTransitioning ? 20 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-1/2 top-1/2 w-[100px] h-[100px] bg-red-900/90 rounded-full z-50"
      />

      {/* Existing gradient background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-red-950/30 animate-gradient-slow" />
          <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-black to-red-900/20 animate-gradient-slower" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-gradient-x">
                Cinema Elite
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Experience the future of seat booking with our immersive selection system
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-red-800/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-red-900/20 hover:border-red-700/30 transition-all duration-300">
                <Armchair className="mb-4 text-red-500 group-hover:text-red-400 transition-colors duration-300" size={48} />
                <h3 className="text-xl font-semibold mb-2 text-red-300 group-hover:text-red-200">Premium Comfort</h3>
                <p className="text-gray-400 group-hover:text-gray-300">Luxurious seating designed for ultimate relaxation</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-red-800/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-red-900/20 hover:border-red-700/30 transition-all duration-300">
                <Ticket className="mb-4 text-red-500 group-hover:text-red-400 transition-colors duration-300" size={48} />
                <h3 className="text-xl font-semibold mb-2 text-red-300 group-hover:text-red-200">Smart Booking</h3>
                <p className="text-gray-400 group-hover:text-gray-300">Effortless reservation process at your fingertips</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-red-800/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-red-900/20 hover:border-red-700/30 transition-all duration-300">
                <Clapperboard className="mb-4 text-red-500 group-hover:text-red-400 transition-colors duration-300" size={48} />
                <h3 className="text-xl font-semibold mb-2 text-red-300 group-hover:text-red-200">Perfect View</h3>
                <p className="text-gray-400 group-hover:text-gray-300">Strategic seating for the best cinematic experience</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70"></div>
              <motion.button
                onClick={handleBookClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center bg-gradient-to-r from-red-800 to-red-900 text-white font-bold py-4 px-8 rounded-full text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Book Your Seats
                <motion.svg 
                  className="w-5 h-5 ml-2"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: isTransitioning ? 10 : 0, opacity: isTransitioning ? 0 : 1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
