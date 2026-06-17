import React, { useState, useRef, useEffect } from 'react';
import { CreditCard, Ruler, MonitorSmartphone } from 'lucide-react';
import {
  Card,
  StepHeading,
  NavRow,
  SecondaryButton,
  CARD_WIDTH_MM,
  FALLBACK_PX_PER_MM,
  TEST_DISTANCE_CM,
} from './ui.jsx';

// Credit-card calibration: the user resizes an on-screen rectangle (locked to a
// real ID-1 card's 85.6:53.98 aspect ratio) until it matches a physical card.
// The rectangle's rendered pixel width / 85.6 mm => pixels-per-mm for this
// display, used to size every later optotype to a real physical angle.
export default function Calibration({ initialPxPerMm, onComplete, onBack }) {
  // Seed the slider near a believable default (a card ~ this many px wide).
  const defaultWidth = Math.round(CARD_WIDTH_MM * (initialPxPerMm || FALLBACK_PX_PER_MM));
  const [cardWidthPx, setCardWidthPx] = useState(defaultWidth);
  const wrapRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(560);

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        // Leave a little breathing room inside the card.
        setMaxWidth(Math.max(200, Math.min(560, wrapRef.current.clientWidth - 16)));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const cardHeightPx = cardWidthPx * (53.98 / 85.6);
  const pxPerMm = cardWidthPx / CARD_WIDTH_MM;

  const accept = () => {
    onComplete({ pxPerMm, calibrated: true });
  };

  const skip = () => {
    onComplete({ pxPerMm: FALLBACK_PX_PER_MM, calibrated: false });
  };

  return (
    <Card>
      <StepHeading eyebrow="Step 1 of 6" title="Calibrate your screen">
        Hold a real credit card, ID, or driver's license against the screen and drag the slider until the blue
        rectangle is exactly the same width. This lets us size the eye charts to real-world dimensions.
      </StepHeading>

      <div ref={wrapRef} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-6 flex flex-col items-center">
        <div
          aria-hidden="true"
          className="relative rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-700 shadow-lg flex items-end p-3 select-none"
          style={{ width: cardWidthPx + 'px', height: cardHeightPx + 'px' }}
        >
          <CreditCard className="w-7 h-7 text-white/80" aria-hidden="true" />
          <span className="absolute top-3 right-3 text-[10px] tracking-widest text-white/70 uppercase">
            Match your card
          </span>
        </div>

        <div className="w-full max-w-md mt-8">
          <label htmlFor="cal-slider" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <Ruler className="w-4 h-4 text-ocean-600" aria-hidden="true" />
            Adjust card size
          </label>
          <input
            id="cal-slider"
            type="range"
            min={200}
            max={maxWidth}
            step={1}
            value={Math.min(cardWidthPx, maxWidth)}
            onChange={(e) => setCardWidthPx(Number(e.target.value))}
            className="w-full accent-ocean-600 cursor-pointer h-2"
            aria-valuetext={`${Math.round(cardWidthPx)} pixels wide`}
          />
          <p className="text-xs text-slate-500 mt-2 text-center">
            Tip: use the arrow keys for fine adjustments. No card handy? You can skip, results will be approximate.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ocean-100 bg-ocean-50/60 p-4">
        <MonitorSmartphone className="w-5 h-5 text-ocean-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-slate-700 leading-relaxed">
          For the acuity test, sit about <strong>{Math.round(TEST_DISTANCE_CM / 30.48 * 10) / 10} ft
          ({TEST_DISTANCE_CM} cm)</strong> from your screen, roughly an arm's length plus a little more. Keep both
          eyes open and wear your usual glasses or contacts if you have them.
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <SecondaryButton onClick={skip}>Skip calibration (approximate)</SecondaryButton>
      </div>

      <NavRow onBack={onBack} onNext={accept} nextLabel="Calibration looks right" />
    </Card>
  );
}
