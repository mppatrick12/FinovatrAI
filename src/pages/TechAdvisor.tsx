// pages/TechAdvisor.tsx
import { useState } from 'react';

interface TechRecommendation {
  id: number;
  name: string;
  description: string;
  impact: string;
  funding: string;
  costRange: string;
  roiTimeframe: string;
  financingOptions: string[];
  marketTrend: string;
  implementationComplexity: 'Low' | 'Medium' | 'High';
  image: string;
  suppliers: {
    name: string;
    contact: string;
    website: string;
  }[];
  estimatedProfitIncrease: string;
  maintenanceCost: string;
  estimatedRoiPercentage: number;
}

export default function TechAdvisor() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [loanPercentages, setLoanPercentages] = useState<{[key: number]: number}>({});
  const [loanTerms, setLoanTerms] = useState<{[key: number]: number}>({});
  const [repaymentFrequencies, setRepaymentFrequencies] = useState<{[key: number]: 'weekly' | 'monthly' | 'quarterly'}>({});

  const agriTechRecommendations: TechRecommendation[] = [
    {
      id: 1,
      name: "Smart Irrigation Systems",
      description: "Automated drip irrigation that saves water and improves yields through precision water delivery.",
      impact: "Boosts crop output by 20-40% while reducing water usage by 30-50%.",
      funding: "Government subsidies (up to 50% of cost) or cooperative group funding.",
      costRange: "$2,000 - $15,000",
      roiTimeframe: "1-2 growing seasons",
      financingOptions: [
        "Agricultural Development Bank loans (5% interest, 3-year term)",
        "Cooperative shared funding",
        "Government subsidy programs"
      ],
      marketTrend: "Growing demand due to water scarcity concerns",
      implementationComplexity: "Medium",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCz_tM1TpmJOKx3eNVcqtKR_GAkFAHDzxUxw&s",
      suppliers: [
        {
          name: "AquaFlow Irrigation Systems",
          contact: "+1 (555) 123-4567",
          website: "www.aquaflow-irrigation.com"
        },
        {
          name: "GreenTech Agri Solutions",
          contact: "+1 (555) 987-6543",
          website: "www.greentech-agri.com"
        }
      ],
      estimatedProfitIncrease: "25-35% annually",
      maintenanceCost: "$200-500/year",
      estimatedRoiPercentage: 30
    },
    {
      id: 2,
      name: "Soil & Weather Sensors",
      description: "Real-time monitoring of soil moisture, nutrient levels, and local climate conditions with data sent directly to your phone.",
      impact: "Helps farmers make better planting and fertilization decisions, reducing input costs by 15-25%.",
      funding: "NGO grants (up to 70% coverage) or micro-finance support.",
      costRange: "$500 - $3,000",
      roiTimeframe: "6-12 months",
      financingOptions: [
        "Microfinance institutions (small weekly payments)",
        "Agri-tech company leasing programs",
        "Crowdfunding campaigns"
      ],
      marketTrend: "Rapid adoption in precision agriculture",
      implementationComplexity: "Low",
      image: "https://img.yfisher.com/m0/1743574730127-image/png100-t3-scale100.png",
      suppliers: [
        {
          name: "SensorTech Agriculture",
          contact: "+1 (555) 456-7890",
          website: "www.sensortech-ag.com"
        },
        {
          name: "Precision Farming Solutions",
          contact: "+1 (555) 234-5678",
          website: "www.precisionfarming.com"
        }
      ],
      estimatedProfitIncrease: "15-25% annually",
      maintenanceCost: "$100-300/year",
      estimatedRoiPercentage: 20
    },
    {
      id: 3,
      name: "Post-Harvest Storage Solutions",
      description: "Low-cost solar cold storage or hermetic bags to reduce spoilage and extend product shelf life.",
      impact: "Cuts post-harvest losses by up to 70% and increases profits by 25-40%.",
      funding: "Farmer cooperatives or small business loans.",
      costRange: "$1,000 - $20,000",
      roiTimeframe: "1 season",
      financingOptions: [
        "Small Business Administration loans",
        "Cooperative investment pools",
        "Equipment financing (pay-as-you-store model)"
      ],
      marketTrend: "Critical need in developing markets with high post-harvest losses",
      implementationComplexity: "Medium",
      image: "https://www.logisticsinsider.in/wp-content/uploads/2022/07/thumb.jpg",
      suppliers: [
        {
          name: "StoreFresh Solutions",
          contact: "+1 (555) 765-4321",
          website: "www.storefresh.com"
        },
        {
          name: "AgriStorage Technologies",
          contact: "+1 (555) 876-5432",
          website: "www.agristorage-tech.com"
        }
      ],
      estimatedProfitIncrease: "30-40% annually",
      maintenanceCost: "$300-800/year",
      estimatedRoiPercentage: 35
    },
    {
      id: 4,
      name: "Mobile Market Platforms",
      description: "Connects farmers directly with buyers, restaurants, and retailers, reducing middlemen and increasing profit margins.",
      impact: "Ensures fair pricing and larger market access, increasing revenue by 15-30%.",
      funding: "Partnerships with telecom companies or NGOs.",
      costRange: "$300 - $2,000",
      roiTimeframe: "Immediate (first transaction)",
      financingOptions: [
        "Tech company partnership programs",
        "NGO digital inclusion grants",
        "Community shared technology funds"
      ],
      marketTrend: "Explosive growth in mobile commerce platforms",
      implementationComplexity: "Low",
      image: "https://cff2.earth.com/uploads/2017/08/09184908/Online-food-shopping-found-to-make-healthy-decisions-easier.jpg",
      suppliers: [
        {
          name: "FarmConnect Digital",
          contact: "+1 (555) 345-6789",
          website: "www.farmconnect.com"
        },
        {
          name: "AgriMarket Mobile",
          contact: "+1 (555) 654-3210",
          website: "www.agrimarket.io"
        }
      ],
      estimatedProfitIncrease: "20-30% annually",
      maintenanceCost: "$50-200/year",
      estimatedRoiPercentage: 25
    },
  ];

  const calculateOptimalFinancing = (techId: number, loanPercentage: number, term: number, frequency: 'weekly' | 'monthly' | 'quarterly') => {
    const tech = agriTechRecommendations.find(t => t.id === techId);
    if (!tech) return null;
    
    const cost = tech.costRange.replace('$', '').split(' - ');
    const avgCost = (parseInt(cost[0].replace(/,/g, '')) + parseInt(cost[1].replace(/,/g, ''))) / 2;
    const loanAmount = (loanPercentage / 100) * avgCost;
    const roiFundAmount = avgCost - loanAmount;
    
    // Different interest rates based on technology risk profile
    const interestRate = tech.implementationComplexity === 'Low' ? 0.06 : 
                         tech.implementationComplexity === 'Medium' ? 0.08 : 0.12;
    
    // Calculate payments based on frequency
    let paymentCount, periodicRate;
    switch(frequency) {
      case 'weekly':
        paymentCount = term * 52 / 12; // Approximate weeks in the term
        periodicRate = interestRate / 52;
        break;
      case 'monthly':
        paymentCount = term;
        periodicRate = interestRate / 12;
        break;
      case 'quarterly':
        paymentCount = term / 3;
        periodicRate = interestRate / 4;
        break;
    }
    
    const periodicPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, paymentCount)) / (Math.pow(1 + periodicRate, paymentCount) - 1);
    
    // Calculate ROI contribution
    const roiContribution = (tech.estimatedRoiPercentage / 100) * roiFundAmount;
    
    return {
      totalCost: avgCost,
      loanAmount,
      roiFundAmount,
      interestRate: interestRate * 100,
      paymentFrequency: frequency,
      periodicPayment,
      paymentCount,
      totalInterest: (periodicPayment * paymentCount) - loanAmount,
      totalPayment: periodicPayment * paymentCount,
      roiContribution,
      canBeCoveredByRoi: roiContribution >= periodicPayment
    };
  };

  const toggleExpand = (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
      // Set default values when expanding
      if (!loanPercentages[id]) setLoanPercentages(prev => ({...prev, [id]: 50}));
      if (!loanTerms[id]) setLoanTerms(prev => ({...prev, [id]: 12}));
      if (!repaymentFrequencies[id]) setRepaymentFrequencies(prev => ({...prev, [id]: 'monthly'}));
    }
  };

  const handleLoanPercentageChange = (techId: number, value: string) => {
    const percentage = parseInt(value) || 0;
    setLoanPercentages(prev => ({...prev, [techId]: Math.min(100, Math.max(0, percentage))}));
  };

  const handleLoanTermChange = (techId: number, value: string) => {
    const term = parseInt(value) || 0;
    setLoanTerms(prev => ({...prev, [techId]: Math.max(1, term)}));
  };

  const handleRepaymentFrequencyChange = (techId: number, value: 'weekly' | 'monthly' | 'quarterly') => {
    setRepaymentFrequencies(prev => ({...prev, [techId]: value}));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AgriTech Advisor</h1>
        <p className="text-gray-600">
          Intelligent technology recommendations with detailed financial analysis for your agricultural business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {agriTechRecommendations.map((tech) => {
          const loanPercentage = loanPercentages[tech.id] || 50;
          const loanTerm = loanTerms[tech.id] || 12;
          const repaymentFrequency = repaymentFrequencies[tech.id] || 'monthly';
          const financing = calculateOptimalFinancing(tech.id, loanPercentage, loanTerm, repaymentFrequency);
          
          return (
            <div
              key={tech.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 ${
                expandedCard === tech.id ? 'ring-2 ring-green-500 shadow-xl' : 'hover:shadow-lg'
              }`}
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tech.implementationComplexity === 'Low' ? 'bg-green-100 text-green-800' :
                    tech.implementationComplexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tech.implementationComplexity} Implementation
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {tech.name}
                  </h3>
                  <button 
                    onClick={() => toggleExpand(tech.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    {expandedCard === tech.id ? 'Show Less' : 'Show Details'}
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{tech.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-xs text-blue-700 font-medium">Investment Range</p>
                    <p className="text-sm font-semibold">{tech.costRange}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-xs text-green-700 font-medium">Profit Increase</p>
                    <p className="text-sm font-semibold">{tech.estimatedProfitIncrease}</p>
                  </div>
                </div>
                
                {expandedCard === tech.id && (
                  <div className="mt-6 space-y-6 border-t pt-6">
                    {/* Financial Analysis */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Financial Analysis</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-xs text-gray-700 font-medium">ROI Timeframe</p>
                          <p className="text-sm font-semibold">{tech.roiTimeframe}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-xs text-gray-700 font-medium">Maintenance Cost</p>
                          <p className="text-sm font-semibold">{tech.maintenanceCost}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Impact:</span> {tech.impact}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced Loan Calculator */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Financing Strategy</h4>
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Recommended Strategy:</span> We suggest using a combination of 
                          loan financing and ROI funds for optimal financial health.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loan Percentage (% of total cost)
                          </label>
                          <div className="flex items-center">
                            <input
                              type="range"
                              value={loanPercentage}
                              onChange={(e) => handleLoanPercentageChange(tech.id, e.target.value)}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              min="0"
                              max="100"
                            />
                            <span className="ml-3 text-sm font-medium w-12">
                              {loanPercentage}%
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (months)</label>
                          <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => handleLoanTermChange(tech.id, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            min="1"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Frequency</label>
                        <div className="flex space-x-4">
                          {(['weekly', 'monthly', 'quarterly'] as const).map(freq => (
                            <button
                              key={freq}
                              onClick={() => handleRepaymentFrequencyChange(tech.id, freq)}
                              className={`px-4 py-2 rounded-md text-sm ${
                                repaymentFrequency === freq 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {financing && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded-md">
                              <p className="text-xs text-green-700 font-medium">Total Investment</p>
                              <p className="text-sm font-semibold">{formatCurrency(financing.totalCost)}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-md">
                              <p className="text-xs text-blue-700 font-medium">Loan Amount</p>
                              <p className="text-sm font-semibold">{formatCurrency(financing.loanAmount)}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-purple-50 p-3 rounded-md">
                              <p className="text-xs text-purple-700 font-medium">From ROI Funds</p>
                              <p className="text-sm font-semibold">{formatCurrency(financing.roiFundAmount)}</p>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-md">
                              <p className="text-xs text-yellow-700 font-medium">Interest Rate</p>
                              <p className="text-sm font-semibold">{financing.interestRate.toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h5 className="text-sm font-medium text-gray-900 mb-3">Repayment Plan</h5>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-xs text-gray-700">{financing.paymentFrequency.charAt(0).toUpperCase() + financing.paymentFrequency.slice(1)} Payment</p>
                                <p className="text-sm font-semibold">{formatCurrency(financing.periodicPayment)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-700">Total Interest</p>
                                <p className="text-sm font-semibold">{formatCurrency(financing.totalInterest)}</p>
                              </div>
                            </div>
                            
                            <div className={`p-3 rounded-md ${financing.canBeCoveredByRoi ? 'bg-green-100' : 'bg-orange-100'}`}>
                              <p className="text-xs font-medium">
                                {financing.canBeCoveredByRoi ? (
                                  <span className="text-green-800">
                                    ✅ Your estimated ROI of {formatCurrency(financing.roiContribution)} can cover your {financing.paymentFrequency} payments
                                  </span>
                                ) : (
                                  <span className="text-orange-800">
                                    ⚠️ Your estimated ROI of {formatCurrency(financing.roiContribution)} may not fully cover your {financing.paymentFrequency} payments
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-xs text-blue-700">
                              <span className="font-medium">Note:</span> Based on your business's financial profile and 
                              estimated ROI of {tech.estimatedRoiPercentage}%, we recommend this financing strategy to 
                              minimize risk while maximizing returns.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Funding Options */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Funding Options</h4>
                      <p className="text-purple-600 font-medium text-sm mb-2">{tech.funding}</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        {tech.financingOptions.map((option, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Suppliers */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommended Suppliers</h4>
                      <div className="space-y-3">
                        {tech.suppliers.map((supplier, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium">{supplier.name}</p>
                            <p className="text-xs text-gray-600">{supplier.contact}</p>
                            <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                              {supplier.website}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Market Trend */}
                    <div className="bg-green-50 p-3 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1 text-sm">Market Trend</h4>
                      <p className="text-xs text-gray-700">{tech.marketTrend}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">How Our Technology Advisor Works</h3>
        <p className="text-gray-700 mb-3">
          Our intelligent system analyzes your business's financial health, operational data, and market position
          to recommend technologies that will deliver the highest return on investment for your specific situation.
        </p>
        <p className="text-gray-700">
          As your business evolves, the recommendations will automatically update to reflect changes in your
          operations, market conditions, and new technological developments in the agricultural sector.
        </p>
      </div>
    </div>
  );
}