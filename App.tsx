
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Header from './components/Header';
import InitialView from './components/InitialView';
import DashboardView from './components/DashboardView';
import type { ViewType, DashboardSection } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Set default font for Chart.js
ChartJS.defaults.font.family = "'Inter', sans-serif";

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('initial');
  const [selectedSection, setSelectedSection] = useState<DashboardSection | null>(null);

  const handleSelectSection = (section: DashboardSection) => {
    setView('dashboard');
    setSelectedSection(section);
  };
  
  const goHome = () => {
    setView('initial');
    setSelectedSection(null);
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-['Inter']">
      <Header onHomeClick={goHome} />
      <main className="p-4 sm:p-6 lg:p-8">
        {view === 'initial' && <InitialView onSelectSection={handleSelectSection} />}
        {view === 'dashboard' && <DashboardView selectedSection={selectedSection} onSelectSection={setSelectedSection}/>}
      </main>
    </div>
  );
};

export default App;
