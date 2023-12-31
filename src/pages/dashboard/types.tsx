export interface ProdutosProps {
  id: string,
  code: string,
  ativado: boolean,
  nome: string,
  descricao: string,
  imagem: string,
  created_at: string,
  categoriaId: string,
  preco: number,
  nomesAdd: string[],
  precosAdd: number[]
}

export interface CategoriasProps {
  id: string,
  nome: string,
  imagem: string,
  created_at: string,
  produtos: Array<ProdutosProps>
}