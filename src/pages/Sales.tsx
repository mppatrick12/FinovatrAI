// pages/Sales.tsx
import { useState } from "react";

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || quantity <= 0 || price <= 0) return;

    const newSale = {
      id: Date.now(),
      product,
      quantity,
      price,
      total: quantity * price,
      date: new Date().toLocaleString(),
    };
    setSales([...sales, newSale]);

    // Reset form
    setProduct("");
    setQuantity(0);
    setPrice(0);
  };

  const handleDelete = (id: number) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sales Records</h2>

      {/* Add Sale Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Record a Sale</h3>
        <form
          onSubmit={handleAddSale}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity Sold"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price per Unit"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded col-span-full md:col-auto hover:bg-green-700"
          >
            ➕ Add Sale
          </button>
        </form>
      </div>

      {/* Sales Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Sold Products</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Price/unit</th>
              <th className="border p-2 text-left">Total</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border p-2">{sale.product}</td>
                <td className="border p-2">{sale.quantity}</td>
                <td className="border p-2">${sale.price}</td>
                <td className="border p-2">${sale.total}</td>
                <td className="border p-2">{sale.date}</td>
                <td className="border p-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(sale.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td
                  className="border p-2 text-center"
                  colSpan={6}
                >
                  No sales recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
