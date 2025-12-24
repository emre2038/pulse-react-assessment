const MoverRow = ({ asset }) => {
    const isPositive = asset.changePercent >= 0

    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="font-medium">{asset.symbol}</p>
                <p className="text-xs text-gray-500">{asset.name}</p>
            </div>

            <div className="text-right">
                <p className="font-medium">
                    ${asset.currentPrice.toLocaleString()}
                </p>
                <p
                    className={`text-sm ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {isPositive ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                </p>
            </div>
        </div>
    )
}

const TopMovers = ({ gainers = [], losers = [] }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Top Movers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gainers */}
                <div>
                    <h3 className="text-sm font-semibold text-green-600 mb-2">
                        🚀 Top Gainers
                    </h3>

                    <div className="divide-y">
                        {gainers.slice(0, 3).map((asset) => (
                            <MoverRow key={asset.symbol} asset={asset} />
                        ))}
                    </div>
                </div>

                {/* Losers */}
                <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-2">
                        📉 Top Losers
                    </h3>

                    <div className="divide-y">
                        {losers.slice(0, 3).map((asset) => (
                            <MoverRow key={asset.symbol} asset={asset} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopMovers;
