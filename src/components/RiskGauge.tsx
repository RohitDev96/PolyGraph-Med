import React from 'react';

interface RiskGaugeProps {
  score: number; // 0-100
  size?: number;
  label?: string;
  showBreakdown?: boolean;
  documentedCount?: number;
  predictedCount?: number;
  pathwayOverlaps?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  size = 190,
  showBreakdown = true,
  documentedCount = 2,
  predictedCount = 3,
  pathwayOverlaps = 4
}) => {
  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const arcPercentage = 0.75;
  const totalArcLength = circumference * arcPercentage;
  const strokeDashoffset = totalArcLength - (score / 100) * totalArcLength;

  const getColor = (val: number) => {
    if (val >= 70) return { stroke: '#B84A3B', text: 'text-[#B84A3B]', bg: 'bg-[#FDF2F0] border-[#F7D8D3]', label: 'High Interaction Alert' };
    if (val >= 45) return { stroke: '#C48A45', text: 'text-[#C48A45]', bg: 'bg-[#FDF7EE] border-[#F8E5CA]', label: 'Moderate Overlap' };
    if (val >= 25) return { stroke: '#5A7C65', text: 'text-[#5A7C65]', bg: 'bg-[#F1F6F2] border-[#D9E6DC]', label: 'Low-Risk Overlap' };
    return { stroke: '#2D5A3F', text: 'text-[#2D5A3F]', bg: 'bg-[#EBF3ED] border-[#D4E5D8]', label: 'Minimal Risk' };
  };

  const status = getColor(score);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size * 0.88 }}>
        <svg 
          width={size} 
          height={size} 
          className="transform -rotate-[135deg]"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#E8E4DA"
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Value Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={status.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-4xl font-bold tracking-tight text-[#1F2421] font-mono">
            {score}
            <span className="text-sm text-[#7C877E] font-normal">/100</span>
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 border ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
      </div>

      {showBreakdown && (
        <div className="grid grid-cols-3 gap-2.5 w-full mt-4 pt-4 border-t border-[#E8E4DA] text-center">
          <div className="card-warm p-2.5 rounded-xl">
            <span className="block text-base font-bold text-[#B84A3B] font-mono">{documentedCount}</span>
            <span className="text-[10px] text-[#69756D] uppercase font-semibold">Documented</span>
          </div>
          <div className="card-warm p-2.5 rounded-xl">
            <span className="block text-base font-bold text-[#C48A45] font-mono">{predictedCount}</span>
            <span className="text-[10px] text-[#69756D] uppercase font-semibold">Predicted 3+</span>
          </div>
          <div className="card-warm p-2.5 rounded-xl">
            <span className="block text-base font-bold text-[#2D5A3F] font-mono">{pathwayOverlaps}</span>
            <span className="text-[10px] text-[#69756D] uppercase font-semibold">Pathways</span>
          </div>
        </div>
      )}

      <p className="text-[11px] text-[#7C877E] mt-3">
        Illustrative Polypharmacy Score for Clinician Review
      </p>
    </div>
  );
};
