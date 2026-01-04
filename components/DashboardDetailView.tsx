
import React from 'react';
import type { DashboardSection } from '../types';
import PurchaseProductionDetails from './details/PurchaseProductionDetails';
import SalesDetails from './details/SalesDetails';
import CashStatusDetails from './details/CashStatusDetails';
import FinancialStockDetails from './details/FinancialStockDetails';

interface DashboardDetailViewProps {
  section: DashboardSection;
}

const SectionToComponent: Record<DashboardSection, React.FC> = {
    purchase: () => <PurchaseProductionDetails initialTab="purchase"/>,
    inventory: () => <PurchaseProductionDetails initialTab="inventory"/>,
    productionSausage: () => <PurchaseProductionDetails initialTab="productionSausage"/>,
    productionWhelk: () => <PurchaseProductionDetails initialTab="productionWhelk"/>,
    costOfGoods: () => <PurchaseProductionDetails initialTab="costOfGoods"/>,
    sales: () => <SalesDetails initialTab="sales" />,
    profitability: () => <SalesDetails initialTab="profitability" />,
    marketShare: () => <SalesDetails initialTab="marketShare" />,
    cashAssets: () => <CashStatusDetails initialTab="cashAssets" />,
    liquidity: () => <CashStatusDetails initialTab="liquidity" />,
    cashFlow: () => <CashStatusDetails initialTab="cashFlow" />,
    financialStatement: () => <FinancialStockDetails initialTab="financialStatement"/>,
    inventoryAssets: () => <FinancialStockDetails initialTab="inventoryAssets"/>,
    turnover: () => <FinancialStockDetails initialTab="turnover"/>,
    investment: () => <FinancialStockDetails initialTab="investment"/>,
};

const sectionTitles: Record<DashboardSection, string> = {
    purchase: '구매금액 상세',
    inventory: '재고금액 상세',
    productionSausage: '생산지표 (소시지) 상세',
    productionWhelk: '생산지표 (골뱅이) 상세',
    costOfGoods: '제조원가율 상세',
    sales: '매출액 상세',
    profitability: '이익율 상세',
    marketShare: '품목별 시장 점유율 상세',
    cashAssets: '현금성자산 상세',
    liquidity: '유동성 상세',
    cashFlow: '현금흐름 상세',
    financialStatement: '재무상태 상세',
    inventoryAssets: '재고자산 상세',
    turnover: '회전율 상세',
    investment: '투지지표 상세',
};

const DashboardDetailView: React.FC<DashboardDetailViewProps> = ({ section }) => {
  const Component = SectionToComponent[section];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{sectionTitles[section]}</h2>
      {Component ? <Component /> : <p>선택된 항목이 없습니다.</p>}
    </div>
  );
};

export default DashboardDetailView;
