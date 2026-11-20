import { KnowledgeGraphNode, KnowledgeGraphEdge } from '../types';

export const GLOBAL_KNOWLEDGE_GRAPH_NODES: KnowledgeGraphNode[] = [
  // Drugs
  { id: 'warfarin', label: 'Warfarin', type: 'drug', group: 'Anticoagulant', details: { pubchemCid: '54678486', clinicalRole: 'Vitamin K antagonist', riskCategory: 'High Alert Medication' } },
  { id: 'amiodarone', label: 'Amiodarone', type: 'drug', group: 'Antiarrhythmic', details: { pubchemCid: '2157', clinicalRole: 'Broad spectrum antiarrhythmic & pan-CYP inhibitor', riskCategory: 'Critical Interaction Inducer' } },
  { id: 'simvastatin', label: 'Simvastatin', type: 'drug', group: 'Statin', details: { pubchemCid: '54454', clinicalRole: 'Lipid lowering HMGCR inhibitor', riskCategory: 'CYP3A4 High Sensitivity' } },
  { id: 'clopidogrel', label: 'Clopidogrel', type: 'drug', group: 'Antiplatelet', details: { pubchemCid: '60606', clinicalRole: 'P2Y12 platelet inhibitor prodrug', riskCategory: 'CYP2C19 Dependent' } },
  { id: 'omeprazole', label: 'Omeprazole', type: 'drug', group: 'PPI', details: { pubchemCid: '4594', clinicalRole: 'H+/K+ ATPase inhibitor', riskCategory: 'CYP2C19 Competitive Inhibitor' } },
  { id: 'aspirin', label: 'Aspirin', type: 'drug', group: 'NSAID / Antiplatelet', details: { pubchemCid: '2244', clinicalRole: 'COX-1 inhibitor', riskCategory: 'Bleeding Risk Multiplier' } },
  { id: 'fluoxetine', label: 'Fluoxetine', type: 'drug', group: 'SSRI Antidepressant', details: { pubchemCid: '3386', clinicalRole: 'Serotonin reuptake inhibitor & potent CYP2D6 inhibitor', riskCategory: 'Serotonin Syndrome Signal' } },
  { id: 'tramadol', label: 'Tramadol', type: 'drug', group: 'Opioid / SNRI', details: { pubchemCid: '33741', clinicalRole: 'Mu-agonist & serotonin reuptake inhibitor', riskCategory: 'CYP2D6 Bioactivation Dependent' } },
  { id: 'digoxin', label: 'Digoxin', type: 'drug', group: 'Cardiac Glycoside', details: { pubchemCid: '2724385', clinicalRole: 'Na+/K+ ATPase pump blocker', riskCategory: 'Narrow Therapeutic Window' } },
  { id: 'clarithromycin', label: 'Clarithromycin', type: 'drug', group: 'Macrolide Antibiotic', details: { pubchemCid: '84029', clinicalRole: 'Potent CYP3A4 & P-gp inhibitor', riskCategory: 'Strong Pharmacokinetic Inhibitor' } },
  { id: 'lithium', label: 'Lithium', type: 'drug', group: 'Mood Stabilizer', details: { pubchemCid: '111232', clinicalRole: 'Inositol monophosphatase modulator', riskCategory: 'Narrow Index Renal Dependent' } },
  { id: 'lisinopril', label: 'Lisinopril', type: 'drug', group: 'ACE Inhibitor', details: { pubchemCid: '5362119', clinicalRole: 'Angiotensin converting enzyme blocker', riskCategory: 'Renal Clearance Modulator' } },
  { id: 'ibuprofen', label: 'Ibuprofen', type: 'drug', group: 'NSAID', details: { pubchemCid: '3672', clinicalRole: 'Prostaglandin synthesis blocker', riskCategory: 'Nephrotoxic Synergy' } },
  { id: 'spironolactone', label: 'Spironolactone', type: 'drug', group: 'Diuretic', details: { pubchemCid: '5833', clinicalRole: 'Aldosterone receptor blocker', riskCategory: 'Hyperkalemia Risk' } },
  { id: 'rosuvastatin', label: 'Rosuvastatin', type: 'drug', group: 'Hydrophilic Statin', details: { pubchemCid: '446157', clinicalRole: 'Alternative statin avoiding CYP3A4 pathway', riskCategory: 'Safe Statin Alternative' } },
  { id: 'ticagrelor', label: 'Ticagrelor', type: 'drug', group: 'Direct P2Y12 Inhibitor', details: { pubchemCid: '9871419', clinicalRole: 'Direct active P2Y12 antagonist', riskCategory: 'CYP2C19 Bypass Alternative' } },

  // Target Proteins
  { id: 'VKORC1', label: 'VKORC1 Protein', type: 'protein', group: 'Target', details: { uniprotId: 'Q9BQB6', clinicalRole: 'Vitamin K epoxide reductase complex subunit 1' } },
  { id: 'HMGCR', label: 'HMGCR Protein', type: 'protein', group: 'Target', details: { uniprotId: 'P04035', clinicalRole: '3-hydroxy-3-methylglutaryl-CoA reductase' } },
  { id: 'P2RY12', label: 'P2Y12 Receptor', type: 'protein', group: 'Target', details: { uniprotId: 'Q9H244', clinicalRole: 'Platelet ADP purinergic receptor' } },
  { id: 'SLC6A4', label: 'SERT (SLC6A4)', type: 'protein', group: 'Target', details: { uniprotId: 'P31645', clinicalRole: 'Sodium-dependent serotonin transporter' } },
  { id: 'OPRM1', label: 'Mu-Opioid Receptor', type: 'protein', group: 'Target', details: { uniprotId: 'P35372', clinicalRole: 'Opioid receptor mu 1' } },
  { id: 'KCNH2', label: 'hERG (KCNH2)', type: 'protein', group: 'Ion Channel', details: { uniprotId: 'Q12809', clinicalRole: 'Voltage-gated potassium channel Kv11.1' } },
  { id: 'ATP1A1', label: 'Na+/K+ ATPase', type: 'protein', group: 'Ion Pump', details: { uniprotId: 'P05023', clinicalRole: 'Sodium/potassium-transporting ATPase subunit alpha-1' } },
  { id: 'ACE_prot', label: 'ACE Receptor', type: 'protein', group: 'Target', details: { uniprotId: 'P12821', clinicalRole: 'Angiotensin-converting enzyme' } },
  { id: 'PTGS1', label: 'COX-1 (PTGS1)', type: 'protein', group: 'Target', details: { uniprotId: 'P23219', clinicalRole: 'Prostaglandin G/H synthase 1' } },
  { id: 'F10_prot', label: 'Factor Xa', type: 'protein', group: 'Clotting Cascade', details: { uniprotId: 'P00742', clinicalRole: 'Coagulation factor X' } },

  // Enzymes & Transporters
  { id: 'CYP3A4', label: 'CYP3A4 Enzyme', type: 'enzyme', group: 'Cytochrome P450', details: { uniprotId: 'P08684', clinicalRole: 'Metabolizes >50% of prescription medications' } },
  { id: 'CYP2C9', label: 'CYP2C9 Enzyme', type: 'enzyme', group: 'Cytochrome P450', details: { uniprotId: 'P11712', clinicalRole: 'Primary clearance pathway for S-warfarin & NSAIDs' } },
  { id: 'CYP2C19', label: 'CYP2C19 Enzyme', type: 'enzyme', group: 'Cytochrome P450', details: { uniprotId: 'P33261', clinicalRole: 'Bioactivates clopidogrel; metabolizes PPIs' } },
  { id: 'CYP2D6', label: 'CYP2D6 Enzyme', type: 'enzyme', group: 'Cytochrome P450', details: { uniprotId: 'P10635', clinicalRole: 'Metabolizes beta-blockers, opioids, and antidepressants' } },
  { id: 'P_gp', label: 'P-Glycoprotein (ABCB1)', type: 'enzyme', group: 'Efflux Transporter', details: { uniprotId: 'P08183', clinicalRole: 'ATP-binding cassette sub-family B member 1' } },
  { id: 'OATP1B1', label: 'OATP1B1 (SLCO1B1)', type: 'enzyme', group: 'Hepatic Uptake', details: { uniprotId: 'Q9Y6L6', clinicalRole: 'Solute carrier organic anion transporter 1B1' } },

  // Biological Pathways
  { id: 'path_coagulation', label: 'Coagulation Cascade', type: 'pathway', group: 'Hemostasis', details: { keggId: 'hsa04610', clinicalRole: 'Enzymatic cascade leading to thrombin generation and fibrin clot formation' } },
  { id: 'path_cyp_clearance', label: 'Hepatic Phase I Clearance', type: 'pathway', group: 'Pharmacokinetics', details: { keggId: 'hsa00982', clinicalRole: 'Drug metabolism by cytochrome P450 monooxygenases' } },
  { id: 'path_repolarization', label: 'Cardiac Repolarization (IKr)', type: 'pathway', group: 'Electrophysiology', details: { keggId: 'hsa04261', clinicalRole: 'Phase 3 cardiac ventricular repolarization' } },
  { id: 'path_serotonin', label: 'Serotonergic Synaptic Signaling', type: 'pathway', group: 'Neurotransmission', details: { keggId: 'hsa04726', clinicalRole: 'Central serotonergic tone and receptor activation' } },
  { id: 'path_platelet', label: 'Platelet Activation & Aggregation', type: 'pathway', group: 'Hemostasis', details: { keggId: 'hsa04611', clinicalRole: 'P2Y12 / Thromboxane A2 driven thrombus formation' } },
  { id: 'path_renal_perfusion', label: 'Renal Tubule Hemodynamics', type: 'pathway', group: 'Renal Physiology', details: { keggId: 'hsa04960', clinicalRole: 'Glomerular filtration and tubular sodium/lithium balance' } },
  { id: 'path_myocyte', label: 'Myocyte Membrane Integrity', type: 'pathway', group: 'Musculoskeletal', details: { keggId: 'hsa04260', clinicalRole: 'Skeletal muscle cellular energy and membrane stability' } },

  // Adverse Events
  { id: 'adv_hemorrhage', label: 'Major Hemorrhage / Fatal Bleed', type: 'adverse_event', group: 'Bleeding', details: { riskCategory: 'Life Threatening', clinicalRole: 'INR > 5.0, intracranial hemorrhage, massive gastrointestinal bleeding' } },
  { id: 'adv_rhabdo', label: 'Severe Rhabdomyolysis & AKI', type: 'adverse_event', group: 'Musculoskeletal', details: { riskCategory: 'Life Threatening', clinicalRole: 'Myoglobin release, CK > 10,000 U/L, acute renal shutdown' } },
  { id: 'adv_torsades', label: 'Torsades de Pointes / Sudden Death', type: 'adverse_event', group: 'Arrhythmia', details: { riskCategory: 'Life Threatening', clinicalRole: 'QTc prolongation > 500 ms, polymorphic ventricular tachycardia' } },
  { id: 'adv_serotonin_syn', label: 'Severe Serotonin Syndrome', type: 'adverse_event', group: 'Neurotoxicity', details: { riskCategory: 'Life Threatening', clinicalRole: 'Hyperthermia, clonus, autonomic instability, delirium' } },
  { id: 'adv_stent_thrombosis', label: 'Acute Stent Thrombosis (MACE)', type: 'adverse_event', group: 'Cardiovascular', details: { riskCategory: 'Critical Failure', clinicalRole: 'Loss of antiplatelet protection leading to re-infarction' } },
  { id: 'adv_lithium_tox', label: 'Lithium Toxicity & Encephalopathy', type: 'adverse_event', group: 'Renal / Neuro', details: { riskCategory: 'Life Threatening', clinicalRole: 'Serum lithium > 2.0 mEq/L, ataxia, seizures, permanent nephrogenic DI' } },
  { id: 'adv_hyperkalemia', label: 'Fatal Hyperkalemic Asystole', type: 'adverse_event', group: 'Electrolyte', details: { riskCategory: 'Critical Alert', clinicalRole: 'Serum potassium > 6.5 mmol/L with peaked T waves and sinus arrest' } }
];

