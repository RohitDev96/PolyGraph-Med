import React, { useState } from 'react';
import { Navbar, ActivePage } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ResultsPage } from './pages/ResultsPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { ResearchAgentPage } from './pages/ResearchAgentPage';
import { AlternativeResearchPage } from './pages/AlternativeResearchPage';
import { WhatIfSimulationPage } from './pages/WhatIfSimulationPage';
import { ReportsPage } from './pages/ReportsPage';
import { QuickScreenModal } from './components/QuickScreenModal';
import { DRUGS_DATABASE } from './data/drugs';
import { PATIENT_PROFILES, analyzeDrugRegimen } from './data/mockData';
import { PrescribedDrug, PatientProfile, AnalysisResult, Drug, AlternativeCandidate } from './types';
import confetti from 'canvas-confetti';

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [quickScreenOpen, setQuickScreenOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize with the landmark Cardiac Triplet preset for instant demo readiness
  const initialDrugs: PrescribedDrug[] = [
    {
      drug: DRUGS_DATABASE.find(d => d.id === 'warfarin')!,
      dose: '5 mg',
      frequency: 'QD',
      administrationTime: 'evening',
      route: 'Oral'
    },
    {
      drug: DRUGS_DATABASE.find(d => d.id === 'amiodarone')!,
      dose: '200 mg',
      frequency: 'QD',
      administrationTime: 'morning',
      route: 'Oral'
    },
    {
      drug: DRUGS_DATABASE.find(d => d.id === 'simvastatin')!,
      dose: '20 mg',
      frequency: 'QD',
      administrationTime: 'bedtime',
      route: 'Oral'
    },
    {
      drug: DRUGS_DATABASE.find(d => d.id === 'omeprazole')!,
      dose: '20 mg',
      frequency: 'QD',
      administrationTime: 'morning',
      route: 'Oral'
    }
  ];

  const [currentDrugs, setCurrentDrugs] = useState<PrescribedDrug[]>(initialDrugs);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile>(PATIENT_PROFILES[0]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(() => {
    return analyzeDrugRegimen(initialDrugs, PATIENT_PROFILES[0]);
  });

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeDrugRegimen(currentDrugs, currentPatient);
      setCurrentAnalysis(result);
      setIsAnalyzing(false);
      setActivePage('results');

      if (result.polypharmacyRiskScore >= 70) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 1400);
  };

  const handleRunAnalysisWithDrugs = (selectedDrugs: Drug[]) => {
    const newPrescribed: PrescribedDrug[] = selectedDrugs.map(drug => ({
      drug,
      dose: drug.defaultDose,
      frequency: 'QD',
      administrationTime: 'morning',
      route: drug.route
    }));
    setCurrentDrugs(newPrescribed);
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeDrugRegimen(newPrescribed, currentPatient);
      setCurrentAnalysis(result);
      setIsAnalyzing(false);
      setActivePage('results');
    }, 1200);
  };

  const handleSelectPatient = (patient: PatientProfile) => {
    setCurrentPatient(patient);
  };

  const handleExploreAlternative = (_drugName: string) => {
    setActivePage('alternatives');
  };

  const handleApplyCandidateToSimulation = (_alt: AlternativeCandidate) => {
    setActivePage('simulation');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1F2421] flex flex-col font-sans selection:bg-[#2D5A3F]/15 selection:text-[#264E36]">
      {/* Top Glassmorphic Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenQuickScreen={() => setQuickScreenOpen(true)}
        hasActiveResults={Boolean(currentAnalysis)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'landing' && (
          <LandingPage
            onNavigate={setActivePage}
            onOpenQuickScreen={() => setQuickScreenOpen(true)}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            onNavigate={setActivePage}
            onSelectPatient={handleSelectPatient}
            onOpenQuickScreen={() => setQuickScreenOpen(true)}
          />
        )}

        {activePage === 'analysis' && (
          <AnalysisPage
            currentDrugs={currentDrugs}
            setCurrentDrugs={setCurrentDrugs}
            currentPatient={currentPatient}
            setCurrentPatient={setCurrentPatient}
            onRunAnalysis={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
          />
        )}

        {activePage === 'results' && (
          <ResultsPage
            analysis={currentAnalysis}
            onNavigate={setActivePage}
            onExploreAlternative={handleExploreAlternative}
          />
        )}

        {activePage === 'graph' && (
          <KnowledgeGraphPage />
        )}

        {activePage === 'research' && (
          <ResearchAgentPage />
        )}

        {activePage === 'alternatives' && (
          <AlternativeResearchPage
            onNavigate={setActivePage}
            onApplyCandidateToSimulation={handleApplyCandidateToSimulation}
          />
        )}

        {activePage === 'simulation' && (
          <WhatIfSimulationPage
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'reports' && (
          <ReportsPage
            currentAnalysis={currentAnalysis}
          />
        )}
      </main>

      {/* Global Quick Screen Modal */}
      <QuickScreenModal
        isOpen={quickScreenOpen}
        onClose={() => setQuickScreenOpen(false)}
        onRunAnalysisWithDrugs={handleRunAnalysisWithDrugs}
      />
    </div>
  );
}

export default App;

