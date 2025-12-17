// pages/Sales.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";

// Professional SVG Icons
const SalesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const AddSaleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const TrendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ProductIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

// Mock sales data
const mockSales = [
  { id: 1, product: "Premium Cement", quantity: 10, price: 15.50, total: 155, date: "Sep 22, 2025", customer: "BuildCorp Inc.", status: "Completed" },
  { id: 2, product: "Red Bricks", quantity: 500, price: 0.75, total: 375, date: "Sep 22, 2025", customer: "Construction Pro", status: "Completed" },
  { id: 3, product: "Steel Rods", quantity: 25, price: 12.00, total: 300, date: "Sep 21, 2025", customer: "MetalWorks Ltd.", status: "Completed" },
  { id: 4, product: "Paint (White)", quantity: 8, price: 8.90, total: 71.20, date: "Sep 21, 2025", customer: "Interior Design Co.", status: "Completed" },
  { id: 5, product: "Electrical Wire", quantity: 100, price: 2.50, total: 250, date: "Sep 20, 2025", customer: "ElectroMax Solutions", status: "Processing" },
];

export default function Sales() {
  const [sales, setSales] = useState<any[]>(mockSales);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [customer, setCustomer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || quantity <= 0 || price <= 0 || !customer) return;

    const newSale = {
      id: Date.now(),
      product,
      quantity,
      price,
      total: quantity * price,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      customer,
      status: "Completed"
    };
    setSales([newSale, ...sales]);

    // Reset form
    setProduct("");
    setQuantity(0);
    setPrice(0);
    setCustomer("");
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || sale.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0;
  const todaySales = sales.filter(sale => sale.date.includes("Sep 22")).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-50 text-green-700 border border-green-200";
      case "Processing": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "Cancelled": return "bg-red-50 text-red-700 border border-red-200";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white mr-3">
              <SalesIcon />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Sales Management
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Track sales performance, manage transactions, and monitor revenue growth
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Sales</p>
                  <p className="text-xl font-bold text-gray-800">{totalSales}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                  <SalesIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600">
                  <RevenueIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Average Sale</p>
                  <p className="text-xl font-bold text-gray-800">${averageSale.toFixed(2)}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600">
                  <TrendIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Today's Sales</p>
                  <p className="text-xl font-bold text-gray-800">{todaySales}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-600">
                  <CalendarIcon />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
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
                    placeholder="Search products or customers..."
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
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Add Sale Button */}
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4"
              >
                <AddSaleIcon />
                <span className="ml-2 text-sm font-medium">Record Sale</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Sale Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border border-gray-200 shadow-sm mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Record New Sale
                </h3>
                <form onSubmit={handleAddSale} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Input
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="Enter product name"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      placeholder="Enter quantity"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="Enter price"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                      required
                      min="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                    <Input
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      placeholder="Enter customer name"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-10"
                    >
                      Record Sale
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Sales Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Sales Records ({filteredSales.length} transactions)
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Unit Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale, index) => (
                    <motion.tr
                      key={sale.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800 text-sm">{sale.product}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{sale.customer}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-800 text-sm">{sale.quantity}</span>
                        <span className="text-gray-500 text-xs ml-1">units</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800 text-sm">${sale.price.toFixed(2)}</td>
                      <td className="py-3 px-4 font-bold text-green-600 text-sm">${sale.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-medium ${getStatusColor(sale.status)}`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{sale.date}</td>
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
                            onClick={() => handleDelete(sale.id)}
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

            {filteredSales.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SalesIcon />
                </div>
                <h4 className="text-base font-medium text-gray-600 mb-2">No sales found</h4>
                <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}