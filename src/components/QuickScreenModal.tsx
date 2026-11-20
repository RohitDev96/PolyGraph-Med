import React, { useState } from 'react';
import { X, Zap, ChevronRight, Check } from 'lucide-react';
import { DRUGS_DATABASE } from '../data/drugs';
import { Drug } from '../types';

interface QuickScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAnalysisWithDrugs: (selectedDrugs: Drug[]) => void;
}

export const QuickScreenModal: React.FC<QuickScreenModalProps> = ({
  isOpen,
  onClose,
  onRunAnalysisWithDrugs
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['warfarin', 'amiodarone', 'simvastatin']);

  if (!isOpen) return null;

  const toggleDrug = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(d => d !== id));
    } else {
      if (selectedIds.length >= 5) return;
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleLaunch = () => {
    const drugs = DRUGS_DATABASE.filter(d => selectedIds.includes(d.id));
    onRunAnalysisWithDrugs(drugs);
    onClose();
  };

  const presets = [
    {
      name: 'Elderly Cardiac Triplet',
      ids: ['warfarin', 'amiodarone', 'simvastatin'],
      desc: 'CYP3A4/CYP2C9 saturation + OATP1B1 inhibition'
    },
    {
      name: 'Post-PCI Stent Triplet',
      ids: ['clopidogrel', 'omeprazole', 'aspirin'],
      desc: 'CYP2C19 competitive inactivation'
    },
    {
      name: 'Neuro-Pain Triplet',
      ids: ['fluoxetine', 'tramadol', 'ondansetron'],
      desc: 'CYP2D6 blockade + Serotonin Syndrome'
    },
    {
      name: 'Renal-Lithium Triplet',
      ids: ['lithium', 'lisinopril', 'ibuprofen'],
      desc: 'Glomerular pressure drop with lithium retention'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2421]/30 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-[#E8E4DA] rounded-3xl shadow-xl p-6 sm:p-7 overflow-hidden space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EBF3ED] text-[#264E36]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F2421]">
                Quick Multi-Drug Screener
              </h3>
              <p className="text-xs text-[#69756D]">
                Select 3+ medicines or click a clinically validated evaluation preset.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7C877E] hover:text-[#1F2421] hover:bg-[#F5F2EA] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets */}
        <div>
          <span className="text-[11px] uppercase font-bold text-[#69756D] tracking-wider block mb-2">
            Recommended Presets
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presets.map((preset) => {
              const isSelected = preset.ids.every(id => selectedIds.includes(id)) && selectedIds.length === preset.ids.length;
              return (
                <button
                  key={preset.name}
                  onClick={() => setSelectedIds(preset.ids)}
                  className={`text-left p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-[#EBF3ED] border-[#D4E5D8] text-[#264E36]'
                      : 'card-warm hover:bg-[#F0ECE1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1F2421]">{preset.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#264E36]" />}
                  </div>
                  <p className="text-[11px] text-[#525D55] font-mono mt-0.5">
                    {preset.ids.map(id => DRUGS_DATABASE.find(d => d.id === id)?.name).join(' + ')}
                  </p>
                  <p className="text-[10px] text-[#7C877E] mt-1 line-clamp-1">
                    {preset.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drug Selection Pills */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-bold text-[#69756D] tracking-wider">
              Selected Medicines ({selectedIds.length})
            </span>
            <span className="text-[11px] text-[#7C877E]">Min 2, Recommended 3+</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-0.5">
            {DRUGS_DATABASE.slice(0, 16).map((drug) => {
              const isSelected = selectedIds.includes(drug.id);
              return (
                <button
                  key={drug.id}
                  onClick={() => toggleDrug(drug.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#264E36] text-white font-semibold shadow-sm'
                      : 'card-warm text-[#4A554E] hover:text-[#1F2421]'
                  }`}
                >
                  {drug.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#69756D] hover:text-[#1F2421] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLaunch}
            disabled={selectedIds.length < 2}
            className="px-5 py-2 rounded-xl bg-[#264E36] hover:bg-[#1D3E2B] disabled:opacity-40 text-white font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            <span>Run GNN Analysis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
