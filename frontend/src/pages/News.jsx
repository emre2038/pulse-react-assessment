import {useEffect, useMemo, useState} from "react";
import {unwrap} from '../services/apiHelper'
import {getNews} from "../services/api.js";
import Loader from "../components/common/Loader.jsx";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = unwrap(await getNews());

                setNews(data);
            } catch (err) {
                setError("Something went wrong while loading news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(news.map((n) => n.category));
        return ["all", ...uniqueCategories];
    }, [news]);

    const filteredNews = useMemo(() => {
        if (selectedCategory === "all") return news;
        return news.filter((n) => n.category === selectedCategory);
    }, [news, selectedCategory]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold mb-6">News</h1>

                {/* Category Filter */}
                <select
                    className="w-full sm:w-64 border rounded-md px-3 py-2 text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* News List */}
            <div className="grid gap-4">
                {filteredNews.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg p-4 hover:shadow-sm transition"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-500">
                                    {item.source} •{" "}
                                    {new Date(item.timestamp).toLocaleString()}
                                </p>
                            </div>

                            <span
                                className={`text-xs px-2 py-1 rounded-full self-start
                  ${
                                    item.impact === "critical"
                                        ? "bg-red-100 text-red-700"
                                        : item.impact === "high"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-gray-100 text-gray-700"
                                }`}
                            >
                {item.impact.toUpperCase()}
              </span>
                        </div>

                        <p className="mt-3 text-sm text-gray-700">
                            {item.summary}
                        </p>

                        {/* Tags */}
                        <div className="mt-4 flex flex-wrap gap-2 text-xs">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                >
                  #{tag}
                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredNews.length === 0 && (
                    <div className="text-sm text-gray-500">
                        No news found for selected category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
