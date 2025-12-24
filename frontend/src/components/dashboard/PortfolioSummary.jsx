const PortfolioSummary = ({portfolio, lastUpdated}) => {
    const {totalValue, totalChange, totalChangePercent} = portfolio

    const isPositive = totalChange >= 0

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Portfolio Summary
            </h2>

            {lastUpdated && (
                <span className="text-xs text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
            )}

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-3xl font-bold">
                        ${totalValue.toLocaleString()}
                    </p>
                </div>

                <div className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    <p className="text-sm font-medium">
                        {isPositive ? '+' : ''}
                        ${totalChange.toLocaleString()}
                    </p>
                    <p className="text-sm">
                        ({isPositive ? '+' : ''}
                        {totalChangePercent.toFixed(2)}%)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioSummary;
