import React from 'react';
import { 
  ArrowRight, 
  GitFork, 
  Zap, 
  Cpu, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MolecularCanvas } from '../components/MolecularCanvas';
import { BENCHMARK_METRICS } from '../data/mockData';
import { ActivePage } from '../components/Navbar';

interface LandingPageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenQuickScreen: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenQuickScreen
}) => {
  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Molecular Particles in Soft Botanical Tones */}
        <div className="absolute inset-0 pointer-events-auto opacity-60">
          <MolecularCanvas interactive={true} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Minimalist Botanical Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] border border-[#D4E5D8] text-[#264E36] text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#264E36]" />
            <span>PolyGraph-Med v2.4</span>
            <span className="text-[#8FA593]">•</span>
            <span className="text-[#525D55]">Explainable Clinical Intelligence for Polypharmacy</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1F2421] leading-[1.15]">
            Understand the connections.<br />
            <span className="text-[#2D5A3F] font-normal italic">Protect medication safety.</span>
          </h1>

          {/* One-Line Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#525D55] leading-relaxed font-normal">
            Detect non-linear interactions across 3 or more medications, trace metabolic pathway bottlenecks, and review evidence-supported alternatives.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('analysis')}
              className="px-7 py-3.5 rounded-2xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-sm shadow-sm transition active:scale-95 flex items-center gap-2"
            >
              <span>Analyze Multi-Drug Regimen</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('graph')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F5F2EA] text-[#264E36] border border-[#E0DACE] font-semibold text-sm shadow-sm transition flex items-center gap-2"
            >
              <GitFork className="w-4 h-4 text-[#3B7054]" />
              <span>Explore Knowledge Graph</span>
            </button>

            <button
              onClick={onOpenQuickScreen}
              className="px-5 py-3.5 rounded-2xl text-[#525D55] hover:text-[#1F2421] hover:bg-[#F3EFE6] font-medium text-sm transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#C48A45]" />
              <span>Quick Screen</span>
            </button>
          </div>

          {/* Clean Metric Counter Row */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-[#E8E4DA]">
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-[#1F2421] font-mono">0.942</span>
              <span className="block text-xs text-[#69756D] font-medium mt-0.5">GNN AUROC Metric</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-[#2D5A3F] font-mono">142,000+</span>
              <span className="block text-xs text-[#69756D] font-medium mt-0.5">Knowledge Graph Edges</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-[#1F2421] font-mono">89.4%</span>
              <span className="block text-xs text-[#69756D] font-medium mt-0.5">Triplet Synergy Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* PAIRWISE VS HIGHER-ORDER COMPARISON */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] uppercase font-bold text-[#2D5A3F] tracking-wider">
            Clinical Distinction
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">
            Why standard checkers miss polypharmacy risks
          </h2>
          <p className="text-xs sm:text-sm text-[#69756D]">
            Evaluating medicines only in pairs overlooks shared enzyme saturation across 3 or more co-prescribed drugs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Checker */}
          <div className="card-warm p-7 rounded-3xl space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C3D32]">
                <XCircle className="w-4 h-4 text-[#B84A3B]" />
                <span>Traditional Pairwise Checker</span>
              </div>
              <h3 className="text-lg font-bold text-[#1F2421]">Tests Each Pair in Isolation</h3>
              <p className="text-xs text-[#525D55] leading-relaxed">
                Checks A+B, B+C, and A+C individually. Assumes total risk is merely the sum of pairwise interactions.
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E4DA] flex items-center justify-between">
                  <span className="text-[#2C332E]">Warfarin + Amiodarone</span>
                  <span className="text-[#C48A45] font-medium">Moderate Bleed Alert</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E4DA] flex items-center justify-between">
                  <span className="text-[#2C332E]">Amiodarone + Simvastatin</span>
                  <span className="text-[#C48A45] font-medium">Dose Limit Alert</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E4DA] flex items-center justify-between">
                  <span className="text-[#2C332E]">Warfarin + Simvastatin</span>
                  <span className="text-[#5A7C65] font-medium">Minimal Interaction</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#7C877E] pt-3 border-t border-[#E8E4DA]">
              Limitation: Misses synergistic rhabdomyolysis and severe INR surge.
            </p>
          </div>

          {/* PolyGraph-Med GNN */}
          <div className="card-base p-7 rounded-3xl border border-[#D4E5D8] space-y-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#264E36]">
                <CheckCircle2 className="w-4 h-4 text-[#264E36]" />
                <span>PolyGraph-Med Higher-Order GNN</span>
              </div>
              <h3 className="text-lg font-bold text-[#1F2421]">Evaluates the Full Combination</h3>
              <p className="text-xs text-[#525D55] leading-relaxed">
                Learns from the biological subgraph to detect non-linear pathway competition across all prescribed medicines.
              </p>

              <div className="p-3.5 rounded-2xl bg-[#EBF3ED] border border-[#D4E5D8] text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-[#264E36]">
                  <span>Triplet Synergy Identified</span>
                  <span className="text-[11px] font-mono">Score: 84/100</span>
                </div>
                <p className="text-[#3E4F42] leading-relaxed">
                  Dual CYP3A4/CYP2C9 saturation plus OATP1B1 inhibition elevates unbound simvastatin by 3.8x and impairs warfarin clearance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl card-warm">
                  <span className="text-[10px] text-[#7C877E] uppercase block font-semibold">Attribution</span>
                  <span className="text-[#2D5A3F] font-medium">CYP3A4 Saturation</span>
                </div>
                <div className="p-2.5 rounded-xl card-warm">
                  <span className="text-[10px] text-[#7C877E] uppercase block font-semibold">Evidence</span>
                  <span className="text-[#2C332E] font-medium font-mono">PMID: 28938172</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between">
              <span className="text-xs text-[#69756D]">GraphSAGE + Combinatorial Encoder</span>
              <button
                onClick={() => onNavigate('analysis')}
                className="text-xs text-[#264E36] hover:text-[#1D3E2B] font-semibold flex items-center gap-1"
              >
                <span>Try Regimen</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CORE PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] uppercase font-bold text-[#2D5A3F] tracking-wider">
            Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">
            Three pillars of clinical intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-base p-7 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] text-[#264E36] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-[#2D5A3F] uppercase tracking-wider block">Pillar 01</span>
            <h3 className="text-base font-bold text-[#1F2421]">PolyGraph Intelligence</h3>
            <p className="text-xs text-[#525D55] leading-relaxed">
              GraphSAGE neighborhood embeddings and hypergraph models predict risks arising from 3+ medication sets.
            </p>
          </div>

          <div className="card-base p-7 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] text-[#264E36] flex items-center justify-center">
              <GitFork className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-[#2D5A3F] uppercase tracking-wider block">Pillar 02</span>
            <h3 className="text-base font-bold text-[#1F2421]">Biological Explainability</h3>
            <p className="text-xs text-[#525D55] leading-relaxed">
              Every warning traces through Cytochrome P450 enzymes, transporters, and biological pathway cascades.
            </p>
          </div>

          <div className="card-base p-7 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] text-[#264E36] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-[#2D5A3F] uppercase tracking-wider block">Pillar 03</span>
            <h3 className="text-base font-bold text-[#1F2421]">PubMed Literature RAG</h3>
            <p className="text-xs text-[#525D55] leading-relaxed">
              Retrieval-augmented AI connects predictions directly to peer-reviewed clinical trials and verified PMIDs.
            </p>
          </div>
        </div>
      </section>

      {/* BENCHMARK TABLE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-7 sm:p-8 rounded-3xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h3 className="text-lg font-bold text-[#1F2421]">Model Performance Evaluation</h3>
              <p className="text-xs text-[#69756D]">Evaluated against held-out multi-drug combinations</p>
            </div>
            <span className="text-xs font-mono text-[#264E36] bg-[#EBF3ED] px-2.5 py-1 rounded-full border border-[#D4E5D8] font-semibold w-fit">
              12,400+ Combination Sets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E4DA] text-[#69756D] font-semibold uppercase text-[10px]">
                  <th className="pb-3">Model</th>
                  <th className="pb-3">AUROC</th>
                  <th className="pb-3">AUPRC</th>
                  <th className="pb-3">F1-Score</th>
                  <th className="pb-3">3+ Drug Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DA] font-mono">
                {BENCHMARK_METRICS.map((row, idx) => {
                  const isPoly = row.model.includes('PolyGraph');
                  return (
                    <tr key={idx} className={isPoly ? 'bg-[#EBF3ED]/60 font-semibold text-[#264E36]' : 'text-[#2C332E]'}>
                      <td className="py-3 font-sans flex items-center gap-2">
                        {isPoly && <Award className="w-4 h-4 text-[#264E36]" />}
                        <span>{row.model}</span>
                      </td>
                      <td className="py-3">{row.auroc.toFixed(3)}</td>
                      <td className="py-3">{row.auprc.toFixed(3)}</td>
                      <td className="py-3">{row.f1.toFixed(3)}</td>
                      <td className="py-3 text-[#2D5A3F] font-bold">{(row.higherOrderAcc * 100).toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CLEAN CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="card-warm p-10 sm:p-12 rounded-3xl space-y-4 border border-[#E8E4DA]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">
            Experience Clinical Medication Intelligence
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#525D55] leading-relaxed">
            Screen complex regimens, explore the biological network, or test hypothetical drug substitutions in the sandbox.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('analysis')}
              className="px-6 py-3 rounded-2xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-xs shadow-sm transition"
            >
              Start Regimen Analysis
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-[#F5F2EA] text-[#2C332E] border border-[#E0DACE] font-medium text-xs transition"
            >
              Open Dashboard
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#7C877E] max-w-xl mx-auto">
          Academic &amp; Research Decision Support Platform • Designed to assist healthcare professionals by augmenting evidence retrieval. All findings require clinician validation.
        </p>
      </section>
    </div>
  );
};
