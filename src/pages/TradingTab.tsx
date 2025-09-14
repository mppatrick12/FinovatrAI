import { useState } from "react";
import { Card, CardContent } from "../assets/components/ui/card";
import { Input } from "../assets/components/ui/input";
import { Button } from "../assets/components/ui/button";

export default function TradingTab() {
  const [sales, setSales] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [form, setForm] = useState({
    product: "",
    customer: "",
    quantity: 1,
    unitPrice: 0,
  });
  const [outward, setOutward] = useState({ description: "", amount: 0 });

  const handleSale = () => {
    const totalPrice = form.quantity * form.unitPrice;
    setSales([...sales, { ...form, totalPrice }]);
    setForm({ product: "", customer: "", quantity: 1, unitPrice: 0 });
  };

  const handleOutward = () => {
    setExpenses([...expenses, outward]);
    setOutward({ description: "", amount: 0 });
  };

  const totalSales = sales.reduce((sum, s) => sum + s.totalPrice, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="space-y-8">
      {/* Selling Workspace */}
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Sell Product / Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Product/Service" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
            <Input placeholder="Customer Name" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} />
            <Input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} />
            <Input type="number" placeholder="Unit Price" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: Number(e.target.value) })} />
            <Input type="number" readOnly value={form.quantity * form.unitPrice} placeholder="Total" />
            <Button onClick={handleSale}>Sell</Button>
          </div>
        </CardContent>
      </Card>

      {/* Outward Money Card */}
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Outward Money</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Description" value={outward.description} onChange={e => setOutward({ ...outward, description: e.target.value })} />
            <Input type="number" placeholder="Amount" value={outward.amount} onChange={e => setOutward({ ...outward, amount: Number(e.target.value) })} />
            <Button onClick={handleOutward}>Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Report + Sales Table */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Daily Sales Records</h2>
            <Button>Generate Report</Button>
          </div>
          <table className="w-full text-sm text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Unit Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s, i) => (
                <tr key={i}>
                  <td className="p-2 border">{s.customer}</td>
                  <td className="p-2 border">{s.product}</td>
                  <td className="p-2 border">{s.quantity}</td>
                  <td className="p-2 border">{s.unitPrice}</td>
                  <td className="p-2 border">{s.totalPrice}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold">
                <td colSpan={4} className="p-2 border text-right">Total Sales</td>
                <td className="p-2 border">${totalSales}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Daily Expenses</h2>
          <table className="w-full text-sm text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i}>
                  <td className="p-2 border">{e.description}</td>
                  <td className="p-2 border">{e.amount}</td>
                </tr>
              ))}
              <tr className="bg-red-50 font-bold">
                <td className="p-2 border text-right">Total Expenses</td>
                <td className="p-2 border">${totalExpenses}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
