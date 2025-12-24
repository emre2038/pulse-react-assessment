import { useEffect, useState } from 'react'
import { getDashboard, getPortfolio } from '../services/api'
import { unwrap } from '../services/apiHelper'

import PortfolioSummary from '../components/dashboard/PortfolioSummary'
import TopMovers from '../components/dashboard/TopMovers'
import NewsFeed from '../components/dashboard/NewsFeed'
import AlertsSummary from '../components/dashboard/AlertsSummary'
import Loader from "../components/common/Loader.jsx";

const REFRESH_INTERVAL = 30000 // 30 seconds

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null)
    const [portfolio, setPortfolio] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let intervalId

        const fetchData = async () => {
            try {
                const dashboardData = unwrap(await getDashboard())
                const portfolioData = unwrap(await getPortfolio())

                setDashboard(dashboardData)
                setPortfolio(portfolioData)
                setLastUpdated(new Date())
                setError(null)
            } catch (err) {
                setError('Something went wrong while loading dashboard')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        intervalId = setInterval(fetchData, REFRESH_INTERVAL)

        return () => clearInterval(intervalId)
    }, [])

    if (loading) return <Loader />

    if (error)
        return (
            <div className="p-6 text-red-600 font-medium">
                {error}
            </div>
        )

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <PortfolioSummary
                portfolio={portfolio}
                lastUpdated={lastUpdated}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TopMovers
                    gainers={dashboard.topGainers}
                    losers={dashboard.topLosers}
                />
                <AlertsSummary alerts={dashboard.activeAlerts} />
            </div>

            <NewsFeed news={dashboard.recentNews} />
        </div>
    )
}

export default Dashboard
