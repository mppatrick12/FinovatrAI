// pages/InventoryEngine.tsx
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
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');

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
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '↔️';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory Prediction Engine</h1>
        <p className="text-gray-600">
          AI-powered inventory management to optimize stock levels, reduce waste, and predict demand
        </p>
      </div>

      {/* Inventory Selector */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Inventory Item</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {inventoryItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedItem === item.id 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm mt-1">
                Stock: {item.currentStock}/{item.optimalStock} {item.unit}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Summary */}
      {selectedInventory && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Next Restock Date</h3>
              <p className="text-2xl font-bold text-green-600">{calculateRestockDate()}</p>
              <p className="text-sm text-gray-500 mt-1">
                Based on current consumption rate
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Suggested Quantity</h3>
              <p className="text-2xl font-bold text-blue-600">
                {unitsToRestock > 0 ? unitsToRestock : 0} {selectedInventory.unit}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 mr-2">Demand Trend:</span>
                <span>{getTrendIcon(selectedInventory.demandTrend)}</span>
                <span className={`text-sm ml-1 ${getUrgencyColor(selectedInventory.restockUrgency)}`}>
                  {selectedInventory.restockUrgency.toUpperCase()} priority
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Estimated Cost</h3>
              <p className="text-2xl font-bold text-red-500">
                ${estimatedCost.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ${selectedInventory.costPerUnit.toFixed(2)} per {selectedInventory.unit}
              </p>
            </div>
          </div>

          {/* Supplier Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold mb-4">Recommended Suppliers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedInventory.suppliers.map((supplier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">{supplier.name}</h4>
                    <span className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      ⭐ {supplier.rating}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${supplier.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">{supplier.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{supplier.contact}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                    Place Order
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Sales vs Inventory Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Sales vs Inventory Trend</h3>
              <div className="h-64 relative">
                <div className="flex h-full items-end space-x-2">
                  {salesData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex items-end justify-center space-x-1 w-full">
                        <div 
                          className="w-full bg-blue-400 rounded-t transition-all hover:bg-blue-500"
                          style={{ height: `${item.sales}%` }}
                          title={`Sales: ${item.sales}%`}
                        ></div>
                        <div 
                          className="w-full bg-green-400 rounded-t transition-all hover:bg-green-500"
                          style={{ height: `${item.inventory}%` }}
                          title={`Inventory: ${item.inventory}%`}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-400 mr-2"></div>
                    <span className="text-sm">Sales</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-400 mr-2"></div>
                    <span className="text-sm">Inventory</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Trends Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Seasonal Trends</h3>
              <div className="h-64 relative">
                <div className="flex h-full items-end space-x-1">
                  {seasonalTrends.map((trend, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex flex-col items-center w-full">
                        <div 
                          className="w-full bg-purple-400 rounded-t transition-all hover:bg-purple-500"
                          style={{ height: `${trend.milkAvailability}%` }}
                          title={`Milk: ${trend.milkAvailability}%`}
                        ></div>
                        <div 
                          className="w-full bg-orange-400 rounded-t transition-all hover:bg-orange-500"
                          style={{ height: `${trend.packagingDemand}%` }}
                          title={`Packaging: ${trend.packagingDemand}%`}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{trend.month.substring(0, 3)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-400 mr-2"></div>
                    <span className="text-sm">Milk Availability</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-400 mr-2"></div>
                    <span className="text-sm">Packaging Demand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <span className="text-blue-600 text-sm">1</span>
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Restock {selectedInventory.name}</p>
                  <p className="text-gray-600">
                    Current stock is at {Math.round((selectedInventory.currentStock / selectedInventory.optimalStock) * 100)}% of optimal levels. 
                    Recommended to order {unitsToRestock} {selectedInventory.unit} before {calculateRestockDate()}.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <span className="text-blue-600 text-sm">2</span>
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Monitor Seasonal Trends</p>
                  <p className="text-gray-600">
                    Milk availability is expected to decrease in the coming months. 
                    Consider adjusting packaging orders to match projected milk supply.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <span className="text-blue-600 text-sm">3</span>
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Supplier Strategy</p>
                  <p className="text-gray-600">
                    Based on price, rating, and delivery time, we recommend {selectedInventory.suppliers[0].name} 
                    for your next order of {selectedInventory.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}