export const GLOBAL_KNOWLEDGE_GRAPH_EDGES: KnowledgeGraphEdge[] = [
  // Warfarin edges
  { id: 'e1', source: 'warfarin', target: 'VKORC1', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.95, evidence: 'Direct catalytic inhibition of vitamin K epoxide reductase' },
  { id: 'e2', source: 'warfarin', target: 'CYP2C9', relation: 'substrate_of', confidence: 0.98, attentionWeight: 0.92, evidence: 'Primary metabolic clearance of active (S)-warfarin enantiomer' },
  { id: 'e3', source: 'warfarin', target: 'CYP3A4', relation: 'substrate_of', confidence: 0.85, attentionWeight: 0.68, evidence: 'Secondary elimination pathway for (R)-warfarin' },

  // Amiodarone edges
  { id: 'e4', source: 'amiodarone', target: 'CYP2C9', relation: 'inhibits', confidence: 0.97, attentionWeight: 0.94, evidence: 'Potent competitive & non-competitive inhibition of CYP2C9' },
  { id: 'e5', source: 'amiodarone', target: 'CYP3A4', relation: 'inhibits', confidence: 0.96, attentionWeight: 0.93, evidence: 'Mechanism-based inactivation of CYP3A4' },
  { id: 'e6', source: 'amiodarone', target: 'P_gp', relation: 'inhibits', confidence: 0.94, attentionWeight: 0.88, evidence: 'Inhibition of ABCB1 apical efflux' },
  { id: 'e7', source: 'amiodarone', target: 'OATP1B1', relation: 'inhibits', confidence: 0.89, attentionWeight: 0.84, evidence: 'Inhibits hepatic uptake transporter OATP1B1' },
  { id: 'e8', source: 'amiodarone', target: 'KCNH2', relation: 'inhibits', confidence: 0.98, attentionWeight: 0.90, evidence: 'Potent blocker of rapid delayed rectifier K+ current' },

  // Simvastatin edges
  { id: 'e9', source: 'simvastatin', target: 'HMGCR', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.89, evidence: 'Rate-limiting step in cholesterol biosynthesis' },
  { id: 'e10', source: 'simvastatin', target: 'CYP3A4', relation: 'substrate_of', confidence: 0.98, attentionWeight: 0.96, evidence: 'Substrate for first-pass hepatic oxidative clearance' },
  { id: 'e11', source: 'simvastatin', target: 'OATP1B1', relation: 'substrate_of', confidence: 0.92, attentionWeight: 0.86, evidence: 'Hepatic influx dependent on SLCO1B1 transport' },

  // Clopidogrel & Omeprazole edges
  { id: 'e12', source: 'clopidogrel', target: 'CYP2C19', relation: 'substrate_of', confidence: 0.99, attentionWeight: 0.97, evidence: 'Mandatory bioactivation into active thiol metabolite' },
  { id: 'e13', source: 'clopidogrel', target: 'P2RY12', relation: 'inhibits', confidence: 0.98, attentionWeight: 0.92, evidence: 'Irreversible platelet P2Y12 receptor blockade' },
  { id: 'e14', source: 'omeprazole', target: 'CYP2C19', relation: 'inhibits', confidence: 0.95, attentionWeight: 0.94, evidence: 'High-affinity competitive inhibition of CYP2C19 catalytic site' },
  { id: 'e15', source: 'aspirin', target: 'PTGS1', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.91, evidence: 'Irreversible acetylation of Ser-529 on COX-1' },

  // Fluoxetine & Tramadol edges
  { id: 'e16', source: 'fluoxetine', target: 'CYP2D6', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.98, evidence: 'Very potent mechanism-based inhibitor of CYP2D6 (Ki 0.6 uM)' },
  { id: 'e17', source: 'fluoxetine', target: 'SLC6A4', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.95, evidence: 'High affinity selective serotonin reuptake blockade' },
  { id: 'e18', source: 'tramadol', target: 'CYP2D6', relation: 'substrate_of', confidence: 0.97, attentionWeight: 0.93, evidence: 'Requires CYP2D6 O-demethylation to active M1 analgesia metabolite' },
  { id: 'e19', source: 'tramadol', target: 'SLC6A4', relation: 'inhibits', confidence: 0.88, attentionWeight: 0.87, evidence: 'Weak serotonin reuptake inhibitor contributing to synergy' },
  { id: 'e20', source: 'tramadol', target: 'OPRM1', relation: 'activates', confidence: 0.92, attentionWeight: 0.85, evidence: 'M1 metabolite is 300x more potent at mu-opioid receptor' },

  // Digoxin & Clarithromycin edges
  { id: 'e21', source: 'digoxin', target: 'ATP1A1', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.96, evidence: 'Inhibition of myocardial sodium-potassium ATPase pump' },
  { id: 'e22', source: 'digoxin', target: 'P_gp', relation: 'substrate_of', confidence: 0.98, attentionWeight: 0.94, evidence: 'Cleared by renal tubular P-gp active secretion' },
  { id: 'e23', source: 'clarithromycin', target: 'P_gp', relation: 'inhibits', confidence: 0.95, attentionWeight: 0.93, evidence: 'Suppresses intestinal and renal P-glycoprotein efflux' },
  { id: 'e24', source: 'clarithromycin', target: 'CYP3A4', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.97, evidence: 'Irreversible metabolite-intermediate complex with CYP3A4' },

  // Lithium & NSAID & ACEi edges
  { id: 'e25', source: 'lithium', target: 'path_renal_perfusion', relation: 'participates_in', confidence: 0.95, attentionWeight: 0.92, evidence: 'Filtered and reabsorbed 80% at proximal convoluted tubule' },
  { id: 'e26', source: 'ibuprofen', target: 'PTGS1', relation: 'inhibits', confidence: 0.98, attentionWeight: 0.88, evidence: 'Inhibits afferent arteriolar vasodilator prostaglandins' },
  { id: 'e27', source: 'lisinopril', target: 'ACE_prot', relation: 'inhibits', confidence: 0.99, attentionWeight: 0.91, evidence: 'Dilates efferent arteriole, reducing intraglomerular pressure' },

  // Protein / Enzyme -> Pathway connections
  { id: 'e28', source: 'VKORC1', target: 'path_coagulation', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.94, evidence: 'Regulates active prothrombin, factors VII, IX, X' },
  { id: 'e29', source: 'CYP2C9', target: 'path_cyp_clearance', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.90, evidence: 'Key hepatic Phase I oxidation isoenzyme' },
  { id: 'e30', source: 'CYP3A4', target: 'path_cyp_clearance', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.95, evidence: 'Major hepatic and gut wall metabolizing cytochrome' },
  { id: 'e31', source: 'CYP2C19', target: 'path_cyp_clearance', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.89, evidence: 'Crucial for prodrug bioactivation' },
  { id: 'e32', source: 'CYP2D6', target: 'path_cyp_clearance', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.91, evidence: 'Polymorphic enzyme clearing CNS and cardiac drugs' },
  { id: 'e33', source: 'KCNH2', target: 'path_repolarization', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.93, evidence: 'Underlies rapid delayed rectifier potassium current' },
  { id: 'e34', source: 'SLC6A4', target: 'path_serotonin', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.94, evidence: 'Terminates serotonergic action in synaptic cleft' },
  { id: 'e35', source: 'P2RY12', target: 'path_platelet', relation: 'participates_in', confidence: 0.99, attentionWeight: 0.92, evidence: 'Amplifies ADP-mediated platelet dense granule secretion' },
  { id: 'e36', source: 'HMGCR', target: 'path_myocyte', relation: 'participates_in', confidence: 0.96, attentionWeight: 0.88, evidence: 'Supplies ubiquinone/CoQ10 and prenylated proteins to myocytes' },

  // Pathway -> Adverse Event connections
  { id: 'e37', source: 'path_coagulation', target: 'adv_hemorrhage', relation: 'associated_with', confidence: 0.98, attentionWeight: 0.96, evidence: 'Profound INR elevation (>5.0) leads to spontaneous hemorrhagic conversion' },
  { id: 'e38', source: 'path_myocyte', target: 'adv_rhabdo', relation: 'associated_with', confidence: 0.97, attentionWeight: 0.95, evidence: 'Unchecked statin AUC elevation triggers skeletal myolysis and myoglobinuria' },
  { id: 'e39', source: 'path_repolarization', target: 'adv_torsades', relation: 'associated_with', confidence: 0.96, attentionWeight: 0.94, evidence: 'Excessive action potential duration prolongation triggers early afterdepolarizations' },
  { id: 'e40', source: 'path_serotonin', target: 'adv_serotonin_syn', relation: 'associated_with', confidence: 0.98, attentionWeight: 0.95, evidence: 'Toxic hyperstimulation of central and peripheral 5-HT2A/1A receptors' },
  { id: 'e41', source: 'path_platelet', target: 'adv_stent_thrombosis', relation: 'associated_with', confidence: 0.95, attentionWeight: 0.91, evidence: 'Inadequate P2Y12 inhibition during acute vascular healing phase' },
  { id: 'e42', source: 'path_renal_perfusion', target: 'adv_lithium_tox', relation: 'associated_with', confidence: 0.99, attentionWeight: 0.98, evidence: 'Combined afferent constriction + efferent dilation drastically drops GFR' },
  { id: 'e43', source: 'lisinopril', target: 'adv_hyperkalemia', relation: 'associated_with', confidence: 0.92, attentionWeight: 0.85, evidence: 'Suppression of aldosterone-mediated distal potassium secretion' },
  { id: 'e44', source: 'spironolactone', target: 'adv_hyperkalemia', relation: 'associated_with', confidence: 0.96, attentionWeight: 0.91, evidence: 'Competitive mineralocorticoid antagonism prevents K+ kaliuresis' }
];

