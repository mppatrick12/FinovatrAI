import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";

// Professional SVG Icons
const ReportsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SalesIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ExpensesIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProfitIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TrendUpIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ChartIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Mock data for reports
  const monthlyData = [
    { month: 'Jan', sales: 8500, expenses: 3200, profit: 5300 },
    { month: 'Feb', sales: 7400, expenses: 2800, profit: 4600 },
    { month: 'Mar', sales: 9500, expenses: 4200, profit: 5300 },
    { month: 'Apr', sales: 11200, expenses: 4800, profit: 6400 },
    { month: 'May', sales: 10800, expenses: 4500, profit: 6300 },
    { month: 'Jun', sales: 12500, expenses: 5200, profit: 7300 },
    { month: 'Jul', sales: 13200, expenses: 5800, profit: 7400 },
    { month: 'Aug', sales: 14100, expenses: 6100, profit: 8000 },
    { month: 'Sep', sales: 15200, expenses: 6500, profit: 8700 }
  ];

  const totalSales = monthlyData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalSales - totalExpenses;
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white mr-3">
              <ReportsIcon />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Business Reports & Analytics
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Comprehensive business insights, financial analytics, and performance metrics
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600">
                  <SalesIcon />
                </div>
                <span className="text-xs font-medium text-green-600 flex items-center">
                  <TrendUpIcon className="w-3 h-3 mr-1" />
                  +12.5%
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Sales</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(totalSales)}</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600">
                  <ExpensesIcon />
                </div>
                <span className="text-xs font-medium text-red-600 flex items-center">
                  <TrendUpIcon className="w-3 h-3 mr-1" />
                  +8.3%
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Expenses</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                  <ProfitIcon />
                </div>
                <span className="text-xs font-medium text-blue-600 flex items-center">
                  <TrendUpIcon className="w-3 h-3 mr-1" />
                  +15.7%
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Net Profit</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(totalProfit)}</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600">
                  <ReportsIcon />
                </div>
                <span className="text-xs font-medium text-purple-600 flex items-center">
                  <TrendUpIcon className="w-3 h-3 mr-1" />
                  +5.2%
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Profit Margin</p>
              <p className="text-xl font-bold text-gray-800">{profitMargin.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative min-w-[200px]">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <CalendarIcon />
                  </div>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 text-sm"
                  >
                    <option value="weekly">Weekly Report</option>
                    <option value="monthly">Monthly Report</option>
                    <option value="quarterly">Quarterly Report</option>
                    <option value="yearly">Yearly Report</option>
                  </select>
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4">
                <DownloadIcon />
                <span className="ml-2 text-sm font-medium">Export Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ChartIcon className="w-5 h-5 mr-2 text-gray-600" />
                  Sales vs Expenses Trend
                </h3>
                <span className="text-xs text-gray-500">Monthly</span>
              </div>
              <div className="h-64 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ChartIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Sales vs Expenses Chart</h4>
                  <p className="text-xs text-gray-500">Monthly comparison data visualization</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-600">Sales</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-600">Expenses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-gray-600">Profit</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendUpIcon className="w-5 h-5 mr-2 text-gray-600" />
                  Profit Margin Analysis
                </h3>
                <span className="text-xs text-gray-500">Year-to-date</span>
              </div>
              <div className="h-64 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendUpIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Profit Margin Trend</h4>
                  <p className="text-xs text-gray-500">Visualizing profitability over time</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Current Quarter Performance</p>
                  <p className="text-lg font-semibold text-green-600 mt-1">+12.4% Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
              Key Performance Indicators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Gross Profit Margin</h4>
                  <span className="text-xs font-medium text-green-600">+2.3%</span>
                </div>
                <p className="text-xl font-bold text-gray-800">68.5%</p>
                <p className="text-xs text-gray-500 mt-1">Above industry average</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Return on Investment</h4>
                  <span className="text-xs font-medium text-blue-600">+1.8%</span>
                </div>
                <p className="text-xl font-bold text-gray-800">24.8%</p>
                <p className="text-xs text-gray-500 mt-1">Strong performance</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Customer Retention</h4>
                  <span className="text-xs font-medium text-purple-600">+4.2%</span>
                </div>
                <p className="text-xl font-bold text-gray-800">89.3%</p>
                <p className="text-xs text-gray-500 mt-1">Excellent retention</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Inventory Turnover</h4>
                  <span className="text-xs font-medium text-yellow-600">+0.7x</span>
                </div>
                <p className="text-xl font-bold text-gray-800">8.2x</p>
                <p className="text-xs text-gray-500 mt-1">Healthy turnover rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Monthly Report Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Monthly Financial Breakdown
                </h3>
                <span className="text-xs text-gray-500">Year 2025</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Month</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Sales</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Expenses</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Net Profit</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Margin</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item, index) => (
                    <motion.tr
                      key={item.month}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 font-medium text-gray-800 text-sm">{item.month}</td>
                      <td className="py-3 px-4 font-semibold text-green-600 text-sm">{formatCurrency(item.sales)}</td>
                      <td className="py-3 px-4 font-semibold text-red-600 text-sm">{formatCurrency(item.expenses)}</td>
                      <td className="py-3 px-4 font-bold text-blue-600 text-sm">{formatCurrency(item.profit)}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800 text-sm">{((item.profit / item.sales) * 100).toFixed(1)}%</td>
                      <td className="py-3 px-4">
                        {index > 0 ? (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${item.sales > monthlyData[index - 1].sales
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}>
                            {item.sales > monthlyData[index - 1].sales ? '↗' : '↘'}
                            {Math.abs(((item.sales - monthlyData[index - 1].sales) / monthlyData[index - 1].sales * 100)).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Row */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-sm font-semibold text-gray-800">9 Months</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sales</p>
                  <p className="text-sm font-semibold text-green-600">{formatCurrency(totalSales)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Expenses</p>
                  <p className="text-sm font-semibold text-red-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Net Profit</p>
                  <p className="text-sm font-semibold text-blue-600">{formatCurrency(totalProfit)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Avg Margin</p>
                  <p className="text-sm font-semibold text-gray-800">{profitMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}