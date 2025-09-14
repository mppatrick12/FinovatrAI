// pages/Inventory.tsx
export default function Inventory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded col-span-full hover:bg-green-700"
          >
            ➕ Add Product
          </button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Current Stock</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Cement</td>
              <td className="border p-2">40</td>
              <td className="border p-2">$10</td>
              <td className="border p-2 space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="border p-2">Bricks</td>
              <td className="border p-2">120</td>
              <td className="border p-2">$0.5</td>
              <td className="border p-2 space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
