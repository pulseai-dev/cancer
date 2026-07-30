import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type WidgetState = 'resting' | 'transitioning' | 'disassembled';

const BACKBONE_COLOR = '#185FA5';
const BASE_PAIR_COLOR = '#7B5EA7';
const NUCLEOTIDE_COLOR = '#E07A5F';

const NUCLEOTIDE_PAIRS = [
  { left: 'A', right: 'T', label: 'Adenine — Thymine' },
  { left: 'G', right: 'C', label: 'Guanine — Cytosine' },
  { left: 'T', right: 'A', label: 'Thymine — Adenine' },
  { left: 'C', right: 'G', label: 'Cytosine — Guanine' },
  { left: 'A', right: 'T', label: 'Adenine — Thymine' },
  { left: 'G', right: 'C', label: 'Guanine — Cytosine' },
  { left: 'T', right: 'A', label: 'Thymine — Adenine' },
  { left: 'C', right: 'G', label: 'Cytosine — Guanine' },
];

const HELIX_POINTS = 20;

function generateHelixPath(turns: number, radius: number, height: number, phase: number) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= HELIX_POINTS; i++) {
    const t = i / HELIX_POINTS;
    const angle = t * turns * Math.PI * 2 + phase;
    points.push({
      x: Math.cos(angle) * radius,
      y: t * height - height / 2,
    });
  }
  return points;
}

