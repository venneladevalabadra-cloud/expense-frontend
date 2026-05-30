import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

function AddExpense({ onExpenseSaved }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const saveExpense = () => {
    setLoading(true);

    axios.post("https://smart-expense-backend-sbtd.onrender.com/api/expenses", {
      title,
      amount,
      category,
      date
    })
        .then(res => {
          setLoading(false);
          alert("Expense Saved!");
          console.log(res.data);

          setTitle("");
          setAmount("");
          setCategory("");
          setDate("");

          onExpenseSaved();
        })
        .catch(err => {
          setLoading(false);
          alert("Error saving expense");
          console.log(err);
        });
  };

  return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Add Expense</h2>

        <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <br /><br />

        <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />
        <br /><br />

        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        <br /><br />

        <button
            style={buttonStyle}
            onClick={saveExpense}
            disabled={loading}
        >
          {loading ? "Saving..." : (
              <>
                <FaPlus /> Save Expense
              </>
          )}
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