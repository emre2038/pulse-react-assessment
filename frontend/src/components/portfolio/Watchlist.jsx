const Watchlist = ({watchlist}) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Watchlist</h2>
            <div className="flex flex-wrap gap-2">
                {watchlist.map((symbol) => (
                    <span
                        key={symbol}
                        className="px-3 py-1 text-sm border rounded-full bg-gray-50"
                    >
                        {symbol}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Watchlist
