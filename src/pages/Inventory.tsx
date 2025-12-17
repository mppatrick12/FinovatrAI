// pages/Inventory.tsx
import { motion } from "framer-motion";
import { useState } from 'react';
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";

// Professional SVG Icons - simplified
const InventoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const AddIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const StatsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      case "In Stock": return "bg-green-50 text-green-700 border border-green-200";
      case "Low Stock": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "Out of Stock": return "bg-red-50 text-red-700 border border-red-200";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
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
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header - Clean and professional */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white mr-3">
              <InventoryIcon />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Inventory Management
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Manage your stock levels, track product information, and optimize inventory operations
          </p>
        </div>

        {/* Stats Cards - Clean and professional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Items</p>
                  <p className="text-xl font-bold text-gray-800">{totalItems}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                  <StatsIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">In Stock</p>
                  <p className="text-xl font-bold text-gray-800">{inStock}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600">
                  <StatsIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Low Stock</p>
                  <p className="text-xl font-bold text-gray-800">{lowStock}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-600">
                  <AlertIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Out of Stock</p>
                  <p className="text-xl font-bold text-gray-800">{outOfStock}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600">
                  <AlertIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Value</p>
                  <p className="text-xl font-bold text-gray-800">${totalValue.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600">
                  <StatsIcon />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls - Clean and functional */}
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                  <Input
                    placeholder="Search products, categories, or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="relative min-w-[180px]">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FilterIcon />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 text-sm"
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
                className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4"
              >
                <AddIcon />
                <span className="ml-2 text-sm font-medium">Add Product</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border border-gray-200 shadow-sm mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Add New Product
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 text-sm"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      placeholder="Enter quantity"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Enter price"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                    <Input
                      value={newProduct.supplier}
                      onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                      placeholder="Enter supplier name"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-10">
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Inventory Table - Professional styling */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Current Inventory ({filteredItems.length} items)
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">Updated: {item.lastUpdated}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{item.category}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-800 text-sm">{item.quantity}</span>
                        <span className="text-gray-500 text-xs ml-1">units</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800 text-sm">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 font-medium text-gray-800 text-sm">${(item.quantity * item.price).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{item.supplier}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 border-gray-300 hover:bg-gray-50 text-gray-700"
                          >
                            <EditIcon />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 border-red-300 hover:bg-red-50 text-red-600"
                          >
                            <DeleteIcon />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon />
                </div>
                <h4 className="text-base font-medium text-gray-600 mb-2">No items found</h4>
                <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}