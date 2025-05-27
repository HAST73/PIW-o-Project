import {
  loginWithGoogle,
  logout,
  loginWithEmail,
  registerWithEmail,
  onUserChanged,
} from '../Services/UserService';
import { useEffect, useState } from 'react';

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onUserChanged((user) => {
      setUser(user);
      console.log("Auth changed:", user);
    });
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("Logged in with Google:", user);
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed.");
    }
  };

  const handleEmailLogin = async () => {
    try {
      const user = await loginWithEmail(email, password);
      console.log("Logged in with email:", user);
    } catch (err) {
      console.error("Email login error:", err);
      setError("Email login failed.");
    }
  };

  const handleRegister = async () => {
    try {
      const user = await registerWithEmail(email, password);
      console.log("Registered:", user);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed.");
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      {user ? (
        <>
          <p>Zalogowano jako: {user.displayName || user.email}</p>
          <button onClick={logout}>Wyloguj się</button>
        </>
      ) : (
        <>
          <button onClick={handleGoogleLogin}>Zaloguj się przez Google</button>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleEmailLogin}>Zaloguj się</button>
          <button onClick={handleRegister}>Zarejestruj się</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
}
