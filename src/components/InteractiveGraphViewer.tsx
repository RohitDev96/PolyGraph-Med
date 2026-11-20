import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Search, 
  X, 
  SlidersHorizontal,
  Flame,
  Info
} from 'lucide-react';
import { KnowledgeGraphNode, KnowledgeGraphEdge, NodeEntityType } from '../types';

interface InteractiveGraphViewerProps {
  initialNodes: KnowledgeGraphNode[];
  initialEdges: KnowledgeGraphEdge[];
  highlightedDrugIds?: string[];
  height?: string;
  showFiltersDefault?: boolean;
}

const TYPE_COLORS: Record<NodeEntityType, { bg: string; border: string; glow: string; text: string }> = {
  drug: { bg: '#2D5A3F', border: '#1D3E2B', glow: 'rgba(45, 90, 63, 0.15)', text: 'Drugs' },
  protein: { bg: '#5F7161', border: '#4A584C', glow: 'rgba(95, 113, 97, 0.15)', text: 'Target Proteins' },
  enzyme: { bg: '#C48A45', border: '#A66E2E', glow: 'rgba(196, 138, 69, 0.15)', text: 'CYP Enzymes' },
  pathway: { bg: '#7E9F85', border: '#63846A', glow: 'rgba(126, 159, 133, 0.15)', text: 'Pathways' },
  adverse_event: { bg: '#B84A3B', border: '#963528', glow: 'rgba(184, 74, 59, 0.15)', text: 'Adverse Signals' }
};

