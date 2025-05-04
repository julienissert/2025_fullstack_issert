import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { registerUser } from '../../services/authService';
import useUserStore from '../../stores/userStore';
import registerBg from '../../assets/register.png';

function Register() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await registerUser(name, email, password);
      login(user, token);
      navigate('/');
    } catch (error) {
      setErrorMsg(error);
    }
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${registerBg})` }}>
      <form className="connexion-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <input 
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit" className="button-secondary">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
