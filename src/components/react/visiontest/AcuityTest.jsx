import React, { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { Card, StepHeading, PrimaryButton, SecondaryButton, ChoiceButton, snellenLetterPx } from './ui.jsx';

// Landolt C acuity. Each "line" maps to a Snellen denominator. The C's gap
// equals 1/5 of its overall size and points in one of four directions; the user
// reports the gap direction. Reading a line correctly advances to a smaller one.
const LINES = [
  { snellen: 100, label: '20/100' },
  { snellen: 70, label: '20/70' },
  { snellen: 50, label: '20/50' },
  { snellen: 40, label: '20/40' },
  { snellen: 30, label: '20/30' },
  { snellen: 25, label: '20/25' },
  { snellen: 20, label: '20/20' },
];

const DIRECTIONS = [
  { key: 'up', label: 'Up', rotate: 270, Icon: ArrowUp },
  { key: 'right', label: 'Right', rotate: 0, Icon: ArrowRightIcon },
  { key: 'down', label: 'Down', rotate: 90, Icon: ArrowDown },
  { key: 'left', label: 'Left', rotate: 180, Icon: ArrowLeftIcon },
];

// Deterministic pseudo-random direction per line so it's stable across renders.
function dirForLine(index, seed) {
  return DIRECTIONS[(index * 7 + seed) % 4];
}

// A Landolt C drawn so its gap opens in the requested direction. rotate=0 opens
// to the RIGHT (standard). Stroke and gap are each 1/5 of the overall size.
function LandoltC({ sizePx, rotate }) {
  const s = sizePx;
  const stroke = s / 5;
  const r = (s - stroke) / 2;
  const cx = s / 2;
  const cy = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} role="img" aria-label="Ring with a gap, choose where the gap points">
      <g transform={`rotate(${rotate} ${cx} ${cy})`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth={stroke} />
        {/* Mask out the gap on the right side. */}
        <rect x={cx + r - stroke / 2} y={cy - stroke / 2} width={stroke * 1.4} height={stroke} fill="#ffffff" />
      </g>
    </svg>
  );
}

export default function AcuityTest({ pxPerMm, calibrated, distanceCm, onComplete, onBack }) {
  const [eye, setEye] = useState('both'); // both | right | left -- informational
  const [lineIndex, setLineIndex] = useState(0);
  const [bestLine, setBestLine] = useState(null); // index of smallest line read correctly
  const seed = useMemo(() => Math.floor(Math.random() * 4), []);

  const current = LINES[lineIndex];
  const dir = dirForLine(lineIndex, seed);
  const sizePx = Math.max(12, snellenLetterPx(current.snellen, pxPerMm, distanceCm));

  const answer = (chosen) => {
    const correct = chosen === dir.key;
    if (correct) {
      setBestLine(lineIndex);
      if (lineIndex < LINES.length - 1) {
        setLineIndex(lineIndex + 1);
      } else {
        finish(lineIndex);
      }
    } else {
      // First miss ends the test; best previously read line is the result.
      finish(bestLine);
    }
  };

  const finish = (resultIndex) => {
    if (resultIndex === null || resultIndex === undefined) {
      onComplete({ acuity: null, label: 'Below 20/100', calibrated, distanceCm });
    } else {
      const line = LINES[resultIndex];
      onComplete({ acuity: line.snellen, label: line.label, calibrated, distanceCm });
    }
  };

  return (
    <Card>
      <StepHeading eyebrow="Step 2 of 6" title="Visual acuity">
        A ring with a small gap appears below. Tap the direction the gap is pointing. The rings get smaller as you
        go, answer until you can no longer tell.
        {!calibrated && (
          <span className="block mt-2 text-sand-600 font-medium">
            Calibration was skipped, so these sizes are approximate.
          </span>
        )}
      </StepHeading>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-6" role="group" aria-label="Which eye are you testing">
        {[
          { k: 'both', l: 'Both eyes' },
          { k: 'right', l: 'Right eye' },
          { k: 'left', l: 'Left eye' },
        ].map((o) => (
          <ChoiceButton
            key={o.k}
            selected={eye === o.k}
            onClick={() => setEye(o.k)}
            ariaLabel={`Test ${o.l}`}
            className="px-4 py-2 text-sm"
          >
            {o.l}
          </ChoiceButton>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 ring-1 ring-slate-50 flex flex-col items-center justify-center py-10 min-h-[220px]">
        <div className="text-xs text-slate-400 mb-4 uppercase tracking-widest">{current.label} line</div>
        <div style={{ width: sizePx, height: sizePx }} className="flex items-center justify-center">
          <LandoltC sizePx={sizePx} rotate={dir.rotate} />
        </div>
      </div>

      <p className="text-center text-sm text-slate-600 mt-6 mb-3">Which way does the gap point?</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DIRECTIONS.map((d) => (
          <ChoiceButton
            key={d.key}
            onClick={() => answer(d.key)}
            ariaLabel={`Gap points ${d.label.toLowerCase()}`}
            className="py-4 flex-col gap-1"
          >
            <d.Icon className="w-6 h-6" aria-hidden="true" />
            <span className="text-sm">{d.label}</span>
          </ChoiceButton>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <button
          type="button"
          onClick={() => finish(bestLine)}
          className="text-sm text-slate-500 underline underline-offset-4 hover:text-ocean-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 rounded px-2 py-1"
        >
          I can't read this one, stop here
        </button>
      </div>
    </Card>
  );
}
