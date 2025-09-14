import { Card, CardContent } from "../assets/components/ui/card";
import { Button } from "../assets/components/ui/button";
import { Input } from "../assets/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../assets/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const dummySales = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

export default function FinovatraDashboard() {
  const [activeTab, setActiveTab] = useState("trade");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Finovatra AI Business OS</h1>
          <Button>Profile</Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="trade">Trading</TabsTrigger>
            <TabsTrigger value="purchase">Purchasing</TabsTrigger>
            <TabsTrigger value="loan">Loans</TabsTrigger>
            <TabsTrigger value="startup">Start-up Advisor</TabsTrigger>
            <TabsTrigger value="tech">Tech Recommender</TabsTrigger>
          </TabsList>

          {/* Trading Tab */}
          <TabsContent value="trade">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <ShoppingCart className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Today Sales</p>
                      <p className="text-lg font-semibold">$1,200</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <DollarSign className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Gross Profit</p>
                      <p className="text-lg font-semibold">$3,450</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <TrendingUp className="text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Weekly Revenue</p>
                      <p className="text-lg font-semibold">$7,880</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <Zap className="text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Inventory Alert</p>
                      <p className="text-lg font-semibold">2 Items Low</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Sales Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dummySales}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Sell Product</h3>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Product name" />
                    <Input placeholder="Quantity" type="number" />
                    <Button>Sell</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Stock</h3>
                  <ul className="bg-gray-100 p-4 rounded-xl text-sm">
                    <li>Beans - 15kg</li>
                    <li>Sugar - 10kg</li>
                    <li>Flour - 8kg</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Other tabs will be filled later */}
          <TabsContent value="purchase">
            <div className="text-center text-gray-500">Purchasing reports and restocking suggestions will appear here.</div>
          </TabsContent>

          <TabsContent value="loan">
            <div className="text-center text-gray-500">Loan planning tools and repayment simulation will appear here.</div>
          </TabsContent>

          <TabsContent value="startup">
            <div className="text-center text-gray-500">Business idea suggestions and location analysis tools will appear here.</div>
          </TabsContent>

          <TabsContent value="tech">
            <div className="text-center text-gray-500">Technology adoption planner and ROI simulation will appear here.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}