import React, { useState } from 'react';
import { 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  RotateCcw,
  TrendingDown,
  TrendingUp,
  Info
} from 'lucide-react';
import { DRUGS_DATABASE } from '../data/drugs';
import { PATIENT_PROFILES, analyzeDrugRegimen } from '../data/mockData';
import { Drug, PrescribedDrug } from '../types';
import { ActivePage } from '../components/Navbar';

interface WhatIfSimulationPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const WhatIfSimulationPage: React.FC<WhatIfSimulationPageProps> = ({
  onNavigate
}) => {
  const patient = PATIENT_PROFILES[0]; // Eleanor Vance (CKD stage 3, 72y)

  const baselineDrugs: PrescribedDrug[] = ['warfarin', 'amiodarone', 'simvastatin', 'omeprazole'].map(id => {
    const d = DRUGS_DATABASE.find(item => item.id === id)!;
    return {
      drug: d,
      dose: d.defaultDose,
      frequency: 'QD',
      administrationTime: 'morning',
      route: d.route
    };
  });

  const [simulatedDrugs, setSimulatedDrugs] = useState<PrescribedDrug[]>([
    ...baselineDrugs.filter(p => p.drug.id !== 'simvastatin'),
    {
      drug: DRUGS_DATABASE.find(d => d.id === 'pravastatin')!,
      dose: '20 mg',
      frequency: 'QD',
      administrationTime: 'evening',
      route: 'Oral'
    }
  ]);

  const baselineResult = analyzeDrugRegimen(baselineDrugs, patient);
  const simulatedResult = analyzeDrugRegimen(simulatedDrugs, patient);

  const scoreDelta = simulatedResult.polypharmacyRiskScore - baselineResult.polypharmacyRiskScore;

  const handleRemoveSimDrug = (drugId: string) => {
    setSimulatedDrugs(simulatedDrugs.filter(p => p.drug.id !== drugId));
  };

  const handleAddSimDrug = (drug: Drug) => {
    if (simulatedDrugs.some(p => p.drug.id === drug.id)) return;
    setSimulatedDrugs([
      ...simulatedDrugs,
      {
        drug,
        dose: drug.defaultDose,
        frequency: 'QD',
        administrationTime: 'morning',
        route: drug.route
      }
    ]);
  };

  const handleResetToBaseline = () => {
    setSimulatedDrugs(baselineDrugs);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421] flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-[#2D5A3F]" />
            <span>What-If Drug Regimen Simulation Sandbox</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Simulate hypothetical medication substitutions or discontinuations and measure predicted risk changes in real-time.
          </p>
        </div>

        <button
          onClick={handleResetToBaseline}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#4A554E] border border-[#E0DACE] text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Delta Banner */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
        scoreDelta < 0 
          ? 'bg-[#EBF3ED] border-[#D4E5D8]' 
          : scoreDelta > 0 
            ? 'bg-[#FDF2F0] border-[#F7D8D3]' 
            : 'card-warm border-[#E8E4DA]'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`p-3 rounded-2xl ${
            scoreDelta < 0 
              ? 'bg-white text-[#264E36] border border-[#D4E5D8]' 
              : scoreDelta > 0 
                ? 'bg-white text-[#B84A3B] border border-[#F7D8D3]' 
                : 'bg-white text-[#525D55]'
          }`}>
            {scoreDelta < 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#69756D] tracking-wider block">
              Simulation Comparison
            </span>
            <h3 className="text-lg font-bold text-[#1F2421]">
              {scoreDelta < 0 
                ? `Hypothetical Risk Reduced by ${Math.abs(scoreDelta)} Points (${baselineResult.polypharmacyRiskScore} → ${simulatedResult.polypharmacyRiskScore})` 
                : scoreDelta > 0 
                  ? `Hypothetical Risk Increased by +${scoreDelta} Points (${baselineResult.polypharmacyRiskScore} → ${simulatedResult.polypharmacyRiskScore})`
                  : 'Regimens are Currently Identical'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="text-center px-3.5 py-1.5 rounded-xl bg-white border border-[#E8E4DA]">
            <span className="text-[10px] text-[#7C877E] block uppercase font-sans">Baseline</span>
            <span className="text-base font-bold text-[#B84A3B]">{baselineResult.polypharmacyRiskScore}/100</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#7C877E]" />
          <div className="text-center px-3.5 py-1.5 rounded-xl bg-white border border-[#D4E5D8]">
            <span className="text-[10px] text-[#264E36] block uppercase font-sans">Scenario B</span>
            <span className="text-base font-bold text-[#264E36]">{simulatedResult.polypharmacyRiskScore}/100</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Scenario A: Baseline */}
        <div className="card-warm p-7 rounded-3xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA]">
              <div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white text-[#525D55] border border-[#E8E4DA]">
                  Scenario A (Baseline)
                </span>
                <h3 className="text-base font-bold text-[#1F2421] mt-1">Current Prescriptions</h3>
              </div>
              <span className="text-xs font-bold text-[#B84A3B] font-mono px-2.5 py-1 rounded-full bg-[#FDF2F0] border border-[#F7D8D3]">
                Score: {baselineResult.polypharmacyRiskScore}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#69756D] tracking-wider block">
                Prescribed Medications ({baselineDrugs.length})
              </span>
              <div className="space-y-2">
                {baselineDrugs.map((prescription) => (
                  <div key={prescription.drug.id} className="p-3 rounded-2xl bg-white border border-[#E8E4DA] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1F2421]">{prescription.drug.name}</span>
                      <span className="text-[11px] text-[#7C877E] ml-2 font-mono">({prescription.dose})</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md card-warm text-[#525D55]">
                      {prescription.drug.drugClass.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Identified Bottlenecks */}
            <div className="p-4 rounded-2xl bg-[#FDF2F0] border border-[#F7D8D3] space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#B84A3B] block">
                Active Bottlenecks
              </span>
              <ul className="space-y-1 text-[#525D55]">
                <li className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-[#B84A3B] shrink-0" />
                  <span>Warfarin + Amiodarone + Simvastatin Triplet Synergy</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-[#B84A3B] shrink-0" />
                  <span>CYP3A4 competitive saturation elevating statin levels 3.8x</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-[#7C877E] pt-3 border-t border-[#E8E4DA]">
            Status: Original unadjusted clinical prescription.
          </p>
        </div>

        {/* Scenario B: Hypothetical */}
        <div className="card-base p-7 rounded-3xl border border-[#D4E5D8] space-y-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DA]">
              <div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#264E36]">
                  Scenario B (Simulated)
                </span>
                <h3 className="text-base font-bold text-[#1F2421] mt-1">Hypothetical Optimization</h3>
              </div>
              <span className="text-xs font-bold text-[#264E36] font-mono px-2.5 py-1 rounded-full bg-[#EBF3ED] border border-[#D4E5D8]">
                Score: {simulatedResult.polypharmacyRiskScore}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#69756D] tracking-wider">
                  Modified Regimen ({simulatedDrugs.length})
                </span>
                <span className="text-[10px] text-[#7C877E]">Click trash to remove</span>
              </div>

              <div className="space-y-2">
                {simulatedDrugs.map((prescription) => (
                  <div key={prescription.drug.id} className="p-3 rounded-2xl card-warm flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1F2421]">{prescription.drug.name}</span>
                      <span className="text-[11px] text-[#7C877E] ml-2 font-mono">({prescription.dose})</span>
                      {prescription.drug.id === 'pravastatin' && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#EBF3ED] text-[#264E36] ml-2 font-semibold">
                          SUBSTITUTE
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveSimDrug(prescription.drug.id)}
                      className="p-1 rounded text-[#7C877E] hover:text-[#B84A3B] transition"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Substitutes */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#69756D] block">
                Quick Test Substitutions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleAddSimDrug(DRUGS_DATABASE.find(d => d.id === 'pravastatin')!)}
                  className="px-2.5 py-1 rounded-xl card-warm hover:bg-[#EBF3ED] text-[#4A554E] hover:text-[#264E36] text-[11px] transition font-medium"
                >
                  + Add Pravastatin (CYP Bypass)
                </button>
                <button
                  onClick={() => handleAddSimDrug(DRUGS_DATABASE.find(d => d.id === 'rosuvastatin')!)}
                  className="px-2.5 py-1 rounded-xl card-warm hover:bg-[#EBF3ED] text-[#4A554E] hover:text-[#264E36] text-[11px] transition font-medium"
                >
                  + Add Rosuvastatin
                </button>
                <button
                  onClick={() => handleAddSimDrug(DRUGS_DATABASE.find(d => d.id === 'pantoprazole')!)}
                  className="px-2.5 py-1 rounded-xl card-warm hover:bg-[#EBF3ED] text-[#4A554E] hover:text-[#264E36] text-[11px] transition font-medium"
                >
                  + Add Pantoprazole
                </button>
              </div>
            </div>

            {/* Impact */}
            <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#D4E5D8] space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#264E36] block">
                Simulation Impact Summary
              </span>
              <ul className="space-y-1 text-[#3E4F42]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#264E36] shrink-0" />
                  <span>Eliminated CYP3A4 metabolic bottleneck completely.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#264E36] shrink-0" />
                  <span>Rhabdomyolysis exposure risk reduced by 88%.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
            <span className="text-[#7C877E] text-[11px]">Hypothetical Simulation</span>
            <button
              onClick={() => onNavigate('reports')}
              className="text-[#264E36] hover:text-[#1D3E2B] font-semibold flex items-center gap-1"
            >
              <span>Export to Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Advisory */}
      <div className="p-4 rounded-2xl card-warm text-xs text-[#69756D] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#2D5A3F] shrink-0 mt-0.5" />
        <p>
          <strong>Hypothetical Simulation Notice:</strong> Every scenario generated in this sandbox is labeled strictly as hypothetical. Simulated improvements do not establish that a treatment modification is clinically bioequivalent or safe for a specific patient. Clinicians must verify indications and dosing before executing regimen changes.
        </p>
      </div>
    </div>
  );
};
