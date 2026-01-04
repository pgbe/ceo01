import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';

const luxuriousColors = {
  blue: { main: 'rgba(59, 130, 246, 0.8)', light: 'rgba(96, 165, 250, 0.8)' },
  red: { main: 'rgba(239, 68, 68, 0.8)', light: 'rgba(248, 113, 113, 0.8)' },
  green: { main: 'rgba(16, 185, 129, 0.8)', light: 'rgba(52, 211, 153, 0.8)' },
  yellow: { main: 'rgba(245, 158, 11, 0.8)', light: 'rgba(251, 191, 36, 0.8)' },
  purple: { main: 'rgba(139, 92, 246, 0.8)', light: 'rgba(167, 139, 250, 0.8)' },
  teal: { main: 'rgba(20, 184, 166, 0.8)', light: 'rgba(45, 212, 191, 0.8)' },
  grey: { main: 'rgba(107, 114, 128, 0.8)', light: 'rgba(156, 163, 175, 0.8)' },
  orange: { main: 'rgba(249, 115, 22, 0.8)', light: 'rgba(251, 146, 60, 0.8)'},
};

const luxuriousBorders = {
  blue: 'rgb(59, 130, 246)',
  red: 'rgb(239, 68, 68)',
  green: 'rgb(16, 185, 129)',
  yellow: 'rgb(245, 158, 11)',
  purple: 'rgb(139, 92, 246)',
  teal: 'rgb(20, 184, 166)',
  grey: 'rgb(107, 114, 128)',
  orange: 'rgb(249, 115, 22)',
};

const createGradient = (ctx: CanvasRenderingContext2D, color: { main: string, light: string }) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color.light);
    gradient.addColorStop(1, color.main);
    return gradient;
}


const labels = ['22년', '23년', '24년', '25년8월', '25년9월', '25년10월'];

// === Generic Chart Options ===

// FIX: Specify chart types to ensure correct scale option inference and avoid type errors.
const baseOptions = (titleText: string): ChartOptions<'bar' | 'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: { size: 12 },
        color: '#4B5563'
      }
    },
    title: {
      display: true,
      text: titleText,
      font: {
        size: 18,
        weight: 'bold',
      },
      color: '#1F2937'
    },
    tooltip: {
        backgroundColor: '#1F2937',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        boxPadding: 4,
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
       ticks: {
         color: '#6B7280',
         font: { size: 12 }
       }
    },
    y: {
      border: {
        dash: [4, 4],
      },
      grid: {
        color: '#E5E7EB',
      },
      ticks: {
         color: '#6B7280',
         font: { size: 12 }
       }
    },
  },
});

export const stackedBarOptions = (title: string): ChartOptions<'bar'> => ({
  ...baseOptions(title),
  scales: {
    x: {
      ...baseOptions(title).scales?.x,
      stacked: true,
    },
    y: {
      ...baseOptions(title).scales?.y,
      stacked: true,
    },
  },
  plugins: {
    ...baseOptions(title).plugins,
     datalabels: {
        color: '#ffffff',
        font: { weight: 'bold', size: 10 },
        formatter: (value: number) => (value === 0 ? '' : value.toLocaleString()),
        anchor: 'center',
        align: 'center',
     }
  }
});

export const barOptions = (title: string): ChartOptions<'bar'> => ({
    ...baseOptions(title),
    plugins: {
    ...baseOptions(title).plugins,
     datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#4B5563',
        font: { weight: 'bold', size: 10 },
        formatter: (value: number) => (value === 0 ? '' : value.toLocaleString()),
     }
  }
});


