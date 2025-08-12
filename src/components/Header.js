import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ onLoginClick, carrinhoCount, onCarrinhoClick, usuario, onLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <h1 className="logo">Gabriel Shop</h1>
            <span className="tagline">Sua loja online</span>
          </Link>
        </div>
        
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Início
          </Link>
          <Link 
            to="/produtos" 
            className={`nav-link ${location.pathname === '/produtos' ? 'active' : ''}`}
          >
            Produtos
          </Link>
          <Link 
            to="/sobre" 
            className={`nav-link ${location.pathname === '/sobre' ? 'active' : ''}`}
          >
            Sobre
          </Link>
          <Link 
            to="/contato" 
            className={`nav-link ${location.pathname === '/contato' ? 'active' : ''}`}
          >
            Contato
          </Link>
        </nav>
        
        <div className="header-actions">
          {usuario ? (
            <div className="user-section">
              <span className="user-greeting">Olá, {usuario.email}!</span>
              <button className="btn-logout" onClick={onLogout}>
                Sair
              </button>
            </div>
          ) : (
            <button className="btn-login" onClick={onLoginClick}>
              Login
            </button>
          )}
          <button className="btn-carrinho" onClick={onCarrinhoClick}>
            🛒 Carrinho ({carrinhoCount})
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
