import React from 'react';
import './CarrinhoModal.css';

function CarrinhoModal({ carrinho, onFechar, onRemoverItem }) {
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onFechar();
    }
  };

  const handleFinalizarCompra = () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nObrigado pela preferência!`);
    onFechar();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content carrinho-modal">
        <div className="modal-header">
          <h2>🛒 Carrinho de Compras</h2>
          <button className="btn-close-x" onClick={onFechar}>×</button>
        </div>
        
        <div className="carrinho-content">
          {carrinho.length === 0 ? (
            <div className="carrinho-vazio">
              <p>Seu carrinho está vazio.</p>
              <p>Adicione alguns produtos para continuar!</p>
            </div>
          ) : (
            <div className="carrinho-items">
              {carrinho.map((item, index) => (
                <div key={index} className="carrinho-item">
                  <div className="item-info">
                    <h4>{item.nome}</h4>
                    <p className="item-preco">R$ {item.preco.toFixed(2)}</p>
                  </div>
                  <button 
                    className="btn-remover"
                    onClick={() => onRemoverItem(index)}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="carrinho-footer">
          <div className="total-section">
            <p className="total-label">Total:</p>
            <p className="total-valor">R$ {total.toFixed(2)}</p>
          </div>
          
          <div className="carrinho-actions">
            <button className="btn-continuar" onClick={onFechar}>
              Continuar Comprando
            </button>
            <button 
              className="btn-finalizar"
              onClick={handleFinalizarCompra}
              disabled={carrinho.length === 0}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarrinhoModal;