export const lineOptions = (title: string): ChartOptions<'line'> => ({
    ...baseOptions(title),
    elements: {
        line: {
            tension: 0.4,
            borderWidth: 3,
            // FIX: Removed 'showLine' as it's not a valid property here and defaults to true.
        },
        point: {
            radius: 4,
            hoverRadius: 7,
            backgroundColor: '#ffffff'
        }
    },
    plugins: {
        ...baseOptions(title).plugins,
        datalabels: {
            backgroundColor: (context: any) => context.dataset.borderColor,
            borderRadius: 4,
            color: 'white',
            font: { weight: 'bold' },
            padding: { top: 4, bottom: 2, left: 6, right: 6 },
            formatter: (value: any) => {
                if(value === 0) return '';
                if (typeof value === 'object' && value !== null && 'y' in value) {
                    return `${value.y}%`;
                }
                return typeof value === 'number' ? value.toLocaleString() : value;
            }
        }
    }
});

// === 1. 구매 생산 현황 ===

export const purchaseAmountData: ChartData<'bar'> = {
  labels,
  datasets: [
    { label: '수산물제조', data: [28.0, 28.6, 29.9, 31.9, 32.3, 24.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.blue) },
    { label: '축육유통', data: [31.8, 44.5, 41.3, 47.3, 43.9, 31.6], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.teal) },
  ],
};
export const purchaseAmountTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['수산물제조', 28.0, 28.6, 29.9, 31.9, 32.3, 24.1],
        ['축육유통', 31.8, 44.5, 41.3, 47.3, 43.9, 31.6],
    ],
};

export const inventoryAmountData: ChartData<'bar'> = {
  labels,
  datasets: [
    { label: '3개월 경과', data: [28.0, 28.6, 29.9, 31.9, 32.3, 24.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.yellow) },
    { label: '6개월 경과', data: [28.0, 28.6, 29.9, 31.9, 32.3, 24.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.orange) },
    { label: '9개월 경과', data: [28.0, 28.6, 29.9, 31.9, 32.3, 24.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.red) },
    { label: '12개월 경과', data: [28.0, 28.6, 29.9, 31.9, 32.3, 24.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.purple) },
    { label: '1년초과 경과', data: [28.0, 28.6, 29.9, 31.9, 32.3, 24.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.grey) },
  ],
};
export const inventoryAmountTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['3개월 경과', 28.0, 28.6, 29.9, 31.9, 32.3, 24.1],
        ['6개월 경과', 28.0, 28.6, 29.9, 31.9, 32.3, 24.1],
        ['9개월 경과', 28.0, 28.6, 29.9, 31.9, 32.3, 24.1],
        ['12개월 경과', 28.0, 28.6, 29.9, 31.9, 32.3, 24.1],
        ['1년초과 경과', 28.0, 28.6, 29.9, 31.9, 32.3, 24.1],
    ],
};

export const productionSausageData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '생산수량(소시지)', data: [4346, 4386, 4718, 4718, 446, 1595], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: '가동율(소시지)', data: [60, 78, 64, 64, 73, 74], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
        { label: '판매수량(소시지)', data: [9248, 10318, 9878, 9878, 435, 361], borderColor: luxuriousBorders.green, backgroundColor: luxuriousBorders.green },
    ],
};
export const productionSausageTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['생산수량(소시지)', 4346, 4386, 4718, 4718, 446, 1595],
        ['가동율(소시지)', '60%', '78%', '64%', '64%', '73%', '74%'],
        ['판매수량(소시지)', 9248, 10318, 9878, 9878, 435, 361],
    ],
};

export const productionWhelkData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '생산수량(골뱅이)', data: [908, 1119, 1342, 1342, 103, 116], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: '가동율(골뱅이)', data: [31, 49, 45, 45, 85, 93], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
        { label: '판매수량(골뱅이)', data: [224, 1066, 1139, 1139, 90, 67], borderColor: luxuriousBorders.green, backgroundColor: luxuriousBorders.green },
    ],
};
export const productionWhelkTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['생산수량(골뱅이)', 908, 1119, 1342, 1342, 103, 116],
        ['가동율(골뱅이)', '31%', '49%', '45%', '45%', '85%', '93%'],
        ['판매수량(골뱅이)', 224, 1066, 1139, 1139, 90, 67],
    ],
};

