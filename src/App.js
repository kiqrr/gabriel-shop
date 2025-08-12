import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { productService } from './services/productService';
import { cartService } from './services/cartService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import CarrinhoModal from './components/CarrinhoModal';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [carregandoAuth, setCarregandoAuth] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);

  const abrirModalLogin = () => setMostrarModalLogin(true);
  const fecharModalLogin = () => setMostrarModalLogin(false);
  const abrirCarrinho = () => setMostrarCarrinho(true);
  const fecharCarrinho = () => setMostrarCarrinho(false);

  // Verificar se há usuário logado ao carregar a aplicação
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
      setCarregandoAuth(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
      setCarregandoAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carregar carrinho ao iniciar
  useEffect(() => {
    const carregarCarrinho = async () => {
      if (usuario) {
        // Carregar do Supabase se usuário estiver logado
        const carrinhoData = await cartService.getCart(usuario.id);
        setCarrinho(carrinhoData);
      } else {
        // Carregar do localStorage se não estiver logado
        const carrinhoSalvo = localStorage.getItem('gabriel-shop-carrinho');
        if (carrinhoSalvo) {
          setCarrinho(JSON.parse(carrinhoSalvo));
        }
      }
    };

    carregarCarrinho();
  }, [usuario]);

  // Salvar carrinho sempre que mudar
  useEffect(() => {
    const salvarCarrinho = async () => {
      if (usuario) {
        // Salvar no Supabase se usuário estiver logado
        await cartService.saveCart(usuario.id, carrinho);
      } else {
        // Salvar no localStorage se não estiver logado
        localStorage.setItem('gabriel-shop-carrinho', JSON.stringify(carrinho));
      }
    };

    salvarCarrinho();
  }, [carrinho, usuario]);

  // Carregar produtos do Supabase
  useEffect(() => {
    const carregarProdutos = async () => {
      setCarregandoProdutos(true);
      const produtosData = await productService.getProducts();
      setProdutos(produtosData);
      setCarregandoProdutos(false);
    };

    carregarProdutos();
  }, []);

  const handleLogin = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    setMostrarModalLogin(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout: ' + error.message);
    } else {
      // Salvar carrinho antes de fazer logout
      if (usuario) {
        await cartService.saveCart(usuario.id, carrinho);
      }
      setUsuario(null);
      setCarrinho([]); // Limpar carrinho local
      localStorage.removeItem('gabriel-shop-carrinho');
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerItemDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  // Mostrar loading enquanto verifica autenticação ou carrega produtos
  if (carregandoAuth || carregandoProdutos) {
    return (
      <div className="App">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#1976d2'
        }}>
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header 
          onLoginClick={abrirModalLogin}
          carrinhoCount={carrinho.length}
          onCarrinhoClick={abrirCarrinho}
          usuario={usuario}
          onLogout={handleLogout}
        />

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  produtos={produtos} 
                  onAdicionarAoCarrinho={adicionarAoCarrinho}
                  onLoginClick={abrirModalLogin}
                />
              } 
            />
            <Route 
              path="/produtos" 
              element={
                <Products 
                  produtos={produtos} 
                  onAdicionarAoCarrinho={adicionarAoCarrinho}
                />
              } 
            />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {mostrarModalLogin && (
          <LoginModal 
            onClose={fecharModalLogin} 
            onLogin={handleLogin}
          />
        )}
        
        {mostrarCarrinho && (
          <CarrinhoModal
            carrinho={carrinho}
            onFechar={fecharCarrinho}
            onRemoverItem={removerItemDoCarrinho}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
