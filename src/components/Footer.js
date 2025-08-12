import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Gabriel Shop</h3>
          <p>Sua loja online de confiança com os melhores produtos e preços.</p>
        </div>
        
        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre">Sobre Nós</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contato</h4>
          <p>📧 contato@gabrielshop.com</p>
          <p>📱 (11) 99999-9999</p>
          <p>📍 São Paulo, SP - Brasil</p>
        </div>
        
        <div className="footer-section">
          <h4>Redes Sociais</h4>
          <div className="social-links">
            <a href="#" className="social-link">📘 Facebook</a>
            <a href="#" className="social-link">📷 Instagram</a>
            <a href="#" className="social-link">🐦 Twitter</a>
            <a href="#" className="social-link">💼 LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Gabriel Shop. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
