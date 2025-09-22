// pages/LoanEngine.tsx
import { useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Define types
interface BusinessData {
  name: string;
  type: string;
  age: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  creditScore: number;
  existingDebt: number;
  seasonality: string;
  growthRate: number;
}

interface LoanRecommendation {
  amount: number;
  term: number;
  purpose: string;
  confidence: number;
  reason: string;
  impact: string;
}

interface FinancialInstitution {
  name: string;
  interestRate: number;
  maxTerm: number;
  minAmount: number;
  maxAmount: number;
  rating: number;
  approvalTime: string;
  specialFeatures: string[];
}

interface RepaymentSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export default function LoanEngine() {
  // Pre-filled business data (now editable in the UI)
  const [businessData] = useState<BusinessData>({
    name: "Green Valley Dairy Farm",
    type: "Agriculture",
    age: 3,
    monthlyRevenue: 12500,
    monthlyExpenses: 8500,
    creditScore: 720,
    existingDebt: 15000,
    seasonality: "High in summer, low in winter",
    growthRate: 12 // percentage
  });

  const [selectedLoan, setSelectedLoan] = useState<LoanRecommendation | null>(null);
  const [repaymentSchedule, setRepaymentSchedule] = useState<RepaymentSchedule[]>([]);
  const [institutions, setInstitutions] = useState<FinancialInstitution[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  // Color scheme
  const colors = {
    primary: "#3B82F6",   // Blue
    success: "#10B981",   // Green
    warning: "#F59E0B",   // Amber
    danger: "#EF4444",    // Red
    neutral: "#6B7280",   // Gray
    background: "#F8FAFC", // Light background
    card: "#FFFFFF",      // Card background
    textPrimary: "#1F2937", // Dark text
    textSecondary: "#6B7280" // Light text
  };

  // Financial institutions data
  const financialInstitutions: FinancialInstitution[] = [
    {
      name: "AgriBusiness Bank",
      interestRate: 7.5,
      maxTerm: 60,
      minAmount: 5000,
      maxAmount: 100000,
      rating: 4.8,
      approvalTime: "2-3 days",
      specialFeatures: ["Agricultural focus", "Grace periods", "Seasonal payment plans"]
    },
    {
      name: "Small Business Lender",
      interestRate: 9.2,
      maxTerm: 36,
      minAmount: 2000,
      maxAmount: 50000,
      rating: 4.5,
      approvalTime: "1-2 days",
      specialFeatures: ["Fast approval", "No collateral needed", "Flexible terms"]
    },
    {
      name: "Community Development Fund",
      interestRate: 6.8,
      maxTerm: 84,
      minAmount: 10000,
      maxAmount: 250000,
      rating: 4.7,
      approvalTime: "5-7 days",
      specialFeatures: ["Lower rates", "Business mentoring", "Networking opportunities"]
    }
  ];

  // Generate AI recommendations based on business data
  const loanRecommendations: LoanRecommendation[] = [
    {
      amount: 25000,
      term: 36,
      purpose: "Equipment modernization",
      confidence: 88,
      reason: "Your dairy operation shows consistent growth but could benefit from automated milking systems to increase efficiency by 30%.",
      impact: "Expected to increase monthly revenue by 18% and reduce labor costs by 22%"
    },
    {
      amount: 15000,
      term: 24,
      purpose: "Cold storage expansion",
      confidence: 92,
      reason: "Your current storage capacity limits sales during peak production months. Expansion would reduce spoilage by 15%.",
      impact: "Will allow you to meet summer demand spikes and reduce product loss"
    },
    {
      amount: 10000,
      term: 12,
      purpose: "Working capital for seasonal needs",
      confidence: 95,
      reason: "Provides buffer for feed and supply costs during winter months when revenue typically drops by 25%.",
      impact: "Smooths cash flow throughout the year, preventing operational disruptions"
    }
  ];

  // Calculate loan details
  const calculateLoanPlan = (loan: LoanRecommendation) => {
    const P = loan.amount;
    const r = 8.5 / 100 / 12; // Using average interest rate
    const n = loan.term;
    
    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    // const disposableIncome = businessData.monthlyRevenue - businessData.monthlyExpenses;
    
    // Generate repayment schedule
    const schedule: RepaymentSchedule[] = [];
    let balance = P;
    
    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: balance > 0 ? balance : 0
      });
    }

    // Filter suitable financial institutions
    const suitableInstitutions = financialInstitutions.filter(
      inst => P >= inst.minAmount && 
              P <= inst.maxAmount && 
              loan.term <= inst.maxTerm
    );

    setSelectedLoan(loan);
    setRepaymentSchedule(schedule);
    setInstitutions(suitableInstitutions);
    setShowDetails(true);
  };

  // Helper computations
  const disposableIncome = businessData.monthlyRevenue - businessData.monthlyExpenses;

  const affordabilityScore = Math.max(
    0,
    Math.min(100, Math.round((disposableIncome / Math.max(1, businessData.monthlyRevenue)) * 100))
  );

  const riskScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        100 -
          ((businessData.creditScore - 300) / (850 - 300)) * 100 -
          Math.min(30, (businessData.existingDebt / Math.max(1, businessData.monthlyRevenue)) * 10)
      )
    )
  );

  // Data for visualizations
  const financialHealthData = [
    { month: 'Jan', revenue: 12000, expenses: 8000 },
    { month: 'Feb', revenue: 11500, expenses: 8200 },
    { month: 'Mar', revenue: 12500, expenses: 8500 },
    { month: 'Apr', revenue: 13000, expenses: 8700 },
    { month: 'May', revenue: 14000, expenses: 9000 },
    { month: 'Jun', revenue: 14500, expenses: 9200 },
    { month: 'Jul', revenue: 15000, expenses: 9500 },
    { month: 'Aug', revenue: 15500, expenses: 9700 },
    { month: 'Sep', revenue: 14500, expenses: 9300 },
    { month: 'Oct', revenue: 13500, expenses: 8900 },
    { month: 'Nov', revenue: 12500, expenses: 8500 },
    { month: 'Dec', revenue: 11500, expenses: 8300 },
  ];

  const loanUsageData = [
    { name: 'Equipment', value: 45 },
    { name: 'Inventory', value: 25 },
    { name: 'Operating Costs', value: 20 },
    { name: 'Marketing', value: 10 },
  ];

  const COLORS = [colors.primary, colors.success, colors.warning, colors.neutral];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-green-600 font-medium">Revenue: ${payload[0].value.toLocaleString()}</p>
          <p className="text-red-600 font-medium">Expenses: ${payload[1].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financing Advisory Engine</h1>
              <p className="text-gray-600 mt-2">
                AI-powered loan recommendations based on your business performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-500">Affordability Score</p>
                <div className="flex items-center mt-1">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${affordabilityScore}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-700">{affordabilityScore}%</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-500">Risk Score</p>
                <div className="flex items-center mt-1">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${riskScore}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-700">{riskScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Overview Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Business Overview</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {businessData.type}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700 font-medium">Business</p>
              <p className="text-lg font-semibold text-gray-900">{businessData.name}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-100">
              <p className="text-sm text-green-700 font-medium">Monthly Revenue</p>
              <p className="text-lg font-semibold text-gray-900">${businessData.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-100">
              <p className="text-sm text-red-700 font-medium">Monthly Expenses</p>
              <p className="text-lg font-semibold text-gray-900">${businessData.monthlyExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-100">
              <p className="text-sm text-purple-700 font-medium">Credit Score</p>
              <p className="text-lg font-semibold text-gray-900">{businessData.creditScore}</p>
            </div>
          </div>

          {/* Financial Health Chart */}
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialHealthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={colors.success} 
                    name="Revenue" 
                    strokeWidth={3} 
                    dot={{ fill: colors.success, strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: colors.success }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke={colors.danger} 
                    name="Expenses" 
                    strokeWidth={3} 
                    dot={{ fill: colors.danger, strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: colors.danger }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
              <p className="text-gray-600 mt-1">
                Based on your business performance and financial trends
              </p>
            </div>
            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-sm font-medium">Powered by AI</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loanRecommendations.map((loan, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Option {index + 1}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    loan.confidence > 90 ? "bg-green-100 text-green-800" :
                    loan.confidence > 80 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {loan.confidence}% Confidence
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900">${loan.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">{loan.term} months • {loan.purpose}</p>
                </div>
                
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{loan.reason}</p>
                
                <button
                  onClick={() => calculateLoanPlan(loan)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                >
                  Analyze This Option
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Analysis Details */}
        {showDetails && selectedLoan && (
          <div className="space-y-8">
            {/* Loan Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Loan Analysis: {selectedLoan.purpose}</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 font-medium">Loan Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${selectedLoan.amount.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-100">
                  <p className="text-sm text-green-700 font-medium">Term</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedLoan.term} months</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-100">
                  <p className="text-sm text-purple-700 font-medium">Expected Impact</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedLoan.impact}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Loan Usage Breakdown */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Allocation</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={loanUsageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                        >
                          {loanUsageData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Allocation']}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Repayment Summary */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Repayment Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Monthly Payment:</span>
                      <span className="font-semibold text-gray-900">${repaymentSchedule[0]?.payment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Total Interest:</span>
                      <span className="font-semibold text-gray-900">
                        ${(repaymentSchedule.reduce((acc, curr) => acc + curr.interest, 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Total Repayment:</span>
                      <span className="font-semibold text-gray-900">
                        ${(repaymentSchedule.reduce((acc, curr) => acc + curr.payment, 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Debt-to-Income Ratio:</span>
                      <span className="font-semibold text-gray-900">
                        {((repaymentSchedule[0]?.payment / businessData.monthlyRevenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Repayment Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Repayment Schedule (First 12 Months)</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Principal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {repaymentSchedule.slice(0, 12).map((payment) => (
                      <tr key={payment.month} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${payment.payment.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          ${payment.principal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                          ${payment.interest.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${payment.remainingBalance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommended Lenders */}
            {institutions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Lenders</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {institutions.map((inst, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-gray-900">{inst.name}</h4>
                        <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full">
                          ⭐ {inst.rating}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm">Interest Rate:</span>
                          <span className="font-medium text-gray-900">{inst.interestRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm">Approval Time:</span>
                          <span className="font-medium text-gray-900">{inst.approvalTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm">Max Term:</span>
                          <span className="font-medium text-gray-900">{inst.maxTerm} months</span>
                        </div>
                      </div>
                      
                      <div className="mb-5">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Special Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {inst.specialFeatures.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                        Apply with {inst.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}