import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductList from '../components/ProductList';

function Home({ produtos, onAdicionarAoCarrinho, onLoginClick }) {
  return (
    <div>
      <HeroSection onLoginClick={onLoginClick} />
      <ProductList produtos={produtos} onAdicionarAoCarrinho={onAdicionarAoCarrinho} />
    </div>
  );
}

export default Home;
