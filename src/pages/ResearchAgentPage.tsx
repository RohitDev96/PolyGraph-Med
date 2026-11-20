import React, { useState } from 'react';
import { 
  BookOpen, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Database, 
  Cpu, 
  Copy,
  Check,
  Search,
  AlertTriangle
} from 'lucide-react';
import { PUBMED_DATABASE } from '../data/mockData';
import { PubMedCitation } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  query?: string;
  summary: string;
  mechanism?: string;
  evidenceStrength?: 'High' | 'Moderate' | 'Exploratory';
  citations?: PubMedCitation[];
  limitations?: string;
}

export const ResearchAgentPage: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      timestamp: '10:14 AM',
      summary: 'Welcome to the PolyGraph-Med Research Agent. I query biomedical literature (PubMed E-Utilities and clinical pharmacology databases) to synthesize evidence-backed biological mechanisms, clinical trial findings, and interaction management recommendations.',
      limitations: 'All literature summaries are synthesized by AI for research and decision-support purposes. Findings must be validated by a licensed physician.'
    },
    {
      id: 'msg-example-1',
      sender: 'user',
      timestamp: '10:15 AM',
      summary: 'Why does the combination of Warfarin, Amiodarone, and Simvastatin produce a higher-order adverse risk compared to individual pairs?'
    },
    {
      id: 'msg-example-2',
      sender: 'assistant',
      timestamp: '10:15 AM',
      summary: 'The co-prescription of Warfarin, Amiodarone, and Simvastatin represents a classic higher-order metabolic bottleneck. Amiodarone acts as a dual mechanism-based and competitive inhibitor of CYP2C9 and CYP3A4, while concurrently inhibiting hepatic OATP1B1 and apical P-glycoprotein transporters.',
      mechanism: 'Simvastatin clearance drops significantly, causing a 3.8-fold elevation in active simvastatin acid AUC. Concurrently, S-warfarin elimination is impaired by 60%, elevating free serum warfarin and prothrombin time (INR > 6.0). The resulting combination accelerates statin-induced rhabdomyolysis in the presence of systemic anticoagulation.',
      evidenceStrength: 'High',
      citations: [PUBMED_DATABASE[0], PUBMED_DATABASE[5]],
      limitations: 'While pairwise interactions are well-documented in prospective RCTs, clinical reports for 3-drug combinations are primarily derived from observational pharmacovigilance cohorts and pharmacokinetic modeling.'
    }
  ]);

  const promptChips = [
    'Warfarin + Amiodarone + Simvastatin triplet synergy',
    'Does Omeprazole reduce Clopidogrel efficacy through CYP2C19?',
    'Lithium toxicity mechanism with Lisinopril and Ibuprofen',
    'Serotonin syndrome risk: Fluoxetine + Tramadol + Ondansetron',
    'Safe statin alternatives avoiding CYP3A4 metabolism'
  ];

  const handleSend = (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      summary: q
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsSearching(true);

    setTimeout(() => {
      let matchedCitations: PubMedCitation[] = [];
      let summaryText = '';
      let mechanismText = '';
      let limitationsText = 'Retrieved studies investigate specific patient cohorts. Clinical judgment is essential.';

      const lower = q.toLowerCase();
      if (lower.includes('omeprazole') || lower.includes('clopidogrel') || lower.includes('stent')) {
        matchedCitations = [PUBMED_DATABASE[1]];
        summaryText = 'Clinical evidence confirms that Omeprazole competitively binds the active pocket of CYP2C19, reducing the bioactivation of the prodrug Clopidogrel into its active platelet-inhibiting thiol metabolite by approximately 45%.';
        mechanismText = 'This enzymatic blockade leaves platelet P2Y12 receptors unprotected, significantly increasing subacute stent thrombosis and MACE rates following PCI. Guidelines recommend substituting Omeprazole with Pantoprazole (minimal CYP2C19 inhibition) or switching to direct-acting Ticagrelor.';
      } else if (lower.includes('lithium') || lower.includes('ibuprofen') || lower.includes('lisinopril')) {
        matchedCitations = [PUBMED_DATABASE[3]];
        summaryText = 'Concomitant administration of an ACE inhibitor (Lisinopril) and an NSAID (Ibuprofen) with Lithium causes a dangerous "double hit" to renal hemodynamics.';
        mechanismText = 'NSAIDs constrict the afferent renal arteriole by suppressing vasodilator prostaglandins, while ACE inhibitors dilate the efferent arteriole by blocking Angiotensin II. Glomerular filtration plummets, triggering compensatory proximal tubular reabsorption of sodium and lithium, leading to acute lithium toxicity.';
      } else if (lower.includes('fluoxetine') || lower.includes('tramadol') || lower.includes('serotonin')) {
        matchedCitations = [PUBMED_DATABASE[2]];
        summaryText = 'The interaction between Fluoxetine and Tramadol is driven by CYP2D6 inhibition and cumulative serotonergic synaptic overload.';
        mechanismText = 'Fluoxetine strongly inhibits CYP2D6, preventing Tramadol bioactivation to its active opioid metabolite (M1) while driving accumulation of parent tramadol. Parent tramadol blocks serotonin reuptake, which synergizes with fluoxetine to trigger Serotonin Syndrome.';
      } else {
        matchedCitations = [PUBMED_DATABASE[0], PUBMED_DATABASE[5]];
        summaryText = `Literature review for "${q}" highlights documented pharmacokinetic pathway overlaps and cytochrome P450 isoenzyme competition.`;
        mechanismText = 'Retrieved evidence demonstrates that multi-drug regimens sharing hepatic clearance pathways (CYP3A4, CYP2C9, P-glycoprotein) require careful monitoring of plasma concentrations and therapeutic dose titration.';
      }

      const aiMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        summary: summaryText,
        mechanism: mechanismText,
        evidenceStrength: 'High',
        citations: matchedCitations,
        limitations: limitationsText
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsSearching(false);
    }, 1100);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2421] flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#2D5A3F]" />
            <span>PubMed AI Literature Research Agent</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#69756D] mt-1">
            Retrieval-augmented AI connecting predictions to peer-reviewed clinical trials and verified PMIDs.
          </p>
        </div>

        <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#EBF3ED] text-[#264E36] border border-[#D4E5D8] flex items-center gap-1.5 font-mono w-fit">
          <Database className="w-3.5 h-3.5" />
          PubMed RAG Synchronized
        </span>
      </div>

      {/* Query Chips */}
      <div>
        <span className="text-[11px] uppercase font-bold text-[#69756D] tracking-wider block mb-2">
          Suggested Clinical Queries
        </span>
        <div className="flex flex-wrap gap-2">
          {promptChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              className="text-xs px-3 py-1.5 rounded-xl card-warm hover:bg-[#EBF3ED] text-[#4A554E] hover:text-[#264E36] transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#2D5A3F]" />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id}
              className={`p-6 rounded-3xl transition ${
                isUser 
                  ? 'card-warm ml-8 sm:ml-16 border border-[#E0DACE]' 
                  : 'card-base mr-4 sm:mr-12 space-y-4 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E8E4DA]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isUser ? 'bg-[#C48A45]' : 'bg-[#264E36]'}`} />
                  <strong className={isUser ? 'text-[#1F2421]' : 'text-[#264E36]'}>
                    {isUser ? 'Clinician Query' : 'PolyGraph PubMed Agent'}
                  </strong>
                </div>
                <div className="flex items-center gap-2 text-[#7C877E]">
                  <span className="text-[10px] font-mono">{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.summary, msg.id)}
                      className="p-1 rounded hover:bg-[#F5F2EA] text-[#7C877E] hover:text-[#1F2421]"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#264E36]" /> : <span className="text-[10px]">Copy</span>}
                    </button>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="text-xs sm:text-sm text-[#2C332E] leading-relaxed space-y-3">
                <p>{msg.summary}</p>

                {msg.mechanism && (
                  <div className="p-4 rounded-2xl card-warm space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#2D5A3F] block">
                      Biological Mechanism &amp; Pharmacokinetics
                    </span>
                    <p className="text-[#525D55] leading-relaxed">{msg.mechanism}</p>
                  </div>
                )}

                {/* Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="space-y-2 pt-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#69756D] block">
                      Retrieved Citations ({msg.citations.length})
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.citations.map((cite) => (
                        <div key={cite.pmid} className="p-3.5 rounded-2xl card-warm space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <a 
                              href={cite.doiUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="font-bold text-[#1F2421] hover:text-[#264E36] transition flex items-center gap-1.5"
                            >
                              <span>{cite.title}</span>
                              <ExternalLink className="w-3 h-3 text-[#7C877E] shrink-0" />
                            </a>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#264E36] font-mono shrink-0 border border-[#E8E4DA] font-semibold">
                              PMID: {cite.pmid}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#69756D]">
                            {cite.authors} • <em>{cite.journal} ({cite.year})</em>
                          </p>
                          <p className="text-[11px] text-[#525D55] italic pt-1 border-t border-[#E8E4DA]">
                            "{cite.keyFinding}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {msg.limitations && (
                  <div className="p-3 rounded-xl bg-[#FDF7EE] border border-[#F8E5CA] text-[11px] text-[#C48A45] flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C48A45] shrink-0 mt-0.5" />
                    <div>
                      <strong>Evidence Limitations:</strong> {msg.limitations}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isSearching && (
          <div className="p-4 rounded-2xl card-base flex items-center gap-2.5 text-xs text-[#264E36] animate-pulse">
            <Cpu className="w-4 h-4 animate-spin text-[#2D5A3F]" />
            <span>Searching PubMed repository and synthesizing biological findings...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-6 card-base p-2.5 rounded-2xl border border-[#E0DACE] shadow-md bg-white">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#7C877E]" />
            <input
              type="text"
              placeholder="Ask about biological mechanisms, enzyme competition, or supporting trials..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-transparent text-xs sm:text-sm text-[#1F2421] placeholder-[#7C877E] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isSearching}
            className="px-4 py-2.5 rounded-xl bg-[#264E36] hover:bg-[#1D3E2B] disabled:opacity-40 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition"
          >
            <span>Ask AI</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
