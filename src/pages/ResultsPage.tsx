import React, { useState } from 'react';
import { 
  AlertTriangle, 
  GitFork, 
  BookOpen, 
  Shuffle, 
  FileText, 
  Sliders, 
  ExternalLink, 
  ChevronDown,
  ChevronUp,
  Cpu,
  ArrowRight,
  Flame,
  Info
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { RiskGauge } from '../components/RiskGauge';
import { ActivePage } from '../components/Navbar';

interface ResultsPageProps {
  analysis: AnalysisResult | null;
  onNavigate: (page: ActivePage) => void;
  onExploreAlternative: (drugName: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  analysis,
  onNavigate,
  onExploreAlternative
}) => {
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-[#C48A45] mx-auto" />
        <h2 className="text-xl font-bold text-[#1F2421]">No Active Analysis Found</h2>
        <p className="text-xs text-[#69756D]">
          Please run a multi-drug screening first to inspect GNN higher-order prediction results.
        </p>
        <button
          onClick={() => onNavigate('analysis')}
          className="px-5 py-2.5 rounded-2xl bg-[#264E36] text-white font-semibold text-xs shadow-sm transition"
        >
          Go to Multi-Drug Screening
        </button>
      </div>
    );
  }

  const toggleAlert = (id: string) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">
              Clinical Decision Support Analysis
            </h1>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#264E36] border border-[#D4E5D8]">
              {analysis.id}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Patient: <strong className="text-[#1F2421]">{analysis.patient.name}</strong> ({analysis.patient.age}y, eGFR {analysis.patient.egfr} mL/min) • {analysis.drugs.length} medications analyzed
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('simulation')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#2C332E] border border-[#E0DACE] text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-[#2D5A3F]" />
            <span>What-If Sandbox</span>
          </button>
          <button
            onClick={() => onNavigate('alternatives')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#2C332E] border border-[#E0DACE] text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#5F7161]" />
            <span>Alternatives</span>
          </button>
          <button
            onClick={() => onNavigate('research')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#2C332E] border border-[#E0DACE] text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#3B7054]" />
            <span>PubMed RAG</span>
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="px-4 py-2 rounded-xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="card-base p-6 rounded-3xl flex flex-col items-center justify-center">
          <RiskGauge 
            score={analysis.polypharmacyRiskScore}
            documentedCount={analysis.documentedCount}
            predictedCount={analysis.predictedHigherOrderCount}
            pathwayOverlaps={analysis.pathwayOverlapsCount}
          />
        </div>

        <div className="lg:col-span-2 card-base p-7 rounded-3xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA]">
            <div>
              <h3 className="text-base font-bold text-[#1F2421]">Screening Triage Summary</h3>
              <p className="text-xs text-[#69756D]">Stratified biological signals and patient susceptibility</p>
            </div>
            <span className="text-xs font-mono text-[#2D5A3F] font-medium">
              Analyzed: {new Date(analysis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="card-warm p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#7C877E] uppercase font-semibold block">Prescribed Meds</span>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {analysis.drugs.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white text-[#2C332E] text-[10px] font-mono border border-[#E8E4DA]">
                    {p.drug.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FDF2F0] border border-[#F7D8D3]">
              <span className="text-[10px] text-[#B84A3B] uppercase font-bold block">3+ Higher-Order</span>
              <span className="text-2xl font-bold text-[#1F2421] font-mono mt-1 block">
                {analysis.predictedHigherOrderCount}
              </span>
              <span className="text-[10px] text-[#B84A3B]">Non-linear multi-drug risk</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FDF7EE] border border-[#F8E5CA]">
              <span className="text-[10px] text-[#C48A45] uppercase font-bold block">Documented Alerts</span>
              <span className="text-2xl font-bold text-[#1F2421] font-mono mt-1 block">
                {analysis.documentedCount}
              </span>
              <span className="text-[10px] text-[#C48A45]">Pairwise clinical warnings</span>
            </div>
          </div>

          {analysis.patientSpecificRisks.length > 0 && (
            <div className="p-4 rounded-2xl card-warm space-y-1.5 text-xs">
              <span className="font-semibold text-[#1F2421] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C48A45]" />
                Patient-Specific Risk Modifiers
              </span>
              <div className="space-y-1 pl-5 text-[#525D55]">
                {analysis.patientSpecificRisks.map((risk, i) => (
                  <div key={i}>
                    <strong className="text-[#1F2421]">{risk.factor}:</strong> {risk.explanation}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HIGHER-ORDER INTERACTION SPOTLIGHT */}
      {analysis.higherOrderInteractions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#EBF3ED] text-[#264E36]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1F2421]">
                Higher-Order Drug Interaction Spotlight
              </h2>
              <p className="text-xs text-[#69756D]">
                Interactions involving 3+ medications resulting in non-linear clinical risks.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.higherOrderInteractions.map((alert) => (
              <div 
                key={alert.id}
                className="card-base p-7 rounded-3xl border border-[#D4E5D8] space-y-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E4DA]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FDF2F0] text-[#B84A3B] border border-[#F7D8D3]">
                        {alert.severity} Severity
                      </span>
                      <span className="text-xs font-mono text-[#69756D]">
                        GNN Confidence: {(alert.gnnConfidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2421] mt-1.5">
                      {alert.drugNames.join(' + ')}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('graph')}
                      className="px-3 py-1.5 rounded-xl card-warm text-[#2C332E] hover:bg-[#EAE6DC] text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <GitFork className="w-3.5 h-3.5 text-[#2D5A3F]" />
                      <span>View Subgraph</span>
                    </button>
                    <button
                      onClick={() => onNavigate('alternatives')}
                      className="px-3 py-1.5 rounded-xl bg-[#EBF3ED] text-[#264E36] hover:bg-[#DCEADB] text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Find Alternative</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="card-warm p-4 rounded-2xl space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#2D5A3F] block">
                      Biological Mechanism
                    </span>
                    <p className="font-semibold text-[#1F2421]">{alert.mechanism}</p>
                    <p className="text-[#525D55] leading-relaxed">{alert.clinicalConsequence}</p>
                  </div>

                  <div className="card-warm p-4 rounded-2xl space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C48A45] block">
                        Affected Enzymes &amp; Transporters
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {alert.affectedEnzymes.map((e, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-white text-[#2C332E] font-mono text-[11px] border border-[#E8E4DA]">
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E8E4DA]">
                      <span className="text-[10px] uppercase font-bold text-[#7C877E] block mb-0.5">
                        Graph Subgraph Path
                      </span>
                      <p className="font-mono text-[11px] text-[#2D5A3F]">
                        {alert.graphPathDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#D4E5D8] text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#264E36] block">
                    Management Recommendation for Clinician Review
                  </span>
                  <p className="text-[#1F2421] leading-relaxed font-medium">
                    {alert.managementRecommendation}
                  </p>
                </div>

                {/* Citations */}
                {alert.citations.length > 0 && (
                  <div className="pt-1 text-xs space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#7C877E] block">
                      Peer-Reviewed Literature References
                    </span>
                    <div className="space-y-1.5">
                      {alert.citations.map((cite) => (
                        <div key={cite.pmid} className="p-3 rounded-xl card-warm flex items-start justify-between gap-3">
                          <div>
                            <a 
                              href={cite.doiUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="font-bold text-[#1F2421] hover:text-[#264E36] transition flex items-center gap-1.5"
                            >
                              <span>{cite.title}</span>
                              <ExternalLink className="w-3 h-3 text-[#7C877E]" />
                            </a>
                            <p className="text-[11px] text-[#69756D] mt-0.5">
                              {cite.authors} • <em>{cite.journal} ({cite.year})</em> • <span className="font-mono font-medium text-[#2D5A3F]">PMID: {cite.pmid}</span>
                            </p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#525D55] border border-[#E8E4DA] shrink-0 font-medium">
                            {cite.studyType}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DOCUMENTED PAIRWISE ALERTS */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#1F2421] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#C48A45]" />
          <span>Documented Pairwise Alerts ({analysis.documentedInteractions.length})</span>
        </h3>

        <div className="space-y-3">
          {analysis.documentedInteractions.map((alert) => (
            <div 
              key={alert.id}
              className="card-base p-5 rounded-2xl space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#FDF7EE] text-[#C48A45] border border-[#F8E5CA]">
                      {alert.severity}
                    </span>
                    <span className="text-[11px] text-[#7C877E]">
                      {alert.evidenceLevel}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1F2421] mt-1">
                    {alert.drugNames.join(' ↔ ')}
                  </h4>
                </div>

                <button
                  onClick={() => toggleAlert(alert.id)}
                  className="p-1 rounded-lg text-[#7C877E] hover:text-[#1F2421]"
                >
                  {expandedAlertId === alert.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-[#525D55] leading-relaxed">
                {alert.clinicalConsequence}
              </p>

              {expandedAlertId === alert.id && (
                <div className="pt-3 border-t border-[#E8E4DA] space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7C877E] block">Mechanism</span>
                    <p className="text-[#2C332E]">{alert.mechanism}</p>
                  </div>
                  <div className="p-3 rounded-xl card-warm">
                    <span className="text-[10px] uppercase font-bold text-[#2D5A3F] block">Management</span>
                    <p className="text-[#1F2421] mt-0.5">{alert.managementRecommendation}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* EXPLAINABLE AI ATTRIBUTIONS */}
      <div className="card-base p-7 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA]">
          <div>
            <h3 className="text-base font-bold text-[#1F2421] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#C48A45]" />
              <span>Explainable AI (XAI) Feature Attributions</span>
            </h3>
            <p className="text-xs text-[#69756D]">Biological features weighted by the GraphSAGE prediction head</p>
          </div>
          <button
            onClick={() => onNavigate('graph')}
            className="text-xs text-[#264E36] hover:text-[#1D3E2B] font-semibold flex items-center gap-1"
          >
            <span>Explore Graph</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {analysis.modelAttributions.map((attr, i) => (
            <div key={i} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#1F2421] font-medium">{attr.feature}</span>
                <span className="font-mono text-[#2D5A3F] font-bold">{(attr.importance * 100).toFixed(0)}% Weight</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#EAE6DC] overflow-hidden">
                <div 
                  className="h-full rounded-full bg-[#2D5A3F]" 
                  style={{ width: `${attr.importance * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-[#69756D]">{attr.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Footer */}
      <div className="p-4 rounded-2xl card-warm text-xs text-[#69756D] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#2D5A3F] shrink-0 mt-0.5" />
        <p>
          <strong>Clinical Advisory Note:</strong> These screening findings represent exploratory AI predictions. All potential treatment adjustments require correlation with laboratory markers and verification by a licensed clinician.
        </p>
      </div>
    </div>
  );
};
