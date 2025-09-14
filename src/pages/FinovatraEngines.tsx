import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../assets/components/ui/tabs";
import { Card, CardContent } from "../assets/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Zap, DollarSign, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const dummyData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4700 },
  { name: "May", value: 4200 },
  { name: "Jun", value: 5300 },
];

export default function FinovatraEngines() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Finovatra Intelligence Engines</h1>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="inventory">Inventory Engine</TabsTrigger>
            <TabsTrigger value="loan">Loan Recommender</TabsTrigger>
            <TabsTrigger value="tech">Tech Recommender</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <Zap className="text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Restock Alert</p>
                      <p className="text-lg font-semibold">3 Items Low</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <DollarSign className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Optimal Budget</p>
                      <p className="text-lg font-semibold">$2,000</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <BarChart3 className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Suggested Order</p>
                      <p className="text-lg font-semibold">Flour: 20kg, Oil: 10L</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Stock Usage Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dummyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fill="#6ee7b7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="loan">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-2">Recommended Loan</p>
                    <p className="text-2xl font-bold">$5,000</p>
                    <p className="text-sm text-gray-400 mt-1">To expand product line & stock</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-2">Suggested Repayment Plan</p>
                    <p className="text-lg font-semibold">$450/month for 12 months</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Profit Forecast with Loan</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dummyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#bfdbfe" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="tech">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-2">Recommended Tech</p>
                    <p className="text-xl font-bold">POS System with AI Forecast</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-2">Estimated ROI</p>
                    <p className="text-lg font-semibold">18% Increase in 6 months</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Business Growth Projection</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dummyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#ddd6fe" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
