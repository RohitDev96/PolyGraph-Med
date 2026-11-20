import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  User, 
  Cpu, 
  ChevronRight, 
  AlertCircle,
  X
} from 'lucide-react';
import { DRUGS_DATABASE } from '../data/drugs';
import { PATIENT_PROFILES } from '../data/mockData';
import { Drug, PrescribedDrug, PatientProfile } from '../types';

interface AnalysisPageProps {
  currentDrugs: PrescribedDrug[];
  setCurrentDrugs: React.Dispatch<React.SetStateAction<PrescribedDrug[]>>;
  currentPatient: PatientProfile;
  setCurrentPatient: React.Dispatch<React.SetStateAction<PatientProfile>>;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  currentDrugs,
  setCurrentDrugs,
  currentPatient,
  setCurrentPatient,
  onRunAnalysis,
  isAnalyzing
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredDrugs = DRUGS_DATABASE.filter(d => 
    !currentDrugs.some(p => p.drug.id === d.id) &&
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.drugClass.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddDrug = (drug: Drug) => {
    const newPrescription: PrescribedDrug = {
      drug,
      dose: drug.defaultDose,
      frequency: 'QD',
      administrationTime: 'morning',
      route: drug.route
    };
    setCurrentDrugs([...currentDrugs, newPrescription]);
    setSearchTerm('');
    setIsSearchOpen(false);
  };

  const handleRemoveDrug = (drugId: string) => {
    setCurrentDrugs(currentDrugs.filter(p => p.drug.id !== drugId));
  };

  const handleUpdateDrug = (drugId: string, updates: Partial<PrescribedDrug>) => {
    setCurrentDrugs(currentDrugs.map(p => p.drug.id === drugId ? { ...p, ...updates } : p));
  };

  const handleLoadPreset = (presetName: string) => {
    let targetIds: string[] = [];
    let patientId = 'PAT-7821';

    if (presetName === 'cardiac') {
      targetIds = ['warfarin', 'amiodarone', 'simvastatin', 'omeprazole'];
      patientId = 'PAT-7821';
    } else if (presetName === 'stent') {
      targetIds = ['clopidogrel', 'omeprazole', 'aspirin', 'metoprolol'];
      patientId = 'PAT-4390';
    } else if (presetName === 'neuro') {
      targetIds = ['fluoxetine', 'tramadol', 'ondansetron'];
      patientId = 'PAT-5512';
    } else if (presetName === 'renal') {
      targetIds = ['lithium', 'lisinopril', 'ibuprofen', 'spironolactone'];
      patientId = 'PAT-9034';
    }

    const matchedPatient = PATIENT_PROFILES.find(p => p.id === patientId);
    if (matchedPatient) setCurrentPatient(matchedPatient);

    const newPrescriptions: PrescribedDrug[] = targetIds.map(id => {
      const d = DRUGS_DATABASE.find(item => item.id === id)!;
      return {
        drug: d,
        dose: d.defaultDose,
        frequency: 'QD',
        administrationTime: 'morning',
        route: d.route
      };
    });
    setCurrentDrugs(newPrescriptions);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">
            Multi-Drug Screening &amp; Profiling
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Build prescription lists, set administration timing, and configure patient biological parameters.
          </p>
        </div>

        {/* Demo Preset Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#7C877E] font-medium mr-1">Presets:</span>
          <button
            onClick={() => handleLoadPreset('cardiac')}
            className="px-3 py-1.5 rounded-xl card-warm hover:bg-[#EBF3ED] hover:text-[#264E36] text-xs font-medium text-[#4A554E] transition"
          >
            Cardiac Triplet
          </button>
          <button
            onClick={() => handleLoadPreset('stent')}
            className="px-3 py-1.5 rounded-xl card-warm hover:bg-[#EBF3ED] hover:text-[#264E36] text-xs font-medium text-[#4A554E] transition"
          >
            Post-PCI Stent
          </button>
          <button
            onClick={() => handleLoadPreset('neuro')}
            className="px-3 py-1.5 rounded-xl card-warm hover:bg-[#EBF3ED] hover:text-[#264E36] text-xs font-medium text-[#4A554E] transition"
          >
            Neuro-Pain
          </button>
          <button
            onClick={() => handleLoadPreset('renal')}
            className="px-3 py-1.5 rounded-xl card-warm hover:bg-[#EBF3ED] hover:text-[#264E36] text-xs font-medium text-[#4A554E] transition"
          >
            Renal Lithium
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Drug Search & Regimen List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Box */}
          <div className="relative card-base p-5 rounded-3xl space-y-2">
            <label className="text-xs font-bold text-[#1F2421] block">
              Add Prescription Medication
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#7C877E]" />
              <input
                type="text"
                placeholder="Search medication name, generic, or drug class..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl input-base text-sm text-[#1F2421] placeholder-[#7C877E]"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3.5 top-3.5 text-[#7C877E] hover:text-[#1F2421]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {isSearchOpen && (
              <div className="absolute left-5 right-5 top-full mt-2 z-30 bg-white border border-[#E0DACE] rounded-2xl shadow-lg max-h-64 overflow-y-auto divide-y divide-[#E8E4DA]">
                {filteredDrugs.length > 0 ? (
                  filteredDrugs.slice(0, 8).map((drug) => (
                    <button
                      key={drug.id}
                      onClick={() => handleAddDrug(drug)}
                      className="w-full text-left p-3.5 hover:bg-[#F5F2EA] flex items-center justify-between group transition"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1F2421] text-sm group-hover:text-[#264E36]">
                            {drug.name}
                          </span>
                          <span className="text-[11px] text-[#7C877E] font-mono">
                            ({drug.genericName})
                          </span>
                        </div>
                        <p className="text-xs text-[#69756D] mt-0.5">
                          {drug.drugClass}
                        </p>
                      </div>
                      <div className="p-1.5 rounded-xl bg-[#EBF3ED] text-[#264E36] group-hover:bg-[#264E36] group-hover:text-white transition">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-[#7C877E]">
                    No matching medicines found in database.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Current Regimen List */}
          <div className="card-base p-6 sm:p-7 rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#1F2421] flex items-center gap-2">
                  <span>Current Regimen Under Review</span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#264E36]">
                    {currentDrugs.length} Medicines
                  </span>
                </h3>
                <p className="text-xs text-[#69756D]">Adjust dosage, frequency, and timing per medication</p>
              </div>

              {currentDrugs.length > 0 && (
                <button
                  onClick={() => setCurrentDrugs([])}
                  className="text-xs text-[#B84A3B] hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {currentDrugs.length === 0 ? (
              <div className="p-10 text-center border-2 border-dashed border-[#E8E4DA] rounded-2xl space-y-3">
                <AlertCircle className="w-7 h-7 text-[#7C877E] mx-auto" />
                <p className="text-xs text-[#69756D]">
                  No medications added yet. Search above or load a clinical preset.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentDrugs.map((prescription, idx) => {
                  const { drug } = prescription;
                  return (
                    <div 
                      key={drug.id} 
                      className="card-warm p-4 rounded-2xl space-y-3 border border-[#E8E4DA]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white text-[#264E36] font-mono text-xs font-bold flex items-center justify-center border border-[#E0DACE]">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-[#1F2421] text-sm">{drug.name}</h4>
                              <span className="text-[11px] text-[#7C877E] font-mono">({drug.genericName})</span>
                            </div>
                            <p className="text-[11px] text-[#69756D] mt-0.5">
                              {drug.drugClass}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveDrug(drug.id)}
                          className="p-1.5 rounded-lg text-[#7C877E] hover:text-[#B84A3B] hover:bg-white transition"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dosing Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#E8E4DA] text-xs">
                        <div>
                          <label className="text-[10px] text-[#69756D] block uppercase font-semibold mb-1">
                            Dose
                          </label>
                          <input
                            type="text"
                            value={prescription.dose}
                            onChange={(e) => handleUpdateDrug(drug.id, { dose: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-xl input-base text-[#1F2421] text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-[#69756D] block uppercase font-semibold mb-1">
                            Frequency
                          </label>
                          <select
                            value={prescription.frequency}
                            onChange={(e) => handleUpdateDrug(drug.id, { frequency: e.target.value as any })}
                            className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACE] text-[#1F2421] text-xs"
                          >
                            <option value="QD">QD (Once Daily)</option>
                            <option value="BID">BID (Twice Daily)</option>
                            <option value="TID">TID (Three Times Daily)</option>
                            <option value="PRN">PRN (As Needed)</option>
                            <option value="QHS">QHS (Bedtime)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] text-[#69756D] block uppercase font-semibold mb-1">
                            Timing
                          </label>
                          <select
                            value={prescription.administrationTime}
                            onChange={(e) => handleUpdateDrug(drug.id, { administrationTime: e.target.value as any })}
                            className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACE] text-[#1F2421] text-xs"
                          >
                            <option value="morning">Morning (08:00)</option>
                            <option value="noon">Noon (12:00)</option>
                            <option value="evening">Evening (18:00)</option>
                            <option value="bedtime">Bedtime (22:00)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Patient Profile & Action Button */}
        <div className="space-y-6">
          <div className="card-base p-6 sm:p-7 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#2D5A3F]" />
                <h3 className="text-sm font-bold text-[#1F2421]">Patient Biological Profile</h3>
              </div>
              <span className="text-[10px] text-[#7C877E] font-mono">{currentPatient.id}</span>
            </div>

            {/* Profile Dropdown */}
            <div>
              <label className="text-[10px] uppercase font-bold text-[#69756D] tracking-wider block mb-1">
                Select Synthetic Cohort Profile
              </label>
              <select
                value={currentPatient.id}
                onChange={(e) => {
                  const p = PATIENT_PROFILES.find(item => item.id === e.target.value);
                  if (p) setCurrentPatient(p);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5EE] border border-[#E0DACE] text-[#1F2421] text-xs font-semibold"
              >
                {PATIENT_PROFILES.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.age}y, eGFR {p.egfr} mL/min)
                  </option>
                ))}
              </select>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="card-warm p-3 rounded-2xl">
                <span className="text-[10px] text-[#7C877E] block uppercase font-semibold">Age / Gender</span>
                <span className="font-bold text-[#1F2421]">{currentPatient.age}y • {currentPatient.gender}</span>
              </div>
              <div className="card-warm p-3 rounded-2xl">
                <span className="text-[10px] text-[#7C877E] block uppercase font-semibold">Renal (eGFR)</span>
                <span className="font-mono text-[#264E36] font-bold">{currentPatient.egfr} mL/min</span>
              </div>
              <div className="card-warm p-3 rounded-2xl">
                <span className="text-[10px] text-[#7C877E] block uppercase font-semibold">CYP2C19 Genotype</span>
                <span className="font-mono text-[#C48A45] font-bold uppercase">{currentPatient.cyp2c19Genotype}</span>
              </div>
              <div className="card-warm p-3 rounded-2xl">
                <span className="text-[10px] text-[#7C877E] block uppercase font-semibold">CYP2D6 Genotype</span>
                <span className="font-mono text-[#2D5A3F] font-bold uppercase">{currentPatient.cyp2d6Genotype}</span>
              </div>
            </div>

            {/* Clinical Conditions */}
            <div className="space-y-1.5 text-xs pt-1">
              <span className="text-[10px] text-[#69756D] block uppercase font-semibold">Conditions</span>
              <div className="flex flex-wrap gap-1">
                {currentPatient.conditions.map((c, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full card-warm text-[#2C332E]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="card-accent p-6 rounded-3xl text-center space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A3F] block">
                Inference Ready
              </span>
              <h4 className="text-base font-bold text-[#1F2421] mt-0.5">
                Run PolyGraph GNN Analysis
              </h4>
              <p className="text-xs text-[#525D55] mt-1">
                Evaluates 3+ drug combinations, extracts subgraphs, and computes feature attributions.
              </p>
            </div>

            <button
              onClick={onRunAnalysis}
              disabled={currentDrugs.length < 2 || isAnalyzing}
              className="w-full py-3.5 rounded-2xl bg-[#264E36] hover:bg-[#1D3E2B] disabled:opacity-40 text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing Regimen...' : 'Analyze Multi-Drug Regimen'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {currentDrugs.length < 2 && (
              <p className="text-[11px] text-[#C48A45]">
                Please add at least 2 medications to screen interactions.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Calm Scanning Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2421]/30 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white border border-[#E8E4DA] rounded-3xl p-8 shadow-xl text-center space-y-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF3ED] text-[#264E36] flex items-center justify-center animate-pulse">
              <Cpu className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1F2421]">Executing GNN Inference</h3>
              <p className="text-xs text-[#69756D]">Evaluating multi-drug biological subgraphs...</p>
            </div>

            <div className="space-y-1.5 text-left text-xs card-warm p-3.5 rounded-2xl font-mono text-[#525D55]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#264E36]" />
                <span>GraphSAGE 2-Hop Embedding: OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#264E36]" />
                <span>Combinatorial Hyper-Edges: OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C48A45] animate-ping" />
                <span>Cross-Referencing Literature: Working</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
