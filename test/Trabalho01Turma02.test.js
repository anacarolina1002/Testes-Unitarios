const Biblioteca = require("../src/Trabalho01Turma02");

describe('Biblioteca', () => {
  let biblioteca;

  beforeEach(() => {
    biblioteca = new Biblioteca();
  });

  test('Deve adicionar um livro', () => {
    const livro = { id: 1, titulo: 'Crepusculo' };
    biblioteca.adicionarLivro(livro);
    expect(biblioteca.livros).toContain(livro);
  });

  test('Deve remover um livro', () => {
    const livro = { id: 1, titulo: 'Crepusculo' };
    biblioteca.adicionarLivro(livro);
    biblioteca.removerLivro(1);
    expect(biblioteca.livros).not.toContain(livro);
  });

  test('Deve buscar um livro pelo ID', () => {
    const livro = { id: 1, titulo: 'Crepusculo' };
    biblioteca.adicionarLivro(livro);
    const resultado = biblioteca.buscarLivroPorId(1);
    expect(resultado).toBe(livro);
  });

  test('Deve buscar um livro pelo título', () => {
    const livro = { id: 1, titulo: 'Crepusculo' };
    biblioteca.adicionarLivro(livro);
    const resultado = biblioteca.buscarLivroPorTitulo('Crepusculo');
    expect(resultado).toContain(livro);  // Como `filter` retorna um array, verificar se o array contém o livro
  });

  test('Deve trazer todos os livros cadastrados', () => {
    const livro1 = { id: 1, titulo: 'Crepusculo' };
    const livro2 = { id: 2, titulo: 'Lua Nova' };
    const livro3 = { id: 3, titulo: 'Amanhecer' };

    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);

    const resultado = biblioteca.listarLivros();

    expect(resultado).toContain(livro1);
    expect(resultado).toContain(livro2);
    expect(resultado).toContain(livro3);
  });

  test('Deve adicionar um membro', () => {
    const membro = { id: 1, nome: 'Ana Carolina' };
    biblioteca.adicionarMembro(membro);
    expect(biblioteca.membros).toContain(membro);

  });

  test('Deve remover um membro', () => {
    const membro = { id: 1, nome: 'Ana Carolina' };
    biblioteca.adicionarMembro(membro);
    biblioteca.removerMembro(1);
    expect(biblioteca.membros).not.toContain(membro);
  });

  test('Deve buscar um membro pelo ID', () => {
    const membro = { id: 1, nome: 'Ana Carolina' };
    biblioteca.adicionarMembro(membro);
    const resultado = biblioteca.buscarMembroPorId(1);
    expect(resultado).toBe(membro);
  });

  test('Deve trazer todos os membros', () => {
    const membro1 = { id: 1, titulo: 'Ana Carolina' };
    const membro2 = { id: 2, titulo: 'Alice' };
    const membro3 = { id: 3, titulo: 'Aline' };

    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarMembro(membro2);
    biblioteca.adicionarMembro(membro3);

    const resultado = biblioteca.listarMembros();

    expect(resultado).toContain(membro1);
    expect(resultado).toContain(membro2);
    expect(resultado).toContain(membro3);
  });

  test('Deve emprestar um livro a um membro', () => {
    const livro = { id: 1, titulo: 'Crepusculo', emprestado: false };
    const membro = { id: 1, nome: 'Ana' };
    biblioteca.adicionarLivro(livro);
    biblioteca.adicionarMembro(membro);

    const resultado = biblioteca.emprestarLivro(1, 1);
    expect(resultado).toBe(true);
    expect(biblioteca.livros[0].emprestado).toBe(true);
    expect(biblioteca.livros[0].idMembro).toBe(1);
  });

  test('Não deve emprestar um livro já emprestado', () => {
    const livro = { id: 1, titulo: 'Crepusculo', emprestado: true, idMembro: 1 };
    const membro = { id: 2, nome: 'Alice' };
    biblioteca.adicionarLivro(livro);
    biblioteca.adicionarMembro(membro);

    const resultado = biblioteca.emprestarLivro(1, 2);
    expect(resultado).toBe(false);
    expect(biblioteca.livros[0].emprestado).toBe(true);
    expect(biblioteca.livros[0].idMembro).toBe(1); // Membro original
  });

  test('Deve devolver um livro emprestado', () => {
    const livro = { id: 1, titulo: 'Crepusculo', emprestado: true, idMembro: 1 };
    biblioteca.adicionarLivro(livro);

    const resultado = biblioteca.devolverLivro(1);
    expect(resultado).toBe(true);
    expect(biblioteca.livros[0].emprestado).toBe(false);
    expect(biblioteca.livros[0].idMembro).toBeUndefined();
  });

  test('Não deve devolver um livro que não está emprestado', () => {
    const livro = { id: 1, titulo: 'Crepusculo', emprestado: false };
    biblioteca.adicionarLivro(livro);

    const resultado = biblioteca.devolverLivro(1);
    expect(resultado).toBe(false);
  });

  test('Deve listar todos os livros emprestados', () => {
    const livro1 = { id: 1, titulo: 'Crepusculo', emprestado: true };
    const livro2 = { id: 2, titulo: 'Lua Nova', emprestado: false };
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);

    const resultado = biblioteca.listarLivrosEmprestados();
    expect(resultado).toContain(livro1);
    expect(resultado).not.toContain(livro2);
  });

  test('Deve listar todos os livros disponíveis', () => {
    const livro1 = { id: 1, titulo: 'Crepusculo', emprestado: true };
    const livro2 = { id: 2, titulo: 'Lua Nova', emprestado: false };
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);

    const resultado = biblioteca.listarLivrosDisponiveis();
    expect(resultado).toContain(livro2);
    expect(resultado).not.toContain(livro1);
  });

  test('Deve contar o número de livros cadastrados', () => {
    biblioteca.adicionarLivro({ id: 1, titulo: 'Crepusculo' });
    biblioteca.adicionarLivro({ id: 2, titulo: 'Lua Nova' });
    expect(biblioteca.contarLivros()).toBe(2);
  });

  test('Deve contar o número de membros cadastrados', () => {
    biblioteca.adicionarMembro({ id: 1, nome: 'Ana' });
    biblioteca.adicionarMembro({ id: 2, nome: 'Carlos' });
    expect(biblioteca.contarMembros()).toBe(2);
  });

  test('Deve listar livros por autor', () => {
    const livro1 = { id: 1, titulo: 'Crepusculo', autor: 'Stephenie Meyer' };
    const livro2 = { id: 2, titulo: 'Lua Nova', autor: 'Stephenie Meyer' };
    const livro3 = { id: 3, titulo: 'Amanhecer', autor: 'J.K. Rowling' };
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);

    const resultado = biblioteca.listarLivrosPorAutor('Stephenie Meyer');
    expect(resultado).toContain(livro1);
    expect(resultado).toContain(livro2);
    expect(resultado).not.toContain(livro3);
  });

  test('Deve listar livros por gênero', () => {
    const livro1 = { id: 1, titulo: 'Crepusculo', genero: 'Fantasia' };
    const livro2 = { id: 2, titulo: 'Lua Nova', genero: 'Romance' };
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);

    const resultado = biblioteca.listarLivrosPorGenero('Fantasia');
    expect(resultado).toContain(livro1);
    expect(resultado).not.toContain(livro2);
  });

  test('Deve atualizar as informações de um livro', () => {
    const livro = { id: 1, titulo: 'Crepusculo', autor: 'Stephenie Meyer' };
    biblioteca.adicionarLivro(livro);

    biblioteca.atualizarInformacaoLivro(1, { titulo: 'Amanhecer', autor: 'Stephenie Meyer' });
    const livroAtualizado = biblioteca.buscarLivroPorId(1);
    expect(livroAtualizado.titulo).toBe('Amanhecer');
    expect(livroAtualizado.autor).toBe('Stephenie Meyer');
  });

  test('Deve listar livros por ano de publicação', () => {
    const livro1 = { id: 1, titulo: 'Crepusculo', ano: 2005 };
    const livro2 = { id: 2, titulo: 'Lua Nova', ano: 2006 };
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);

    const resultado = biblioteca.listarLivrosPorAno(2005);
    expect(resultado).toContain(livro1);
    expect(resultado).not.toContain(livro2);
  });
});
