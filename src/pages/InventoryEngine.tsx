// pages/InventoryEngine.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';

interface InventoryItem {
  id: number;
  name: string;
  currentStock: number;
  optimalStock: number;
  unit: string;
  costPerUnit: number;
  demandTrend: 'increasing' | 'decreasing' | 'stable';
  restockUrgency: 'high' | 'medium' | 'low';
  suppliers: {
    name: string;
    rating: number;
    deliveryTime: string;
    price: number;
    contact: string;
  }[];
}

interface SeasonalTrend {
  month: string;
  milkAvailability: number;
  packagingDemand: number;
}

export default function InventoryEngine() {
  const [selectedItem, setSelectedItem] = useState<number>(1);
  // const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');

  const inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: "Milk Packaging Pouches",
      currentStock: 1200,
      optimalStock: 5000,
      unit: "units",
      costPerUnit: 0.15,
      demandTrend: "stable",
      restockUrgency: "high",
      suppliers: [
        {
          name: "PackPro Solutions",
          rating: 4.8,
          deliveryTime: "2-3 days",
          price: 0.14,
          contact: "+1 (555) 123-4567"
        },
        {
          name: "EcoPack Materials",
          rating: 4.5,
          deliveryTime: "3-5 days",
          price: 0.13,
          contact: "+1 (555) 987-6543"
        }
      ]
    },
    {
      id: 2,
      name: "Milk Cartons",
      currentStock: 800,
      optimalStock: 2000,
      unit: "units",
      costPerUnit: 0.25,
      demandTrend: "decreasing",
      restockUrgency: "medium",
      suppliers: [
        {
          name: "CartonCraft Inc",
          rating: 4.6,
          deliveryTime: "5-7 days",
          price: 0.24,
          contact: "+1 (555) 456-7890"
        }
      ]
    },
    {
      id: 3,
      name: "Bottle Caps",
      currentStock: 3500,
      optimalStock: 3000,
      unit: "units",
      costPerUnit: 0.05,
      demandTrend: "stable",
      restockUrgency: "low",
      suppliers: [
        {
          name: "CapSolutions Ltd",
          rating: 4.7,
          deliveryTime: "1-2 days",
          price: 0.045,
          contact: "+1 (555) 234-5678"
        }
      ]
    },
    {
      id: 4,
      name: "Cleaning Supplies",
      currentStock: 45,
      optimalStock: 100,
      unit: "liters",
      costPerUnit: 8.5,
      demandTrend: "increasing",
      restockUrgency: "high",
      suppliers: [
        {
          name: "CleanTech Suppliers",
          rating: 4.9,
          deliveryTime: "1-3 days",
          price: 8.2,
          contact: "+1 (555) 345-6789"
        }
      ]
    }
  ];

  const seasonalTrends: SeasonalTrend[] = [
    { month: "January", milkAvailability: 85, packagingDemand: 90 },
    { month: "February", milkAvailability: 80, packagingDemand: 85 },
    { month: "March", milkAvailability: 75, packagingDemand: 80 },
    { month: "April", milkAvailability: 70, packagingDemand: 75 },
    { month: "May", milkAvailability: 65, packagingDemand: 70 },
    { month: "June", milkAvailability: 60, packagingDemand: 65 },
    { month: "July", milkAvailability: 55, packagingDemand: 60 },
    { month: "August", milkAvailability: 60, packagingDemand: 65 },
    { month: "September", milkAvailability: 65, packagingDemand: 70 },
    { month: "October", milkAvailability: 70, packagingDemand: 75 },
    { month: "November", milkAvailability: 75, packagingDemand: 80 },
    { month: "December", milkAvailability: 80, packagingDemand: 85 }
  ];

  const salesData = [
    { month: 'Jan', sales: 65, inventory: 70 },
    { month: 'Feb', sales: 59, inventory: 65 },
    { month: 'Mar', sales: 80, inventory: 60 },
    { month: 'Apr', sales: 81, inventory: 55 },
    { month: 'May', sales: 56, inventory: 50 },
    { month: 'Jun', sales: 55, inventory: 45 },
    { month: 'Jul', sales: 40, inventory: 40 },
    { month: 'Aug', sales: 45, inventory: 45 },
    { month: 'Sep', sales: 52, inventory: 50 },
    { month: 'Oct', sales: 60, inventory: 55 },
    { month: 'Nov', sales: 68, inventory: 60 },
    { month: 'Dec', sales: 76, inventory: 65 }
  ];

  const selectedInventory = inventoryItems.find(item => item.id === selectedItem);

  // Calculate restock needs
  const unitsToRestock = selectedInventory ? selectedInventory.optimalStock - selectedInventory.currentStock : 0;
  const estimatedCost = selectedInventory ? unitsToRestock * selectedInventory.costPerUnit : 0;
  
  // Calculate restock date based on current stock and usage rate
  const calculateRestockDate = () => {
    const today = new Date();
    const dailyUsage = 50; // Example daily usage
    const daysUntilRestock = selectedInventory ? Math.floor(selectedInventory.currentStock / dailyUsage) : 0;
    
    const restockDate = new Date();
    restockDate.setDate(today.getDate() + daysUntilRestock);
    
    return restockDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'increasing': 
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'decreasing': 
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default: 
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
          </svg>
        );
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Inventory Prediction Engine
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI-powered inventory management to optimize stock levels, reduce waste, and predict demand with intelligent supplier recommendations
          </p>
        </motion.div>

        {/* Inventory Selector */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Select Inventory Item</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inventoryItems.map(item => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedItem(item.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedItem === item.id 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform scale-105' 
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-800 text-left">{item.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(item.restockUrgency)}`}>
                      {item.restockUrgency.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-left space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-semibold">{item.currentStock} {item.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Optimal:</span>
                      <span className="font-semibold">{item.optimalStock} {item.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((item.currentStock / item.optimalStock) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Analysis Summary */}
        {selectedInventory && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Next Restock Date</h3>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {calculateRestockDate()}
                </p>
                <p className="text-gray-600">
                  Based on current consumption rate
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Suggested Quantity</h3>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {unitsToRestock > 0 ? unitsToRestock : 0} {selectedInventory.unit}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Demand Trend:</span>
                  {getTrendIcon(selectedInventory.demandTrend)}
                  <span className={`text-sm font-medium px-2 py-1 rounded-full border ${getUrgencyColor(selectedInventory.restockUrgency)}`}>
                    {selectedInventory.restockUrgency.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Estimated Cost</h3>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  ${estimatedCost.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  ${selectedInventory.costPerUnit.toFixed(2)} per {selectedInventory.unit}
                </p>
              </div>
            </motion.div>

            {/* Supplier Recommendations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Recommended Suppliers</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedInventory.suppliers.map((supplier, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-gray-800">{supplier.name}</h4>
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm px-3 py-1 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold">{supplier.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-gray-600 text-sm">Price per unit</span>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="text-lg font-bold text-green-600">${supplier.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-gray-600 text-sm">Delivery Time</span>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-blue-600">{supplier.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-600 text-sm">Contact Information</span>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="font-medium text-purple-600">{supplier.contact}</span>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Place Order
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Charts Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Sales vs Inventory Chart */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Sales vs Inventory Trend</h3>
                </div>
                <div className="h-64 relative">
                  <div className="flex h-full items-end space-x-2">
                    {salesData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex items-end justify-center space-x-1 w-full">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t transition-all hover:from-blue-500 hover:to-blue-700 cursor-pointer"
                            style={{ height: `${item.sales}%` }}
                            title={`Sales: ${item.sales}%`}
                          ></div>
                          <div 
                            className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t transition-all hover:from-green-500 hover:to-green-700 cursor-pointer"
                            style={{ height: `${item.inventory}%` }}
                            title={`Inventory: ${item.inventory}%`}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 font-medium">{item.month}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 mt-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">Sales</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">Inventory</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seasonal Trends Chart */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Seasonal Trends</h3>
                </div>
                <div className="h-64 relative">
                  <div className="flex h-full items-end space-x-1">
                    {seasonalTrends.map((trend, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex flex-col items-center w-full space-y-1">
                          <div 
                            className="w-full bg-gradient-to-t from-purple-400 to-purple-600 rounded-t transition-all hover:from-purple-500 hover:to-purple-700 cursor-pointer"
                            style={{ height: `${trend.milkAvailability}%` }}
                            title={`Milk: ${trend.milkAvailability}%`}
                          ></div>
                          <div 
                            className="w-full bg-gradient-to-t from-orange-400 to-orange-600 rounded-t transition-all hover:from-orange-500 hover:to-orange-700 cursor-pointer"
                            style={{ height: `${trend.packagingDemand}%` }}
                            title={`Packaging: ${trend.packagingDemand}%`}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 font-medium">{trend.month.substring(0, 3)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 mt-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">Milk Availability</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">Packaging Demand</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">AI Recommendations</h3>
              </div>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                >
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-gray-800">Restock {selectedInventory.name}</p>
                    <p className="text-gray-700 leading-relaxed">
                      Current stock is at <span className="font-semibold text-blue-600">{Math.round((selectedInventory.currentStock / selectedInventory.optimalStock) * 100)}%</span> of optimal levels. 
                      Recommended to order <span className="font-semibold text-indigo-600">{unitsToRestock} {selectedInventory.unit}</span> before {calculateRestockDate()}.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                >
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-gray-800">Monitor Seasonal Trends</p>
                    <p className="text-gray-700 leading-relaxed">
                      Milk availability is expected to decrease in the coming months. 
                      Consider adjusting packaging orders to match projected milk supply and avoid excess inventory.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                >
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-gray-800">Supplier Strategy</p>
                    <p className="text-gray-700 leading-relaxed">
                      Based on price, rating, and delivery time, we recommend <span className="font-semibold text-purple-600">{selectedInventory.suppliers[0].name}</span> 
                      for your next order of {selectedInventory.name}. They offer the best value proposition.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}