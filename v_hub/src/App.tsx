import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import KPIGrid from './components/KPIGrid';
import Exceptions from './components/Exceptions';
import CustomerLens from './components/CustomerLens';
import Transformation from './components/Transformation';
import GoalsAlignment from './components/GoalsAlignment';
import DrillDownDrawer from './components/DrillDownDrawer';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDrillDown = (item: any) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  return (
    <div className="flex bg-bg-main min-h-screen font-inter selection:bg-grad-2 selection:text-white">
      {/* Sidebar - Requirement 05 */}
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Hero & AI Summary - Requirement 02 */}
        <Hero onDrillDown={handleDrillDown} />

        {/* Content Area */}
        <div className="flex-1 p-8 space-y-12 max-w-7xl mx-auto w-full">
          {/* Section 1: FY27 KPIs - Requirement 01 & 07 */}
          <KPIGrid onDrillDown={handleDrillDown} />

          <div className="grid grid-cols-1 gap-12">
            {/* Section 2: Top-Line Growth Exceptions - Requirement 03 */}
            <Exceptions onDrillDown={handleDrillDown} />

            {/* Section 3: Customer Lens - Requirement 04 */}
            <CustomerLens onDrillDown={handleDrillDown} />

            {/* Section 4: Transformation Tracking - Requirement 06 */}
            <Transformation onDrillDown={handleDrillDown} />

            {/* Section 5: Goals Alignment - Requirement 07 */}
            <GoalsAlignment onDrillDown={handleDrillDown} />
          </div>

          {/* Footer Metadata */}
          <footer className="pt-8 border-t border-panel-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-bold text-muted-text uppercase tracking-widest">
              <span>VOIS Hub · CEO Persona View</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-panel-border" />
              <span>Data as of Mar-26 close</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-panel-border" />
              <span className="text-grad-3">Refreshed by 06:00 UTC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-ink-soft uppercase tracking-widest">Powered by</span>
              <div className="bg-ink text-white px-2 py-0.5 font-barlow font-black text-xs rounded tracking-tighter">VOIS</div>
            </div>
          </footer>
        </div>
      </main>

      {/* Global Drill-down & Requirement context - Requirement 04 & 08 */}
      <DrillDownDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        data={selectedItem} 
      />
    </div>
  );
};

export default App;
