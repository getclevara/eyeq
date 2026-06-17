import React, { useState } from 'react';
import { Card, StepHeading, NavRow, ChoiceButton } from './ui.jsx';

// Standard Amsler grid: a square grid with a central fixation dot. Used to
// self-monitor the central visual field for macular problems. The user fixes
// on the dot (one eye at a time) and reports any wavy, blurry, missing, or
// dark areas.
function AmslerGrid() {
  const size = 300;
  const cells = 20;
  const step = size / cells;
  const lines = [];
  for (let i = 0; i <= cells; i++) {
    const p = i * step;
    lines.push(<line key={'h' + i} x1={0} y1={p} x2={size} y2={p} stroke="#475569" strokeWidth="1" />);
    lines.push(<line key={'v' + i} x1={p} y1={0} x2={p} y2={size} stroke="#475569" strokeWidth="1" />);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="An Amsler grid: a square grid of fine lines with a single dot in the very centre"
      className="max-w-full bg-white"
    >
      {lines}
      <circle cx={size / 2} cy={size / 2} r="5" fill="#0f172a" />
    </svg>
  );
}

const QUESTIONS = [
  { key: 'wavy', label: 'Any lines look wavy, bent, or distorted?' },
  { key: 'missing', label: 'Any areas missing, faded, or blank?' },
  { key: 'dark', label: 'Any dark, grey, or blurry patches?' },
  { key: 'blurry', label: 'Does the grid look blurry overall?' },
];

export default function AmslerTest({ onComplete, onBack }) {
  const [answers, setAnswers] = useState({});

  const set = (key, val) => setAnswers((a) => ({ ...a, [key]: val }));
  const allAnswered = QUESTIONS.every((q) => answers[q.key] !== undefined);

  const next = () => {
    const flagged = QUESTIONS.filter((q) => answers[q.key] === true).map((q) => q.key);
    onComplete({ answers, anyFlagged: flagged.length > 0, flagged });
  };

  return (
    <Card>
      <StepHeading eyebrow="Step 5 of 6" title="Amsler grid">
        Cover one eye and stare only at the centre dot from about a foot away (wear reading glasses if you use
        them). Without moving your gaze, notice the rest of the grid. Then repeat with the other eye, and answer
        below for either eye.
      </StepHeading>

      <div className="rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center py-8">
        <AmslerGrid />
      </div>

      <div className="mt-6 space-y-4">
        {QUESTIONS.map((q) => (
          <div key={q.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-sm font-medium text-slate-700">{q.label}</span>
            <div className="flex gap-2 flex-shrink-0" role="group" aria-label={q.label}>
              <ChoiceButton selected={answers[q.key] === false} onClick={() => set(q.key, false)} ariaLabel="No" className="px-5 py-2 text-sm">
                No
              </ChoiceButton>
              <ChoiceButton selected={answers[q.key] === true} onClick={() => set(q.key, true)} ariaLabel="Yes" className="px-5 py-2 text-sm">
                Yes
              </ChoiceButton>
            </div>
          </div>
        ))}
      </div>

      <NavRow onBack={onBack} onNext={next} nextDisabled={!allAnswered} />
    </Card>
  );
}
