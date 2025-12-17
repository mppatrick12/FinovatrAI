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
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Inventory Prediction Engine
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
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
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-gray-600 text-sm">Price per unit</span>
                          <span className="text-lg font-bold text-green-600">${supplier.price.toFixed(2)}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-gray-600 text-sm">Delivery Time</span>
                          <span className="font-semibold text-blue-600">{supplier.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-600 text-sm">Contact Information</span>
                        <span className="font-medium text-purple-600">{supplier.contact}</span>
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