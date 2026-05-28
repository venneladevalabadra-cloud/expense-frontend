import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const saveExpense = () => {
    axios.post("http://localhost:8080/api/expenses", {
      title,
      amount,
      category,
      date
    })
    .then(res => {
      alert("Expense Saved!");
      console.log(res.data);
    })
    .catch(err => {
      alert("Error saving expense");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Expense</h2>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} /><br /><br />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} /><br /><br />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} /><br /><br />
      <input type="date" onChange={(e) => setDate(e.target.value)} /><br /><br />

      <button style={buttonStyle} onClick={saveExpense}>
        <FaPlus /> Save Expense
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: "10px",
  width: "100%",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  alignItems: "center"
};

export default AddExpense;
