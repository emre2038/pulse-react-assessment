import {useEffect, useMemo, useState} from "react";
import {unwrap} from '../services/apiHelper'
import {getPortfolio} from "../services/api.js";
import Loader from "../components/common/Loader.jsx";
import Watchlist from "../components/portfolio/Watchlist.jsx";
import AssetsTable from "../components/portfolio/AssetsTable.jsx";
import PortfolioChart from "../components/portfolio/PortfolioChart.jsx";
import PortfolioSummary from "../components/portfolio/PortfolioSummary.jsx";

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = unwrap(await getPortfolio());

                setPortfolio(data);
            } catch (err) {
                setError("Something went wrong while loading portfolio");
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    const pieData = useMemo(() => {
        if (!portfolio) return [];
        return portfolio.assets.map((asset) => ({
            name: asset.assetId,
            value: asset.value,
        }));
    }, [portfolio]);

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

            {/* Summary */}
           <PortfolioSummary portfolio={portfolio} />

            {/* Chart */}
            <PortfolioChart pieData={pieData}  />

            {/* Assets Table */}
           <AssetsTable assets={portfolio.assets} />

            {/* Watchlist */}
            <Watchlist watchlist={portfolio.watchlist} />
        </div>
    );
};

export default Portfolio;
