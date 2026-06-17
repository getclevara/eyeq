import React, { useReducer } from 'react';
import { Eye, Palette, Asterisk, LayoutGrid, Contrast, Ruler, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Card, PrimaryButton, Disclaimer, FALLBACK_PX_PER_MM, TEST_DISTANCE_CM } from './visiontest/ui.jsx';
import Calibration from './visiontest/Calibration.jsx';
import AcuityTest from './visiontest/AcuityTest.jsx';
import AstigmatismTest from './visiontest/AstigmatismTest.jsx';
import ColorTest from './visiontest/ColorTest.jsx';
import AmslerTest from './visiontest/AmslerTest.jsx';
import ContrastTest from './visiontest/ContrastTest.jsx';
import Results from './visiontest/Results.jsx';

// Flow: intro -> calibration -> acuity -> astigmatism -> color -> amsler -> contrast -> results
const STEPS = ['intro', 'calibration', 'acuity', 'astigmatism', 'color', 'amsler', 'contrast', 'results'];

// Steps that count toward the visible progress bar (exclude intro & results).
const PROGRESS_STEPS = ['calibration', 'acuity', 'astigmatism', 'color', 'amsler', 'contrast'];

const initialState = {
  step: 'intro',
  pxPerMm: FALLBACK_PX_PER_MM,
  calibrated: false,
  distanceCm: TEST_DISTANCE_CM,
  results: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'GOTO':
      return { ...state, step: action.step };
    case 'BACK': {
      const i = STEPS.indexOf(state.step);
      return { ...state, step: STEPS[Math.max(0, i - 1)] };
    }
    case 'CALIBRATED':
      return {
        ...state,
        pxPerMm: action.pxPerMm,
        calibrated: action.calibrated,
        step: 'acuity',
      };
    case 'RESULT':
      return {
        ...state,
        results: { ...state.results, [action.key]: action.value },
        step: action.next,
      };
    case 'RESTART':
      return { ...initialState };
    default:
      return state;
  }
}

const MODULES = [
  { icon: Ruler, label: 'Screen calibration' },
  { icon: Eye, label: 'Visual acuity' },
  { icon: Asterisk, label: 'Astigmatism' },
  { icon: Palette, label: 'Colour vision' },
  { icon: LayoutGrid, label: 'Amsler grid' },
  { icon: Contrast, label: 'Contrast sensitivity' },
];

function ProgressBar({ step }) {
  const idx = PROGRESS_STEPS.indexOf(step);
  if (idx === -1) return null;
  const pct = ((idx + 1) / PROGRESS_STEPS.length) * 100;
  return (
    <div className="mb-6" aria-hidden="true">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span className="font-medium text-ocean-700">{PROGRESS_STEPS[idx] && MODULES[idx].label}</span>
        <span>
          Step {idx + 1} of {PROGRESS_STEPS.length}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: pct + '%' }}
        />
      </div>
    </div>
  );
}

function Intro({ onBegin }) {
  return (
    <Card>
      <div className="inline-flex items-center gap-2 bg-ocean-50 text-ocean-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        Free · No sign-up · ~5 minutes
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
        A quick, modern check of your vision
      </h2>
      <p className="text-slate-600 mt-4 leading-relaxed max-w-2xl">
        This guided screening walks you through six short modules. It takes about five minutes and works best on a
        desktop or laptop in good lighting. You'll get a friendly summary at the end, and a clear sense of whether
        it's time to book an exam.
      </p>

      <ul className="mt-7 grid sm:grid-cols-2 gap-3">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <li key={m.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
              <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-ocean-600" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-slate-700">{m.label}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-ocean-600" aria-hidden="true" /> Private, nothing is saved or sent</span>
        <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-ocean-600" aria-hidden="true" /> About 5 minutes</span>
      </div>

      <div className="mt-7">
        <Disclaimer />
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onBegin} className="w-full sm:w-auto">
          Begin screening
        </PrimaryButton>
      </div>
    </Card>
  );
}

export default function VisionTest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step } = state;

  const back = () => dispatch({ type: 'BACK' });

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar step={step} />

      {step === 'intro' && <Intro onBegin={() => dispatch({ type: 'GOTO', step: 'calibration' })} />}

      {step === 'calibration' && (
        <Calibration
          initialPxPerMm={state.pxPerMm}
          onBack={() => dispatch({ type: 'GOTO', step: 'intro' })}
          onComplete={({ pxPerMm, calibrated }) => dispatch({ type: 'CALIBRATED', pxPerMm, calibrated })}
        />
      )}

      {step === 'acuity' && (
        <AcuityTest
          pxPerMm={state.pxPerMm}
          calibrated={state.calibrated}
          distanceCm={state.distanceCm}
          onBack={() => dispatch({ type: 'GOTO', step: 'calibration' })}
          onComplete={(value) => dispatch({ type: 'RESULT', key: 'acuity', value, next: 'astigmatism' })}
        />
      )}

      {step === 'astigmatism' && (
        <AstigmatismTest
          onBack={back}
          onComplete={(value) => dispatch({ type: 'RESULT', key: 'astigmatism', value, next: 'color' })}
        />
      )}

      {step === 'color' && (
        <ColorTest
          onBack={back}
          onComplete={(value) => dispatch({ type: 'RESULT', key: 'color', value, next: 'amsler' })}
        />
      )}

      {step === 'amsler' && (
        <AmslerTest
          onBack={back}
          onComplete={(value) => dispatch({ type: 'RESULT', key: 'amsler', value, next: 'contrast' })}
        />
      )}

      {step === 'contrast' && (
        <ContrastTest
          onBack={back}
          onComplete={(value) => dispatch({ type: 'RESULT', key: 'contrast', value, next: 'results' })}
        />
      )}

      {step === 'results' && <Results results={state.results} onRestart={() => dispatch({ type: 'RESTART' })} />}
    </div>
  );
}
