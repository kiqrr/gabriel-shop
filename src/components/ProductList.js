import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ produtos, onAdicionarAoCarrinho }) {
  return (
    <div className="produtos-container">
      <div className="produtos-header">
        <h2>Produtos em Destaque</h2>
        <p>Confira nossa seleção especial de produtos</p>
      </div>
      <div className="grid-produtos">
        {produtos.map(produto => (
          <ProductCard 
            key={produto.id} 
            produto={produto}
            onAdicionarAoCarrinho={onAdicionarAoCarrinho}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
