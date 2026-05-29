import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MonthlyChart({ refreshKey }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://smart-expense-backend-sbtd.onrender.com/api/expenses")
      .then(res => {
        processData(res.data);
      });
  }, [refreshKey]);

  const processData = (expenses) => {
    const monthMap = {};

    expenses.forEach(exp => {
      const month = exp.date.substring(0, 7);

      if (monthMap[month]) {
        monthMap[month] += exp.amount;
      } else {
        monthMap[month] = exp.amount;
      }
    });

    const chartData = Object.keys(monthMap).map(month => ({
      month,
      total: monthMap[month]
    }));

    setData(chartData);
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2 style={{ textAlign: "center" }}>
        Monthly Spending
      </h2>

      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip />

          <Bar dataKey="total" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;
