const AssetsTable = ({assets}) => {
    return (
        <div className="bg-white border rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                <tr>
                    <th className="text-left px-4 py-2">Asset</th>
                    <th className="text-right px-4 py-2">Quantity</th>
                    <th className="text-right px-4 py-2">Avg Buy</th>
                    <th className="text-right px-4 py-2">Current</th>
                    <th className="text-right px-4 py-2">Value</th>
                    <th className="text-right px-4 py-2">Change %</th>
                </tr>
                </thead>
                <tbody>
                {assets.map((asset) => (
                    <tr key={asset.assetId} className="border-t">
                        <td className="px-4 py-2 font-semibold">
                            {asset.assetId}
                        </td>
                        <td className="px-4 py-2 text-right">
                            {asset.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                            ${asset.avgBuyPrice}
                        </td>
                        <td className="px-4 py-2 text-right">
                            ${asset.currentPrice}
                        </td>
                        <td className="px-4 py-2 text-right">
                            ${asset.value.toLocaleString()}
                        </td>
                        <td
                            className={`px-4 py-2 text-right font-semibold ${
                                asset.changePercent >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {asset.changePercent >= 0 ? "+" : ""}
                            {asset.changePercent}%
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AssetsTable
