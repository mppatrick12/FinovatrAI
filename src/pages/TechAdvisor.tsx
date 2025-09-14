// pages/TechAdvisor.tsx

export default function TechAdvisor() {
  const techRecommendations = [
    {
      id: 1,
      name: "AI-Powered Inventory Forecasting",
      description: "Predicts optimal purchase times and quantities based on trends.",
      impact: "High ROI – reduces stockouts and over-purchasing.",
      funding: "Reinvest profits or apply for a working capital loan.",
    },
    {
      id: 2,
      name: "Cloud Accounting Software",
      description: "Automates bookkeeping, payroll, and expense tracking.",
      impact: "Saves time and improves financial accuracy.",
      funding: "Affordable subscription – pay from monthly cash flow.",
    },
    {
      id: 3,
      name: "Point of Sale (POS) System",
      description: "Tracks sales, inventory, and customer data in real time.",
      impact: "Improves sales tracking and customer insights.",
      funding: "Small business loan or bank overdraft facility.",
    },
    {
      id: 4,
      name: "E-commerce Integration",
      description: "Sell online via website or marketplace integration.",
      impact: "Expands customer base and increases revenue.",
      funding: "Consider grant funding or a small technology adoption loan.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Technology Advisor</h2>
      <p className="text-gray-700 mb-8">
        Discover the right technologies for your business, understand their
        potential impact, and explore funding options to adopt them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techRecommendations.map((tech) => (
          <div
            key={tech.id}
            className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {tech.name}
            </h3>
            <p className="text-gray-600 mb-3">{tech.description}</p>
            <p className="text-green-600 font-medium mb-1">
              📈 Impact: {tech.impact}
            </p>
            <p className="text-purple-600 font-medium">
              💰 Funding: {tech.funding}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
