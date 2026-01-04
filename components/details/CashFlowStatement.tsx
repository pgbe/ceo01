
import React, { useState } from 'react';
import { cashFlowStatementIndirect, cashFlowStatementDirect } from '../../data';

type Tab = 'indirect' | 'direct';

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
};

const CashFlowStatement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('indirect');

    const renderTable = (data: typeof cashFlowStatementIndirect) => (
        <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">항목</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">금액 (원)</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr className={item.isBold ? 'bg-gray-100' : ''}>
                                <td className={`px-4 py-2 ${item.isBold ? 'font-bold text-gray-800' : 'text-gray-700'} ${item.indent ? 'pl-8' : ''}`}>
                                    {item.label}
                                </td>
                                <td className={`px-4 py-2 text-right ${item.isBold ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
                                    {formatNumber(item.value)}
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );


    return (
        <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-700">현금흐름표</h4>
            <div className="border-b border-gray-200 mt-2">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('indirect')}
                        className={`${
                            activeTab === 'indirect'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        간접법 (Indirect Method)
                    </button>
                    <button
                        onClick={() => setActiveTab('direct')}
                        className={`${
                            activeTab === 'direct'
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        직접법 (Direct Method)
                    </button>
                </nav>
            </div>
            {activeTab === 'indirect' ? renderTable(cashFlowStatementIndirect) : renderTable(cashFlowStatementDirect)}
        </div>
    );
};

export default CashFlowStatement;
