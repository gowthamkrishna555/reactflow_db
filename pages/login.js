import { useState } from "react";
import { Button, TextField, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem("user", username); // Store user session
      router.push("/dashboard");
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h5">Login</Typography>
        <TextField fullWidth label="Username" margin="normal" onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth type="password" label="Password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: "10px" }}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}