export const costOfGoodsData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '생산액', data: [300.1, 313.0, 327.9, 30.2, 31.4, 59.36], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: '제조원가율', data: [79.6, 78.1, 77.7, 77.4, 75.3, 70.2], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
    ],
};
export const costOfGoodsTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['생산액', 300.1, 313.0, 327.9, 30.2, 31.4, 59.36],
        ['제조원가율', '79.6%', '78.1%', '77.7%', '77.4%', '75.3%', '70.2%'],
    ],
};

// === 2. 판매 현황 ===
export const salesAmountData = purchaseAmountData; // Same data
export const salesAmountTableData = purchaseAmountTableData; // Same data

export const profitabilityData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '매출총이익율', data: [8.54, 7.82, 8.54, 8.60, 9.96, -26.56], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: '영업이익율', data: [1.24, 0.33, 0.01, 0.63, 1.63, -30.29], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
    ],
};
export const profitabilityTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['매출총이익율', '8.54%', '7.82%', '8.54%', '8.60%', '9.96%', '-26.56%'],
        ['영업이익율', '1.24%', '0.33%', '0.01%', '0.63%', '1.63%', '-30.29%'],
    ],
};

export const marketShareSausageData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '신라에스지(소시지류)', data: [35, 36, 39, 39, 39, 39], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
        { label: '경쟁사(소시지류)', data: [65, 64, 61, 61, 61, 61], borderColor: luxuriousBorders.grey, backgroundColor: luxuriousBorders.grey },
    ],
};
export const marketShareMeatData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '신라에스지(축육)', data: [1, 1, 1, 1, 1, 1], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: '경쟁사(축육)', data: [99, 99, 99, 99, 99, 99], borderColor: luxuriousBorders.grey, backgroundColor: luxuriousBorders.grey },
    ],
};
export const marketShareTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['신라에스지(소시지류)', '35.00%', '36.00%', '39.00%', '39.00%', '39.00%', '39.00%'],
        ['경쟁사(소시지류)', '65.00%', '64.00%', '61.00%', '61.00%', '61.00%', '61.00%'],
        ['신라에스지(축육)', '1.00%', '1.00%', '1.00%', '1.00%', '1.00%', '1.00%'],
        ['경쟁사(축육)', '99.00%', '99.00%', '99.00%', '99.00%', '99.00%', '99.00%'],
    ],
};


// === 3. 자금 현황 ===
export const cashAssetsData: ChartData<'bar'> = {
  labels,
  datasets: [
    { label: '현금성자산', data: [27.4, 21.5, 20.5, 32.9, 38.4, 88.6], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.blue) },
  ],
};
export const cashAssetsTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['현금성자산', 27.4, 21.5, 20.5, 32.9, 38.4, 88.6],
    ]
};

export const liquidityData: ChartData<'bar'> = {
  labels,
  datasets: [
    { label: '채권', data: [27.4, 21.5, 20.5, 32.9, 38.4, 88.6], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.green) },
    { label: '매입채무', data: [18.0, 22.7, 35.7, 26.3, 26.3, 90.9], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.orange) },
    { label: '단기차입금', data: [196.5, 168.9, 88.8, 214.3, 214.3, 214.3], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.red) },
    { label: '장기차입금', data: [40.9, 80.7, 106.1, 31.5, 30.8, 31.5], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.purple) },
    { label: '기타비유동부채', data: [2.5, 23.7, 26.8, 19.8, 15.7, 24.7], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.grey) },
  ],
};
export const liquidityTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['채권', 27.4, 21.5, 20.5, 32.9, 38.4, 88.6],
        ['매입채무', 18.0, 22.7, 35.7, 26.3, 26.3, 90.9],
        ['단기차입금', 196.5, 168.9, 88.8, 214.3, 214.3, 214.3],
        ['장기차입금', 40.9, 80.7, 106.1, 31.5, 30.8, 31.5],
        ['기타비유동부채', 2.5, 23.7, 26.8, 19.8, 15.7, 24.7],
    ]
};

