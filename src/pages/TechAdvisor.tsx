// pages/TechAdvisor.tsx
import { useEffect, useState } from 'react';

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

// SVG Icons
const WaterDropIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.75 21.02c4.72 0 8.54-3.82 8.54-8.54 0-2.36-2.26-5.72-3.61-7.52-1.01-1.35-2.86-1.35-3.87 0-1.35 1.8-3.61 5.16-3.61 7.52 0 4.72 3.82 8.54 8.55 8.54z" />
  </svg>
);

const SensorIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const StorageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const MobileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExclamationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.312 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function TechAdvisor() {
  const [selectedTech, setSelectedTech] = useState<TechRecommendation | null>(null);
  const [loanPercentages, setLoanPercentages] = useState<{ [key: number]: number }>({});
  const [loanTerms, setLoanTerms] = useState<{ [key: number]: number }>({});
  const [repaymentFrequencies, setRepaymentFrequencies] = useState<{ [key: number]: 'weekly' | 'monthly' | 'quarterly' }>({});

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Apply Inter font to body
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
    switch (frequency) {
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

  const openModal = (tech: TechRecommendation) => {
    setSelectedTech(tech);
    // Set default values when opening modal
    if (!loanPercentages[tech.id]) setLoanPercentages(prev => ({ ...prev, [tech.id]: 50 }));
    if (!loanTerms[tech.id]) setLoanTerms(prev => ({ ...prev, [tech.id]: 12 }));
    if (!repaymentFrequencies[tech.id]) setRepaymentFrequencies(prev => ({ ...prev, [tech.id]: 'monthly' }));
  };

  const closeModal = () => {
    setSelectedTech(null);
  };

  const handleLoanPercentageChange = (techId: number, value: string) => {
    const percentage = parseInt(value) || 0;
    setLoanPercentages(prev => ({ ...prev, [techId]: Math.min(100, Math.max(0, percentage)) }));
  };

  const handleLoanTermChange = (techId: number, value: string) => {
    const term = parseInt(value) || 0;
    setLoanTerms(prev => ({ ...prev, [techId]: Math.max(1, term) }));
  };

  const handleRepaymentFrequencyChange = (techId: number, value: 'weekly' | 'monthly' | 'quarterly') => {
    setRepaymentFrequencies(prev => ({ ...prev, [techId]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get appropriate icon for each technology
  const getTechIcon = (id: number) => {
    switch (id) {
      case 1: return <WaterDropIcon />;
      case 2: return <SensorIcon />;
      case 3: return <StorageIcon />;
      case 4: return <MobileIcon />;
      default: return <SettingsIcon />;
    }
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-6">
          {/* <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white ">
            <SettingsIcon />
          </div> */}
          <h1 className="text-2xl font-bold text-gray-800">
            AgriTech Intelligence Hub
          </h1>
          <p className="text-gray-600 text-sm">
            AI-powered technology recommendations with comprehensive financial analysis tailored for your agricultural business
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm">
            <div className="flex items-center text-emerald-600">
              <CheckCircleIcon />
              <span className="ml-2 font-medium">Smart Analysis</span>
            </div>
            <div className="flex items-center text-blue-600">
              <TrendUpIcon />
              <span className="ml-2 font-medium">ROI Optimization</span>
            </div>
            <div className="flex items-center text-purple-600">
              <ClockIcon />
              <span className="ml-2 font-medium">Real-time Updates</span>
            </div>
          </div>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {agriTechRecommendations.map((tech) => {

            return (
              <div
                key={tech.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-2xl hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Section with Overlay */}
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* Technology Icon */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-600 shadow-lg">
                      {getTechIcon(tech.id)}
                    </div>
                  </div>

                  {/* Complexity Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${tech.implementationComplexity === 'Low' ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-200' :
                      tech.implementationComplexity === 'Medium' ? 'bg-amber-100/90 text-amber-800 border border-amber-200' :
                        'bg-red-100/90 text-red-800 border border-red-200'
                      }`}>
                      {tech.implementationComplexity} Implementation
                    </span>
                  </div>

                  {/* ROI Badge */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg">
                      {tech.estimatedRoiPercentage}% ROI
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Header with Expand Button */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">
                      {tech.name}
                    </h3>
                    <button
                      onClick={() => openModal(tech)}
                      className="flex items-center space-x-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span>View Details</span>
                      <ChevronDownIcon />
                    </button>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">{tech.description}</p>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center text-blue-600 mb-2">
                        <MoneyIcon />
                        <p className="text-xs font-semibold ml-2 uppercase tracking-wide">Investment Range</p>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{tech.costRange}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                      <div className="flex items-center text-emerald-600 mb-2">
                        <TrendUpIcon />
                        <p className="text-xs font-semibold ml-2 uppercase tracking-wide">Profit Increase</p>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{tech.estimatedProfitIncrease}</p>
                    </div>
                  </div>


                </div>
              </div>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
              <SettingsIcon />
            </div>
            <h3 className="text-2xl font-bold">How Our AI Technology Advisor Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Our intelligent system continuously analyzes your business's financial health, operational patterns,
                and market dynamics to recommend technologies that deliver the highest return on investment.
              </p>
              <div className="flex items-center text-blue-100">
                <CheckCircleIcon />
                <span className="ml-2 font-medium">Real-time market analysis</span>
              </div>
            </div>
            <div>
              <p className="text-blue-100 mb-4 leading-relaxed">
                As your business evolves, our recommendations automatically adapt to reflect changes in your
                operations, financial capacity, and emerging agricultural technologies.
              </p>
              <div className="flex items-center text-blue-100">
                <TrendUpIcon />
                <span className="ml-2 font-medium">Adaptive recommendations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Dialog */}
        {selectedTech && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                <img
                  src={selectedTech.image}
                  alt={selectedTech.name}
                  className="w-full h-full object-cover"
                />

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all duration-200 shadow-lg hover:scale-110"
                >
                  <CloseIcon />
                </button>

                {/* Tech Icon */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-600 shadow-lg">
                    {getTechIcon(selectedTech.id)}
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedTech.name}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${selectedTech.implementationComplexity === 'Low' ? 'bg-emerald-100/90 text-emerald-800' :
                      selectedTech.implementationComplexity === 'Medium' ? 'bg-amber-100/90 text-amber-800' :
                        'bg-red-100/90 text-red-800'
                      }`}>
                      {selectedTech.implementationComplexity} Implementation
                    </span>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                      {selectedTech.estimatedRoiPercentage}% ROI
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <p className="text-lg text-slate-700 leading-relaxed">{selectedTech.description}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                    <div className="flex items-center text-blue-600 mb-2">
                      <MoneyIcon />
                      <p className="text-xs font-semibold ml-2 uppercase tracking-wide">Investment Range</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{selectedTech.costRange}</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">
                    <div className="flex items-center text-emerald-600 mb-2">
                      <TrendUpIcon />
                      <p className="text-xs font-semibold ml-2 uppercase tracking-wide">Profit Increase</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{selectedTech.estimatedProfitIncrease}</p>
                  </div>
                </div>

                {/* Financial Analysis */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="flex items-center text-xl font-bold text-slate-800 mb-4">
                    <MoneyIcon />
                    <span className="ml-2">Financial Analysis</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                      <div className="flex items-center text-slate-600 mb-2">
                        <ClockIcon />
                        <p className="text-xs font-semibold ml-2 uppercase tracking-wide">ROI Timeframe</p>
                      </div>
                      <p className="text-base font-bold text-slate-800">{selectedTech.roiTimeframe}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                      <div className="flex items-center text-slate-600 mb-2">
                        <SettingsIcon />
                        <p className="text-xs font-semibold ml-2 uppercase tracking-wide">Maintenance Cost</p>
                      </div>
                      <p className="text-base font-bold text-slate-800">{selectedTech.maintenanceCost}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg text-white">
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold">Impact:</span> {selectedTech.impact}
                    </p>
                  </div>
                </div>

                {/* Smart Financing Strategy */}
                {(() => {
                  const loanPercentage = loanPercentages[selectedTech.id] || 50;
                  const loanTerm = loanTerms[selectedTech.id] || 12;
                  const repaymentFrequency = repaymentFrequencies[selectedTech.id] || 'monthly';
                  const financing = calculateOptimalFinancing(selectedTech.id, loanPercentage, loanTerm, repaymentFrequency);

                  return (
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="flex items-center text-xl font-bold text-slate-800 mb-4">
                        <TrendUpIcon />
                        <span className="ml-2">Smart Financing Strategy</span>
                      </h3>
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 leading-relaxed">
                          <span className="font-semibold">AI Recommendation:</span> Our intelligent system suggests an optimal
                          combination of loan financing and ROI reinvestment for maximum financial efficiency.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Loan Percentage (% of total cost)
                          </label>
                          <div className="flex items-center">
                            <input
                              type="range"
                              value={loanPercentage}
                              onChange={(e) => handleLoanPercentageChange(selectedTech.id, e.target.value)}
                              className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                              min="0"
                              max="100"
                            />
                            <span className="ml-4 text-lg font-bold text-slate-800 w-16 text-center bg-slate-100 px-3 py-1 rounded-lg">
                              {loanPercentage}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Loan Term (months)</label>
                          <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => handleLoanTermChange(selectedTech.id, e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Repayment Frequency</label>
                        <div className="flex space-x-3">
                          {(['weekly', 'monthly', 'quarterly'] as const).map(freq => (
                            <button
                              key={freq}
                              onClick={() => handleRepaymentFrequencyChange(selectedTech.id, freq)}
                              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${repaymentFrequency === freq
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                              {freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {financing && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-1">Total Investment</p>
                              <p className="text-xl font-bold text-slate-800">{formatCurrency(financing.totalCost)}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                              <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide mb-1">Loan Amount</p>
                              <p className="text-xl font-bold text-slate-800">{formatCurrency(financing.loanAmount)}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                              <p className="text-xs text-purple-700 font-semibold uppercase tracking-wide mb-1">From ROI Funds</p>
                              <p className="text-xl font-bold text-slate-800">{formatCurrency(financing.roiFundAmount)}</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">Interest Rate</p>
                              <p className="text-xl font-bold text-slate-800">{financing.interestRate.toFixed(1)}%</p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                              <ClockIcon />
                              <span className="ml-2">Repayment Plan</span>
                            </h4>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">
                                  {financing.paymentFrequency.charAt(0).toUpperCase() + financing.paymentFrequency.slice(1)} Payment
                                </p>
                                <p className="text-lg font-bold text-slate-800">{formatCurrency(financing.periodicPayment)}</p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">Total Interest</p>
                                <p className="text-lg font-bold text-slate-800">{formatCurrency(financing.totalInterest)}</p>
                              </div>
                            </div>

                            <div className={`p-4 rounded-xl ${financing.canBeCoveredByRoi ? 'bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200' : 'bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200'}`}>
                              <div className="flex items-start">
                                {financing.canBeCoveredByRoi ? (
                                  <CheckCircleIcon />
                                ) : (
                                  <ExclamationIcon />
                                )}
                                <p className="text-sm font-medium ml-2">
                                  {financing.canBeCoveredByRoi ? (
                                    <span className="text-emerald-800">
                                      Your estimated ROI of {formatCurrency(financing.roiContribution)} can comfortably cover your {financing.paymentFrequency} payments of {formatCurrency(financing.periodicPayment)}
                                    </span>
                                  ) : (
                                    <span className="text-orange-800">
                                      Your estimated ROI of {formatCurrency(financing.roiContribution)} may not fully cover your {financing.paymentFrequency} payments of {formatCurrency(financing.periodicPayment)}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl text-white">
                            <p className="text-sm leading-relaxed">
                              <span className="font-semibold">AI Insight:</span> Based on your financial profile and
                              {selectedTech.estimatedRoiPercentage}% estimated ROI, this financing strategy optimizes your cash flow
                              while minimizing financial risk.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Funding Options */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="flex items-center text-xl font-bold text-slate-800 mb-4">
                    <MoneyIcon />
                    <span className="ml-2">Available Funding Sources</span>
                  </h3>
                  <p className="text-purple-600 font-semibold text-base mb-4 bg-purple-50 p-3 rounded-lg border border-purple-200">{selectedTech.funding}</p>
                  <ul className="space-y-3">
                    {selectedTech.financingOptions.map((option, index) => (
                      <li key={index} className="flex items-start bg-slate-50 p-3 rounded-lg">
                        <CheckCircleIcon />
                        <span className="ml-3 text-slate-700 leading-relaxed">{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suppliers */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="flex items-center text-xl font-bold text-slate-800 mb-4">
                    <SettingsIcon />
                    <span className="ml-2">Verified Suppliers</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTech.suppliers.map((supplier, index) => (
                      <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200">
                        <p className="text-base font-bold text-slate-800 mb-2">{supplier.name}</p>
                        <p className="text-sm text-slate-600 mb-1">{supplier.contact}</p>
                        <a
                          href={`https://${supplier.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          {supplier.website}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Trend */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
                  <h3 className="flex items-center text-xl font-bold text-slate-800 mb-3">
                    <TrendUpIcon />
                    <span className="ml-2">Market Intelligence</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{selectedTech.marketTrend}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

