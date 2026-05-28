import { useEffect, useState } from "react";
import axios from "axios";
import { FaWallet } from "react-icons/fa";
import AddExpense from "./AddExpense";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import MonthlyChart from "./MonthlyChart";

function Dashboard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = () => {
      axios.get("http://localhost:8080/api/expenses/total")
        .then(res => setTotal(res.data))
        .catch(err => console.log(err));
    };

    fetchTotal();

    const interval = setInterval(fetchTotal, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={styles.header}>
        <h2>💰 Smart Expense Tracker</h2>
        <h3>
          <FaWallet /> Total: ₹ {total}
        </h3>
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <AddExpense />
        </div>

        <div style={styles.card}>
          <ExpenseChart />
        </div>

        <div style={styles.card}>
          <MonthlyChart />
        </div>

        <div style={styles.card}>
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    background: "linear-gradient(to right, #000, #333)",
    color: "white",
    padding: "15px",
    textAlign: "center",
    position: "sticky",
    top: 0
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    gap: "20px",
    flexWrap: "wrap"
  },
  card: {
    flex: 1,
    minWidth: "300px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  }
};

export default Dashboard;
