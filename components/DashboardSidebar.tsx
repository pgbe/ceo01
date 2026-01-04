
import React from 'react';
import type { DashboardSection } from '../types';

interface DashboardSidebarProps {
  selectedSection: DashboardSection | null;
  onSelectSection: (section: DashboardSection) => void;
}

const sections = {
    "구매 생산 현황": [
        { id: 'purchase', label: '구매금액', value: '55.7억' },
        { id: 'inventory', label: '재고금액', value: '121.5억' },
        { id: 'productionSausage', label: '생산지표(소시지)', value: '1,595 KG' },
        { id: 'productionWhelk', label: '생산지표(골뱅이)', value: '116 CAN' },
        { id: 'costOfGoods', label: '제조원가율', value: '70.2%' },
    ],
    "판매 현황": [
        { id: 'sales', label: '매출액', value: '55.7억' },
        { id: 'profitability', label: '이익율', value: '-30.3%' },
        { id: 'marketShare', label: '시장 점유율', value: '39.0%' },
    ],
    "자금 현황": [
        { id: 'cashAssets', label: '현금성자산', value: '88.6억' },
        { id: 'liquidity', label: '유동부채', value: '305.2억' },
        { id: 'cashFlow', label: '현금흐름', value: '183.1억' },
    ],
    "재무 및 주가 현황": [
        { id: 'financialStatement', label: '재무상태', value: '자산 695.7억' },
        { id: 'inventoryAssets', label: '재고자산', value: '147.2억' },
        { id: 'turnover', label: '회전율', value: '매출채권 9.5회' },
        { id: 'investment', label: '투지지표', value: 'PER 186' },
    ]
};


const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ selectedSection, onSelectSection }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm h-full">
            {Object.entries(sections).map(([category, items]) => (
                <div key={category} className="mb-6">
                    <h3 className="text-md font-bold text-gray-800 mb-3 px-2 tracking-wide">{category}</h3>
                    <ul className="space-y-1">
                        {items.map(item => (
                            <li key={item.id}>
                                <button
                                    onClick={() => onSelectSection(item.id as DashboardSection)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm relative ${
                                        selectedSection === item.id 
                                        ? 'bg-blue-50 text-blue-800 font-semibold' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {selectedSection === item.id && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-lg"></span>}
                                    <div className="flex justify-between items-center">
                                        <span>{item.label}</span>
                                        <span className={`font-bold ${selectedSection === item.id ? 'text-blue-800' : 'text-gray-800'}`}>{item.value}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DashboardSidebar;
