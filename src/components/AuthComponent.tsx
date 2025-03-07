import React, { useState } from "react";
import { login, register, logout, isAuthenticated, getCurrentUser } from "../services/AuthService";

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
      window.location.href = "/";
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
    window.location.href = "/";
  };

  return (
    // <div>
    //   <h1>{isRegister ? "Register" : "Login"}</h1>
    //   {isRegister && (
    //     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    //   )}
    //   <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <button onClick={isRegister ? handleRegister : handleLogin}>
    //     {isRegister ? "Register" : "Login"}
    //   </button>
    //   <button onClick={handleLogout} disabled={!isAuthenticated()}>
    //     Logout
    //   </button>
    //   <button onClick={() => setIsRegister(!isRegister)}>
    //     {isRegister ? "Switch to Login" : "Switch to Register"}
    //   </button>

    //   {user && (
    //     <div>
    //       <h3>Welcome, {user.name}!</h3>
    //       <p>Email: {user.email}</p>
    //     </div>
    //   )}
    // </div>
    <div className="container mt-5 d-flex justify-content-center">
    <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
      <h3 className="text-center">{isRegister ? "Register" : "Login"}</h3>

      <form>
        {/* Name Field (Only for Registration) */}
        {isRegister && (
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control form-control-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="btn btn-primary btn-sm w-100 mt-2"
          onClick={isRegister ? handleRegister : handleLogin}
        >
          {isRegister ? "Register" : "Login"}
        </button>
        
      </form>

      {/* Switch between Login & Register */}
      <button className="btn btn-link btn-sm w-100 mt-2" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  </div>
    );
};

export default AuthComponent;