export const cashFlowData: ChartData<'bar'> = {
  labels,
  datasets: [
    { label: '영업활동', data: [122.0, 122.0, 122.0, 122.0, 122.0, 122.0], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.blue) },
    { label: '투자활동', data: [1.1, 1.1, 1.1, 1.1, 1.1, 1.1], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.teal) },
    { label: '재무활동', data: [60.0, 60.0, 60.0, 60.0, 60.0, 60.0], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.orange) },
  ],
};
export const cashFlowTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['영업활동', 122.0, 122.0, 122.0, 122.0, 122.0, 122.0],
        ['투자활동', 1.1, 1.1, 1.1, 1.1, 1.1, 1.1],
        ['재무활동', 60.0, 60.0, 60.0, 60.0, 60.0, 60.0],
    ]
};

// === 4. 재무 및 주가 현황 ===

export const financialStatementData: ChartData<'bar'> = {
    labels,
    datasets: [
        { label: '자산', data: [477.8, 493.5, 458.6, 498.3, 490.1, 695.7], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.blue) },
        { label: '부채', data: [299.8, 317.7, 285.0, 341.0, 332.5, 566.2], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.orange) },
        { label: '자본', data: [177.9, 175.8, 173.6, 157.3, 157.6, 129.6], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.green) },
    ],
};
export const financialStatementTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['자산', 477.8, 493.5, 458.6, 498.3, 490.1, 695.7],
        ['부채', 299.8, 317.7, 285.0, 341.0, 332.5, 566.2],
        ['자본', 177.9, 175.8, 173.6, 157.3, 157.6, 129.6],
        ['부채비율', '168%', '181%', '164%', '217%', '211%', '437%'],
    ],
};

export const inventoryAssetsData: ChartData<'bar'> = {
    labels,
    datasets: [
        { label: '상품', data: [106.58, 115.72, 25.4, 75.0, 44.2, 47.5], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.blue) },
        { label: '제품', data: [5.65, 5.42, 10.4, 7.9, 8.2, 32.7], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.teal) },
        { label: '재공품', data: [2.46, 2.42, 1.0, 4.2, 4.6, 2.0], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.green) },
        { label: '원재료', data: [62.96, 32.46, 50.8, 53.7, 58.5, 56.8], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.yellow) },
        { label: '부재료', data: [7.02, 6.63, 7.7, 5.8, 5.6, 8.2], backgroundColor: (ctx: ScriptableContext<'bar'>) => createGradient(ctx.chart.ctx, luxuriousColors.orange) },
    ],
};
export const inventoryAssetsTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['상품', 106.58, 115.72, 25.4, 75.0, 44.2, 47.5],
        ['제품', 5.65, 5.42, 10.4, 7.9, 8.2, 32.7],
        ['재공품', 2.46, 2.42, 1.0, 4.2, 4.6, 2.0],
        ['원재료', 62.96, 32.46, 50.8, 53.7, 58.5, 56.8],
        ['부재료', 7.02, 6.63, 7.7, 5.8, 5.6, 8.2],
    ],
};

export const turnoverData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '매출채권회전율', data: [24.1, 35.8, 40.7, 17.8, 15.4, 9.5], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: '재고자산회전율', data: [4.0, 4.1, 4.2, 2.5, 3.2, 3.4], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
        { label: '매입채무회전율', data: [15.0, 23.8, 22.2, 15.3, 20.9, 10.3], borderColor: luxuriousBorders.green, backgroundColor: luxuriousBorders.green },
    ],
};
export const turnoverTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['매출채권회전율', 24.1, 35.8, 40.7, 17.8, 15.4, 9.5],
        ['재고자산회전율', 4.0, 4.1, 4.2, 2.5, 3.2, 3.4],
        ['매입채무회전율', 15.0, 23.8, 22.2, 15.3, 20.9, 10.3],
    ],
};

