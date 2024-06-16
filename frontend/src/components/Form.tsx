import React, { useState, FormEvent, ChangeEvent } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css';

interface FormProps {
  route: string;
  method: 'login' | 'register';
}

const Form: React.FC<FormProps> = ({ route, method }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button className="form-button" type="submit" disabled={loading}>
        {name}
      </button>
    </form>
  );
};

export default Form;
