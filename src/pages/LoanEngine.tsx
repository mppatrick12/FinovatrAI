// pages/LoanEngine.tsx
import  { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function LoanEngine() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [results, setResults] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateLoanPlan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12; // monthly rate
    const n = parseInt(loanTerm) * 12; // months
    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const disposableIncome = parseFloat(monthlyIncome) - parseFloat(monthlyExpenses);
    const affordability = disposableIncome - monthlyPayment;

    // Build chart dataset
    const data: any[] = [];
    for (let month = 1; month <= n; month++) {
      data.push({
        month: `M${month}`,
        income: disposableIncome,
        repayment: monthlyPayment,
        remaining: disposableIncome - monthlyPayment,
      });
    }

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: (monthlyPayment * n).toFixed(2),
      affordability,
      suggestion:
        affordability > 0
          ? "✅ You can afford this loan. It will not exceed your disposable income."
          : "⚠️ This loan may strain your cash flow. Consider a smaller loan or longer term.",
    });
    setChartData(data.slice(0, 24)); // show first 24 months (2 years) for clarity
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Loan Suggestion Engine</h2>
      <p className="text-gray-700 mb-8">
        Enter your financial details to generate a repayment strategy and visualize its impact.
      </p>

      {/* Loan Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Monthly Income ($)</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Monthly Expenses ($)</label>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={calculateLoanPlan}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Generate Loan Plan
      </button>

      {/* Loan Results */}
      {results && (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Loan Analysis</h3>
          <p><b>Monthly Payment:</b> ${results.monthlyPayment}</p>
          <p><b>Total Repayment:</b> ${results.totalPayment}</p>
          <p
            className={`mt-2 ${
              results.affordability > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.suggestion}
          </p>

          {/* Chart Section */}
          <div className="mt-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10B981" name="Disposable Income" />
                <Line type="monotone" dataKey="repayment" stroke="#EF4444" name="Loan Repayment" />
                <Line type="monotone" dataKey="remaining" stroke="#3B82F6" name="Remaining Cash Flow" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