export default function DnaWidget() {
  const [state, setState] = useState<WidgetState>('resting');
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);

  const handleClick = useCallback(() => {
    if (state === 'transitioning') return;
    setState(state === 'resting' ? 'transitioning' : 'transitioning');
    setTimeout(() => {
      setState(state === 'resting' ? 'disassembled' : 'resting');
    }, 800);
  }, [state]);

  const svgWidth = 320;
  const svgHeight = 400;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;

  const radius = 50;
  const height = 300;
  const turns = 2;

  const strand1 = generateHelixPath(turns, radius, height, 0);
  const strand2 = generateHelixPath(turns, radius, height, Math.PI);

  const pairCount = 8;
  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const t = (i + 0.5) / pairCount;
    const angle = t * turns * Math.PI * 2;
    const y = t * height - height / 2;
    return {
      x1: cx + Math.cos(angle) * radius,
      y1: cy + y,
      x2: cx + Math.cos(angle + Math.PI) * radius,
      y2: cy + y,
      nucleotide: NUCLEOTIDE_PAIRS[i % NUCLEOTIDE_PAIRS.length],
    };
  });

  const strandToPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${cx + p.x} ${cy + p.y}`).join(' ');

  return (
    <div
      className="w-full h-full flex items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      aria-label="Interactive DNA helix — click to explore structure"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full max-h-[420px]"
        style={{ filter: 'drop-shadow(0 4px 24px rgba(24,95,165,0.1))' }}
      >
        {/* === STRAND 1 (backbone) === */}
        <motion.path
          d={strandToPath(strand1)}
          fill="none"
          stroke={BACKBONE_COLOR}
          strokeWidth={3.5}
          strokeLinecap="round"
          animate={{
            d: state === 'disassembled'
              ? strandToPath(strand1.map(p => ({ x: p.x - 70, y: p.y })))
              : strandToPath(strand1),
            opacity: state === 'disassembled' ? 0.6 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* === STRAND 2 (backbone) === */}
        <motion.path
          d={strandToPath(strand2)}
          fill="none"
          stroke={BACKBONE_COLOR}
          strokeWidth={3.5}
          strokeLinecap="round"
          animate={{
            d: state === 'disassembled'
              ? strandToPath(strand2.map(p => ({ x: p.x + 70, y: p.y })))
              : strandToPath(strand2),
            opacity: state === 'disassembled' ? 0.6 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* === BASE PAIRS + NUCLEOTIDES === */}
        {pairs.map((pair, i) => {
          const isHovered = hoveredPair === i;
          const delay = i * 0.06;
          const disassembleOffset = (i % 2 === 0 ? -1 : 1) * 20;

          return (
            <g key={i}>
              {/* Base pair line */}
              <motion.line
                x1={pair.x1}
                y1={pair.y1}
                x2={pair.x2}
                y2={pair.y2}
                stroke={BASE_PAIR_COLOR}
                strokeWidth={2}
                strokeDasharray="4 3"
                animate={{
                  x1: state === 'disassembled' ? pair.x1 + disassembleOffset : pair.x1,
                  x2: state === 'disassembled' ? pair.x2 - disassembleOffset : pair.x2,
                  opacity: state === 'disassembled' ? 0.8 : 0.5,
                }}
                transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
              />

              {/* Left nucleotide */}
              <motion.circle
                cx={pair.x1}
                cy={pair.y1}
                r={10}
                fill={NUCLEOTIDE_COLOR}
                animate={{
                  cx: state === 'disassembled' ? pair.x1 - 80 + disassembleOffset : pair.x1,
                  r: isHovered ? 13 : state === 'disassembled' ? 11 : 10,
                  opacity: state === 'disassembled' ? 1 : 0.7,
                }}
                transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHoveredPair(i)}
                onMouseLeave={() => setHoveredPair(null)}
                style={{ cursor: state === 'disassembled' ? 'pointer' : 'default' }}
              />
              <motion.text
                x={pair.x1}
                y={pair.y1 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize={9}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
                animate={{
                  x: state === 'disassembled' ? pair.x1 - 80 + disassembleOffset : pair.x1,
                }}
                transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
                style={{ pointerEvents: 'none' }}
              >
                {pair.nucleotide.left}
              </motion.text>

              {/* Right nucleotide */}
              <motion.circle
                cx={pair.x2}
                cy={pair.y2}
                r={10}
                fill={NUCLEOTIDE_COLOR}
                animate={{
                  cx: state === 'disassembled' ? pair.x2 + 80 - disassembleOffset : pair.x2,
                  r: isHovered ? 13 : state === 'disassembled' ? 11 : 10,
                  opacity: state === 'disassembled' ? 1 : 0.7,
                }}
                transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHoveredPair(i)}
                onMouseLeave={() => setHoveredPair(null)}
                style={{ cursor: state === 'disassembled' ? 'pointer' : 'default' }}
              />
              <motion.text
                x={pair.x2}
                y={pair.y2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize={9}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
                animate={{
                  x: state === 'disassembled' ? pair.x2 + 80 - disassembleOffset : pair.x2,
                }}
                transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
                style={{ pointerEvents: 'none' }}
              >
                {pair.nucleotide.right}
              </motion.text>

              {/* Label annotation (visible on hover when disassembled) */}
              <AnimatePresence>
                {state === 'disassembled' && isHovered && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={cx - 55}
                      y={pair.y1 - 12}
                      width={110}
                      height={24}
                      rx={6}
                      fill="rgba(44,44,42,0.9)"
                    />
                    <text
                      x={cx}
                      y={pair.y1 + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize={9}
                      fontFamily="Inter, system-ui, sans-serif"
                      fontWeight={500}
                    >
                      {pair.nucleotide.label}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          );
        })}

        {/* === LABELS (disassembled state) === */}
        <AnimatePresence>
          {state === 'disassembled' && (
            <>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                x={cx - 120}
                y={cy - height / 2 - 15}
                textAnchor="middle"
                fill={BACKBONE_COLOR}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                Sugar-Phosphate
              </motion.text>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.3 }}
                x={cx - 120}
                y={cy - height / 2 - 3}
                textAnchor="middle"
                fill={BACKBONE_COLOR}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                Backbone
              </motion.text>

              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                x={cx}
                y={cy - height / 2 - 15}
                textAnchor="middle"
                fill={BASE_PAIR_COLOR}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                Nitrogenous
              </motion.text>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.65, duration: 0.3 }}
                x={cx}
                y={cy - height / 2 - 3}
                textAnchor="middle"
                fill={BASE_PAIR_COLOR}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                Base Pairs
              </motion.text>

              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                x={cx + 120}
                y={cy - height / 2 - 15}
                textAnchor="middle"
                fill={NUCLEOTIDE_COLOR}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                Nucleotide
              </motion.text>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.75, duration: 0.3 }}
                x={cx + 120}
                y={cy - height / 2 - 3}
                textAnchor="middle"
                fill={NUCLEOTIDE_COLOR}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                Bases (A/T/G/C)
              </motion.text>
            </>
          )}
        </AnimatePresence>

        {/* === CTA hint === */}
        <motion.text
          x={cx}
          y={svgHeight - 10}
          textAnchor="middle"
          fill="#5F5E5A"
          fontSize={10}
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight={500}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          {state === 'resting' ? 'Click to explore' : state === 'disassembled' ? 'Click to reassemble' : ''}
        </motion.text>
      </svg>
    </div>
  );
}
