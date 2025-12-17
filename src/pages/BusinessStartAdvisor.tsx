// FinovatraStartAdvisor.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../assets/components/ui/tabs";

interface TrendData {
  name: string;
  value: number;
}

interface Location {
  name: string;
  rent: number;
  demand: string;
  roi: string;
  setup: string;
  coordinates: { lat: number; lng: number };
  trend: TrendData[];
}

const businessTrends = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 2300 },
  { name: "Mar", value: 3200 },
  { name: "Apr", value: 4200 },
  { name: "May", value: 5300 },
  { name: "Jun", value: 6500 },
];

const businessTypes = [
  {
    id: 1,
    name: "Grocery Store",
    capital: 300000,
    equipment: ["Scale", "Shelves", "Inventory"],
    staffing: "1-2 employees",
    marketing: "Local outreach & social media",
    location: "Kigali - Kicukiro - Sonatube",
    trend: businessTrends,
  },
  {
    id: 2,
    name: "Coffee Shop",
    capital: 500000,
    equipment: ["Espresso Machine", "Tables", "Display Case"],
    staffing: "2-3 employees",
    marketing: "Social media & loyalty program",
    location: "Kigali - Nyarugenge - Downtown",
    trend: businessTrends.map(item => ({ ...item, value: item.value * 0.8 })),
  },
  {
    id: 3,
    name: "Phone Accessories",
    capital: 400000,
    equipment: ["Display Cases", "Security System", "Inventory"],
    staffing: "1 employee",
    marketing: "Social media & influencer partnerships",
    location: "Kigali - Gasabo - Remera",
    trend: businessTrends.map(item => ({ ...item, value: item.value * 1.2 })),
  },
];

const locations = [
  {
    name: "Nyabugogo",
    rent: 150000,
    demand: "High",
    roi: "30% monthly",
    setup: "Kiosk + Inventory",
    coordinates: { lat: -1.9398, lng: 30.0444 },
    trend: businessTrends,
  },
  {
    name: "Kimironko",
    rent: 200000,
    demand: "Medium",
    roi: "25% monthly",
    setup: "Storefront + Display",
    coordinates: { lat: -1.9536, lng: 30.1287 },
    trend: businessTrends.map(item => ({ ...item, value: item.value * 0.9 })),
  },
  {
    name: "Nyamirambo",
    rent: 120000,
    demand: "Medium-High",
    roi: "28% monthly",
    setup: "Kiosk + Basic Inventory",
    coordinates: { lat: -1.9667, lng: 30.0833 },
    trend: businessTrends.map(item => ({ ...item, value: item.value * 1.1 })),
  },
];

const SimpleMap = ({ locations, selectedLocation, onSelectLocation }: {
  locations: Location[];
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
}) => {
  return (
    <div className="relative w-full h-64 bg-blue-50 rounded-lg overflow-hidden mt-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200">
        {locations.map((location, index) => (
          <button
            key={index}
            className={`absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold
              ${selectedLocation === location.name ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            style={{
              left: `${30 + index * 20}%`,
              top: `${30 + (index % 2) * 30}%`,
            }}
            onClick={() => onSelectLocation(location.name)}
          >
            {index + 1}
          </button>
        ))}
        
        {locations.map((location, index) => (
          <div
            key={index}
            className="absolute text-xs font-medium bg-white px-2 py-1 rounded shadow"
            style={{
              left: `${30 + index * 20}%`,
              top: `${35 + (index % 2) * 30}%`,
              marginLeft: '20px'
            }}
          >
            {location.name}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded shadow text-sm">
        <span className="font-semibold">Kigali Map</span>
      </div>
    </div>
  );
};

export default function FinovatraStartAdvisor() {
  const [activeTab, setActiveTab] = useState("type");
  const [capital, setCapital] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleGetSuggestions = () => {
    console.log("Getting suggestions for:", { capital, locationInput });
  };

  const handleGetLocations = () => {
    console.log("Getting locations for:", { capital, businessType });
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Start-Up Business Advisor</h1>
          <p className="text-gray-600">
            Get AI-powered recommendations for your business type and location based on your available capital
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="type" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Business Type Advisor
            </TabsTrigger>
            <TabsTrigger value="location" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Business Location Recommender
            </TabsTrigger>
          </TabsList>

          <TabsContent value="type">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Card className="mb-6 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Find the Right Business Type</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Capital (RWF)</label>
                      <Input 
                        placeholder="e.g. 500000" 
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        type="number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                      <Input 
                        placeholder="e.g. Kicukiro Centre" 
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        onClick={handleGetSuggestions}
                      >
                        Get Suggestions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-semibold text-gray-700 mb-4">Recommended Business Types</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessTypes.map((business) => (
                  <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                        <h2 className="text-lg font-semibold text-blue-800">{business.name}</h2>
                      </div>
                      <div className="p-4">
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li className="flex">
                            <span className="font-medium w-32">Required Capital:</span>
                            <span>RWF {business.capital.toLocaleString()}</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium w-32">Equipment:</span>
                            <span>{business.equipment.join(", ")}</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium w-32">Staffing:</span>
                            <span>{business.staffing}</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium w-32">Marketing:</span>
                            <span>{business.marketing}</span>
                          </li>
                        </ul>
                        <div className="mt-4 pt-2 border-t border-gray-100">
                          <h3 className="text-sm font-medium mb-1 text-gray-600">Location Suggestion:</h3>
                          <p className="text-sm text-blue-600 font-medium">{business.location}</p>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2 text-gray-600">Projected Revenue Trend:</h3>
                          <ResponsiveContainer width="100%" height={120}>
                            <AreaChart data={business.trend}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                              <XAxis dataKey="name" fontSize={12} />
                              <YAxis fontSize={12} />
                              <Tooltip 
                                formatter={(value) => [`RWF ${value.toLocaleString()}`, "Revenue"]}
                              />
                              <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="#c7d2fe" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="location">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Card className="mb-6 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Find the Perfect Location</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Capital (RWF)</label>
                      <Input 
                        placeholder="e.g. 500000" 
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        type="number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                      <Input 
                        placeholder="e.g. Grocery Store" 
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={handleGetLocations}
                      >
                        Get Locations
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-semibold text-gray-700 mb-4">Recommended Locations</h3>
              
              <SimpleMap 
                locations={locations} 
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {locations.map((location) => (
                  <Card 
                    key={location.name} 
                    className={`overflow-hidden hover:shadow-lg transition-shadow ${selectedLocation === location.name ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => setSelectedLocation(location.name)}
                  >
                    <CardContent className="p-0">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-green-100">
                        <h2 className="text-lg font-semibold text-green-800">Location: {location.name}</h2>
                      </div>
                      <div className="p-4">
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li className="flex">
                            <span className="font-medium w-32">Rent Estimate:</span>
                            <span>RWF {location.rent.toLocaleString()}/month</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium w-32">Local Demand:</span>
                            <span>{location.demand}</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium w-32">Expected ROI:</span>
                            <span>{location.roi}</span>
                          </li>
                          <li className="flex">
                            <span className="font-medium w-32">Suggested Setup:</span>
                            <span>{location.setup}</span>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2 text-gray-600">Projected Revenue Trend:</h3>
                          <ResponsiveContainer width="100%" height={120}>
                            <AreaChart data={location.trend}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                              <XAxis dataKey="name" fontSize={12} />
                              <YAxis fontSize={12} />
                              <Tooltip 
                                formatter={(value) => [`RWF ${value.toLocaleString()}`, "Revenue"]}
                              />
                              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#6ee7b7" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
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