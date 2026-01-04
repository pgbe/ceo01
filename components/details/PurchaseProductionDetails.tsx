import React, { useState, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import type { Chart as ChartJS, InteractionItem } from 'chart.js';
import { getElementAtEvent } from 'react-chartjs-2';
import * as chartData from '../../data';
import DataTable from '../DataTable';

type Tab = 'purchase' | 'inventory' | 'productionSausage' | 'productionWhelk' | 'costOfGoods';

interface PurchaseProductionDetailsProps {
    initialTab: Tab;
}

const PurchaseProductionDetails: React.FC<PurchaseProductionDetailsProps> = ({ initialTab }) => {
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);
    const [highlight, setHighlight] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });
    const chartRef = useRef<ChartJS>(null);

    const handleChartClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (chartRef.current) {
            const elements = getElementAtEvent(chartRef.current, event);
            if (elements.length > 0) {
                const { datasetIndex, index } = elements[0];
                setHighlight({ row: datasetIndex, col: index + 1 });
            } else {
                setHighlight({ row: null, col: null });
            }
        }
    };
    
    const tabs: { id: Tab; label: string; data: any; options: any; tableData: any; unit: string; showSum?: boolean}[] = [
        { id: 'purchase', label: '구매금액', data: chartData.purchaseAmountData, options: chartData.stackedBarOptions('구매금액 (억원)'), tableData: chartData.purchaseAmountTableData, unit: '억원' },
        { id: 'inventory', label: '재고금액', data: chartData.inventoryAmountData, options: chartData.stackedBarOptions('재고금액 (억원)'), tableData: chartData.inventoryAmountTableData, unit: '억원' },
        { id: 'productionSausage', label: '생산(소시지)', data: chartData.productionSausageData, options: chartData.lineOptions('생산지표 (소시지)'), tableData: chartData.productionSausageTableData, unit: 'KG / %' },
        { id: 'productionWhelk', label: '생산(골뱅이)', data: chartData.productionWhelkData, options: chartData.lineOptions('생산지표 (골뱅이)'), tableData: chartData.productionWhelkTableData, unit: 'CAN / %' },
        { id: 'costOfGoods', label: '제조원가율', data: chartData.costOfGoodsData, options: chartData.lineOptions('제조원가율 (%)'), tableData: chartData.costOfGoodsTableData, unit: '억원 / %', showSum: false },
    ];

    const currentTab = tabs.find(t => t.id === activeTab);
    const ChartComponent = activeTab === 'purchase' || activeTab === 'inventory' ? Bar : Line;

  return (
    <div>
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id)
                          setHighlight({row: null, col: null});
                        }}
                        className={`${
                        activeTab === tab.id
                            ? 'border-blue-500 text-blue-600 font-semibold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
        <div className="mt-6">
            {currentTab && (
                <>
                    <div className="h-96">
                        <ChartComponent 
                            // FIX: Cast ref to 'any' to resolve type conflict between Bar and Line chart refs.
                            ref={chartRef as any}
                            data={currentTab.data} 
                            options={currentTab.options}
                            onClick={handleChartClick}
                        />
                    </div>
                    <DataTable
                        headers={currentTab.tableData.headers}
                        rows={currentTab.tableData.rows}
                        title={currentTab.label}
                        unit={currentTab.unit}
                        highlightedRow={highlight.row}
                        highlightedCol={highlight.col}
                        showSum={currentTab.showSum}
                    />
                </>
            )}
        </div>
    </div>
  );
};

export default PurchaseProductionDetails;