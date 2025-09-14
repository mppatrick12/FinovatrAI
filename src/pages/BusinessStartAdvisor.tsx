// FinovatraStartAdvisor.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../assets/components/ui/tabs";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";
import { Button } from "../assets/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

const businessTrends = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 2300 },
  { name: "Mar", value: 3200 },
  { name: "Apr", value: 4200 },
];

export default function FinovatraStartAdvisor() {
  const [activeTab, setActiveTab] = useState("type");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Start-Up Business Advisor</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="type">Business Type Advisor</TabsTrigger>
            <TabsTrigger value="location">Business Location Recommender</TabsTrigger>
          </TabsList>

          {/* Business Type Engine */}
          <TabsContent value="type">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="mb-6">
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Available Capital" />
                  <Input placeholder="Location (e.g. Kicukiro Centre)" />
                  <Button>Get Suggestions</Button>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent>
                      <h2 className="text-lg font-semibold mb-2">Business Option {i}</h2>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Required Capital: RWF 300,000</li>
                        <li>• Equipment: Scale, Shelves, Inventory</li>
                        <li>• Staffing: 1-2 employees</li>
                        <li>• Marketing: Local outreach & social media</li>
                      </ul>
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-1 text-gray-600">Location Suggestion:</h3>
                        <p className="text-sm text-blue-600">Kigali - Kicukiro - Sonatube</p>
                      </div>
                      <div className="mt-4">
                        <ResponsiveContainer width="100%" height={150}>
                          <AreaChart data={businessTrends}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="#c7d2fe" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Business Location Engine */}
          <TabsContent value="location">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="mb-6">
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Available Capital" />
                  <Input placeholder="Business Type or Name" />
                  <Button>Get Locations</Button>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {["Nyabugogo", "Kimironko", "Nyamirambo"].map((loc, ) => (
                  <Card key={loc}>
                    <CardContent>
                      <h2 className="text-lg font-semibold mb-2">Location: {loc}</h2>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Rent Estimate: RWF 150,000/month</li>
                        <li>• Local Demand: High</li>
                        <li>• ROI: ~30% monthly</li>
                        <li>• Suggested Setup: Kiosk + Inventory</li>
                      </ul>
                      <div className="mt-4">
                        <ResponsiveContainer width="100%" height={150}>
                          <AreaChart data={businessTrends}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#10b981" fill="#6ee7b7" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
