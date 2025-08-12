import { supabase } from '../supabaseClient';

export const cartService = {
  // Get cart items for a user
  async getCart(userId) {
    try {
      const { data, error } = await supabase
        .from('carrinho')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      return [];
    }
  },

  // Save cart items for a user
  async saveCart(userId, items) {
    try {
      // First, clear existing cart for this user
      const { error: deleteError } = await supabase
        .from('carrinho')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Then, insert new items
      if (items && items.length > 0) {
        const cartItems = items.map(item => ({
          user_id: userId,
          produto_id: item.id || item.produto_id,
          nome: item.nome,
          preco: item.preco,
          imagem: item.imagem,
          quantidade: item.quantidade || 1
        }));

        const { error: insertError } = await supabase
          .from('carrinho')
          .insert(cartItems);

        if (insertError) throw insertError;
      }

      return true;
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
      return false;
    }
  },

  // Add item to cart
  async addToCart(userId, product) {
    try {
      // Check if item already exists
      const { data: existing } = await supabase
        .from('carrinho')
        .select('*')
        .eq('user_id', userId)
        .eq('produto_id', product.id)
        .single();

      if (existing) {
        // Update quantity if exists
        const { error } = await supabase
          .from('carrinho')
          .update({ quantidade: existing.quantidade + 1 })
          .eq('id', existing.id);
        
        if (error) throw error;
        return { ...existing, quantidade: existing.quantidade + 1 };
      } else {
        // Insert new item
        const { data, error } = await supabase
          .from('carrinho')
          .insert({
            user_id: userId,
            produto_id: product.id,
            nome: product.nome,
            preco: product.preco,
            imagem: product.imagem,
            quantidade: 1
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      return null;
    }
  },

  // Update item quantity
  async updateQuantity(userId, productId, quantity) {
    try {
      if (quantity <= 0) {
        return await this.removeFromCart(userId, productId);
      }

      const { error } = await supabase
        .from('carrinho')
        .update({ quantidade: quantity })
        .eq('user_id', userId)
        .eq('produto_id', productId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      return false;
    }
  },

  // Remove item from cart
  async removeFromCart(userId, productId) {
    try {
      const { error } = await supabase
        .from('carrinho')
        .delete()
        .eq('user_id', userId)
        .eq('produto_id', productId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      return false;
    }
  },

  // Clear entire cart
  async clearCart(userId) {
    try {
      const { error } = await supabase
        .from('carrinho')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      return false;
    }
  }
};
