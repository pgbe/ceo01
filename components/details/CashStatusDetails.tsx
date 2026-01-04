
import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import type { Chart as ChartJS } from 'chart.js';
import { getElementAtEvent } from 'react-chartjs-2';
import * as chartData from '../../data';
import DataTable from '../DataTable';
import CashFlowStatement from './CashFlowStatement';

type Tab = 'cashAssets' | 'liquidity' | 'cashFlow';

interface CashStatusDetailsProps {
    initialTab: Tab;
}

const CashStatusDetails: React.FC<CashStatusDetailsProps> = ({ initialTab }) => {
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);
    const [highlight, setHighlight] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });
    const chartRef = useRef<ChartJS<'bar'>>(null);

    const handleChartClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (chartRef.current) {
            const elements = getElementAtEvent(chartRef.current, event);
            if (elements.length > 0) {
                const { datasetIndex, index } = elements[0];
                 setHighlight({ row: activeTab === 'cashAssets' ? 0 : datasetIndex, col: index + 1 });
            } else {
                setHighlight({ row: null, col: null });
            }
        }
    };

    const tabs = [
        { id: 'cashAssets', label: '현금성자산', data: chartData.cashAssetsData, options: chartData.barOptions('현금성자산 (억원)'), tableData: chartData.cashAssetsTableData, unit: '억원', showSum: false },
        { id: 'liquidity', label: '유동성', data: chartData.liquidityData, options: chartData.stackedBarOptions('유동성 (억원)'), tableData: chartData.liquidityTableData, unit: '억원' },
        { id: 'cashFlow', label: '현금흐름', data: chartData.cashFlowData, options: chartData.stackedBarOptions('현금흐름 (억원)'), tableData: chartData.cashFlowTableData, unit: '억원' },
    ];
    
    const currentTab = tabs.find(t => t.id === activeTab);

    return (
        <div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id as Tab)
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
                            <Bar 
                                ref={chartRef}
                                data={currentTab.data} 
                                options={currentTab.options}
                                onClick={handleChartClick}
                            />
                        </div>
                        {activeTab !== 'cashFlow' ? (
                             <DataTable
                                headers={currentTab.tableData.headers}
                                rows={currentTab.tableData.rows}
                                title={currentTab.label}
                                unit={currentTab.unit}
                                highlightedRow={highlight.row}
                                highlightedCol={highlight.col}
                                showSum={currentTab.showSum}
                            />
                        ) : (
                            <CashFlowStatement />
                        )}
                       
                    </>
                )}
            </div>
        </div>
    );
};

export default CashStatusDetails;
