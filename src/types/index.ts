export type NodeEntityType = 'drug' | 'protein' | 'enzyme' | 'pathway' | 'adverse_event';

export type EdgeRelationType = 
  | 'inhibits' 
  | 'activates' 
  | 'metabolized_by' 
  | 'substrate_of' 
  | 'participates_in' 
  | 'associated_with' 
  | 'transports';

export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  atcCode: string;
  description: string;
  indication: string;
  targets: string[];
  enzymes: {
    substrate: string[];
    inhibitor: string[];
    inducer: string[];
  };
  transporters: string[];
  renalEliminationRatio: number; // e.g. 0.8 = 80% renal
  defaultDose: string;
  route: string;
  halfLife: string;
}

export interface PrescribedDrug {
  drug: Drug;
  dose: string;
  frequency: 'QD' | 'BID' | 'TID' | 'QID' | 'PRN' | 'QHS';
  administrationTime: 'morning' | 'noon' | 'evening' | 'bedtime';
  route: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // kg
  height: number; // cm
  egfr: number; // mL/min/1.73m2
  renalStatus: 'normal' | 'mild_ckd' | 'moderate_ckd' | 'severe_ckd' | 'esrd';
  liverStatus: 'normal' | 'child_pugh_a' | 'child_pugh_b' | 'child_pugh_c';
  allergies: string[];
  conditions: string[];
  cyp2d6Genotype: 'normal' | 'poor' | 'intermediate' | 'ultrarapid';
  cyp2c19Genotype: 'normal' | 'poor' | 'intermediate' | 'rapid';
  pregnant: boolean;
  smoker: boolean;
}

export interface PubMedCitation {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doiUrl: string;
  studyType: 'Meta-Analysis' | 'Randomized Controlled Trial' | 'Prospective Cohort' | 'Pharmacokinetic Study';
  keyFinding: string;
  evidenceStrength: 'High' | 'Moderate' | 'Exploratory';
}

export interface InteractionAlert {
  id: string;
  drugIds: string[];
  drugNames: string[];
  type: 'pairwise_documented' | 'higher_order_predicted' | 'contraindication';
  severity: 'critical' | 'major' | 'moderate' | 'minor';
  evidenceLevel: 'Level A (Documented Clinical RCT)' | 'Level B (Well-Documented Cohort)' | 'Level C (In-Vitro / Indirect)' | 'GNN Higher-Order Signal (3+ Drugs)';
  mechanism: string;
  biologicalPathway: string;
  affectedEnzymes: string[];
  clinicalConsequence: string;
  managementRecommendation: string;
  gnnConfidence: number; // 0 to 1 (e.g. 0.94)
  higherOrderSynergy: boolean; // Triplet / Quadruplet non-linear effect
  graphPathDescription: string;
  citations: PubMedCitation[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: NodeEntityType;
  group?: string;
  val?: number; // size
  details?: {
    description?: string;
    uniprotId?: string;
    keggId?: string;
    pubchemCid?: string;
    clinicalRole?: string;
    riskCategory?: string;
    associatedDrugs?: string[];
  };
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  relation: EdgeRelationType;
  confidence?: number;
  attentionWeight?: number; // GraphSAGE XAI Attention 0-1
  evidence?: string;
}

export interface ModelAttribution {
  feature: string;
  type: 'enzyme_overlap' | 'target_competition' | 'clearance_bottleneck' | 'patient_modifier';
  importance: number; // 0-1
  impact: 'amplifying' | 'buffering';
  description: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  drugs: PrescribedDrug[];
  patient: PatientProfile;
  polypharmacyRiskScore: number; // 0 - 100
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Critical';
  documentedCount: number;
  predictedHigherOrderCount: number;
  pathwayOverlapsCount: number;
  higherOrderInteractions: InteractionAlert[];
  documentedInteractions: InteractionAlert[];
  patientSpecificRisks: {
    factor: string;
    impact: 'amplifies' | 'moderate' | 'contraindicated';
    explanation: string;
    recommendation: string;
  }[];
  subgraph: {
    nodes: KnowledgeGraphNode[];
    edges: KnowledgeGraphEdge[];
  };
  modelAttributions: ModelAttribution[];
  clinicianReviewRequired: boolean;
  reviewedByClinician?: boolean;
  clinicianNotes?: string;
}

export interface AlternativeCandidate {
  id: string;
  originalDrug: string;
  candidateDrug: string;
  candidateGeneric: string;
  therapeuticClass: string;
  rationale: string;
  metabolicAdvantage: string;
  predictedRiskScoreDelta: number; // e.g. -46 (drops from 82 to 36)
  compatibilityScore: number; // e.g. 96%
  remainingDrugInteractions: {
    drug: string;
    risk: 'none' | 'minor' | 'moderate';
    detail: string;
  }[];
  renalDoseAdjustmentNeeded: boolean;
  supportingCitations: PubMedCitation[];
}

export interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  isBaseline?: boolean;
  drugs: PrescribedDrug[];
  riskScore: number;
  alertsCount: number;
  cypBottlenecks: string[];
  eliminatedRisks: string[];
  newRisksIntroduced: string[];
}

