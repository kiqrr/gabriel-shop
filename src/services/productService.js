import { supabase } from '../supabaseClient';

export const productService = {
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },

  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return null;
    }
  },

  async createProduct(product) {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .insert([product])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }
};
