
export type ViewType = 'initial' | 'dashboard';

export type DashboardSection = 
  'purchase' |
  'inventory' |
  'productionSausage' |
  'productionWhelk' |
  'costOfGoods' |
  'sales' |
  'profitability' |
  'marketShare' |
  'cashAssets' |
  'liquidity' |
  'cashFlow' |
  'financialStatement' |
  'inventoryAssets' |
  'turnover' |
  'investment';

export interface ChartData {
  labels: string[];
  datasets: any[];
}
