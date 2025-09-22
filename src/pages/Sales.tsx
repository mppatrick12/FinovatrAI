// pages/Sales.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../assets/components/ui/button";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";

// Professional SVG Icons matching sidebar style
const SalesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const AddSaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const RevenueIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const TrendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ProductIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className={props.className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

// Mock sales data for demonstration
const mockSales = [
  { id: 1, product: "Premium Cement", quantity: 10, price: 15.50, total: 155, date: "2025-09-22 10:30", customer: "BuildCorp Inc.", status: "Completed" },
  { id: 2, product: "Red Bricks", quantity: 500, price: 0.75, total: 375, date: "2025-09-22 09:15", customer: "Construction Pro", status: "Completed" },
  { id: 3, product: "Steel Rods", quantity: 25, price: 12.00, total: 300, date: "2025-09-21 16:45", customer: "MetalWorks Ltd.", status: "Completed" },
  { id: 4, product: "Paint (White)", quantity: 8, price: 8.90, total: 71.20, date: "2025-09-21 14:20", customer: "Interior Design Co.", status: "Completed" },
  { id: 5, product: "Electrical Wire", quantity: 100, price: 2.50, total: 250, date: "2025-09-20 11:00", customer: "ElectroMax Solutions", status: "Processing" },
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
      date: new Date().toLocaleString(),
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
  const todaySales = sales.filter(sale => sale.date.includes("2025-09-22")).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Processing": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg text-white">
            <SalesIcon />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Sales Management
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Track sales performance, manage transactions, and monitor revenue growth
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-slate-800">{totalSales}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white">
                  <SalesIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-800">${totalRevenue.toFixed(0)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center text-white">
                  <RevenueIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">Average Sale</p>
                  <p className="text-2xl font-bold text-slate-800">${averageSale.toFixed(0)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white">
                  <TrendIcon />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Today's Sales</p>
                  <p className="text-2xl font-bold text-slate-800">{todaySales}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center text-white">
                  <CalendarIcon />
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
                    placeholder="Search products or customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <AddSaleIcon />
                <span className="ml-2">Record Sale</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Sale Form */}
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-slate-200 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <AddSaleIcon />
                  <span className="ml-2">Record New Sale</span>
                </h3>
                <form onSubmit={handleAddSale} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                    <Input
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="Enter product name"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      placeholder="Enter quantity"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price per Unit</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="Enter price"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Customer</label>
                    <Input
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      placeholder="Enter customer name"
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
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
        <Card className="shadow-xl border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <ProductIcon />
              <span className="ml-2">Sales Records ({filteredSales.length} transactions)</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Product</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Customer</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Quantity</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Unit Price</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Total</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale, index) => (
                    <motion.tr 
                      key={sale.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">{sale.product}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{sale.customer}</td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-800">{sale.quantity}</span>
                        <span className="text-slate-500 ml-1">units</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">${sale.price.toFixed(2)}</td>
                      <td className="py-4 px-4 font-bold text-emerald-600">${sale.total.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(sale.status)}`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 text-sm">{sale.date}</td>
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
                            onClick={() => handleDelete(sale.id)}
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

            {filteredSales.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SalesIcon />
                </div>
                <h4 className="text-lg font-semibold text-slate-600 mb-2">No sales found</h4>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
