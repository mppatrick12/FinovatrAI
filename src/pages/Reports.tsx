import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Mock data for reports
  const monthlyData = [
    { month: 'January', sales: 8500, expenses: 3200, profit: 5300 },
    { month: 'February', sales: 7400, expenses: 2800, profit: 4600 },
    { month: 'March', sales: 9500, expenses: 4200, profit: 5300 },
    { month: 'April', sales: 11200, expenses: 4800, profit: 6400 },
    { month: 'May', sales: 10800, expenses: 4500, profit: 6300 },
    { month: 'June', sales: 12500, expenses: 5200, profit: 7300 },
    { month: 'July', sales: 13200, expenses: 5800, profit: 7400 },
    { month: 'August', sales: 14100, expenses: 6100, profit: 8000 },
    { month: 'September', sales: 15200, expenses: 6500, profit: 8700 }
  ];

  const totalSales = monthlyData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalSales - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Business Reports & Analytics
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive business insights, financial analytics, and performance metrics to drive informed decisions
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalSales)}</p>
                  <p className="text-xs text-emerald-600 mt-1">↗ +12.5% from last period</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalExpenses)}</p>
                  <p className="text-xs text-red-600 mt-1">↗ +8.3% from last period</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Net Profit</p>
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalProfit)}</p>
                  <p className="text-xs text-blue-600 mt-1">↗ +15.7% from last period</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-slate-800">68.5%</p>
                  <p className="text-xs text-purple-600 mt-1">↗ +5.2% from last period</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="shadow-xl border-slate-200 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="weekly">Weekly Report</option>
                    <option value="monthly">Monthly Report</option>
                    <option value="quarterly">Quarterly Report</option>
                    <option value="yearly">Yearly Report</option>
                  </select>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="ml-2">Export Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-xl border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <span className="ml-2">Sales vs Expenses Trend</span>
              </h3>
              <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">Interactive Bar Chart</h4>
                  <p className="text-slate-500">Visualizing monthly sales vs expenses data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="ml-2">Profit Margin Analysis</span>
              </h3>
              <div className="h-80 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">Profit Trend Line</h4>
                  <p className="text-slate-500">Track profit margins over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="shadow-xl border-slate-200 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="ml-2">Key Performance Indicators</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-emerald-700">Gross Profit Margin</h4>
                  <span className="text-emerald-600 text-sm">↗ +2.3%</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">68.5%</p>
                <p className="text-xs text-emerald-600 mt-1">Above industry average</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-blue-700">Return on Investment</h4>
                  <span className="text-blue-600 text-sm">↗ +1.8%</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">24.8%</p>
                <p className="text-xs text-blue-600 mt-1">Strong performance</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-purple-700">Customer Retention</h4>
                  <span className="text-purple-600 text-sm">↗ +4.2%</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">89.3%</p>
                <p className="text-xs text-purple-600 mt-1">Excellent retention</p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-amber-700">Inventory Turnover</h4>
                  <span className="text-amber-600 text-sm">↗ +0.7x</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">8.2x</p>
                <p className="text-xs text-amber-600 mt-1">Healthy turnover rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Monthly Report Table */}
        <Card className="shadow-xl border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="ml-2">Monthly Financial Breakdown</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Month</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Sales</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Expenses</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Net Profit</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Profit Margin</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item, index) => (
                    <motion.tr 
                      key={item.month}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 font-medium text-slate-800">{item.month}</td>
                      <td className="py-4 px-4 font-semibold text-emerald-600">{formatCurrency(item.sales)}</td>
                      <td className="py-4 px-4 font-semibold text-red-600">{formatCurrency(item.expenses)}</td>
                      <td className="py-4 px-4 font-bold text-blue-600">{formatCurrency(item.profit)}</td>
                      <td className="py-4 px-4 font-semibold text-slate-800">{((item.profit / item.sales) * 100).toFixed(1)}%</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                          ↗ {index > 0 ? '+' + ((item.sales - monthlyData[index-1].sales) / monthlyData[index-1].sales * 100).toFixed(1) : '0.0'}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
