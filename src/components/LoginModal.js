import React, { useState } from 'react';
import './LoginModal.css';
import { supabase } from '../supabaseClient';

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    setCarregando(true);
    setMensagemErro('');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setMensagemErro('Login falhou: ' + error.message);
    } else {
      onLogin(data.user);
      onClose();
    }
  };

  const handleRegister = async () => {
    setCarregando(true);
    setMensagemErro('');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });
    
    setCarregando(false);

    if (error) {
      setMensagemErro('Erro no cadastro: ' + error.message);
    } else {
      alert('Usuário registrado! Verifique seu email para confirmação.');
      onLogin(data.user);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={carregando}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          disabled={carregando}
        />
        {mensagemErro && <p style={{ color: 'red', fontSize: '14px' }}>{mensagemErro}</p>}
        <div className="modal-actions">
          <button className="btn-close" onClick={onClose} disabled={carregando}>Fechar</button>
          <button className="btn-login" onClick={handleLogin} disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
          <button className="btn-register" onClick={handleRegister} disabled={carregando}>
            {carregando ? 'Registrando...' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
