import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import './style.css';

function Login() {
  const { authenticated, login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit', { username, password });
    login(username, password);
  };

  return (
    <div id='login'>
      <h1>Login</h1>
      <p>{String(authenticated)}</p>

      <form className='form' onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='field'>
          <label className='label'>Senha</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='actions'>
          <button type='submit' className='button is-primary'>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
