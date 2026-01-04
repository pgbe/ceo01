
import React from 'react';
import Card from './Card';
import { ArrowTrendingUpIcon } from './icons/ArrowTrendingUpIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';
import { CubeIcon } from './icons/CubeIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import type { DashboardSection } from '../types';

interface InitialViewProps {
  onSelectSection: (section: DashboardSection) => void;
}

const InitialView: React.FC<InitialViewProps> = ({ onSelectSection }) => {
  const summaryItems = [
    { id: 'purchase', title: '총 구매금액', value: '55.7억', change: '+2.5%', icon: <CurrencyDollarIcon />, description: '전월 대비 구매 금액이 증가했습니다. 원자재 가격 상승이 주 요인으로 분석됩니다.', decision: '원가 절감 방안 검토 필요.' },
    { id: 'inventory', title: '총 재고금액', value: '121.5억', change: '-5.2%', icon: <CubeIcon />, description: '장기 재고 비중이 소폭 감소했으나, 여전히 높은 수준입니다.', decision: '장기 재고 소진 프로모션 강화.' },
    { id: 'sales', title: '총 매출액', value: '55.7억', change: '+1.8%', icon: <ChartBarIcon />, description: '주력 상품 매출은 견조하나, 신규 상품의 매출 기여도가 낮습니다.', decision: '신규 상품 마케팅 전략 재수립.' },
    { id: 'profitability', title: '영업이익율', value: '-30.29%', change: '-32.0%p', icon: <ArrowTrendingUpIcon />, description: '매출원가 상승 및 판관비 증가로 영업이익률이 크게 하락했습니다.', decision: '전사적 비용 통제 및 수익성 개선 방안 모색.' },
    { id: 'cashAssets', title: '현금성자산', value: '88.6억', change: '+130%', icon: <BriefcaseIcon />, description: '단기 차입을 통한 유동성 확보로 현금성 자산이 크게 증가했습니다.', decision: '확보된 현금의 효율적 운용 계획 수립.' },
    { id: 'financialStatement', title: '부채비율', value: '437%', change: '+226%p', icon: <BriefcaseIcon />, description: '자본 감소와 부채 증가로 부채비율이 급등하여 재무 안정성 관리가 시급합니다.', decision: '자본 확충 및 부채 상환 계획 검토.' },
  ];

  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">CEO's Decision Hub</h2>
        <p className="text-gray-500 mb-8 text-md">주요 지표를 검토하고 신속한 의사결정을 내려주시기 바랍니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {summaryItems.map(item => (
                <Card key={item.id} onClick={() => onSelectSection(item.id as DashboardSection)} className="flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">{item.title}</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{item.value}</p>
                            <p className={`text-sm font-bold mt-1 ${item.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{item.change}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                           {item.icon}
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex-grow">
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm font-bold text-[#D4AF37] mt-3">
                          <span className="text-gray-700">Decision Point: </span>
                          <span className="font-semibold">{item.decision}</span>
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default InitialView;
