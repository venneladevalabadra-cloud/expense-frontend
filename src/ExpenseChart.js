import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ExpenseChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://smart-expense-backend-sbtd.onrender.com/api/expenses")
      .then(res => {
        processData(res.data);
      });
  }, []);

  const processData = (expenses) => {
    const map = {};

    expenses.forEach(exp => {
      if (map[exp.category]) {
        map[exp.category] += exp.amount;
      } else {
        map[exp.category] = exp.amount;
      }
    });

    const chartData = Object.keys(map).map(key => ({
      name: key,
      value: map[key]
    }));

    setData(chartData);
  };

  const COLORS = ["#000", "#555", "#999", "#bbb", "#ddd"];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Expense Breakdown</h2>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;
