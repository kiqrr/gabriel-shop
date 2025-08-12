import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Sobre a Gabriel Shop</h1>
        <p>Conheça nossa história e valores</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Nossa História</h2>
          <p>
            A Gabriel Shop nasceu em 2024 com o objetivo de oferecer produtos de alta qualidade 
            com preços acessíveis. Começamos como uma pequena loja online e hoje somos referência 
            em e-commerce no Brasil.
          </p>
          <p>
            Nossa missão é proporcionar uma experiência de compra excepcional, com produtos 
            cuidadosamente selecionados e atendimento personalizado para cada cliente.
          </p>
        </section>

        <section className="about-section">
          <h2>Nossos Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>Qualidade</h3>
              <p>Selecionamos apenas produtos de alta qualidade para nossos clientes.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>Inovação</h3>
              <p>Sempre buscamos as últimas tendências e tecnologias do mercado.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Atendimento</h3>
              <p>Nosso foco é sempre a satisfação e felicidade dos nossos clientes.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>Sustentabilidade</h3>
              <p>Comprometidos com práticas sustentáveis e responsabilidade social.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Por que Escolher a Gabriel Shop?</h2>
          <ul className="benefits-list">
            <li>✅ Produtos de alta qualidade</li>
            <li>✅ Preços competitivos</li>
            <li>✅ Entrega rápida e segura</li>
            <li>✅ Atendimento ao cliente 24/7</li>
            <li>✅ Garantia em todos os produtos</li>
            <li>✅ Política de troca facilitada</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Nossa Equipe</h2>
          <p>
            Contamos com uma equipe dedicada de profissionais apaixonados por oferecer 
            a melhor experiência de compra online. Desde o atendimento ao cliente até 
            a logística, cada membro da nossa equipe trabalha para superar suas expectativas.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
