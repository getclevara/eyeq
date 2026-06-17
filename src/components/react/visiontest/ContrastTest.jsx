import React, { useState, useMemo } from 'react';
import { Card, StepHeading, ChoiceButton, SecondaryButton } from './ui.jsx';

// Simple contrast-sensitivity screen: show a single-digit number at decreasing
// contrast against a light background. The user reads each until they can't.
// The lowest contrast still read correctly is the rough threshold.
const STEPS = [
  { contrast: 0.6, grey: '#6b6b6b' },
  { contrast: 0.35, grey: '#9a9a9a' },
  { contrast: 0.2, grey: '#bcbcbc' },
  { contrast: 0.12, grey: '#cfcfcf' },
  { contrast: 0.07, grey: '#dcdcdc' },
];

function digitForStep(i, seed) {
  // Avoid 0/1 ambiguity; keep deterministic per session.
  const pool = [2, 3, 4, 5, 6, 7, 8, 9];
  return pool[(i * 5 + seed) % pool.length];
}

export default function ContrastTest({ onComplete, onBack }) {
  const seed = useMemo(() => Math.floor(Math.random() * 8), []);
  const [idx, setIdx] = useState(0);
  const [lowestRead, setLowestRead] = useState(null); // index of faintest correct
  const [choice, setChoice] = useState(null);

  const step = STEPS[idx];
  const trueDigit = digitForStep(idx, seed);
  const isLast = idx === STEPS.length - 1;

  // Build 4 options including the true digit.
  const options = useMemo(() => {
    const set = new Set([trueDigit]);
    let k = 1;
    while (set.size < 4) {
      set.add(digitForStep(idx + k, seed + k));
      k++;
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [idx, seed, trueDigit]);

  const finish = (resultIdx) => {
    if (resultIdx === null) {
      onComplete({ thresholdContrast: null, level: 'high' }); // couldn't read even the boldest
    } else {
      const c = STEPS[resultIdx].contrast;
      onComplete({ thresholdContrast: c, level: c <= 0.12 ? 'good' : c <= 0.35 ? 'fair' : 'reduced' });
    }
  };

  const submit = () => {
    const correct = choice === trueDigit;
    if (correct) {
      setLowestRead(idx);
      if (isLast) finish(idx);
      else {
        setIdx(idx + 1);
        setChoice(null);
      }
    } else {
      finish(lowestRead);
    }
  };

  return (
    <Card>
      <StepHeading eyebrow="Step 6 of 6" title="Contrast sensitivity">
        A faint number appears below and gets lighter each round. Read it as long as you can. This optional check
        looks at how well you see low-contrast detail.
      </StepHeading>

      <div className="rounded-2xl bg-white border border-slate-100 flex items-center justify-center py-12 min-h-[180px]">
        <span
          aria-hidden="true"
          style={{ color: step.grey }}
          className="font-display font-semibold leading-none select-none"
          // Large, fixed visual size; contrast (not size) is the variable here.
        >
          <span style={{ fontSize: '110px' }}>{trueDigit}</span>
        </span>
        <span className="sr-only">A faint number is displayed.</span>
      </div>

      <p className="text-center text-sm text-slate-600 mt-6 mb-3">What number do you see?</p>
      <div className="grid grid-cols-4 gap-3">
        {options.map((o) => (
          <ChoiceButton key={o} selected={choice === o} onClick={() => setChoice(o)} ariaLabel={`I see ${o}`} className="py-4 text-lg">
            {o}
          </ChoiceButton>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => finish(lowestRead)}
            className="text-sm text-slate-500 underline underline-offset-4 hover:text-ocean-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 rounded px-2 py-1"
          >
            Can't read it, stop
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={choice === null}
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean-300/60 disabled:opacity-40 disabled:pointer-events-none"
          >
            {isLast ? 'See results' : 'Next'}
          </button>
        </div>
      </div>
    </Card>
  );
}
