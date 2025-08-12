import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você implementaria o envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      nome: '',
      email: '',
      assunto: '',
      mensagem: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Entre em Contato</h1>
        <p>Estamos aqui para ajudar você</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Informações de Contato</h2>
          
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>contato@gabrielshop.com</p>
              <p>suporte@gabrielshop.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div>
              <h3>Telefone</h3>
              <p>(11) 99999-9999</p>
              <p>WhatsApp: (11) 88888-8888</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div>
              <h3>Endereço</h3>
              <p>Rua das Flores, 123</p>
              <p>São Paulo, SP - CEP: 01234-567</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">🕒</div>
            <div>
              <h3>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 8h às 18h</p>
              <p>Sábado: 8h às 14h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>

          <div className="social-section">
            <h3>Redes Sociais</h3>
            <div className="social-links">
              <a href="#" className="social-link">📘 Facebook</a>
              <a href="#" className="social-link">📷 Instagram</a>
              <a href="#" className="social-link">🐦 Twitter</a>
              <a href="#" className="social-link">💼 LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Digite seu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assunto">Assunto *</label>
              <select
                id="assunto"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida sobre produto</option>
                <option value="pedido">Problema com pedido</option>
                <option value="troca">Troca/Devolução</option>
                <option value="sugestao">Sugestão</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mensagem">Mensagem *</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Digite sua mensagem..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
