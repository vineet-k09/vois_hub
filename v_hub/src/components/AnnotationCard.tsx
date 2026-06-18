import React from 'react';
import { BookOpen, User, GitBranch, CheckCircle2 } from 'lucide-react';

interface AnnotationCardProps {
  id: string;
  title: string;
  status: string;
  feedback: string[];
  description: string;
  dependencies: string[];
  acceptanceCriteria: string | string[];
  userStory: string;
}

const AnnotationCard: React.FC<AnnotationCardProps> = ({
  id,
  title,
  status,
  feedback,
  description,
  dependencies,
  acceptanceCriteria,
  userStory,
}) => {
  // Map status to clean styling classes
  const getStatusStyle = (statusStr: string) => {
    const s = statusStr.toUpperCase();
    if (s.includes('GREEN') || s.includes('READY')) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        border: 'border-l-emerald-500',
        led: 'bg-emerald-500',
      };
    } else if (s.includes('AMBER') || s.includes('PROGRESS') || s.includes('DRILL')) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        border: 'border-l-amber-500',
        led: 'bg-amber-500',
      };
    } else if (s.includes('RED') || s.includes('BLOCKED')) {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        border: 'border-l-rose-500',
        led: 'bg-rose-500',
      };
    } else {
      return {
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        border: 'border-l-slate-400',
        led: 'bg-slate-400',
      };
    }
  };

  const statusStyle = getStatusStyle(status);

  return (
    <div className={`anno-card mt-5 border border-slate-200/80 border-l-4 ${statusStyle.border} bg-slate-50/50 p-5 rounded-2xl shadow-sm relative overflow-hidden transition-all hover:shadow-md`}>
      {/* Decorative Top-Right Subtle Watermark */}
      <div className="absolute top-2 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none select-none">
        Executive Strategy Brief
      </div>

      {/* Brief Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3.5 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white text-sm font-black w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
            {id.padStart(2, '0')}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              {title}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">
              Workshop Alignment Metadata
            </p>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border flex items-center gap-1.5 ${statusStyle.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.led}`} />
          {status}
        </span>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Left Column: Context & Executive User Story */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h5 className="text-[10px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen size={12} /> Strategic Objective
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {description}
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-3.5 rounded-xl shadow-xs border-l-3 border-red-500 italic relative">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              User Story / CEO Requirement
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              "{userStory}"
            </p>
          </div>
        </div>

        {/* Right Column: Feedback, Acceptance Criteria & Dependencies */}
        <div className="space-y-4">
          {/* Workshop Comments / Feedback */}
          {feedback && feedback.length > 0 && (
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <User size={12} /> Workshop Comments & Decisions
              </h5>
              <ul className="space-y-1.5">
                {feedback.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-600 leading-snug flex items-start gap-2 pl-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Grid for Acceptance Criteria and Dependencies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Dependencies */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <GitBranch size={12} /> Dependencies
              </h5>
              <div className="flex flex-wrap gap-1">
                {dependencies.map((dep, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-md leading-tight">
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            {/* Acceptance Criteria */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600" /> Acceptance Criteria
              </h5>
              <div className="text-xs text-slate-600 leading-relaxed">
                {Array.isArray(acceptanceCriteria) ? (
                  <ul className="space-y-1 list-none pl-0">
                    {acceptanceCriteria.map((ac, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{ac}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{acceptanceCriteria}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationCard;
