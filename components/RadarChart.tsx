'use client';

import { motion } from 'framer-motion';
import { scarfDomains } from '@/lib/data/scarf-elements';

interface RadarChartProps {
  scores: Record<string, number>;
  size?: number;
}

export default function RadarChart({ scores, size = 300 }: RadarChartProps) {
  const center = size / 2;
  const maxRadius = (size / 2) - 40;
  const levels = 5;
  const domains = scarfDomains;
  const angleStep = (2 * Math.PI) / domains.length;

  // Calculate points for the score polygon
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 5) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };

  // Generate level circles
  const levelCircles = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius;
    return radius;
  });

  // Generate axis lines
  const axisLines = domains.map((_, index) => {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x2: center + maxRadius * Math.cos(angle),
      y2: center + maxRadius * Math.sin(angle)
    };
  });

  // Generate score polygon points
  const scorePoints = domains.map((domain, index) => {
    const score = scores[domain.id] || 0;
    return getPoint(index, score);
  });

  const polygonPath = scorePoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  // Generate gradient for the polygon
  const gradientId = 'radarGradient';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circles */}
        {levelCircles.map((radius, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(139, 92, 246, 0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Score polygon */}
        <motion.path
          d={polygonPath}
          fill={`url(#${gradientId})`}
          stroke="#8B5CF6"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Score points */}
        {scorePoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={domains[i].color}
            stroke="white"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Domain labels */}
        {domains.map((domain, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const labelRadius = maxRadius + 30;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <g key={domain.id}>
              <motion.text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
              >
                {domain.icon} {domain.shortName}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        {domains.map((domain) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="flex items-center gap-2 text-sm"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: domain.color }}
            />
            <span className="text-gray-600">
              {domain.name}: <strong className="text-gray-800">{(scores[domain.id] || 0).toFixed(1)}</strong>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
