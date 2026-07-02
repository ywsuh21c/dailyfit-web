/**
 * Thin connector with flowing dashes — signals data/steps in motion.
 * Reuses `.glyph-flow` (globals.css); off under reduced-motion.
 */
export function FlowLine({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <svg viewBox="0 0 12 28" aria-hidden="true" className="mx-auto block h-7 w-3" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="28" stroke="#4A7C59" strokeOpacity="0.45" strokeWidth="2" className="glyph-flow" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 1000 12" aria-hidden="true" className="hidden h-3 w-full md:block" preserveAspectRatio="none">
      <line x1="0" y1="6" x2="1000" y2="6" stroke="#4A7C59" strokeOpacity="0.35" strokeWidth="2" className="glyph-flow" />
    </svg>
  );
}
