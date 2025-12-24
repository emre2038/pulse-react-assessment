const PortfolioSummary = ({portfolio}) => {
    const isPositive = portfolio.totalChange >= 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-xl font-semibold">
                    ${portfolio.totalValue.toLocaleString()}
                </p>
            </div>

            <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Change</p>
                <p
                    className={`text-xl font-semibold ${
                        isPositive ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {isPositive ? "+" : ""}
                    ${portfolio.totalChange.toLocaleString()}
                </p>
            </div>

            <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Change %</p>
                <p
                    className={`text-xl font-semibold ${
                        isPositive ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {isPositive ? "+" : ""}
                    {portfolio.totalChangePercent}%
                </p>
            </div>
        </div>
    )
}

export default PortfolioSummary;
