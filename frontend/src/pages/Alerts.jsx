import {useEffect, useMemo, useState} from "react";
import {getAlerts} from "../services/api.js";
import {unwrap} from '../services/apiHelper'
import Loader from "../components/common/Loader.jsx";

const SEVERITY_ORDER = ["critical", "high", "medium", "low"];

const severityStyles = {
    critical: "border-red-500 bg-red-50 text-red-700",
    high: "border-orange-500 bg-orange-50 text-orange-700",
    medium: "border-yellow-500 bg-yellow-50 text-yellow-700",
    low: "border-gray-300 bg-gray-50 text-gray-700",
};

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = unwrap(await getAlerts());

                setAlerts(data);
            } catch (err) {
                setError("Something went wrong while loading alerts");
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const groupedAlerts = useMemo(() => {
        const groups = {};

        alerts.forEach((alert) => {
            if (!groups[alert.severity]) {
                groups[alert.severity] = [];
            }
            groups[alert.severity].push(alert);
        });

        return groups;
    }, [alerts]);

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Alerts</h1>

            {SEVERITY_ORDER.map((severity) => {
                const severityAlerts = groupedAlerts[severity];
                if (!severityAlerts || severityAlerts.length === 0) return null;

                return (
                    <div key={severity} className="space-y-4">
                        <h2 className="text-lg font-semibold capitalize">
                            {severity} Alerts ({severityAlerts.length})
                        </h2>

                        <div className="space-y-3">
                            {severityAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`border-l-4 rounded-md p-4 ${severityStyles[severity]}`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div>
                                            <h3 className="font-semibold">
                                                {alert.title || alert.type.replaceAll("_", " ")}
                                            </h3>

                                            <p className="text-sm mt-1">
                                                {alert.message}
                                            </p>

                                            <p className="text-xs mt-2 text-gray-500">
                                                {new Date(alert.timestamp).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Asset Info */}
                                        <div className="text-xs text-right">
                                            {alert.assetType === "global" ? (
                                                <span className="px-2 py-1 rounded bg-gray-200">
                          GLOBAL
                        </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded bg-white border">
                          {alert.assetId} ({alert.assetType})
                        </span>
                                            )}
                                        </div>
                                    </div>

                                    {(alert.actionRequired || alert.aiCoreAccuracy) && (
                                        <div className="mt-3 flex flex-wrap gap-3 text-xs">
                                            {alert.actionRequired && (
                                                <span className="font-semibold text-red-600">
                          Action Required
                        </span>
                                            )}
                                            {alert.aiCoreAccuracy && (
                                                <span>
                          AI Accuracy: {(alert.aiCoreAccuracy * 100).toFixed(0)}%
                        </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Alerts;