export const investmentData: ChartData<'line'> = {
    labels,
    datasets: [
        { label: '주가', data: [5580, 5580, 5580, 5580, 5580, 5580], borderColor: luxuriousBorders.blue, backgroundColor: luxuriousBorders.blue },
        { label: 'PER', data: [186, 186, 186, 186, 186, 186], borderColor: luxuriousBorders.red, backgroundColor: luxuriousBorders.red },
        { label: 'EPS', data: [30, 30, 30, 30, 30, 30], borderColor: luxuriousBorders.green, backgroundColor: luxuriousBorders.green },
        { label: 'PBR', data: [1, 1, 1, 1, 1, 1], borderColor: luxuriousBorders.yellow, backgroundColor: luxuriousBorders.yellow },
        { label: 'BPS', data: [3941, 3941, 3941, 3941, 3941, 3941], borderColor: luxuriousBorders.purple, backgroundColor: luxuriousBorders.purple },
    ],
};
export const investmentTableData = {
    headers: ['항목', ...labels],
    rows: [
        ['주가', 5580, 5580, 5580, 5580, 5580, 5580],
        ['PER', 186, 186, 186, 186, 186, 186],
        ['EPS', 30, 30, 30, 30, 30, 30],
        ['PBR', 1, 1, 1, 1, 1, 1],
        ['BPS', 3941, 3941, 3941, 3941, 3941, 3941],
    ],
};

// Cash Flow Statement Data
export const cashFlowStatementIndirect = [
    { label: 'I. 영업활동으로 인한 현금흐름', value: 12196409369, isBold: true, indent: false },
    { label: '당기순이익', value: 223403946, isBold: false, indent: true },
    { label: '현금유출이 없는 비용 가산', value: 121287968, isBold: false, indent: true },
    { label: '현금유입이 없는 수익 차감', value: -113843051, isBold: false, indent: true },
    { label: '영업활동 관련 자산/부채 변동', value: 11965560506, isBold: false, indent: true },
    { label: 'II. 투자활동으로 인한 현금흐름', value: 110394610, isBold: true, indent: false },
    { label: '유형자산의 처분', value: 110394610, isBold: false, indent: true },
    { label: 'III. 재무활동으로 인한 현금흐름', value: 6000000000, isBold: true, indent: false },
    { label: '단기차입금의 증가', value: 6000000000, isBold: false, indent: true },
    { label: 'IV. 현금의 증가', value: 18306803979, isBold: true, indent: false },
    { label: '기초현금', value: 3838428866, isBold: false, indent: true },
    { label: '기말현금', value: 22145232845, isBold: false, indent: true },
];

export const cashFlowStatementDirect = [
    { label: 'I. 영업활동으로 인한 현금흐름', value: 12196409369, isBold: true, indent: false },
    { label: '매출 등으로부터의 현금유입', value: 12500000000, isBold: false, indent: true },
    { label: '매입 등에 따른 현금유출', value: -303590631, isBold: false, indent: true },
    { label: 'II. 투자활동으로 인한 현금흐름', value: 110394610, isBold: true, indent: false },
    { label: '유형자산 처분으로 인한 현금유입', value: 110394610, isBold: false, indent: true },
    { label: 'III. 재무활동으로 인한 현금흐름', value: 6000000000, isBold: true, indent: false },
    { label: '차입금으로 인한 현금유입', value: 6000000000, isBold: false, indent: true },
    { label: 'IV. 현금의 증가', value: 18306803979, isBold: true, indent: false },
    { label: '기초현금', value: 3838428866, isBold: false, indent: true },
    { label: '기말현금', value: 22145232845, isBold: false, indent: true },
];