export const InteractiveGraphViewer: React.FC<InteractiveGraphViewerProps> = ({
  initialNodes,
  initialEdges,
  highlightedDrugIds = [],
  height = '580px',
  showFiltersDefault = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [typeFilters, setTypeFilters] = useState<Record<NodeEntityType, boolean>>({
    drug: true,
    protein: true,
    enzyme: true,
    pathway: true,
    adverse_event: true
  });
  const [showAttentionHeatmap, setShowAttentionHeatmap] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeGraphNode | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(showFiltersDefault);

  const nodesWithCoords = useMemo(() => {
    return initialNodes.map((node, i) => {
      let radius = 210;
      if (node.type === 'drug') radius = 140;
      if (node.type === 'protein') radius = 220;
      if (node.type === 'enzyme') radius = 190;
      if (node.type === 'pathway') radius = 260;
      if (node.type === 'adverse_event') radius = 300;

      const groupTypes: NodeEntityType[] = ['drug', 'enzyme', 'protein', 'pathway', 'adverse_event'];
      const typeIndex = groupTypes.indexOf(node.type);
      const angleOffset = (typeIndex / groupTypes.length) * Math.PI * 2;
      const angleWithinType = ((i % 5) / 5) * (Math.PI * 0.7);

      const angle = angleOffset + angleWithinType - Math.PI / 4;
      const x = Math.cos(angle) * radius + (Math.sin(i * 3) * 16);
      const y = Math.sin(angle) * radius + (Math.cos(i * 2) * 16);

      return {
        ...node,
        x,
        y,
        isHighlighted: highlightedDrugIds.includes(node.id)
      };
    });
  }, [initialNodes, highlightedDrugIds]);

  const graphNodesRef = useRef(nodesWithCoords);
  useEffect(() => {
    graphNodesRef.current = nodesWithCoords;
  }, [nodesWithCoords]);

  const visibleNodes = useMemo(() => {
    return graphNodesRef.current.filter(n => typeFilters[n.type]);
  }, [typeFilters, nodesWithCoords]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return initialEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [initialEdges, visibleNodeIds]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = canvas.width / 2 + pan.x;
    const centerY = canvas.height / 2 + pan.y;

    const clicked = visibleNodes.find(node => {
      const screenX = centerX + (node.x || 0) * zoom;
      const screenY = centerY + (node.y || 0) * zoom;
      const radius = (node.type === 'drug' ? 18 : 14) * zoom;
      const dist = Math.hypot(mouseX - screenX, mouseY - screenY);
      return dist <= radius;
    });

    if (clicked) {
      setSelectedNode(clicked);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    const centerX = canvas.width / 2 + pan.x;
    const centerY = canvas.height / 2 + pan.y;

    const hovered = visibleNodes.find(node => {
      const screenX = centerX + (node.x || 0) * zoom;
      const screenY = centerY + (node.y || 0) * zoom;
      const radius = (node.type === 'drug' ? 18 : 14) * zoom;
      const dist = Math.hypot(mouseX - screenX, mouseY - screenY);
      return dist <= radius;
    });

    setHoveredNode(hovered || null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const heightNum = (canvas.height = canvas.parentElement?.clientHeight || 580);

    const render = () => {
      ctx.clearRect(0, 0, width, heightNum);

      const centerX = width / 2 + pan.x;
      const centerY = heightNum / 2 + pan.y;

      // Draw Edges
      visibleEdges.forEach((edge) => {
        const sourceNode = visibleNodes.find(n => n.id === edge.source);
        const targetNode = visibleNodes.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode) return;

        const x1 = centerX + (sourceNode.x || 0) * zoom;
        const y1 = centerY + (sourceNode.y || 0) * zoom;
        const x2 = centerX + (targetNode.x || 0) * zoom;
        const y2 = centerY + (targetNode.y || 0) * zoom;

        const isConnectedToSelected = selectedNode && (sourceNode.id === selectedNode.id || targetNode.id === selectedNode.id);
        const isConnectedToHovered = hoveredNode && (sourceNode.id === hoveredNode.id || targetNode.id === hoveredNode.id);
        const isHighlighted = isConnectedToSelected || isConnectedToHovered;

        const attention = edge.attentionWeight || 0.6;
        let strokeColor = 'rgba(45, 90, 63, 0.14)';
        let lineWidth = 1.2 * zoom;

        if (showAttentionHeatmap) {
          if (attention > 0.9) {
            strokeColor = `rgba(184, 74, 59, ${isHighlighted ? 0.9 : 0.6})`;
            lineWidth = (isHighlighted ? 2.8 : 2) * zoom;
          } else if (attention > 0.8) {
            strokeColor = `rgba(196, 138, 69, ${isHighlighted ? 0.85 : 0.5})`;
            lineWidth = (isHighlighted ? 2.4 : 1.6) * zoom;
          } else {
            strokeColor = `rgba(45, 90, 63, ${isHighlighted ? 0.8 : 0.3})`;
            lineWidth = (isHighlighted ? 2 : 1.2) * zoom;
          }
        } else if (isHighlighted) {
          strokeColor = '#2D5A3F';
          lineWidth = 2.4 * zoom;
        }

        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (isHighlighted) {
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          ctx.font = `600 ${Math.max(9, 10 * zoom)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = '#264E36';
          ctx.fillText(edge.relation.toUpperCase(), midX + 6, midY - 6);
        }
      });

      // Draw Nodes
      visibleNodes.forEach((node) => {
        const x = centerX + (node.x || 0) * zoom;
        const y = centerY + (node.y || 0) * zoom;
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const isSearchMatch = searchQuery && node.label.toLowerCase().includes(searchQuery.toLowerCase());
        const isDrugHighlighted = highlightedDrugIds.includes(node.id);

        const colors = TYPE_COLORS[node.type];
        const baseRadius = node.type === 'drug' ? 14 : node.type === 'adverse_event' ? 13 : 11;
        const radius = (isSelected || isHovered ? baseRadius * 1.3 : baseRadius) * zoom;

        // Outer subtle halo
        ctx.beginPath();
        ctx.arc(x, y, radius * (isSelected ? 2 : 1.5), 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(45, 90, 63, 0.18)' : colors.glow;
        ctx.fill();

        // Node Body
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.bg;
        ctx.fill();

        // Node Border
        ctx.lineWidth = (isSelected ? 3 : 1.5) * zoom;
        ctx.strokeStyle = isSelected ? '#1D3E2B' : colors.border;
        ctx.stroke();

        // Search match dashed ring
        if (isSearchMatch) {
          ctx.beginPath();
          ctx.arc(x, y, radius * 1.7, 0, Math.PI * 2);
          ctx.strokeStyle = '#2D5A3F';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Label
        ctx.font = `${isSelected || isHovered ? '600' : '500'} ${Math.max(10, 11 * zoom)}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = isSelected ? '#264E36' : '#2C332E';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, x, y + radius + 13 * zoom);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [visibleNodes, visibleEdges, pan, zoom, selectedNode, hoveredNode, showAttentionHeatmap, searchQuery, highlightedDrugIds]);

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full rounded-3xl overflow-hidden card-base bg-white border border-[#E8E4DA]" style={{ height }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Search */}
        <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-[#E0DACE] px-3 py-1.5 shadow-sm">
          <Search className="w-4 h-4 text-[#7C877E] mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search drug, CYP, protein..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-[#1F2421] placeholder-[#7C877E] focus:outline-none w-44 sm:w-56"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="text-[#7C877E] hover:text-[#1F2421]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Toggles & Zoom */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setShowAttentionHeatmap(!showAttentionHeatmap)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition border ${
              showAttentionHeatmap 
                ? 'bg-[#EBF3ED] text-[#264E36] border-[#D4E5D8] font-semibold' 
                : 'bg-white text-[#525D55] border-[#E0DACE] hover:text-[#1F2421]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#C48A45]" />
            <span>XAI Weights</span>
          </button>

          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`p-2 rounded-xl text-xs flex items-center transition border ${
              showFilterPanel 
                ? 'bg-[#EBF3ED] text-[#264E36] border-[#D4E5D8]' 
                : 'bg-white text-[#525D55] border-[#E0DACE] hover:text-[#1F2421]'
            }`}
            title="Filter Nodes"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center bg-white rounded-xl border border-[#E0DACE] p-0.5 shadow-sm">
            <button 
              onClick={() => setZoom(z => Math.min(z + 0.2, 2.2))} 
              className="p-1.5 text-[#525D55] hover:text-[#264E36] transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} 
              className="p-1.5 text-[#525D55] hover:text-[#264E36] transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleReset} 
              className="p-1.5 text-[#525D55] hover:text-[#264E36] transition"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Node Filters */}
      {showFilterPanel && (
        <div className="absolute top-16 left-4 flex flex-wrap gap-1.5 max-w-lg pointer-events-auto bg-white/95 backdrop-blur-md p-2 rounded-xl border border-[#E0DACE] shadow-sm">
          {(Object.keys(TYPE_COLORS) as NodeEntityType[]).map((type) => {
            const active = typeFilters[type];
            const cfg = TYPE_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => setTypeFilters(f => ({ ...f, [type]: !f[type] }))}
                className={`text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition ${
                  active 
                    ? 'bg-[#F5F2EA] text-[#1F2421] font-semibold border border-[#E0DACE]' 
                    : 'opacity-40 text-[#7C877E] hover:opacity-75'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.bg }} />
                <span>{cfg.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Slide-Over Inspector */}
      {selectedNode && (
        <div className="absolute top-0 right-0 bottom-0 w-80 sm:w-92 bg-white/98 backdrop-blur-lg border-l border-[#E8E4DA] p-6 shadow-xl overflow-y-auto z-20 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#E8E4DA]">
              <div>
                <span 
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${TYPE_COLORS[selectedNode.type].bg}18`,
                    color: TYPE_COLORS[selectedNode.type].border 
                  }}
                >
                  {TYPE_COLORS[selectedNode.type].text}
                </span>
                <h3 className="text-base font-bold text-[#1F2421] mt-1.5">{selectedNode.label}</h3>
                {selectedNode.group && (
                  <p className="text-xs text-[#69756D]">{selectedNode.group}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-lg text-[#7C877E] hover:text-[#1F2421] hover:bg-[#F5F2EA] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {selectedNode.details?.clinicalRole && (
                <div className="card-warm p-3 rounded-xl space-y-1">
                  <span className="text-[#69756D] block text-[10px] uppercase font-semibold">Biological Role</span>
                  <p className="text-[#2C332E] leading-relaxed">{selectedNode.details.clinicalRole}</p>
                </div>
              )}

              {selectedNode.details?.riskCategory && (
                <div className="p-3 rounded-xl bg-[#FDF2F0] border border-[#F7D8D3] space-y-1">
                  <span className="text-[#B84A3B] block text-[10px] uppercase font-semibold">Clinical Note</span>
                  <p className="text-[#B84A3B] font-medium">{selectedNode.details.riskCategory}</p>
                </div>
              )}

              {/* Connected edges */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-[#69756D] uppercase tracking-wider block mb-2">
                  Connected Entities
                </span>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  {visibleEdges
                    .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((edge) => {
                      const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = visibleNodes.find(n => n.id === otherId);
                      return (
                        <div key={edge.id} className="p-2 rounded-lg card-warm flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-[#2D5A3F] font-mono text-[10px] mr-1.5 font-semibold">{edge.relation}</span>
                            <span className="text-[#1F2421] font-medium">{otherNode?.label || otherId}</span>
                          </div>
                          {edge.attentionWeight && (
                            <span className="text-[10px] text-[#C48A45] font-mono">
                              {(edge.attentionWeight * 100).toFixed(0)}%
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E4DA] mt-4 flex items-center justify-between text-xs">
            <span className="text-[#7C877E] text-[11px]">Node: <code className="text-[#1F2421]">{selectedNode.id}</code></span>
            <button 
              onClick={() => {
                setPan({
                  x: -(selectedNode.x || 0) * zoom,
                  y: -(selectedNode.y || 0) * zoom
                });
              }}
              className="px-2.5 py-1 rounded-lg bg-[#EBF3ED] text-[#264E36] hover:bg-[#DCEADB] transition text-[11px] font-semibold"
            >
              Focus Node
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
