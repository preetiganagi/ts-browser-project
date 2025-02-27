import React, { useState } from "react";
import { login, register, logout, isAuthenticated, getCurrentUser } from "../services/auth-service";

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
      const userData = await getCurrentUser();
      setUser(userData);
      window.location.reload();
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      alert("Registration failed");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div>
      <h1>{isRegister ? "Register" : "Login"}</h1>
      {isRegister && (
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      )}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={isRegister ? handleRegister : handleLogin}>
        {isRegister ? "Register" : "Login"}
      </button>
      <button onClick={handleLogout} disabled={!isAuthenticated()}>
        Logout
      </button>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>

      {user && (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
