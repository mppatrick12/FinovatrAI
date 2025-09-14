// pages/Reports.tsx

export default function Reports() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Business Reports</h2>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600">$25,400</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-500">$10,200</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500">Net Profit</h3>
          <p className="text-2xl font-bold text-blue-600">$15,200</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500">Inventory Value</h3>
          <p className="text-2xl font-bold text-purple-600">$7,800</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Sales vs Expenses</h3>
        <div className="h-64 flex items-center justify-center border-2 border-dashed rounded text-gray-400">
          📊 Chart Placeholder (e.g., Bar or Line chart)
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Report</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-2">Month</th>
              <th className="border p-2">Sales</th>
              <th className="border p-2">Expenses</th>
              <th className="border p-2">Profit</th>
              <th className="border p-2">Inventory Purchases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">January</td>
              <td className="border p-2">$8,500</td>
              <td className="border p-2">$3,200</td>
              <td className="border p-2 text-green-600">$5,300</td>
              <td className="border p-2">$2,000</td>
            </tr>
            <tr>
              <td className="border p-2">February</td>
              <td className="border p-2">$7,400</td>
              <td className="border p-2">$2,800</td>
              <td className="border p-2 text-green-600">$4,600</td>
              <td className="border p-2">$1,500</td>
            </tr>
            <tr>
              <td className="border p-2">March</td>
              <td className="border p-2">$9,500</td>
              <td className="border p-2">$4,200</td>
              <td className="border p-2 text-green-600">$5,300</td>
              <td className="border p-2">$2,300</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
