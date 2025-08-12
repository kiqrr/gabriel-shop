-- SQL for Supabase: Create products table and insert 10 test products

-- Create the products table
CREATE TABLE IF NOT EXISTS produtos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    preco_original DECIMAL(10,2),
    imagem TEXT,
    categoria VARCHAR(100),
    estoque INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    destaque BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos(ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_destaque ON produtos(destaque);

-- Insert 10 test products
INSERT INTO produtos (nome, descricao, preco, preco_original, imagem, categoria, estoque, destaque) VALUES
('Camiseta Gabriel Classic', 'Camiseta básica 100% algodão com logo Gabriel estampado', 59.90, 79.90, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'Camisetas', 25, true),
('Calça Jeans Skinny', 'Calça jeans skinny azul escuro, cós médio com elastano', 129.90, 159.90, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', 'Calças', 18, true),
('Tênis Urban Style', 'Tênis casual branco com detalhes em couro sintético', 199.90, 249.90, 'https://images.unsplash.com/photo-1549298916-b52d064c4f2a?w=500', 'Calçados', 12, false),
('Moletom Gabriel Hoodie', 'Moletom com capuz e bolso canguru, algodão felpado', 89.90, 119.90, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', 'Moletons', 15, true),
('Bermuda Cargo', 'Bermuda cargo bege com múltiplos bolsos, algodão', 79.90, 99.90, 'https://images.unsplash.com/photo-1593032465175-481ac7f917be?w=500', 'Bermudas', 22, false),
('Camisa Social Slim', 'Camisa social branca slim fit, algodão premium', 99.90, 129.90, 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500', 'Camisas', 20, false),
('Jaqueta Jeans', 'Jaqueta jeans azul claro com forro interno', 149.90, 189.90, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500', 'Jaquetas', 8, true),
('Boné Gabriel Snapback', 'Boné snapback preto com logo Gabriel bordado', 49.90, 69.90, 'https://images.unsplash.com/photo-1588850561407-27a312b38573?w=500', 'Acessórios', 30, false),
('Tênis Running Sport', 'Tênis running preto com sola emborrachada antiderrapante', 179.90, 229.90, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'Calçados', 10, false),
('Kit Meias (3 pares)', 'Kit com 3 pares de meias cano médio, cores variadas', 29.90, 39.90, 'https://images.unsplash.com/photo-1586350977804-55aaa5c32c25?w=500', 'Acessórios', 50, false);

-- Create trigger for automatic updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
CREATE TRIGGER update_produtos_updated_at
    BEFORE UPDATE ON produtos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
