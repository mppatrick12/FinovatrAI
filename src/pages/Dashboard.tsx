import { motion } from "framer-motion";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../assets/components/ui/tabs";

// Professional SVG Icons
const SalesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ProfitIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const InventoryIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const AlertIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.312 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const BellIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ChartIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

const DownloadIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Mock data for charts
const salesData = [
  { name: "Mon", sales: 2400, profit: 1200, expenses: 1200 },
  { name: "Tue", sales: 1398, profit: 800, expenses: 598 },
  { name: "Wed", sales: 9800, profit: 4900, expenses: 4900 },
  { name: "Thu", sales: 3908, profit: 1954, expenses: 1954 },
  { name: "Fri", sales: 4800, profit: 2400, expenses: 2400 },
  { name: "Sat", sales: 3800, profit: 1900, expenses: 1900 },
  { name: "Sun", sales: 4300, profit: 2150, expenses: 2150 },
];

const inventoryData = [
  { name: 'In Stock', value: 45, color: '#10B981' },
  { name: 'Low Stock', value: 25, color: '#F59E0B' },
  { name: 'Out of Stock', value: 15, color: '#EF4444' },
  { name: 'Ordered', value: 15, color: '#3B82F6' },
];

const monthlyData = [
  { month: 'Jan', revenue: 12000, growth: 5 },
  { month: 'Feb', revenue: 15000, growth: 25 },
  { month: 'Mar', revenue: 18000, growth: 20 },
  { month: 'Apr', revenue: 22000, growth: 22 },
  { month: 'May', revenue: 19000, growth: -14 },
  { month: 'Jun', revenue: 25000, growth: 32 },
];

export default function FinovatraDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Business Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Your intelligent business command center
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <BellIcon />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4">
                <UsersIcon />
                <span className="ml-2 text-sm font-medium">Profile</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm rounded-md p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Trading
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                        <SalesIcon />
                      </div>
                      <span className="text-xs font-medium text-green-600">+12%</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Today's Sales</p>
                    <p className="text-xl font-bold text-gray-800">$1,247</p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600">
                        <ProfitIcon />
                      </div>
                      <span className="text-xs font-medium text-green-600">+8%</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Gross Profit</p>
                    <p className="text-xl font-bold text-gray-800">$3,450</p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600">
                        <RevenueIcon />
                      </div>
                      <span className="text-xs font-medium text-green-600">+25%</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Monthly Revenue</p>
                    <p className="text-xl font-bold text-gray-800">$12,880</p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-600">
                        <InventoryIcon />
                      </div>
                      <div className="flex items-center">
                        <AlertIcon className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs font-medium text-yellow-600 ml-1">2 low</span>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Inventory Status</p>
                    <p className="text-xl font-bold text-gray-800">89%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Sales Trend Chart */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Sales Performance</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                          <span>Sales</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                          <span>Profit</span>
                        </div>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={salesData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                        <YAxis axisLine={false} tickLine={false} fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '12px'
                          }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
                        <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Inventory Distribution */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Distribution</h3>
                    <div className="flex flex-col lg:flex-row items-center">
                      <div className="w-full lg:w-2/3 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={inventoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => percent !== undefined ? `${name}: ${(percent * 100).toFixed(0)}%` : name}
                            >
                              {inventoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`${value}%`, 'Percentage']}
                              contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                fontSize: '12px'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                        <div className="space-y-3">
                          {inventoryData.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                              <span className="text-sm text-gray-700">{item.name}</span>
                              <span className="text-sm font-medium text-gray-800 ml-auto">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-3">Quick Sale</h4>
                    <div className="space-y-2">
                      <Input placeholder="Product name" className="h-10 border-gray-300" />
                      <div className="flex space-x-2">
                        <Input placeholder="Quantity" type="number" className="h-10 border-gray-300" />
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4">
                          Sell
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-3">Low Stock Alert</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                        <span className="text-sm text-gray-700">Rice</span>
                        <span className="text-sm font-medium text-red-600">2kg left</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                        <span className="text-sm text-gray-700">Sugar</span>
                        <span className="text-sm font-medium text-yellow-600">5kg left</span>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-10">
                        Reorder Items
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Sale: 5kg Rice - $25</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Restock: 10kg Sugar</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Payment: $150 received</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Trading Tab */}
          <TabsContent value="trading">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Trading Performance</h3>
                        <Button size="sm" variant="outline" className="border-gray-300">
                          <DownloadIcon />
                          <span className="ml-2 text-xs">Export</span>
                        </Button>
                      </div>
                      <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={salesData}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                          <YAxis axisLine={false} tickLine={false} fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              fontSize: '12px'
                            }}
                          />
                          <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                          <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                      <h4 className="text-base font-semibold text-gray-800 mb-3">Top Products</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-700">Rice</span>
                          <span className="text-sm font-bold text-blue-600">$450</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-700">Sugar</span>
                          <span className="text-sm font-bold text-blue-600">$320</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-700">Flour</span>
                          <span className="text-sm font-bold text-blue-600">$280</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                      <h4 className="text-base font-semibold text-gray-800 mb-3">Today's Goals</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Sales Target</span>
                            <span className="font-medium">$1,247 / $1,500</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '83%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Profit Target</span>
                            <span className="font-medium">$624 / $750</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '83%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Monthly Growth Analytics</h3>
                    <div className="text-sm text-gray-500">Revenue (USD)</div>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} />
                      <Tooltip
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="revenue" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {monthlyData.map((item) => (
                      <div key={item.month} className="text-center">
                        <div className="text-sm font-medium text-gray-700">{item.month}</div>
                        <div className={`text-xs font-medium ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.growth >= 0 ? '+' : ''}{item.growth}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <InventoryIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Inventory Management</h3>
                  <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto">
                    Advanced inventory tracking and management tools will be available here
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChartIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Advanced Reports</h3>
                  <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto">
                    Comprehensive business analytics and detailed reporting dashboard
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}