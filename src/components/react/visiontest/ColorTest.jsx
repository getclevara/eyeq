import React, { useState, useMemo } from 'react';
import { Card, StepHeading, NavRow, ChoiceButton } from './ui.jsx';

// Lightweight Ishihara-style pseudo-isochromatic plates, generated in SVG.
// A digit is rendered as dots in a "figure" hue family against a "background"
// hue family. Red-green palettes make the digit hard to read for people with
// red-green colour-vision deficiency. This is a SCREENING aid, not the real
// Ishihara test (which is carefully standardised), see disclaimer.

// 5x7 dot-matrix digit patterns (1 = figure dot).
const DIGITS = {
  2: [
    '01110',
    '10001',
    '00001',
    '00010',
    '00100',
    '01000',
    '11111',
  ],
  5: [
    '11111',
    '10000',
    '11110',
    '00001',
    '00001',
    '10001',
    '01110',
  ],
  6: [
    '00110',
    '01000',
    '10000',
    '11110',
    '10001',
    '10001',
    '01110',
  ],
  8: [
    '01110',
    '10001',
    '10001',
    '01110',
    '10001',
    '10001',
    '01110',
  ],
};

// Palette families. "fig" = the digit dots, "bg" = surrounding dots.
const FIG_RED = ['#d1603d', '#c44d3a', '#e07a4f', '#b94a32', '#d8694a'];
const BG_GREEN = ['#9aa86a', '#8f9c5d', '#a9b277', '#86994f', '#9fae6b'];
// A control plate readable by everyone (high luminance contrast).
const FIG_DARK = ['#2c3e50', '#34495e', '#22313f'];
const BG_LIGHT = ['#d9dee3', '#e4e8ec', '#cdd4da'];

function rand(seed) {
  // Mulberry32-ish deterministic PRNG.
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function Plate({ digit, figPalette, bgPalette, seed = 1 }) {
  const size = 260;
  const radius = size / 2;
  const pattern = DIGITS[digit];
  const cols = 5;
  const rows = 7;

  const dots = useMemo(() => {
    const out = [];
    let i = 0;
    // Scatter many dots inside the circle; colour a dot with the figure family
    // if its centre falls on an "on" cell of the digit matrix.
    const digitW = size * 0.46;
    const digitH = digitW * (rows / cols);
    const dx = (size - digitW) / 2;
    const dy = (size - digitH) / 2;
    const cellW = digitW / cols;
    const cellH = digitH / rows;
    let attempts = 0;
    while (out.length < 420 && attempts < 6000) {
      attempts++;
      const rseed = seed * 1000 + attempts;
      const x = rand(rseed) * size;
      const y = rand(rseed + 1) * size;
      const r = 3 + rand(rseed + 2) * 5;
      // keep dots inside the circle
      const dist = Math.hypot(x - radius, y - radius);
      if (dist > radius - r) continue;
      // determine if on the digit
      let onDigit = false;
      if (x >= dx && x <= dx + digitW && y >= dy && y <= dy + digitH) {
        const col = Math.floor((x - dx) / cellW);
        const row = Math.floor((y - dy) / cellH);
        if (pattern[row] && pattern[row][col] === '1') onDigit = true;
      }
      const palette = onDigit ? figPalette : bgPalette;
      const color = palette[Math.floor(rand(rseed + 3) * palette.length)];
      out.push({ x, y, r, color, i: i++ });
    }
    return out;
  }, [digit, seed, figPalette, bgPalette]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="A circular plate made of coloured dots that may form a number"
      className="max-w-full rounded-full"
    >
      <circle cx={radius} cy={radius} r={radius} fill="#f4f1ea" />
      {dots.map((d) => (
        <circle key={d.i} cx={d.x} cy={d.y} r={d.r} fill={d.color} />
      ))}
    </svg>
  );
}

// Plate set: each has the true digit + multiple-choice options. The last is a
// control plate (high contrast) that everyone should pass.
const PLATES = [
  { digit: 5, fig: FIG_RED, bg: BG_GREEN, seed: 11, options: [3, 5, 8, 'Nothing'], control: false },
  { digit: 2, fig: FIG_RED, bg: BG_GREEN, seed: 23, options: [2, 7, 6, 'Nothing'], control: false },
  { digit: 6, fig: FIG_RED, bg: BG_GREEN, seed: 37, options: [5, 6, 8, 'Nothing'], control: false },
  { digit: 8, fig: FIG_DARK, bg: BG_LIGHT, seed: 41, options: [3, 6, 8, 'Nothing'], control: true },
];

export default function ColorTest({ onComplete, onBack }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [choice, setChoice] = useState(null);

  const plate = PLATES[idx];
  const isLast = idx === PLATES.length - 1;

  const next = () => {
    const updated = [...answers, { digit: plate.digit, choice, correct: choice === plate.digit, control: plate.control }];
    if (isLast) {
      const rg = updated.filter((a) => !a.control);
      const missed = rg.filter((a) => !a.correct).length;
      const controlPassed = updated.find((a) => a.control)?.correct;
      onComplete({
        total: rg.length,
        missed,
        controlPassed: !!controlPassed,
        deficiencyLikely: missed >= 2,
      });
    } else {
      setAnswers(updated);
      setIdx(idx + 1);
      setChoice(null);
    }
  };

  return (
    <Card>
      <StepHeading eyebrow="Step 4 of 6" title="Colour vision">
        Look at the plate below. What number do you see formed by the dots? Choose the best answer (or "Nothing" if
        you don't see a number). Plate {idx + 1} of {PLATES.length}.
      </StepHeading>

      <div className="rounded-2xl bg-white border border-slate-100 flex items-center justify-center py-8">
        <Plate digit={plate.digit} figPalette={plate.fig} bgPalette={plate.bg} seed={plate.seed} />
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {plate.options.map((opt) => (
          <ChoiceButton
            key={String(opt)}
            selected={choice === opt}
            onClick={() => setChoice(opt)}
            ariaLabel={opt === 'Nothing' ? 'No number visible' : `I see ${opt}`}
            className="py-4 text-lg"
          >
            {opt}
          </ChoiceButton>
        ))}
      </div>

      <NavRow onBack={onBack} onNext={next} nextDisabled={choice === null} nextLabel={isLast ? 'Continue' : 'Next plate'} />
    </Card>
  );
}
