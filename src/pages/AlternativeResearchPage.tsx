import React, { useState } from 'react';
import { 
  Shuffle, 
  CheckCircle2, 
  ExternalLink, 
  Sliders, 
  Info, 
  TrendingDown
} from 'lucide-react';
import { ALTERNATIVE_CANDIDATES } from '../data/mockData';
import { AlternativeCandidate } from '../types';
import { ActivePage } from '../components/Navbar';

interface AlternativeResearchPageProps {
  onNavigate: (page: ActivePage) => void;
  onApplyCandidateToSimulation?: (alt: AlternativeCandidate) => void;
}

export const AlternativeResearchPage: React.FC<AlternativeResearchPageProps> = ({
  onNavigate,
  onApplyCandidateToSimulation
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('Simvastatin');

  const distinctTargets = Array.from(new Set(ALTERNATIVE_CANDIDATES.map(a => a.originalDrug)));

  const matchedCandidates = ALTERNATIVE_CANDIDATES.filter(a => a.originalDrug === selectedTarget);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421] flex items-center gap-2.5">
            <Shuffle className="w-6 h-6 text-[#2D5A3F]" />
            <span>Alternative Medication Research Assistant</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Explore evidence-supported alternative treatment options discussed in literature for clinician review.
          </p>
        </div>

        <button
          onClick={() => onNavigate('simulation')}
          className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#2D5A3F] border border-[#E0DACE] text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>What-If Sandbox</span>
        </button>
      </div>

      {/* Target Drug Tabs */}
      <div className="card-base p-5 rounded-3xl space-y-2">
        <span className="text-[11px] uppercase font-bold text-[#69756D] tracking-wider block">
          Select Problematic Prescription to Replace:
        </span>
        <div className="flex flex-wrap gap-2">
          {distinctTargets.map((target) => (
            <button
              key={target}
              onClick={() => setSelectedTarget(target)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                selectedTarget === target
                  ? 'bg-[#264E36] text-white shadow-sm'
                  : 'card-warm text-[#4A554E] hover:text-[#1F2421]'
              }`}
            >
              Replace {target}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1F2421]">
            Evidence-Supported Alternatives for {selectedTarget} ({matchedCandidates.length})
          </h2>
          <span className="text-xs text-[#7C877E] hidden sm:inline">
            Ranked by metabolic bypass efficacy and regimen compatibility
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matchedCandidates.map((candidate) => (
            <div 
              key={candidate.id}
              className="card-base p-7 rounded-3xl space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-[#E8E4DA]">
                  <div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#264E36]">
                      {candidate.therapeuticClass}
                    </span>
                    <h3 className="text-lg font-bold text-[#1F2421] mt-1.5">
                      {candidate.candidateDrug}
                      <span className="text-xs font-normal text-[#7C877E] ml-2 font-mono">
                        ({candidate.candidateGeneric})
                      </span>
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#7C877E] block uppercase font-semibold">Compatibility</span>
                    <span className="text-base font-bold text-[#2D5A3F] font-mono">
                      {candidate.compatibilityScore}%
                    </span>
                  </div>
                </div>

                {/* Score Delta */}
                <div className="p-3 rounded-2xl bg-[#EBF3ED] border border-[#D4E5D8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#264E36]">
                    <TrendingDown className="w-4 h-4" />
                    <span>Predicted Risk Reduction:</span>
                  </div>
                  <span className="text-sm font-bold text-[#264E36] font-mono">
                    {candidate.predictedRiskScoreDelta} pts
                  </span>
                </div>

                {/* Rationale & Advantage */}
                <div className="space-y-2 text-xs">
                  <div className="card-warm p-3 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#2D5A3F] block">
                      Pharmacology Rationale
                    </span>
                    <p className="text-[#525D55] leading-relaxed">{candidate.rationale}</p>
                  </div>

                  <div className="card-warm p-3 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#69756D] block">
                      Metabolic Clearance Advantage
                    </span>
                    <p className="text-[#525D55] leading-relaxed">{candidate.metabolicAdvantage}</p>
                  </div>
                </div>

                {/* Residual Interactions */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#7C877E] block">
                    Regimen Compatibility
                  </span>
                  {candidate.remainingDrugInteractions.length === 0 ? (
                    <div className="p-2.5 rounded-xl bg-[#EBF3ED] text-[#264E36] flex items-center gap-2 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Zero metabolic collisions with remaining regimen medications.</span>
                    </div>
                  ) : (
                    candidate.remainingDrugInteractions.map((inter, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#FDF7EE] text-[#C48A45] text-[11px] flex items-center justify-between">
                        <span><strong>{inter.drug}:</strong> {inter.detail}</span>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white">{inter.risk}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* PubMed Citation */}
                {candidate.supportingCitations.length > 0 && (
                  <div className="pt-1 text-xs">
                    <span className="text-[10px] text-[#7C877E] block uppercase mb-1">Supporting Study</span>
                    <a 
                      href={candidate.supportingCitations[0].doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#1F2421] hover:text-[#264E36] flex items-center gap-1 line-clamp-1"
                    >
                      <span>{candidate.supportingCitations[0].title}</span>
                      <ExternalLink className="w-3 h-3 text-[#7C877E] shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
                <span className="text-[#7C877E] text-[11px]">
                  {candidate.renalDoseAdjustmentNeeded ? '⚠ Renal titration needed' : '✓ Standard dosing'}
                </span>
                <button
                  onClick={() => {
                    if (onApplyCandidateToSimulation) onApplyCandidateToSimulation(candidate);
                    onNavigate('simulation');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Test in Sandbox</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory */}
      <div className="p-4 rounded-2xl card-warm text-xs text-[#69756D] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#2D5A3F] shrink-0 mt-0.5" />
        <p>
          <strong>Clinical Prescribing Note:</strong> Never automatically substitute a patient's medication. Every candidate option possesses distinct dosing schedules and patient-specific contraindications. This module presents research-supported options solely for licensed clinician evaluation.
        </p>
      </div>
    </div>
  );
};
