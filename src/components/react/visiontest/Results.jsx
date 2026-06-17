import React from 'react';
import { Eye, Palette, Asterisk, LayoutGrid, Contrast, Phone, CalendarCheck, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, PrimaryButton, SecondaryButton, Disclaimer } from './ui.jsx';

// Friendly, non-alarming summary. "concern" => gentle "consider an exam" tone,
// never alarmist, never diagnostic.
function summarize(results) {
  const out = [];

  // Acuity
  if (results.acuity) {
    const a = results.acuity;
    let note;
    if (a.acuity && a.acuity <= 25) note = 'Looks sharp. A routine exam still keeps it that way.';
    else if (a.acuity && a.acuity <= 40) note = 'Slightly reduced, worth checking with an exam.';
    else note = 'Reduced in this screening, an exam can pinpoint why.';
    out.push({
      icon: Eye,
      title: 'Visual acuity',
      value: a.label || 'Not completed',
      note: a.calibrated ? note : note + ' (Screen not calibrated, so this is approximate.)',
      concern: !a.acuity || a.acuity > 30,
    });
  }

  // Astigmatism
  if (results.astigmatism) {
    out.push({
      icon: Asterisk,
      title: 'Astigmatism',
      value: results.astigmatism.uneven ? 'Some lines stood out' : 'Lines looked even',
      note: results.astigmatism.uneven
        ? `You noticed stronger lines${results.astigmatism.area ? ` (${results.astigmatism.area.toLowerCase()})` : ''}. That can be a sign of astigmatism, an exam can confirm.`
        : 'No obvious sign of astigmatism in this quick check.',
      concern: results.astigmatism.uneven,
    });
  }

  // Color
  if (results.color) {
    const c = results.color;
    out.push({
      icon: Palette,
      title: 'Colour vision',
      value: c.deficiencyLikely ? 'Possible red-green difference' : 'No red-green deficiency detected',
      note: c.deficiencyLikely
        ? `You missed ${c.missed} of ${c.total} colour plates. This can suggest a red-green colour difference, a doctor can test this properly.`
        : 'You distinguished the colour plates well.',
      concern: c.deficiencyLikely,
    });
  }

  // Amsler
  if (results.amsler) {
    out.push({
      icon: LayoutGrid,
      title: 'Amsler grid',
      value: results.amsler.anyFlagged ? 'You noticed distortions' : 'Grid looked normal',
      note: results.amsler.anyFlagged
        ? 'You reported wavy, missing, or dark areas. Please mention this to Dr. Fernandez, central-vision changes are worth a prompt look.'
        : 'No distortions reported in your central vision.',
      concern: results.amsler.anyFlagged,
    });
  }

  // Contrast
  if (results.contrast) {
    const lv = results.contrast.level;
    out.push({
      icon: Contrast,
      title: 'Contrast sensitivity',
      value: lv === 'good' ? 'Good low-contrast vision' : lv === 'fair' ? 'Fair' : 'Reduced',
      note: lv === 'good'
        ? 'You read faint, low-contrast numbers well.'
        : 'You had some trouble with low-contrast numbers, worth noting at your exam.',
      concern: lv === 'reduced' || lv === 'high',
    });
  }

  return out;
}

export default function Results({ results, onRestart }) {
  const items = summarize(results);
  const concerns = items.filter((i) => i.concern).length;

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-ocean-50 text-ocean-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            Screening complete
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
            Your vision screening summary
          </h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            {concerns === 0
              ? 'Nothing in this quick screening stood out, but a screening can miss things only an exam can find.'
              : `A few areas are worth a closer look (${concerns}). This is a friendly nudge, not a diagnosis.`}
          </p>
        </div>

        <ul className="space-y-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <li
                key={i}
                className="flex gap-4 rounded-2xl border border-slate-100 p-5 bg-white"
              >
                <div
                  className={
                    'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ' +
                    (it.concern ? 'bg-sand-100 text-sand-500' : 'bg-ocean-50 text-ocean-600')
                  }
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{it.title}</h3>
                    <span
                      className={
                        'text-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ' +
                        (it.concern ? 'bg-sand-100 text-slate-700' : 'bg-ocean-50 text-ocean-700')
                      }
                    >
                      {it.concern ? <AlertCircle className="w-3 h-3" aria-hidden="true" /> : <CheckCircle2 className="w-3 h-3" aria-hidden="true" />}
                      {it.value}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{it.note}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </Card>

      {/* CTA */}
      <Card className="bg-slate-900 border-slate-800 text-white">
        <div className="text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
            The best next step is a comprehensive exam
          </h3>
          <p className="text-white/70 mt-3 max-w-lg mx-auto">
            Dr. Caron Fernandez can give you a complete picture of your eye health here in Hilo, far beyond what any
            online screening can see.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              <CalendarCheck className="w-4 h-4" aria-hidden="true" />
              Book an exam with Dr. Fernandez
            </a>
            <a
              href="tel:+18084644468"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-7 py-3.5 rounded-full transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              (808) 464-4468
            </a>
          </div>
        </div>
      </Card>

      <div className="flex justify-center pb-2">
        <SecondaryButton onClick={onRestart}>
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Restart the screening
        </SecondaryButton>
      </div>
    </div>
  );
}
