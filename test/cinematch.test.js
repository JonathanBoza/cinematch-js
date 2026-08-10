const test = require('node:test');
const assert = require('node:assert/strict');
const {
  Conteudo,
  Serie,
  analisarConteudo,
  calcularCompatibilidades,
  classificarCompatibilidade,
  encontrarMelhorConteudo,
  buscarConteudo,
  criarContadorDeRecomendacoes,
} = require('../cinematch');

const usuario = {
  nome: 'Ana',
  idade: 25,
  generosFavoritos: ['Acao', 'Comédia'],
};

test('calcula gêneros e compatibilidade ignorando acentos e maiúsculas', () => {
  const conteudo = new Conteudo(1, 'Teste', 'Filme', ['Ação', 'Suspense'], 90);
  const resultado = analisarConteudo(usuario, conteudo);

  assert.equal(resultado.compatibilidade, 50);
  assert.deepEqual(resultado.generosEmComum, ['Ação']);
  assert.deepEqual(resultado.generosNaoExplorados, ['Suspense']);
  assert.equal(resultado.classificacao, 'Média afinidade');
});

test('aplica os limites das classificações', () => {
  assert.equal(classificarCompatibilidade(100), 'Alta afinidade');
  assert.equal(classificarCompatibilidade(80), 'Alta afinidade');
  assert.equal(classificarCompatibilidade(79), 'Média afinidade');
  assert.equal(classificarCompatibilidade(50), 'Média afinidade');
  assert.equal(classificarCompatibilidade(49), 'Baixa afinidade');
});

test('encontra o conteúdo de maior compatibilidade', () => {
  const itens = [
    new Conteudo(1, 'A', 'Filme', ['Terror'], 80),
    new Serie(2, 'B', ['Comédia', 'Ação'], 45, 2),
  ];
  const melhor = encontrarMelhorConteudo(calcularCompatibilidades(usuario, itens));

  assert.equal(melhor.conteudo.titulo, 'B');
  assert.equal(melhor.compatibilidade, 100);
  assert.match(itens[1].exibirResumo(), /2 temporada/);
});

test('closure mantém o total entre chamadas', () => {
  const contar = criarContadorDeRecomendacoes();
  assert.equal(contar(), 1);
  assert.equal(contar(), 2);
});

test('busca conteúdo por parte do título ou por gênero', () => {
  const itens = [
    new Conteudo(1, 'Risadas de Sábado', 'Filme', ['Comédia', 'Romance'], 98),
    new Conteudo(2, 'Sombras do Porão', 'Filme', ['Terror', 'Suspense'], 110),
  ];

  assert.equal(buscarConteudo(itens, 'risadas').titulo, 'Risadas de Sábado');
  assert.equal(buscarConteudo(itens, 'comedia').titulo, 'Risadas de Sábado');
  assert.equal(buscarConteudo(itens, 'terror').titulo, 'Sombras do Porão');
  assert.equal(buscarConteudo(itens, 'inexistente'), undefined);
});
