import { Drug } from '../types';

export const DRUGS_DATABASE: Drug[] = [
  {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin Sodium',
    brandNames: ['Coumadin', 'Jantoven'],
    drugClass: 'Vitamin K Antagonist (Anticoagulant)',
    atcCode: 'B01AA03',
    description: 'Anticoagulant that depletes functional vitamin K reserves, inhibiting synthesis of clotting factors II, VII, IX, X.',
    indication: 'Atrial fibrillation, DVT, pulmonary embolism, mechanical heart valves',
    targets: ['VKORC1', 'F2', 'F7', 'F9', 'F10'],
    enzymes: {
      substrate: ['CYP2C9', 'CYP3A4', 'CYP1A2'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.08,
    defaultDose: '5 mg',
    route: 'Oral',
    halfLife: '36-42 hours'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    genericName: 'Amiodarone Hydrochloride',
    brandNames: ['Cordarone', 'Pacerone', 'Nexterone'],
    drugClass: 'Class III Antiarrhythmic',
    atcCode: 'C01BD01',
    description: 'Multi-channel blocker inhibiting potassium, sodium, and calcium channels with broad sympathetic antagonism and potent CYP/P-gp inhibition.',
    indication: 'Ventricular arrhythmias, atrial fibrillation rhythm control',
    targets: ['KCNH2 (hERG)', 'SCN5A', 'CACNA1C', 'ADRB1'],
    enzymes: {
      substrate: ['CYP3A4', 'CYP2C8'],
      inhibitor: ['CYP2C9', 'CYP3A4', 'CYP2D6', 'CYP1A2'],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)', 'SLCO1B1 (OATP1B1)'],
    renalEliminationRatio: 0.02,
    defaultDose: '200 mg',
    route: 'Oral',
    halfLife: '40-55 days'
  },
  {
    id: 'simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    brandNames: ['Zocor', 'Flolipid'],
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    atcCode: 'C10AA01',
    description: 'Lipid-lowering prodrug lactone converted to active beta-hydroxy acid, highly dependent on CYP3A4 for first-pass clearance.',
    indication: 'Hypercholesterolemia, cardiovascular risk reduction',
    targets: ['HMGCR'],
    enzymes: {
      substrate: ['CYP3A4', 'CYP3A5'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLCO1B1 (OATP1B1)', 'ABCB1 (P-gp)', 'ABCG2 (BCRP)'],
    renalEliminationRatio: 0.13,
    defaultDose: '20 mg',
    route: 'Oral',
    halfLife: '2-3 hours'
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    genericName: 'Clopidogrel Bisulfate',
    brandNames: ['Plavix'],
    drugClass: 'Thienopyridine P2Y12 Inhibitor (Antiplatelet)',
    atcCode: 'B01AC04',
    description: 'Prodrug requiring hepatic two-step bioactivation predominantly mediated by CYP2C19 to selectively and irreversibly inhibit platelet P2Y12 receptors.',
    indication: 'Acute Coronary Syndrome, post-PCI stenting, ischemic stroke',
    targets: ['P2RY12'],
    enzymes: {
      substrate: ['CYP2C19', 'CYP3A4', 'CYP1A2', 'CYP2B6'],
      inhibitor: ['CYP2B6'],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.50,
    defaultDose: '75 mg',
    route: 'Oral',
    halfLife: '6 hours (active metabolite 30 min)'
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Losec'],
    drugClass: 'Proton Pump Inhibitor (PPI)',
    atcCode: 'A02BC01',
    description: 'Gastric H+/K+-ATPase inhibitor that raises intragastric pH and competitively inhibits CYP2C19.',
    indication: 'GERD, peptic ulcer disease, NSAID gastroprotection, Zollinger-Ellison',
    targets: ['ATP4A'],
    enzymes: {
      substrate: ['CYP2C19', 'CYP3A4'],
      inhibitor: ['CYP2C19'],
      inducer: ['CYP1A2']
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.77,
    defaultDose: '20 mg',
    route: 'Oral',
    halfLife: '0.5-1 hour'
  },
  {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    brandNames: ['Bayer', 'Ecotrin'],
    drugClass: 'Antiplatelet / NSAID',
    atcCode: 'B01AC06',
    description: 'Irreversible cyclooxygenase-1 (COX-1) inhibitor suppressing thromboxane A2 production and platelet aggregation.',
    indication: 'Secondary prevention of atherosclerotic disease, ACS',
    targets: ['PTGS1 (COX-1)', 'PTGS2 (COX-2)'],
    enzymes: {
      substrate: ['CES1', 'UGT1A6'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCC4', 'SLC22A6'],
    renalEliminationRatio: 0.85,
    defaultDose: '81 mg',
    route: 'Oral',
    halfLife: '15-20 min (salicylate 2-30 h)'
  },
  {
    id: 'metoprolol',
    name: 'Metoprolol',
    genericName: 'Metoprolol Succinate',
    brandNames: ['Toprol-XL', 'Lopressor'],
    drugClass: 'Beta-1 Selective Adrenergic Antagonist',
    atcCode: 'C07AB02',
    description: 'Cardioselective beta-1 blocker that decreases heart rate, cardiac output, and systemic blood pressure; cleared primarily by CYP2D6.',
    indication: 'Hypertension, angina, heart failure, post-myocardial infarction',
    targets: ['ADRB1'],
    enzymes: {
      substrate: ['CYP2D6'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLC22A1'],
    renalEliminationRatio: 0.10,
    defaultDose: '50 mg',
    route: 'Oral',
    halfLife: '3-7 hours'
  },
  {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    genericName: 'Fluoxetine Hydrochloride',
    brandNames: ['Prozac', 'Sarafem'],
    drugClass: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    atcCode: 'N06AB03',
    description: 'Antidepressant that inhibits presynaptic serotonin reuptake with potent mechanism-based inhibition of CYP2D6 and CYP2C19.',
    indication: 'Major depressive disorder, OCD, panic disorder, bulimia',
    targets: ['SLC6A4 (SERT)', 'HTR2C'],
    enzymes: {
      substrate: ['CYP2D6', 'CYP2C9', 'CYP2C19'],
      inhibitor: ['CYP2D6', 'CYP2C19', 'CYP3A4'],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.12,
    defaultDose: '20 mg',
    route: 'Oral',
    halfLife: '48-72 hours (norfluoxetine 7-15 days)'
  },
  {
    id: 'tramadol',
    name: 'Tramadol',
    genericName: 'Tramadol Hydrochloride',
    brandNames: ['Ultram', 'ConZip'],
    drugClass: 'Centrally Acting Synthetic Opioid / SNRI',
    atcCode: 'N02AX02',
    description: 'Dual mechanism analgesic acting as mu-opioid agonist via active M1 metabolite (O-desmethyltramadol) and weak inhibitor of serotonin and norepinephrine reuptake.',
    indication: 'Moderate to moderately severe pain',
    targets: ['OPRM1', 'SLC6A4', 'SLC6A2'],
    enzymes: {
      substrate: ['CYP2D6', 'CYP3A4', 'CYP2B6'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLC22A1'],
    renalEliminationRatio: 0.30,
    defaultDose: '50 mg',
    route: 'Oral',
    halfLife: '6-8 hours'
  },
  {
    id: 'ondansetron',
    name: 'Ondansetron',
    genericName: 'Ondansetron Hydrochloride',
    brandNames: ['Zofran', 'Zuplenz'],
    drugClass: '5-HT3 Receptor Antagonist (Antiemetic)',
    atcCode: 'A04AA01',
    description: 'Selective 5-HT3 receptor blocker in peripheral vagal terminals and central chemoreceptor trigger zone; confers mild dose-dependent QTc prolongation.',
    indication: 'Chemotherapy-induced nausea, postoperative nausea',
    targets: ['HTR3A', 'KCNH2 (hERG)'],
    enzymes: {
      substrate: ['CYP3A4', 'CYP1A2', 'CYP2D6'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.05,
    defaultDose: '8 mg',
    route: 'Oral',
    halfLife: '3-5 hours'
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin Hydrochloride',
    brandNames: ['Cipro', 'Cipro XR'],
    drugClass: 'Fluoroquinolone Antibacterial',
    atcCode: 'J01MA02',
    description: 'Bacterial DNA gyrase and topoisomerase IV inhibitor with potent CYP1A2 inhibition and cardiac potassium channel blocking properties.',
    indication: 'Complicated urinary tract infections, severe respiratory/intra-abdominal infections',
    targets: ['TOP2A', 'KCNH2 (hERG)'],
    enzymes: {
      substrate: ['CYP1A2'],
      inhibitor: ['CYP1A2', 'CYP3A4'],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)', 'ABCG2 (BCRP)'],
    renalEliminationRatio: 0.50,
    defaultDose: '500 mg',
    route: 'Oral',
    halfLife: '4-6 hours'
  },
  {
    id: 'clarithromycin',
    name: 'Clarithromycin',
    genericName: 'Clarithromycin',
    brandNames: ['Biaxin', 'Biaxin XL'],
    drugClass: 'Macrolide Antibacterial',
    atcCode: 'J01FA09',
    description: 'Bacterial 50S ribosomal protein synthesis inhibitor; one of the most potent irreversible mechanism-based CYP3A4 and P-glycoprotein inhibitors in clinical use.',
    indication: 'H. pylori eradication, atypical pneumonia, mycobacterial infections',
    targets: ['Bacterial 50S rRNA', 'KCNH2 (hERG)'],
    enzymes: {
      substrate: ['CYP3A4'],
      inhibitor: ['CYP3A4'],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)', 'SLCO1B1 (OATP1B1)'],
    renalEliminationRatio: 0.38,
    defaultDose: '500 mg',
    route: 'Oral',
    halfLife: '5-7 hours'
  },
  {
    id: 'digoxin',
    name: 'Digoxin',
    genericName: 'Digoxin',
    brandNames: ['Lanoxin', 'Digox'],
    drugClass: 'Cardiac Glycoside',
    atcCode: 'C01AA05',
    description: 'Inotropic sodium-potassium ATPase pump inhibitor with narrow therapeutic index (0.5-0.9 ng/mL) cleared 75% intact by renal P-glycoprotein secretion.',
    indication: 'Heart failure with reduced ejection fraction, atrial fibrillation rate control',
    targets: ['ATP1A1', 'ATP1A2', 'ATP1A3'],
    enzymes: {
      substrate: [],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)', 'SLC22A2 (OCT2)'],
    renalEliminationRatio: 0.75,
    defaultDose: '0.125 mg',
    route: 'Oral',
    halfLife: '36-48 hours'
  },
  {
    id: 'lithium',
    name: 'Lithium',
    genericName: 'Lithium Carbonate',
    brandNames: ['Lithobid', 'Eskalith'],
    drugClass: 'Mood Stabilizer',
    atcCode: 'N05AN01',
    description: 'Monovalent cation acting on inositol monophosphatase and GSK-3beta; cleared 100% renally at proximal tubule in direct competition with sodium.',
    indication: 'Bipolar I disorder acute mania and maintenance',
    targets: ['IMPA1', 'GSK3B'],
    enzymes: {
      substrate: [],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLC9A3 (NHE3)', 'SLC12A3'],
    renalEliminationRatio: 1.0,
    defaultDose: '300 mg',
    route: 'Oral',
    halfLife: '18-24 hours'
  },
  {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    drugClass: 'ACE Inhibitor (Antihypertensive)',
    atcCode: 'C09AA03',
    description: 'Angiotensin-converting enzyme inhibitor that reduces angiotensin II and aldosterone, causing efferent renal arteriolar vasodilation and potassium retention.',
    indication: 'Hypertension, heart failure, post-MI, diabetic nephropathy',
    targets: ['ACE'],
    enzymes: {
      substrate: [],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLC15A1 (PEPT1)'],
    renalEliminationRatio: 1.0,
    defaultDose: '20 mg',
    route: 'Oral',
    halfLife: '12 hours'
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin'],
    drugClass: 'Nonsteroidal Anti-inflammatory Drug (NSAID)',
    atcCode: 'M01AE01',
    description: 'Reversible non-selective COX-1/COX-2 inhibitor suppressing renal vasodilator prostaglandins (PGE2, PGI2), impairing renal perfusion and sodium excretion.',
    indication: 'Mild to moderate pain, inflammation, fever',
    targets: ['PTGS1 (COX-1)', 'PTGS2 (COX-2)'],
    enzymes: {
      substrate: ['CYP2C9', 'CYP2C8'],
      inhibitor: ['CYP2C9'],
      inducer: []
    },
    transporters: ['SLC22A6 (OAT1)', 'SLC22A8 (OAT3)'],
    renalEliminationRatio: 0.10,
    defaultDose: '400 mg',
    route: 'Oral',
    halfLife: '2-4 hours'
  },
  {
    id: 'apixaban',
    name: 'Apixaban',
    genericName: 'Apixaban',
    brandNames: ['Eliquis'],
    drugClass: 'Direct Factor Xa Inhibitor (DOAC)',
    atcCode: 'B01AF02',
    description: 'Selective reversible direct inhibitor of free and clot-bound factor Xa; eliminated via dual hepatic (CYP3A4) and renal/transporter (P-gp/BCRP) pathways.',
    indication: 'Nonvalvular AF stroke prevention, DVT/PE treatment and prophylaxis',
    targets: ['F10'],
    enzymes: {
      substrate: ['CYP3A4', 'CYP1A2', 'CYP2J2'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)', 'ABCG2 (BCRP)'],
    renalEliminationRatio: 0.27,
    defaultDose: '5 mg',
    route: 'Oral',
    halfLife: '12 hours'
  },
  {
    id: 'spironolactone',
    name: 'Spironolactone',
    genericName: 'Spironolactone',
    brandNames: ['Aldactone', 'CaroSpir'],
    drugClass: 'Aldosterone Receptor Antagonist (Potassium-Sparing)',
    atcCode: 'C03DA01',
    description: 'Mineralocorticoid receptor antagonist in distal renal tubules promoting sodium excretion while selectively conserving potassium and magnesium.',
    indication: 'Heart failure NYHA II-IV, resistant hypertension, cirrhosis ascites',
    targets: ['NR3C2 (MR)'],
    enzymes: {
      substrate: ['CYP3A4'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.40,
    defaultDose: '25 mg',
    route: 'Oral',
    halfLife: '1.4 hours (canrenone 16.5 hours)'
  },
  {
    id: 'rosuvastatin',
    name: 'Rosuvastatin',
    genericName: 'Rosuvastatin Calcium',
    brandNames: ['Crestor'],
    drugClass: 'HMG-CoA Reductase Inhibitor (Hydrophilic Statin)',
    atcCode: 'C10AA07',
    description: 'Hydrophilic statin with minimal (~10%) CYP2C9 metabolism, predominantly cleared intact by biliary excretion via OATP1B1/BCRP; devoid of CYP3A4 liability.',
    indication: 'Dyslipidemia, primary prevention of cardiovascular events',
    targets: ['HMGCR'],
    enzymes: {
      substrate: ['CYP2C9'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLCO1B1 (OATP1B1)', 'ABCG2 (BCRP)'],
    renalEliminationRatio: 0.10,
    defaultDose: '10 mg',
    route: 'Oral',
    halfLife: '19 hours'
  },
  {
    id: 'pravastatin',
    name: 'Pravastatin',
    genericName: 'Pravastatin Sodium',
    brandNames: ['Pravachol'],
    drugClass: 'HMG-CoA Reductase Inhibitor (Hydrophilic Statin)',
    atcCode: 'C10AA03',
    description: 'Hydrophilic statin cleared by hepatic sulfation and renal excretion, avoiding cytochrome P450 isoenzymes entirely.',
    indication: 'Hyperlipidemia, coronary heart disease secondary prevention',
    targets: ['HMGCR'],
    enzymes: {
      substrate: [],
      inhibitor: [],
      inducer: []
    },
    transporters: ['SLCO1B1 (OATP1B1)', 'SLC22A6 (OAT1)'],
    renalEliminationRatio: 0.20,
    defaultDose: '40 mg',
    route: 'Oral',
    halfLife: '1.5-2 hours'
  },
  {
    id: 'ticagrelor',
    name: 'Ticagrelor',
    genericName: 'Ticagrelor',
    brandNames: ['Brilinta'],
    drugClass: 'Direct-Acting Reversible P2Y12 Inhibitor',
    atcCode: 'B01AC24',
    description: 'Cyclopentyltriazolopyrimidine that binds allosterically to P2Y12 without requiring CYP2C19 bioactivation, overcoming clopidogrel resistance.',
    indication: 'Acute Coronary Syndrome, post-PCI, prior MI risk reduction',
    targets: ['P2RY12'],
    enzymes: {
      substrate: ['CYP3A4', 'CYP3A5'],
      inhibitor: ['CYP3A4'],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.26,
    defaultDose: '90 mg',
    route: 'Oral',
    halfLife: '7 hours (active metabolite 9 hours)'
  },
  {
    id: 'pantoprazole',
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    brandNames: ['Protonix'],
    drugClass: 'Proton Pump Inhibitor (Low CYP2C19 Affinity)',
    atcCode: 'A02BC02',
    description: 'Proton pump inhibitor metabolized primarily by cytosolic sulfotransferase with significantly lower CYP2C19 binding affinity than omeprazole.',
    indication: 'Gastroesophageal reflux disease, erosive esophagitis, Zollinger-Ellison',
    targets: ['ATP4A'],
    enzymes: {
      substrate: ['CYP2C19', 'CYP3A4'],
      inhibitor: [],
      inducer: []
    },
    transporters: ['ABCB1 (P-gp)'],
    renalEliminationRatio: 0.80,
    defaultDose: '40 mg',
    route: 'Oral',
    halfLife: '1 hour'
  }
];

