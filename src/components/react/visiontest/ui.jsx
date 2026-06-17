// Shared UI primitives + constants for the Vision Test island.
// Self-contained; only depends on react + lucide-react.
import React from 'react';
import { ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

// Physical reference: a standard ID-1 card (credit / ID / driver's license)
// is 85.6 mm x 53.98 mm. We calibrate against its width.
export const CARD_WIDTH_MM = 85.6;

// Fallback when calibration is skipped: assume a typical ~96 CSS-px-per-inch
// desktop display => 96 / 25.4 ≈ 3.78 px per mm. Marked "approximate".
export const FALLBACK_PX_PER_MM = 96 / 25.4;

// Recommended testing distance for the acuity portion.
export const TEST_DISTANCE_CM = 100; // ~3.3 ft / arm's length-ish for laptops

// Convert a target visual-angle (in arc-minutes) at the test distance into a
// physical size in millimetres, then to CSS pixels using calibration.
// 1 arc-minute of detail subtends size = 2 * distance * tan(0.5 * angleDeg).
export function arcMinToPx(arcMin, pxPerMm, distanceCm = TEST_DISTANCE_CM) {
  const angleRad = (arcMin / 60) * (Math.PI / 180);
  const distanceMm = distanceCm * 10;
  const sizeMm = 2 * distanceMm * Math.tan(angleRad / 2);
  return sizeMm * pxPerMm;
}

// A Snellen "20/20" letter subtends 5 arc-minutes total; each stroke/gap is
// 1 arc-minute. The "20/N" ratio scales the letter height linearly.
// e.g. 20/40 => letter is twice the 20/20 height.
export function snellenLetterPx(denominator, pxPerMm, distanceCm) {
  const arcMin = 5 * (denominator / 20);
  return arcMinToPx(arcMin, pxPerMm, distanceCm);
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={
        'bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 ' +
        'p-6 sm:p-10 ' +
        className
      }
    >
      {children}
    </div>
  );
}

export function PrimaryButton({ children, onClick, type = 'button', disabled, className = '', ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        'group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ocean-500 to-ocean-600 ' +
        'text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 ' +
        'hover:shadow-lg hover:shadow-ocean-500/30 hover:-translate-y-0.5 active:translate-y-0 ' +
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean-300/60 ' +
        'disabled:opacity-40 disabled:pointer-events-none ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, className = '', ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-medium px-6 py-3 rounded-full ' +
        'border border-slate-200 transition-all duration-300 hover:border-ocean-300 hover:shadow-md ' +
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean-200 ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

// A large, keyboard-accessible answer choice button used across modules.
export function ChoiceButton({ children, selected, onClick, ariaLabel, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={
        'flex items-center justify-center text-center rounded-2xl border-2 font-medium transition-all duration-200 ' +
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean-300/60 ' +
        (selected
          ? 'border-ocean-500 bg-ocean-50 text-ocean-800 shadow-sm '
          : 'border-slate-200 bg-white text-slate-700 hover:border-ocean-300 hover:bg-ocean-50/40 ') +
        className
      }
    >
      {children}
    </button>
  );
}

export function NavRow({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false, backLabel = 'Back', hideBack = false }) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {hideBack ? (
        <span />
      ) : (
        <SecondaryButton onClick={onBack}>
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {backLabel}
        </SecondaryButton>
      )}
      <PrimaryButton onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </PrimaryButton>
    </div>
  );
}

// Repeated, prominent medical disclaimer.
export function Disclaimer({ compact = false }) {
  return (
    <div
      role="note"
      className={
        'flex gap-3 rounded-2xl border border-sand-300 bg-sand-100/70 text-slate-700 ' +
        (compact ? 'p-4 text-sm' : 'p-5')
      }
    >
      <AlertTriangle className="w-5 h-5 text-sand-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className={compact ? '' : 'leading-relaxed'}>
        <strong className="text-slate-900">This is a vision screening, not a medical diagnosis or eye exam.</strong>{' '}
        It cannot detect many eye conditions and the results are not a prescription. Always see Dr. Fernandez for a
        comprehensive exam.
      </p>
    </div>
  );
}

export function StepHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-sm font-medium text-ocean-600 uppercase tracking-[0.18em] mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">{title}</h2>
      {children && <p className="text-slate-600 mt-3 leading-relaxed">{children}</p>}
    </div>
  );
}
