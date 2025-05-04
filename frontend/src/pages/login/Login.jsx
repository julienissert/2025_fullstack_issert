import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { loginUser } from '../../services/authService';
import useUserStore from '../../stores/userStore';
import loginBg from '../../assets/login.png';

function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser(email, password);
      login(user, token);
      navigate('/');
    } catch (error) {
      setErrorMsg(error);
      navigate('/register');
    }
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${loginBg})` }}>
      <form className="connexion-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="button-primary">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
