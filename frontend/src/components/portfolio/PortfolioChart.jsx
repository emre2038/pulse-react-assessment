import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

const PortfolioChart = ({pieData}) => {
    return (
        <div className="bg-white border rounded-lg p-4 h-80 h-[400px]">
            <h2 className="text-lg font-semibold mb-4">
                Portfolio Distribution
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        cx="50%"
                        cy="50%"
                        label
                    >
                        {pieData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) =>
                            `$${Number(value).toLocaleString()}`
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PortfolioChart;
