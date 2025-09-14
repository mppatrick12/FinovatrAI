// pages/InventoryEngine.tsx
export default function InventoryEngine() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Inventory Prediction Engine</h2>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Next Restock Date</h3>
          <p className="text-2xl font-bold text-green-600">Feb 15, 2025</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Suggested Quantity</h3>
          <p className="text-2xl font-bold text-blue-600">80 units</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Estimated Cost</h3>
          <p className="text-2xl font-bold text-red-500">$1,200</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Sales & Inventory Trend</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded">
          📊 Chart showing sales vs stock trends
        </div>
      </div>

      {/* Recommendation List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Increase purchase of Cement (high demand, low stock)</li>
          <li>Reduce stock of Bricks (slow-moving item)</li>
          <li>Consider introducing Steel Rods (market trend shows rising demand)</li>
        </ul>
      </div>
    </div>
  );
}
