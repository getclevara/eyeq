import React, { useState } from 'react';
import { Card, StepHeading, NavRow, ChoiceButton } from './ui.jsx';

// Classic radial "starburst" / fan dial. With a healthy, uncorrected-for-
// astigmatism eye, all spokes look equally dark and sharp. If some directions
// appear darker, bolder, or sharper than others, that can suggest astigmatism.
function Starburst() {
  const lines = [];
  const cx = 150;
  const cy = 150;
  const r = 140;
  for (let deg = 0; deg < 180; deg += 10) {
    const rad = (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad);
    const y1 = cy + r * Math.sin(rad);
    const x2 = cx - r * Math.cos(rad);
    const y2 = cy - r * Math.sin(rad);
    lines.push(<line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0f172a" strokeWidth="2" />);
  }
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      role="img"
      aria-label="A radial fan of straight black lines spreading out from the centre in all directions"
      className="max-w-full"
    >
      {lines}
      <circle cx={cx} cy={cy} r="4" fill="#0f172a" />
    </svg>
  );
}

export default function AstigmatismTest({ onComplete, onBack }) {
  const [uneven, setUneven] = useState(null); // 'yes' | 'no'
  const [area, setArea] = useState(null);

  const AREAS = ['Horizontal', 'Vertical', 'Diagonal', 'Not sure'];

  const next = () => {
    onComplete({ uneven: uneven === 'yes', area: uneven === 'yes' ? area : null });
  };

  return (
    <Card>
      <StepHeading eyebrow="Step 3 of 6" title="Astigmatism check">
        Cover one eye and look at the centre dot, then switch eyes. In a typical eye all the lines look equally
        black and crisp. Do any lines look <strong>darker, bolder, or sharper</strong> than the others?
      </StepHeading>

      <div className="rounded-2xl bg-white border border-slate-100 flex items-center justify-center py-8">
        <Starburst />
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-700 mb-3">Do some lines stand out more than others?</p>
        <div className="grid grid-cols-2 gap-3">
          <ChoiceButton selected={uneven === 'no'} onClick={() => { setUneven('no'); setArea(null); }} ariaLabel="No, all lines look the same" className="py-3">
            No, they look even
          </ChoiceButton>
          <ChoiceButton selected={uneven === 'yes'} onClick={() => setUneven('yes')} ariaLabel="Yes, some lines stand out" className="py-3">
            Yes, some stand out
          </ChoiceButton>
        </div>
      </div>

      {uneven === 'yes' && (
        <div className="mt-5">
          <p className="text-sm font-medium text-slate-700 mb-3">Which lines looked strongest?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AREAS.map((a) => (
              <ChoiceButton key={a} selected={area === a} onClick={() => setArea(a)} ariaLabel={a} className="py-3 text-sm">
                {a}
              </ChoiceButton>
            ))}
          </div>
        </div>
      )}

      <NavRow onBack={onBack} onNext={next} nextDisabled={uneven === null || (uneven === 'yes' && !area)} />
    </Card>
  );
}
