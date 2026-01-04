import React, { useState, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import type { Chart as ChartJS } from 'chart.js';
import { getElementAtEvent } from 'react-chartjs-2';
import * as chartData from '../../data';
import DataTable from '../DataTable';

type Tab = 'financialStatement' | 'inventoryAssets' | 'turnover' | 'investment';

interface FinancialStockDetailsProps {
    initialTab: Tab;
}

const FinancialStockDetails: React.FC<FinancialStockDetailsProps> = ({ initialTab }) => {
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

    const tabs = [
        { id: 'financialStatement', label: '재무상태', data: chartData.financialStatementData, options: chartData.stackedBarOptions('재무상태 (억원)'), tableData: chartData.financialStatementTableData, unit: '억원 / %', showSum: false },
        { id: 'inventoryAssets', label: '재고자산', data: chartData.inventoryAssetsData, options: chartData.stackedBarOptions('재고자산 (억원)'), tableData: chartData.inventoryAssetsTableData, unit: '억원' },
        { id: 'turnover', label: '회전율', data: chartData.turnoverData, options: chartData.lineOptions('회전율 (회)'), tableData: chartData.turnoverTableData, unit: '회', showSum: false },
        { id: 'investment', label: '투지지표', data: chartData.investmentData, options: chartData.lineOptions('투지지표'), tableData: chartData.investmentTableData, unit: '원 / 배 / %', showSum: false },
    ];

    const currentTab = tabs.find(t => t.id === activeTab);
    const ChartComponent = activeTab === 'turnover' || activeTab === 'investment' ? Line : Bar;

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
                            <ChartComponent 
                                // FIX: Cast ref, data, and options to 'any' to handle type conflicts.
                                ref={chartRef as any}
                                data={currentTab.data as any} 
                                options={currentTab.options as any}
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

export default FinancialStockDetails;