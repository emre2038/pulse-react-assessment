const severityStyles = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
}

const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleString()

const AlertsSummary = ({ alerts = [] }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                🚨 Active Alerts
            </h2>

            <div className="space-y-4">
                {alerts.slice(0, 5).map((alert) => (
                    <div
                        key={alert.id}
                        className="flex items-start justify-between gap-4 border-b last:border-b-0 pb-4"
                    >
                        <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm text-gray-500">
                                {formatTime(alert.timestamp)}
                            </p>
                        </div>

                        <span
                            className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${severityStyles[alert.severity]}`}
                        >
              {alert.severity}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlertsSummary
