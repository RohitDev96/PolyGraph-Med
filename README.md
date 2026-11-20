# PolyGraph-Med – Explainable AI Clinical Decision Support System for Polypharmacy

> **World-Class AI-Powered Clinical Medication Intelligence Platform**  
> Combining Artificial Intelligence + Graph Neural Networks (GraphSAGE & Hypergraph Combinatorial Learning) + Biomedical Knowledge Graphs + Explainable AI (XAI) + PubMed RAG.

---

## 🌟 Executive Overview & Positioning

A traditional drug checker says:
> *"These medicines may interact."*

**PolyGraph-Med** delivers clinical intelligence:
> *"These medicines produce a non-linear 3-drug interaction risk that cannot be detected by individual pairs alone. Here is the shared CYP450 metabolic bottleneck, the affected protein cascade, the patient's renal/phenotypic vulnerability amplification, the supporting PubMed RCT citations with PMIDs, and evidence-supported alternative options for clinician review."*

---

## 🚀 Key Implemented Features

1. **Higher-Order Multi-Drug Interaction Detection (3+ Drugs)**:
   - Evaluates combinations of 3, 4, or more drugs simultaneously (e.g. Warfarin + Amiodarone + Simvastatin; Clopidogrel + Omeprazole + Aspirin; Fluoxetine + Tramadol + Ondansetron; Lithium + Lisinopril + Ibuprofen).
   - Identifies multi-pathway saturation and non-pairwise biological synergies.

2. **Patient-Specific Biological Risk Stratification**:
   - Incorporates age, gender, renal function (eGFR / CrCl), liver profile (Child-Pugh), diagnosed conditions, allergies, and pharmacogenomic alleles (CYP2D6, CYP2C19 Poor/Intermediate Metabolizers).

3. **Explainable AI (XAI) Biological Insights**:
   - Traces predictions through Cytochrome P450 enzymes (CYP3A4, CYP2C9, CYP2C19, CYP2D6), target proteins (VKORC1, P2RY12, hERG), and transporters (P-gp/ABCB1, OATP1B1/SLCO1B1).
   - Displays GraphSAGE feature attribution weights and attention heatmaps.

4. **Biomedical Knowledge Graph Explorer**:
   - Multi-typed entities: Drugs (Blue), Target Proteins (Purple), Enzymes (Orange), Pathways (Green), Adverse Events (Red).
   - Typed edges: `inhibits`, `metabolized_by`, `substrate_of`, `participates_in`, `associated_with`.
   - Full interactive pan, zoom, search, node filtering, and slide-over entity inspector with UniProt, KEGG, and PubChem IDs.

5. **PubMed AI Literature Research Agent**:
   - Conversational Retrieval-Augmented Generation (RAG) assistant.
   - Searches peer-reviewed literature and returns verified PMIDs, journal citations, key findings, and clinical advisory statements.

6. **Evidence-Based Alternative Medication Research**:
   - Identifies candidate replacement medications in the same therapeutic class that bypass problematic metabolic enzymes (e.g., swapping Simvastatin for Pravastatin/Rosuvastatin to avoid CYP3A4 inhibition).
   - Side-by-side compatibility scores and risk score delta calculation.

7. **What-If Drug Regimen Simulation Sandbox**:
   - Compare Scenario A (Baseline) vs Scenario B (Hypothetical modification) side-by-side in real time.
   - Live recalculation of predicted GNN risk scores, eliminated toxic pathways, and potential new risks.

8. **Doctor Command Center & Analytics Dashboard**:
   - High-level KPIs, CYP450 metabolic saturation distribution charts, recent high-risk patient cohort table, and instant triage.

9. **Clinical Decision Support (CDS) Report Generator**:
   - Clean, publication-grade clinical summaries with electronic clinician attestation workflow.
   - 1-click Print / Save as PDF with dedicated medical report print stylesheets.

---

## 🎨 Design Philosophy — Botanical Healthcare Minimalist Aesthetic

- **Color Palette**:
  - Background: Warm cream & ivory (`#FBF9F5`, `#F7F5EE`)
  - Primary: Soft botanical green (`#264E36`, `#2D5A3F`)
  - Accent: Sage green (`#7E9F85`) and muted olive (`#5F7161`)
  - Alerts: Earthy terracotta / soft rust (`#B84A3B`) & warm ochre (`#C48A45`)
  - Text: Dark charcoal (`#1F2421`), not pure black
- **Layout & Typography**:
  - Generous whitespace, breathable editorial padding (`py-12`, `py-24`, `space-y-10`)
  - Concise headings, one-line descriptions, meaningful iconography
  - Subdued, organic card elevations without harsh shadows or neon glows
  - Responsive, calm, and trustworthy healthcare AI SaaS experience

---

## 💻 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

