// pages/Inventory.tsx
import { motion } from "framer-motion";
import { useState } from 'react';
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";

// ...existing code
// Professional SVG Icons matching sidebar style
const InventoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const AddIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const StatsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.312 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

// Mock inventory data
const inventoryItems = [
  { id: 1, name: "Premium Cement", category: "Building Materials", quantity: 40, price: 15.50, status: "In Stock", supplier: "BuildCorp Inc.", lastUpdated: "2025-09-20" },
  { id: 2, name: "Red Bricks", category: "Building Materials", quantity: 8, price: 0.75, status: "Low Stock", supplier: "Brick Masters", lastUpdated: "2025-09-19" },
  { id: 3, name: "Steel Rods", category: "Construction", quantity: 0, price: 12.00, status: "Out of Stock", supplier: "Steel Works Ltd.", lastUpdated: "2025-09-18" },
  { id: 4, name: "Paint (White)", category: "Finishing", quantity: 25, price: 8.90, status: "In Stock", supplier: "Color Pro", lastUpdated: "2025-09-21" },
  { id: 5, name: "Electrical Wire", category: "Electrical", quantity: 15, price: 2.50, status: "In Stock", supplier: "ElectroMax", lastUpdated: "2025-09-20" },
  { id: 6, name: "Plumbing Pipes", category: "Plumbing", quantity: 5, price: 18.75, status: "Low Stock", supplier: "Pipe Solutions", lastUpdated: "2025-09-19" }
];

const categories = ["All", "Building Materials", "Construction", "Finishing", "Electrical", "Plumbing"];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Low Stock": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Out of Stock": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock": return "✅";
      case "Low Stock": return "⚠️";
      case "Out of Stock": return "❌";
      default: return "📦";
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = inventoryItems.length;
  const inStock = inventoryItems.filter(item => item.status === "In Stock").length;
  const lowStock = inventoryItems.filter(item => item.status === "Low Stock").length;
  const outOfStock = inventoryItems.filter(item => item.status === "Out of Stock").length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg text-white">
            <InventoryIcon />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Inventory Management
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Manage your stock levels, track product information, and optimize inventory operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Total Items</p>
                  <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white">
                  <PackageIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">In Stock</p>
                  <p className="text-2xl font-bold text-slate-800">{inStock}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center text-white">
                  <StatsIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Low Stock</p>
                  <p className="text-2xl font-bold text-slate-800">{lowStock}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center text-white">
                  <AlertIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold text-slate-800">{outOfStock}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white">
                  <AlertIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-slate-800">${totalValue.toFixed(0)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white">
                  <StatsIcon />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="shadow-xl border-slate-200 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search products, categories, or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Product Button */}
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <AddIcon />
                <span className="ml-2">Add Product</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Form */}
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-slate-200 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <AddIcon />
                  <span className="ml-2">Add New Product</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Enter product name"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
                    <Input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                      placeholder="Enter quantity"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="Enter price"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Supplier</label>
                    <Input
                      value={newProduct.supplier}
                      onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                      placeholder="Enter supplier name"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white">
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Inventory Table */}
        <Card className="shadow-xl border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <PackageIcon />
              <span className="ml-2">Current Inventory ({filteredItems.length} items)</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Product</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Category</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Quantity</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Price</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Value</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Supplier</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">Updated: {item.lastUpdated}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{item.category}</td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-800">{item.quantity}</span>
                        <span className="text-slate-500 ml-1">units</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-4 font-semibold text-slate-800">${(item.quantity * item.price).toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)} {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{item.supplier}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200"
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-100 hover:bg-red-200 text-red-700 border-red-200"
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PackageIcon />
                </div>
                <h4 className="text-lg font-semibold text-slate-600 mb-2">No items found</h4>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
