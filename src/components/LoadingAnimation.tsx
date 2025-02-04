import React from 'react';
import { motion } from 'framer-motion';
import { Bike } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md relative">
        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600" />
        
        {/* Motorcycle */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ 
            x: '-100%',
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="relative"
        >
          <div className="flex items-center gap-1">
            <motion.div
              animate={{
                y: [-2, 2, -2],
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <Bike className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Dust particles */}
            <motion.div
              className="absolute -right-8 bottom-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-16"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <p className="text-white text-lg font-medium">Enviando seu pedido...</p>
        </motion.div>
      </div>
    </div>
  );
}