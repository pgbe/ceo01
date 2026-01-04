
import React from 'react';

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  title: string;
  unit: string;
  highlightedRow: number | null;
  highlightedCol: number | null;
  showSum?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ headers, rows, title, unit, highlightedRow, highlightedCol, showSum = true }) => {
  if (rows.length === 0) {
    return <p>No data available.</p>;
  }

  const sumRow = showSum ? headers.slice(1).map((_, colIndex) => {
    return rows.reduce((sum, row) => {
      // FIX: Ensure value is a number before adding to sum. Treat non-numbers as 0.
      const value = row[colIndex + 1];
      if (typeof value === 'number') {
        return sum + value;
      }
      return sum;
    }, 0);
  }) : [];

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
        <span className="text-sm text-gray-500">(단위: {unit})</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                    highlightedCol === index ? 'bg-amber-100' : ''
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {showSum && (
              <tr className="bg-gray-100 font-bold">
                <td className="px-4 py-3 whitespace-nowrap text-gray-800">합계</td>
                {sumRow.map((total, index) => (
                  <td key={index} className="px-4 py-3 whitespace-nowrap text-gray-800 text-right">
                    {typeof total === 'number' ? total.toLocaleString(undefined, {maximumFractionDigits: 2}) : total}
                  </td>
                ))}
              </tr>
            )}
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={highlightedRow === rowIndex ? 'bg-amber-50' : 'hover:bg-gray-50'}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-3 whitespace-nowrap ${
                      highlightedRow === rowIndex && highlightedCol === cellIndex ? 'bg-amber-100' : ''
                    } ${cellIndex === 0 ? 'font-medium text-gray-800' : 'text-gray-600 text-right'}`}
                  >
                    {typeof cell === 'number' ? cell.toLocaleString(undefined, {maximumFractionDigits: 2}) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
