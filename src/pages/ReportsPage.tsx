import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  User, 
  Clock, 
  Check, 
  Info
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { PATIENT_PROFILES, analyzeDrugRegimen } from '../data/mockData';
import { DRUGS_DATABASE } from '../data/drugs';
import confetti from 'canvas-confetti';

interface ReportsPageProps {
  currentAnalysis: AnalysisResult | null;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({
  currentAnalysis
}) => {
  const defaultAnalysis = React.useMemo(() => {
    if (currentAnalysis) return currentAnalysis;
    const defaultDrugs = ['warfarin', 'amiodarone', 'simvastatin', 'omeprazole'].map(id => {
      const d = DRUGS_DATABASE.find(item => item.id === id)!;
      return {
        drug: d,
        dose: d.defaultDose,
        frequency: 'QD' as const,
        administrationTime: 'morning' as const,
        route: d.route
      };
    });
    return analyzeDrugRegimen(defaultDrugs, PATIENT_PROFILES[0]);
  }, [currentAnalysis]);

  const [analysis] = useState<AnalysisResult>(defaultAnalysis);
  const [clinicianName, setClinicianName] = useState('Dr. Marcus Sterling, MD');
  const [clinicianNotes, setClinicianNotes] = useState(
    'Agreed with higher-order GNN recommendation: Discontinue Simvastatin and initiate Pravastatin 20 mg PO QHS to bypass CYP3A4 pathway. Ordered baseline INR within 72 hours and repeat comprehensive metabolic panel in 2 weeks.'
  );
  const [isSigned, setIsSigned] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSignReport = () => {
    setIsSigned(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421] flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#2D5A3F]" />
            <span>Clinical Decision Support (CDS) Report</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Exportable evidence report for clinician review and EHR documentation.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Report Sheet */}
      <div className="card-base bg-white p-7 sm:p-10 rounded-3xl space-y-8 shadow-sm print:border-none print:p-0 print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#1F2421]">
                PolyGraph<span className="text-[#2D5A3F] font-normal">-Med</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF3ED] text-[#264E36] font-mono">
                CDS Summary Report
              </span>
            </div>
            <p className="text-xs text-[#69756D] mt-1">
              Medication Safety &amp; Polypharmacy Intelligence Platform
            </p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-0.5 font-mono text-[#69756D]">
            <div>Report ID: <strong className="text-[#1F2421]">{analysis.id}</strong></div>
            <div>Date: {new Date(analysis.timestamp).toLocaleDateString()} {new Date(analysis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>Model: <span className="text-[#2D5A3F] font-semibold">GraphSAGE-Hyper v2.4</span></div>
          </div>
        </div>

        {/* 1. Patient Parameters */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-wider text-[#2D5A3F] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>1. Patient Profile (Synthetic Data)</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs card-warm p-4 rounded-2xl">
            <div>
              <span className="text-[#7C877E] block text-[10px] uppercase font-semibold">Name</span>
              <strong className="text-[#1F2421]">{analysis.patient.name}</strong>
            </div>
            <div>
              <span className="text-[#7C877E] block text-[10px] uppercase font-semibold">Demographics</span>
              <strong className="text-[#1F2421]">{analysis.patient.age}y • {analysis.patient.gender}</strong>
            </div>
            <div>
              <span className="text-[#7C877E] block text-[10px] uppercase font-semibold">Renal (eGFR)</span>
              <strong className="text-[#264E36] font-mono">{analysis.patient.egfr} mL/min/1.73m²</strong>
            </div>
            <div>
              <span className="text-[#7C877E] block text-[10px] uppercase font-semibold">Genotype</span>
              <strong className="text-[#C48A45] font-mono">CYP2C19 {analysis.patient.cyp2c19Genotype}</strong>
            </div>
            <div className="col-span-2 pt-2 border-t border-[#E8E4DA]">
              <span className="text-[#7C877E] block text-[10px] uppercase font-semibold">Conditions</span>
              <span className="text-[#2C332E]">{analysis.patient.conditions.join(', ')}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-[#E8E4DA]">
              <span className="text-[#7C877E] block text-[10px] uppercase font-semibold">Known Allergies</span>
              <span className="text-[#B84A3B]">{analysis.patient.allergies.join(', ') || 'None Documented'}</span>
            </div>
          </div>
        </div>

        {/* 2. Regimen Table */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-wider text-[#2D5A3F]">
            2. Prescribed Medications ({analysis.drugs.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E8E4DA] rounded-2xl overflow-hidden">
              <thead className="bg-[#F7F5EE] uppercase text-[10px] text-[#69756D]">
                <tr>
                  <th className="py-2.5 px-3">Medication</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Dose &amp; Frequency</th>
                  <th className="py-2.5 px-3">Timing</th>
                  <th className="py-2.5 px-3">Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DA] font-mono text-[11px]">
                {analysis.drugs.map((p, i) => (
                  <tr key={i} className="hover:bg-[#FBF9F5]">
                    <td className="py-2.5 px-3 font-sans font-bold text-[#1F2421]">{p.drug.name}</td>
                    <td className="py-2.5 px-3 font-sans text-[#525D55]">{p.drug.drugClass}</td>
                    <td className="py-2.5 px-3 text-[#264E36]">{p.dose} {p.frequency}</td>
                    <td className="py-2.5 px-3 capitalize font-sans text-[#69756D]">{p.administrationTime}</td>
                    <td className="py-2.5 px-3 text-[#69756D]">
                      {p.drug.enzymes.substrate.length > 0 ? p.drug.enzymes.substrate.join(', ') : 'Renal/Direct'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Risk Summary */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-wider text-[#2D5A3F]">
            3. Risk Stratification Overview
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="card-warm p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#7C877E] uppercase font-bold block">Polypharmacy Score</span>
              <span className="text-2xl font-bold text-[#1F2421] font-mono mt-0.5 block">
                {analysis.polypharmacyRiskScore}<span className="text-xs font-normal text-[#7C877E]">/100</span>
              </span>
            </div>
            <div className="card-warm p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#7C877E] uppercase font-bold block">3+ Signals</span>
              <span className="text-2xl font-bold text-[#2D5A3F] font-mono mt-0.5 block">
                {analysis.predictedHigherOrderCount}
              </span>
            </div>
            <div className="card-warm p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#7C877E] uppercase font-bold block">Documented Alerts</span>
              <span className="text-2xl font-bold text-[#C48A45] font-mono mt-0.5 block">
                {analysis.documentedCount}
              </span>
            </div>
            <div className="card-warm p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#7C877E] uppercase font-bold block">Pathway Overlaps</span>
              <span className="text-2xl font-bold text-[#1F2421] font-mono mt-0.5 block">
                {analysis.pathwayOverlapsCount}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Higher-Order Interaction Findings */}
        {analysis.higherOrderInteractions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-wider text-[#2D5A3F]">
              4. Higher-Order Biological Interaction Signals
            </h2>

            <div className="space-y-3">
              {analysis.higherOrderInteractions.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl card-warm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-[#1F2421] font-bold">
                      {alert.drugNames.join(' + ')}
                    </strong>
                    <span className="text-[10px] font-semibold text-[#B84A3B] uppercase px-2 py-0.5 rounded-full bg-[#FDF2F0] border border-[#F7D8D3]">
                      {alert.severity} Severity
                    </span>
                  </div>

                  <p className="text-[#525D55] leading-relaxed">
                    <strong>Mechanism:</strong> {alert.mechanism}
                  </p>

                  <div className="p-3 rounded-xl bg-[#EBF3ED] text-[#264E36] font-medium leading-relaxed">
                    <strong>Clinical Recommendation:</strong> {alert.managementRecommendation}
                  </div>

                  {alert.citations.length > 0 && (
                    <p className="text-[11px] text-[#7C877E] font-mono pt-1">
                      Evidence Reference: {alert.citations[0].title} ({alert.citations[0].journal}) • PMID: {alert.citations[0].pmid}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Attestation & Sign-off */}
        <div className="pt-4 border-t border-[#E8E4DA] space-y-4">
          <h2 className="text-xs uppercase font-bold tracking-wider text-[#2D5A3F]">
            5. Licensed Clinician Attestation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#69756D] block mb-1">
                Reviewing Clinician Name
              </label>
              <input
                type="text"
                value={clinicianName}
                onChange={(e) => setClinicianName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl input-base text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#69756D] block mb-1">
                Status
              </label>
              <div className="flex items-center h-9">
                {isSigned ? (
                  <span className="px-3 py-1.5 rounded-full bg-[#EBF3ED] text-[#264E36] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Clinically Approved &amp; Signed</span>
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-[#FDF7EE] text-[#C48A45] font-semibold flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Pending Final Review</span>
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-[10px] uppercase font-bold text-[#69756D] block mb-1">
                Clinician Pharmacotherapy Notes &amp; Action Plan
              </label>
              <textarea
                rows={2}
                value={clinicianNotes}
                onChange={(e) => setClinicianNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl input-base text-xs leading-relaxed"
              />
            </div>
          </div>

          <div className="no-print pt-2 flex items-center justify-between">
            <span className="text-[11px] text-[#7C877E]">
              Electronic Attestation: <strong className="text-[#1F2421]">{isSigned ? 'Digitally Signed' : 'Pending Signature'}</strong>
            </span>
            {!isSigned ? (
              <button
                onClick={handleSignReport}
                className="px-5 py-2.5 rounded-2xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition"
              >
                <Check className="w-4 h-4" />
                <span>Sign CDS Report</span>
              </button>
            ) : (
              <span className="text-xs text-[#264E36] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Signed electronically</span>
              </span>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-3 border-t border-[#E8E4DA] text-[10px] text-[#7C877E]">
          <p>
            Regulatory Note: This document is an investigational Clinical Decision Support output. It is not an autonomous prescription. The treating clinician maintains sole clinical responsibility for patient care.
          </p>
        </div>
      </div>
    </div>
  );
};
