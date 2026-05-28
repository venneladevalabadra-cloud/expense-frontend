import axios from "axios";

function Login(props) {
  const handleLogin = () => {
    axios.get("http://localhost:8080/api/expenses/test")
        .then(res => {
          alert(res.data);
          props.onLogin();
        })
        .catch(err => {
          alert("Backend not working");
        });
  };

  return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Smart Expense Tracker</h2>
          <h3>Login</h3>

          <input style={styles.input} placeholder="Username" />
          <input style={styles.input} type="password" placeholder="Password" />

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  },
  card: {
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "300px",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;