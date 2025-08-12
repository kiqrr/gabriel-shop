import React from 'react';
import './ProductCard.css';

function ProductCard({ produto, onAdicionarAoCarrinho }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={produto.imagem || '/api/placeholder/200/200'} 
          alt={produto.nome}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0NDQyIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5JbWFnZW08L3RleHQ+Cjwvc3ZnPg==';
          }}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{produto.nome}</h3>
        <p className="product-description">{produto.descricao}</p>
        <div className="product-price">
          <span className="price">R$ {produto.preco.toFixed(2)}</span>
        </div>
        
        <button 
          className="btn-add-cart"
          onClick={() => onAdicionarAoCarrinho(produto)}
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
