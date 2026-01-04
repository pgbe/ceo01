
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardDetailView from './DashboardDetailView';
import type { DashboardSection } from '../types';

interface DashboardViewProps {
  selectedSection: DashboardSection | null;
  onSelectSection: (section: DashboardSection) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ selectedSection, onSelectSection }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-3/12 xl:w-2/12">
        <DashboardSidebar selectedSection={selectedSection} onSelectSection={onSelectSection} />
      </div>
      <div className="lg:w-9/12 xl:w-10/12">
        {selectedSection && <DashboardDetailView section={selectedSection} />}
      </div>
    </div>
  );
};

export default DashboardView;
