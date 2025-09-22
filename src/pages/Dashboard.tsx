import { motion } from "framer-motion";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../assets/components/ui/tabs";

// Professional SVG Icons matching sidebar style
const SalesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ProfitIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const InventoryIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.312 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              FinovatrAI Dashboard
            </h1>
            <p className="text-lg text-slate-600">Your intelligent business command center</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-600 hover:text-slate-800 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <BellIcon />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <UsersIcon />
              <span className="ml-2">Profile</span>
            </Button>
          </div>
        </header>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Trading
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Today's Sales</p>
                        <p className="text-2xl font-bold text-slate-800">$1,247</p>
                        <p className="text-sm text-blue-600 mt-1">+12% from yesterday</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <SalesIcon />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">Gross Profit</p>
                        <p className="text-2xl font-bold text-slate-800">$3,450</p>
                        <p className="text-sm text-emerald-600 mt-1">+8% this week</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <ProfitIcon />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-slate-800">$12,880</p>
                        <p className="text-sm text-purple-600 mt-1">+25% vs last month</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <RevenueIcon />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Inventory Status</p>
                        <p className="text-2xl font-bold text-slate-800">89%</p>
                        <div className="flex items-center mt-1">
                          <AlertIcon />
                          <p className="text-sm text-amber-600 ml-1">2 items low</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <InventoryIcon />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Sales Trend Chart */}
                <Card className="shadow-xl border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-800">Sales Performance</h3>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Sales</span>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full ml-4"></div>
                        <span>Profit</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={salesData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
                          }} 
                        />
                        <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="url(#salesGradient)" strokeWidth={3} />
                        <Area type="monotone" dataKey="profit" stroke="#10B981" fill="url(#profitGradient)" strokeWidth={3} />
                        <defs>
                          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Inventory Distribution */}
                <Card className="shadow-xl border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Inventory Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={inventoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {inventoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Quick Sale</h4>
                    <div className="space-y-3">
                      <Input placeholder="Product name" className="border-blue-200 focus:ring-blue-500" />
                      <div className="flex space-x-2">
                        <Input placeholder="Quantity" type="number" className="border-blue-200 focus:ring-blue-500" />
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                          Sell
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Low Stock Alert</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-slate-700">Rice</span>
                        <span className="text-red-600 font-semibold">2kg left</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-slate-700">Sugar</span>
                        <span className="text-amber-600 font-semibold">5kg left</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white">
                        Reorder Items
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Sale: 5kg Rice - $25</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Restock: 10kg Sugar</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Payment: $150 received</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Trading Tab */}
          <TabsContent value="trading">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="shadow-xl border-slate-200 mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-6">Trading Performance</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={salesData}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: 'none', 
                              borderRadius: '12px', 
                              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
                            }} 
                          />
                          <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
                          <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-slate-800 mb-4">Top Products</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium text-slate-700">Rice</span>
                          <span className="text-blue-600 font-bold">$450</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium text-slate-700">Sugar</span>
                          <span className="text-blue-600 font-bold">$320</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium text-slate-700">Flour</span>
                          <span className="text-blue-600 font-bold">$280</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-slate-800 mb-4">Today's Goals</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Sales Target</span>
                            <span className="font-semibold">$1,247 / $1,500</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Profit Target</span>
                            <span className="font-semibold">$624 / $750</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{ width: '83%' }}></div>
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="shadow-xl border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Monthly Growth Analytics</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '12px', 
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
                        }} 
                      />
                      <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <InventoryIcon />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Inventory Management</h3>
                <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                  Advanced inventory tracking and management tools will be available here
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <RevenueIcon />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Advanced Reports</h3>
                <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                  Comprehensive business analytics and detailed reporting dashboard
                </p>
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg">
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}