-- SQL for Supabase: Create cart table for persistent shopping cart functionality

-- Create the cart table
CREATE TABLE IF NOT EXISTS carrinho (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem TEXT,
    quantidade INTEGER DEFAULT 1,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, produto_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_carrinho_user_id ON carrinho(user_id);
CREATE INDEX IF NOT EXISTS idx_carrinho_produto_id ON carrinho(produto_id);
CREATE INDEX IF NOT EXISTS idx_carrinho_user_produto ON carrinho(user_id, produto_id);

-- Create trigger for automatic updated_at
CREATE OR REPLACE FUNCTION update_carrinho_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_carrinho_updated_at ON carrinho;
CREATE TRIGGER update_carrinho_updated_at
    BEFORE UPDATE ON carrinho
    FOR EACH ROW
    EXECUTE FUNCTION update_carrinho_updated_at_column();

-- Create a view to get cart items with product details
CREATE OR REPLACE VIEW carrinho_completo AS
SELECT 
    c.id,
    c.user_id,
    c.produto_id,
    c.nome,
    c.preco,
    c.imagem,
    c.quantidade,
    c.criado_em,
    c.updated_at,
    p.descricao,
    p.categoria,
    p.estoque as estoque_disponivel
FROM carrinho c
JOIN produtos p ON c.produto_id = p.id
WHERE p.ativo = true;

-- Create a function to get cart total for a user
CREATE OR REPLACE FUNCTION get_carrinho_total(user_uuid UUID)
RETURNS TABLE (
    total DECIMAL(10,2),
    quantidade_total INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(c.preco * c.quantidade), 0) as total,
        COALESCE(SUM(c.quantidade), 0) as quantidade_total
    FROM carrinho c
    WHERE c.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Create a function to clear user cart
CREATE OR REPLACE FUNCTION limpar_carrinho_usuario(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM carrinho WHERE user_id = user_uuid;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Insert sample cart items for testing (optional - remove in production)
-- This creates sample cart items for the first user (replace with actual user_id)
-- INSERT INTO carrinho (user_id, produto_id, nome, preco, imagem, quantidade)
-- SELECT 
--     (SELECT id FROM auth.users LIMIT 1),
--     p.id,
--     p.nome,
--     p.preco,
--     p.imagem,
--     FLOOR(RANDOM() * 3 + 1)
-- FROM produtos p
-- WHERE p.destaque = true
-- LIMIT 3;
