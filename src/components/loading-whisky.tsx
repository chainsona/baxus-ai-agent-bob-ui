'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface LoadingWhiskyProps {
  message?: string;
  className?: string;
}

export function LoadingWhisky({
  message = 'Loading whisky data...',
  className = '',
}: LoadingWhiskyProps) {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const fillAnimation = setInterval(() => {
      setFillPercentage((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(fillAnimation);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${className}`}
    >
      <div className="relative w-32 h-48 flex items-center justify-center">
        {/* Glass */}
        <svg viewBox="0 0 100 160" className="w-full h-full">
          {/* Glass outline */}
          <path
            d="M30,25 C30,15 70,15 70,25 L65,110 C65,130 35,130 35,110 L30,25"
            fill="transparent"
            stroke="#1D6D72"
            strokeWidth="2"
          />

          {/* Glass base */}
          <rect
            x="35"
            y="130"
            width="30"
            height="10"
            fill="#1D6D72"
            opacity="0.3"
          />
          <line
            x1="35"
            y1="140"
            x2="65"
            y2="140"
            stroke="#1D6D72"
            strokeWidth="2"
          />

          {/* Glass stem */}
          <rect
            x="45"
            y="140"
            width="10"
            height="15"
            fill="#1D6D72"
            opacity="0.2"
          />

          {/* Glass foot */}
          <ellipse
            cx="50"
            cy="155"
            rx="20"
            ry="5"
            fill="#1D6D72"
            opacity="0.3"
          />
          <line
            x1="30"
            y1="155"
            x2="70"
            y2="155"
            stroke="#1D6D72"
            strokeWidth="2"
          />

          {/* Whisky filling animation */}
          <motion.path
            d={`M35,${110 - fillPercentage * 0.85} C35,${110 - fillPercentage * 0.85} 65,${110 - fillPercentage * 0.85} 65,${110 - fillPercentage * 0.85} L65,110 C65,130 35,130 35,110 Z`}
            fill="#B8860B"
            opacity="0.7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5 }}
          />

          {/* Bubbles */}
          <motion.circle
            cx="45"
            cy={110 - fillPercentage * 0.85 - 10}
            r="2"
            fill="white"
            opacity="0.5"
            initial={{ y: 0 }}
            animate={{ y: -15 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatType: 'loop',
              delay: 0.5,
            }}
            style={{
              display: fillPercentage > 10 ? 'block' : 'none',
            }}
          />

          <motion.circle
            cx="55"
            cy={110 - fillPercentage * 0.85 - 5}
            r="1.5"
            fill="white"
            opacity="0.4"
            initial={{ y: 0 }}
            animate={{ y: -10 }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              repeatType: 'loop',
              delay: 0.3,
            }}
            style={{
              display: fillPercentage > 5 ? 'block' : 'none',
            }}
          />
        </svg>

        {/* Whisky bottle for pouring animation */}
        <motion.div
          className="absolute top-[-60px] left-[50%]"
          style={{ translateX: '-50%' }}
          initial={{ rotate: -80, y: -30 }}
          animate={{
            rotate: fillPercentage > 95 ? -80 : -30,
            y: fillPercentage > 95 ? -30 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 60 100" width="60" height="100">
            {/* Bottle */}
            <path
              d="M20,20 L40,20 L45,30 L45,80 C45,90 15,90 15,80 L15,30 Z"
              fill="#1D6D72"
              opacity="0.8"
            />

            {/* Bottle neck */}
            <rect
              x="25"
              y="5"
              width="10"
              height="15"
              fill="#1D6D72"
              opacity="0.9"
            />

            {/* Bottle cap */}
            <rect x="24" y="0" width="12" height="5" fill="#1D6D72" />

            {/* Liquid dripping */}
            <motion.path
              d="M30,90 C30,90 30,100 30,100"
              stroke="#B8860B"
              strokeWidth="2"
              opacity="0.8"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: fillPercentage < 95 ? 1 : 0,
                opacity: fillPercentage < 95 ? 0.8 : 0,
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
          </svg>
        </motion.div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <p className="text-[#1D6D72] font-medium text-lg">{message}</p>
        <div className="mt-3 flex items-center gap-1">
          <span
            className="animate-bounce h-2 w-2 bg-[#1D6D72] rounded-full opacity-70"
            style={{ animationDelay: '0ms' }}
          ></span>
          <span
            className="animate-bounce h-2 w-2 bg-[#1D6D72] rounded-full opacity-70"
            style={{ animationDelay: '200ms' }}
          ></span>
          <span
            className="animate-bounce h-2 w-2 bg-[#1D6D72] rounded-full opacity-70"
            style={{ animationDelay: '400ms' }}
          ></span>
        </div>
      </div>
    </div>
  );
}
