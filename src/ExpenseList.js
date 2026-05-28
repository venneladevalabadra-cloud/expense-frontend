import { useEffect, useState } from "react";
import axios from "axios";
import { FaList } from "react-icons/fa";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    axios.get("http://localhost:8080/api/expenses")
      .then(res => {
        setExpenses(res.data);
      })
      .catch(err => {
        alert("Error loading expenses");
      });
  };

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:8080/api/expenses/${id}`)
      .then(() => {
        alert("Deleted!");
        loadExpenses();
      })
      .catch(() => {
        alert("Delete failed");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2><FaList /> All Expenses</h2>

      {expenses.map((exp) => (
        <div key={exp.id} style={styles.card}>
          <h3>{exp.title}</h3>
          <p>₹ {exp.amount}</p>
          <p>{exp.category}</p>
          <p>{exp.date}</p>

          <button onClick={() => deleteExpense(exp.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    margin: "10px auto",
    padding: "15px",
    width: "90%",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderLeft: "5px solid black"
  }
};

export default ExpenseList;
