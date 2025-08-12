import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import './Products.css';

function Products({ produtos, onAdicionarAoCarrinho }) {
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'preco-asc':
        return a.preco - b.preco;
      case 'preco-desc':
        return b.preco - a.preco;
      case 'nome':
      default:
        return a.nome.localeCompare(b.nome);
    }
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Todos os Produtos</h1>
        <p>Explore nossa coleção completa</p>
      </div>

      <div className="products-filters">
        <div className="filter-group">
          <label htmlFor="search">Buscar produtos:</label>
          <input
            id="search"
            type="text"
            placeholder="Digite o nome do produto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Ordenar por:</label>
          <select
            id="sort"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="sort-select"
          >
            <option value="nome">Nome (A-Z)</option>
            <option value="preco-asc">Preço (Menor para Maior)</option>
            <option value="preco-desc">Preço (Maior para Menor)</option>
          </select>
        </div>
      </div>

      <div className="products-results">
        <p>{produtosOrdenados.length} produto(s) encontrado(s)</p>
      </div>

      <ProductList produtos={produtosOrdenados} onAdicionarAoCarrinho={onAdicionarAoCarrinho} />
    </div>
  );
}

export default Products;
