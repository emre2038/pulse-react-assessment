import {useEffect, useMemo, useState} from 'react'
import {getStocks, getCrypto} from '../services/api'
import Loader from "../components/common/Loader.jsx";

const Assets = () => {
    const [assets, setAssets] = useState([])
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'})
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const [stocks, crypto] = await Promise.all([
                    getStocks().then(response => {
                        return response.data
                    }),
                    getCrypto().then(response => {
                        return response.data
                    }),
                ])

                const merged = [
                    ...(stocks ?? []).map(a => ({...a, type: 'stock'})),
                    ...(crypto ?? []).map(a => ({...a, type: 'crypto'})),
                ]

                setAssets(merged)
            } catch (e) {
                console.error(e)
                setError('Something went wrong while loading assets')
            } finally {
                setLoading(false)
            }
        }

        fetchAssets()
    }, [])

    const handleSort = key => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return {key, direction: prev.direction === 'asc' ? 'desc' : 'asc'}
            }
            return {key, direction: 'asc'}
        })
    }

    const renderSortIcon = key => {
        if (sortConfig.key !== key) return null
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
    }

    const visibleAssets = useMemo(() => {
        let data = [...assets]

        if (filter !== 'all') {
            data = data.filter(a => a.type === filter)
        }

        if (search) {
            const q = search.toLowerCase()
            data = data.filter(
                a =>
                    a.symbol.toLowerCase().includes(q) ||
                    a.name.toLowerCase().includes(q),
            )
        }

        if (sortConfig.key) {
            data.sort((a, b) => {
                const aVal = a[sortConfig.key]
                const bVal = b[sortConfig.key]
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
                return 0
            })
        }

        return data
    }, [assets, filter, search, sortConfig])

    if (loading) return <Loader/>
    if (error) return <div className="p-6 text-red-600">{error}</div>

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Assets</h1>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                    placeholder="Search by symbol or name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 text-sm w-full sm:w-64"
                />

                <div className="flex gap-2">
                    {['all', 'stock', 'crypto'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1 rounded text-sm ${
                                filter === type
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="p-3 text-left">Symbol</th>
                        <th className="p-3 text-left">Name</th>
                        <th
                            className="p-3 text-right cursor-pointer"
                            onClick={() => handleSort('currentPrice')}
                        >
                            Price{renderSortIcon('currentPrice')}
                        </th>
                        <th
                            className="p-3 text-right cursor-pointer"
                            onClick={() => handleSort('changePercent')}
                        >
                            Change %{renderSortIcon('changePercent')}
                        </th>
                        <th
                            className="p-3 text-right cursor-pointer"
                            onClick={() => handleSort('volume')}
                        >
                            Volume{renderSortIcon('volume')}
                        </th>
                        <th className="p-3 text-center">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleAssets.map(asset => {
                        const positive = asset.changePercent >= 0
                        return (
                            <tr
                                key={`${asset.type}-${asset.symbol}`}
                                onClick={() => setSelectedAsset(asset)}
                                className="border-t hover:bg-gray-50 cursor-pointer"
                            >
                                <td className="p-3 font-medium">{asset.symbol}</td>
                                <td className="p-3">{asset.name}</td>
                                <td className="p-3 text-right">
                                    ${asset.currentPrice.toLocaleString()}
                                </td>
                                <td
                                    className={`p-3 text-right font-medium ${
                                        positive ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {positive ? '+' : ''}
                                    {asset.changePercent.toFixed(2)}%
                                </td>
                                <td className="p-3 text-right">
                                    {asset.volume.toLocaleString()}
                                </td>
                                <td className="p-3 text-center capitalize text-gray-600">
                                    {asset.type}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {visibleAssets.map(asset => (
                    <div
                        key={`${asset.type}-${asset.symbol}`}
                        onClick={() => setSelectedAsset(asset)}
                        className="border rounded p-4 bg-white shadow cursor-pointer"
                    >
                        <div className="flex justify-between">
                            <div>
                                <div className="font-semibold">{asset.symbol}</div>
                                <div className="text-xs text-gray-500">{asset.name}</div>
                            </div>
                            <div
                                className={`text-sm font-medium ${
                                    asset.changePercent >= 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {asset.changePercent.toFixed(2)}%
                            </div>
                        </div>
                        <div className="text-sm mt-2">
                            ${asset.currentPrice.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedAsset && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-2">
                            {selectedAsset.symbol} – {selectedAsset.name}
                        </h2>
                        <ul className="text-sm space-y-1">
                            <li>Price: ${selectedAsset.currentPrice.toLocaleString()}</li>
                            <li>
                                Change: {selectedAsset.changePercent.toFixed(2)}%
                            </li>
                            <li>Volume: {selectedAsset.volume.toLocaleString()}</li>
                            <li>Type: {selectedAsset.type}</li>
                        </ul>

                        <button
                            onClick={() => setSelectedAsset(null)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Assets
