import React, { useState } from 'react';
import { 
  GitFork, 
  Layers, 
  SlidersHorizontal, 
  Info, 
  Search, 
  Flame
} from 'lucide-react';
import { InteractiveGraphViewer } from '../components/InteractiveGraphViewer';
import { GLOBAL_KNOWLEDGE_GRAPH_NODES, GLOBAL_KNOWLEDGE_GRAPH_EDGES } from '../data/knowledgeGraph';

export const KnowledgeGraphPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<'all' | 'cardiac' | 'stent' | 'neuro' | 'renal'>('all');

  const getPresetNodesAndEdges = () => {
    if (selectedPreset === 'cardiac') {
      const ids = ['warfarin', 'amiodarone', 'simvastatin', 'VKORC1', 'HMGCR', 'CYP3A4', 'CYP2C9', 'OATP1B1', 'P_gp', 'path_coagulation', 'path_cyp_clearance', 'path_myocyte', 'adv_hemorrhage', 'adv_rhabdo'];
      return {
        nodes: GLOBAL_KNOWLEDGE_GRAPH_NODES.filter(n => ids.includes(n.id)),
        edges: GLOBAL_KNOWLEDGE_GRAPH_EDGES.filter(e => ids.includes(e.source) && ids.includes(e.target))
      };
    }
    if (selectedPreset === 'stent') {
      const ids = ['clopidogrel', 'omeprazole', 'aspirin', 'P2RY12', 'PTGS1', 'CYP2C19', 'path_platelet', 'adv_stent_thrombosis'];
      return {
        nodes: GLOBAL_KNOWLEDGE_GRAPH_NODES.filter(n => ids.includes(n.id)),
        edges: GLOBAL_KNOWLEDGE_GRAPH_EDGES.filter(e => ids.includes(e.source) && ids.includes(e.target))
      };
    }
    if (selectedPreset === 'neuro') {
      const ids = ['fluoxetine', 'tramadol', 'ondansetron', 'SLC6A4', 'OPRM1', 'KCNH2', 'CYP2D6', 'CYP3A4', 'path_serotonin', 'path_repolarization', 'adv_serotonin_syn', 'adv_torsades'];
      return {
        nodes: GLOBAL_KNOWLEDGE_GRAPH_NODES.filter(n => ids.includes(n.id)),
        edges: GLOBAL_KNOWLEDGE_GRAPH_EDGES.filter(e => ids.includes(e.source) && ids.includes(e.target))
      };
    }
    if (selectedPreset === 'renal') {
      const ids = ['lithium', 'lisinopril', 'ibuprofen', 'spironolactone', 'ACE_prot', 'PTGS1', 'path_renal_perfusion', 'adv_lithium_tox', 'adv_hyperkalemia'];
      return {
        nodes: GLOBAL_KNOWLEDGE_GRAPH_NODES.filter(n => ids.includes(n.id)),
        edges: GLOBAL_KNOWLEDGE_GRAPH_EDGES.filter(e => ids.includes(e.source) && ids.includes(e.target))
      };
    }
    return {
      nodes: GLOBAL_KNOWLEDGE_GRAPH_NODES,
      edges: GLOBAL_KNOWLEDGE_GRAPH_EDGES
    };
  };

  const { nodes, edges } = getPresetNodesAndEdges();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421] flex items-center gap-2.5">
            <GitFork className="w-6 h-6 text-[#2D5A3F]" />
            <span>Biomedical Knowledge Graph Explorer</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Explore multi-relational networks connecting drugs, enzymes, target proteins, and clinical endpoints.
          </p>
        </div>

        {/* Subgraph Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#7C877E] font-medium mr-1">Focus Subgraph:</span>
          <button
            onClick={() => setSelectedPreset('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedPreset === 'all'
                ? 'bg-[#EBF3ED] text-[#264E36] font-semibold border border-[#D4E5D8]'
                : 'card-warm text-[#525D55] hover:text-[#1F2421]'
            }`}
          >
            Full Graph
          </button>
          <button
            onClick={() => setSelectedPreset('cardiac')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedPreset === 'cardiac'
                ? 'bg-[#EBF3ED] text-[#264E36] font-semibold border border-[#D4E5D8]'
                : 'card-warm text-[#525D55] hover:text-[#1F2421]'
            }`}
          >
            Cardiac Triplet
          </button>
          <button
            onClick={() => setSelectedPreset('stent')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedPreset === 'stent'
                ? 'bg-[#EBF3ED] text-[#264E36] font-semibold border border-[#D4E5D8]'
                : 'card-warm text-[#525D55] hover:text-[#1F2421]'
            }`}
          >
            Antiplatelet Stent
          </button>
          <button
            onClick={() => setSelectedPreset('neuro')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedPreset === 'neuro'
                ? 'bg-[#EBF3ED] text-[#264E36] font-semibold border border-[#D4E5D8]'
                : 'card-warm text-[#525D55] hover:text-[#1F2421]'
            }`}
          >
            Serotonin / QTc
          </button>
          <button
            onClick={() => setSelectedPreset('renal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedPreset === 'renal'
                ? 'bg-[#EBF3ED] text-[#264E36] font-semibold border border-[#D4E5D8]'
                : 'card-warm text-[#525D55] hover:text-[#1F2421]'
            }`}
          >
            Renal Lithium
          </button>
        </div>
      </div>

      {/* Interactive Graph Visualizer */}
      <InteractiveGraphViewer
        key={selectedPreset}
        initialNodes={nodes}
        initialEdges={edges}
        height="600px"
        showFiltersDefault={true}
      />

      {/* Taxonomy & Edge Semantics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-base p-6 rounded-3xl space-y-3">
          <h3 className="text-xs uppercase font-bold text-[#69756D] tracking-wider">
            Biomedical Node Taxonomy
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2 rounded-xl card-warm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A3F] shrink-0" />
              <div>
                <span className="font-bold text-[#1F2421] block">Drugs</span>
                <span className="text-[10px] text-[#7C877E]">Small molecules</span>
              </div>
            </div>
            <div className="p-2 rounded-xl card-warm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5F7161] shrink-0" />
              <div>
                <span className="font-bold text-[#1F2421] block">Proteins</span>
                <span className="text-[10px] text-[#7C877E]">Receptors</span>
              </div>
            </div>
            <div className="p-2 rounded-xl card-warm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C48A45] shrink-0" />
              <div>
                <span className="font-bold text-[#1F2421] block">Enzymes</span>
                <span className="text-[10px] text-[#7C877E]">CYP450 / Transporters</span>
              </div>
            </div>
            <div className="p-2 rounded-xl card-warm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7E9F85] shrink-0" />
              <div>
                <span className="font-bold text-[#1F2421] block">Pathways</span>
                <span className="text-[10px] text-[#7C877E]">KEGG biological</span>
              </div>
            </div>
            <div className="p-2 rounded-xl card-warm flex items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B84A3B] shrink-0" />
              <div>
                <span className="font-bold text-[#1F2421] block">Adverse Signals</span>
                <span className="text-[10px] text-[#7C877E]">Clinical outcomes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-base p-6 rounded-3xl space-y-3">
          <h3 className="text-xs uppercase font-bold text-[#69756D] tracking-wider">
            Typed Relationship Semantics
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl card-warm">
              <span className="font-mono text-[#2D5A3F] font-semibold text-[11px]">DRUG —[inhibits]→ ENZYME</span>
              <span className="text-[#69756D] text-[11px]">Metabolic clearance blockade</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl card-warm">
              <span className="font-mono text-[#5F7161] font-semibold text-[11px]">DRUG —[substrate_of]→ ENZYME</span>
              <span className="text-[#69756D] text-[11px]">Phase I oxidation pathway</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl card-warm">
              <span className="font-mono text-[#C48A45] font-semibold text-[11px]">PATHWAY —[associated_with]→ OUTCOME</span>
              <span className="text-[#69756D] text-[11px]">Adverse toxicity endpoint</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
