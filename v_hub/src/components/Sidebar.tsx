import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  Rocket, 
  Target, 
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  UserCircle
} from 'lucide-react';
import dashboardData from '../data/dashboard_data.json';

const Sidebar: React.FC = () => {
  const { branding, navigation, sections } = dashboardData;
  const stakeholderSlices = sections.find(s => s.id === "REQ 05 · 08")?.stakeholderSlices || [];

  const icons: Record<string, any> = {
    "CEO SUMMARY": <LayoutDashboard size={18} />,
    "TOP-LINE GROWTH": <TrendingUp size={18} />,
    "CUSTOMER": <Users size={18} />,
    "OPERATING": <Settings size={18} />,
    "BE UNRIVALLED": <ShieldCheck size={18} />,
    "PARTNERSHIP SUCCESS": <Rocket size={18} />,
    "TRANSFORMATION": <Rocket size={18} />,
    "FY27 GOALS": <Target size={18} />,
    "HELP": <HelpCircle size={18} />,
  };

  return (
    <aside className="w-64 h-screen bg-rail text-rail-text flex flex-col sticky top-0 left-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white/10 border border-white/20 px-3 py-1 font-barlow font-bold text-2xl tracking-widest uppercase">
          {branding.logo}
        </div>
        <div className="font-barlow font-light text-xl tracking-wider">
          {branding.name}
        </div>
      </div>

      <nav className="flex-1 px-4 py-4">
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] mb-4 px-2">
          Main Pillars
        </div>
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.label}>
              <a 
                href="#" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  item.active 
                    ? 'bg-grad-1 text-white shadow-lg' 
                    : 'hover:bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                <span className={item.active ? 'text-white' : 'text-white/40 group-hover:text-white/70 transition-colors'}>
                  {icons[item.label] || <ChevronRight size={18} />}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] mb-4 px-2">
            Stakeholder Slices
          </div>
          <ul className="space-y-1">
            {stakeholderSlices.map((slice) => (
              <li key={slice}>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-3 py-2 text-[13px] text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
                >
                  <UserCircle size={14} className="text-white/20 group-hover:text-white/40" />
                  {slice}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 bg-black/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-rail font-bold text-xs">
            {branding.user.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">{branding.user.name}</span>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">{branding.user.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
