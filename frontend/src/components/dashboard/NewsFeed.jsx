const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
}

const CategoryBadge = ({ category }) => {
    const colors = {
        market: 'bg-blue-100 text-blue-700',
        crypto: 'bg-purple-100 text-purple-700',
        stocks: 'bg-green-100 text-green-700',
    }

    return (
        <span
            className={`text-xs px-2 py-1 rounded-full capitalize ${
                colors[category] || 'bg-gray-100 text-gray-700'
            }`}
        >
      {category}
    </span>
    )
}

const NewsFeed = ({ news = [] }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                📰 Recent News
            </h2>

            <div className="space-y-4">
                {news.slice(0, 5).map((item) => (
                    <div
                        key={item.id}
                        className="border-b last:border-b-0 pb-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">
                                    {item.source} · {formatTime(item.timestamp)}
                                </p>
                            </div>

                            <CategoryBadge category={item.category} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsFeed
