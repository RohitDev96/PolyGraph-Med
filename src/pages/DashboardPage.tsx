import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Users, 
  Cpu, 
  ArrowUpRight, 
  ChevronRight, 
  Zap, 
  Search
} from 'lucide-react';
import { PATIENT_PROFILES } from '../data/mockData';
import { DRUGS_DATABASE } from '../data/drugs';
import { PatientProfile } from '../types';
import { ActivePage } from '../components/Navbar';

interface DashboardPageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectPatient: (patient: PatientProfile) => void;
  onOpenQuickScreen: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectPatient,
  onOpenQuickScreen
}) => {
  const stats = [
    { title: 'Total Screenings', value: '1,842', note: '+14% this month', icon: Activity, color: 'text-[#2D5A3F]', bg: 'bg-[#EBF3ED]' },
    { title: 'Documented Alerts', value: '14', note: 'Pairwise warnings', icon: AlertTriangle, color: 'text-[#C48A45]', bg: 'bg-[#FDF7EE]' },
    { title: 'Predicted 3+ Signals', value: '38', note: 'Higher-order synergies', icon: Cpu, color: 'text-[#5F7161]', bg: 'bg-[#F3F5F3]' },
    { title: 'Monitored Patients', value: '128', note: 'Active cohort', icon: Users, color: 'text-[#264E36]', bg: 'bg-[#EBF3ED]' }
  ];

  const cypBottlenecks = [
    { name: 'CYP3A4 Substrate Competition', percentage: 74, count: '89 regimens', color: 'bg-[#2D5A3F]' },
    { name: 'CYP2C9 Inactivation (Warfarin / NSAIDs)', percentage: 58, count: '64 regimens', color: 'bg-[#5F7161]' },
    { name: 'CYP2C19 Prodrug Bioactivation', percentage: 42, count: '48 regimens', color: 'bg-[#7E9F85]' },
    { name: 'CYP2D6 Opioid / Serotonin Saturation', percentage: 36, count: '39 regimens', color: 'bg-[#C48A45]' },
    { name: 'P-gp (ABCB1) Renal / Biliary Efflux', percentage: 51, count: '55 regimens', color: 'bg-[#3B7054]' }
  ];

  const patientRegimens: Record<string, string[]> = {
    'PAT-7821': ['warfarin', 'amiodarone', 'simvastatin', 'omeprazole'],
    'PAT-4390': ['clopidogrel', 'omeprazole', 'aspirin', 'metoprolol'],
    'PAT-5512': ['fluoxetine', 'tramadol', 'ondansetron'],
    'PAT-9034': ['lithium', 'lisinopril', 'ibuprofen', 'spironolactone']
  };

  const patientScores: Record<string, { score: number; level: string; color: string }> = {
    'PAT-7821': { score: 84, level: 'High Risk', color: 'text-[#B84A3B] bg-[#FDF2F0] border-[#F7D8D3]' },
    'PAT-4390': { score: 72, level: 'Moderate Risk', color: 'text-[#C48A45] bg-[#FDF7EE] border-[#F8E5CA]' },
    'PAT-5512': { score: 78, level: 'Moderate Risk', color: 'text-[#C48A45] bg-[#FDF7EE] border-[#F8E5CA]' },
    'PAT-9034': { score: 92, level: 'High Risk', color: 'text-[#B84A3B] bg-[#FDF2F0] border-[#F7D8D3]' }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421]">
            Clinical Decision Support Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Real-time polypharmacy surveillance and higher-order interaction analysis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenQuickScreen}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F2EA] text-[#2D5A3F] border border-[#E0DACE] text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-[#C48A45]" />
            <span>Quick Screen</span>
          </button>
          <button
            onClick={() => onNavigate('analysis')}
            className="px-4 py-2 rounded-xl bg-[#264E36] hover:bg-[#1D3E2B] text-white font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>New Regimen</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="card-base p-6 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#69756D]">{s.title}</span>
                <div className={`p-2 rounded-xl ${s.bg}`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
              <div>
                <span className="text-3xl font-bold text-[#1F2421] font-mono">{s.value}</span>
                <span className="block text-[11px] text-[#7C877E] mt-0.5">{s.note}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metabolic Saturation */}
        <div className="lg:col-span-2 card-base p-7 rounded-3xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1F2421]">Metabolic Pathway Saturation Index</h3>
              <p className="text-xs text-[#69756D]">Enzyme competition frequency across active polypharmacy regimens</p>
            </div>
            <button 
              onClick={() => onNavigate('graph')}
              className="text-xs text-[#264E36] hover:text-[#1D3E2B] font-semibold flex items-center gap-1"
            >
              <span>View Graph</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {cypBottlenecks.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#2C332E] font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#7C877E] text-[11px] font-mono">{item.count}</span>
                    <span className="text-[#1F2421] font-bold font-mono">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EAE6DC] overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Higher-Order Spotlight */}
        <div className="card-warm p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDF2F0] text-[#B84A3B] border border-[#F7D8D3] inline-block">
              Active Triplet Alert
            </span>

            <h4 className="text-base font-bold text-[#1F2421]">
              Warfarin + Amiodarone + Simvastatin
            </h4>

            <p className="text-xs text-[#525D55] leading-relaxed">
              Dual CYP3A4/CYP2C9 saturation elevates active simvastatin by 3.8x and prolongs warfarin clearance.
            </p>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E8E4DA] text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#2D5A3F] block">Management Option</span>
              <p className="text-[#2C332E]">
                Replace Simvastatin with Pravastatin; reduce Warfarin maintenance dose by 33%.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
            <button
              onClick={() => onNavigate('alternatives')}
              className="text-[#264E36] hover:text-[#1D3E2B] font-semibold"
            >
              Explore Alternatives →
            </button>
            <button
              onClick={() => onNavigate('research')}
              className="text-[#69756D] hover:text-[#1F2421]"
            >
              PubMed Citations
            </button>
          </div>
        </div>
      </div>

      {/* Patient Cohort Table */}
      <div className="card-base rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-[#E8E4DA] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1F2421]">Synthetic Patient Cohort</h3>
            <p className="text-xs text-[#69756D]">Select a profile to load its full laboratory and medication data</p>
          </div>
          <span className="text-xs text-[#7C877E] font-mono">
            {PATIENT_PROFILES.length} Profiles Available
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E4DA] bg-[#F7F5EE] text-[#69756D] font-semibold uppercase text-[10px]">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Demographics</th>
                <th className="py-3 px-4">Renal Status</th>
                <th className="py-3 px-4">Current Regimen</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4DA]">
              {PATIENT_PROFILES.map((patient) => {
                const drugs = (patientRegimens[patient.id] || []).map(id => DRUGS_DATABASE.find(d => d.id === id)?.name || id);
                const scoreInfo = patientScores[patient.id] || { score: 65, level: 'Moderate', color: 'text-[#C48A45]' };

                return (
                  <tr key={patient.id} className="hover:bg-[#FBF9F5] transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#1F2421] text-sm">{patient.name}</div>
                      <div className="text-[11px] text-[#7C877E] font-mono">{patient.id}</div>
                    </td>
                    <td className="py-4 px-4 text-[#525D55]">
                      <div>{patient.age}y • {patient.gender === 'female' ? 'Female' : 'Male'}</div>
                      <div className="text-[10px] text-[#7C877E] truncate max-w-[140px]">
                        {patient.conditions[0]}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-mono text-[#2D5A3F] font-semibold">
                        {patient.egfr} mL/min
                      </div>
                      <div className="text-[10px] text-[#7C877E] capitalize">
                        {patient.renalStatus.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {drugs.map((d, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md card-warm text-[#2C332E] text-[10px] font-mono">
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${scoreInfo.color}`}>
                        {scoreInfo.level} ({scoreInfo.score})
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => {
                          onSelectPatient(patient);
                          onNavigate('analysis');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#EBF3ED] hover:bg-[#DCEADB] text-[#264E36] text-xs font-semibold transition inline-flex items-center gap-1"
                      >
                        <span>Analyze</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
