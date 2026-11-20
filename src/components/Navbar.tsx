import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  GitFork, 
  BookOpen, 
  Shuffle, 
  FileText, 
  Sliders, 
  Zap,
  Menu,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export type ActivePage = 
  | 'landing' 
  | 'dashboard' 
  | 'analysis' 
  | 'results' 
  | 'graph' 
  | 'research' 
  | 'alternatives' 
  | 'simulation' 
  | 'reports';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenQuickScreen: () => void;
  hasActiveResults: boolean;
}

interface NavItem {
  id: ActivePage;
  label: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  badge?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenQuickScreen,
  hasActiveResults
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close 'More' dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'analysis', label: 'Screening', icon: Search },
    { id: 'results', label: 'Prediction', icon: Zap, badge: hasActiveResults ? 'Live' : undefined },
    { id: 'graph', label: 'Knowledge Graph', icon: GitFork },
    { id: 'research', label: 'PubMed RAG', icon: BookOpen },
    { id: 'alternatives', label: 'Alternatives', icon: Shuffle },
    { id: 'simulation', label: 'What-If', icon: Sliders },
    { id: 'reports', label: 'CDS Reports', icon: FileText }
  ];

  // For intermediate screens (lg: 1024px - 1340px)
  const primaryNavItems = allNavItems.slice(0, 4);
  const secondaryNavItems = allNavItems.slice(4);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const isSecondaryActive = secondaryNavItems.some(item => item.id === activePage);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#E8E3D9]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Far-Left: Brand Logo on a Single Line */}
        <button 
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-none"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#285C43] text-white shadow-xs transition group-hover:bg-[#1E4533]">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v6" />
              <path d="M12 15v6" />
              <path d="M4.93 4.93l4.24 4.24" />
              <path d="M14.83 14.83l4.24 4.24" />
              <path d="M3 12h6" />
              <path d="M15 12h6" />
            </svg>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-[15px] tracking-tight text-[#303A33]">
              PolyGraph<span className="text-[#285C43] font-semibold">-Med</span>
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#E6EFE6] text-[#285C43] border border-[#D5E4D5]">
              Clinical AI
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation (Full Width >= 1340px) */}
        <nav className="hidden 2xl:flex items-center gap-1 shrink-0">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#285C43] bg-[#E6EFE6] font-semibold'
                    : 'text-[#5C665F] hover:text-[#303A33] hover:bg-[#F3EFE6]/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#285C43]' : 'text-[#7C877E]'}`} strokeWidth={1.8} />
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#D4E5D4] text-[#285C43] ml-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Center: Medium Desktop / Laptop Navigation (1024px - 1339px) with 'More' Dropdown */}
        <nav className="hidden lg:flex 2xl:hidden items-center gap-1 shrink-0">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#285C43] bg-[#E6EFE6] font-semibold'
                    : 'text-[#5C665F] hover:text-[#303A33] hover:bg-[#F3EFE6]/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#285C43]' : 'text-[#7C877E]'}`} strokeWidth={1.8} />
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#D4E5D4] text-[#285C43] ml-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* More Menu Dropdown for remaining 4 items */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
                isSecondaryActive
                  ? 'text-[#285C43] bg-[#E6EFE6] font-semibold'
                  : 'text-[#5C665F] hover:text-[#303A33] hover:bg-[#F3EFE6]/80'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white border border-[#E8E3D9] rounded-xl shadow-lg py-1 z-50 animate-fade-in">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3.5 py-2 text-[13px] flex items-center gap-2.5 transition-colors ${
                        isActive
                          ? 'text-[#285C43] bg-[#E6EFE6] font-semibold'
                          : 'text-[#303A33] hover:bg-[#FAF8F2]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#285C43]' : 'text-[#7C877E]'}`} strokeWidth={1.8} />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Far-Right: Primary Actions with Uniform Height & Alignment */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenQuickScreen}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg bg-white hover:bg-[#F3EFE6] text-[#285C43] border border-[#E8E3D9] text-xs font-semibold shadow-xs transition whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-[#C48A45]" />
            <span>Quick Screen</span>
          </button>

          <button
            onClick={() => handleNavClick('analysis')}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-[#285C43] hover:bg-[#1E4533] text-white text-xs font-semibold shadow-xs transition active:scale-98 whitespace-nowrap"
          >
            <span>Analyze Regimen</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile Hamburger Toggle (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#5C665F] hover:text-[#303A33] hover:bg-[#F3EFE6] transition border border-[#E8E3D9]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F2] border-b border-[#E8E3D9] px-4 pt-3 pb-6 space-y-1 shadow-md">
          <div className="text-[11px] uppercase font-semibold text-[#7C877E] px-3 py-1 tracking-wider">
            Clinical Modules
          </div>
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activePage === 'landing' ? 'bg-[#E6EFE6] text-[#285C43] font-semibold' : 'text-[#303A33] hover:bg-[#F3EFE6]'
            }`}
          >
            Overview
          </button>
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isActive ? 'bg-[#E6EFE6] text-[#285C43] font-semibold' : 'text-[#303A33] hover:bg-[#F3EFE6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#285C43]' : 'text-[#7C877E]'}`} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E6EFE6] text-[#285C43] font-medium border border-[#D5E4D5]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-[#E8E3D9] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenQuickScreen();
                setMobileMenuOpen(false);
              }}
              className="w-full h-9 rounded-lg bg-white border border-[#E8E3D9] text-[#285C43] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#C48A45]" />
              <span>Quick Screen</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
