const prompt = require('prompt-sync')({ sigint: true });

class Conteudo {
  constructor(id, titulo, tipo, generos, duracaoMinutos) {
    this.id = id;
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  exibirResumo() {
    return `${this.titulo} (${this.tipo}) - ${this.duracaoMinutos} min`;
  }
}

class Serie extends Conteudo {
  constructor(id, titulo, generos, duracaoMinutos, temporadas) {
    super(id, titulo, 'Série', generos, duracaoMinutos);
    this.temporadas = temporadas;
  }

  exibirResumo() {
    return `${super.exibirResumo()} - ${this.temporadas} temporada(s)`;
  }
}

const catalogo = [
  new Serie(1, 'Fronteira Digital', ['Ação', 'Ficção Científica'], 45, 2),
  new Conteudo(2, 'Risadas de Sábado', 'Filme', ['Comédia', 'Romance'], 98),
  new Conteudo(3, 'Sombras do Porão', 'Filme', ['Terror', 'Suspense'], 110),
  new Serie(4, 'Código Oculto', ['Suspense', 'Drama'], 52, 1),
];

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

function lerNome() {
  let nome = '';
  while (!nome) {
    nome = prompt('Qual é o seu nome? ').trim();
    if (!nome) console.log('Digite um nome válido.');
  }
  return nome;
}

function lerIdade() {
  let idade;
  do {
    idade = Number(prompt('Qual é a sua idade? '));
    if (!Number.isInteger(idade) || idade <= 0) {
      console.log('Digite uma idade válida usando um número inteiro positivo.');
    }
  } while (!Number.isInteger(idade) || idade <= 0);
  return idade;
}

function lerGeneros() {
  let generos = [];
  do {
    const entrada = prompt(
      'Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia): '
    );
    generos = entrada
      .split(',')
      .map((genero) => genero.trim())
      .filter(Boolean)
      .filter(
        (genero, indice, lista) =>
          lista.findIndex((item) => normalizar(item) === normalizar(genero)) === indice
      );
    if (generos.length === 0) console.log('Digite pelo menos um gênero.');
  } while (generos.length === 0);
  return generos;
}

function criarPerfil() {
  return {
    nome: lerNome(),
    idade: lerIdade(),
    generosFavoritos: lerGeneros(),
  };
}

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) return 'Alta afinidade';
  if (percentual >= 50) return 'Média afinidade';
  return 'Baixa afinidade';
}

function analisarConteudo(usuario, conteudo) {
  const favoritos = usuario.generosFavoritos.map(normalizar);
  const generosEmComum = conteudo.generos.filter((genero) =>
    favoritos.includes(normalizar(genero))
  );
  const generosNaoExplorados = conteudo.generos.filter(
    (genero) => !favoritos.includes(normalizar(genero))
  );
  const compatibilidade = Math.round(
    (generosEmComum.length / conteudo.generos.length) * 100
  );

  return {
    conteudo,
    compatibilidade,
    generosEmComum,
    generosNaoExplorados,
    classificacao: classificarCompatibilidade(compatibilidade),
    curteTodosOsGeneros: conteudo.generos.every((genero) =>
      favoritos.includes(normalizar(genero))
    ),
  };
}

const calcularCompatibilidades = (usuario, itens) =>
  itens.map((conteudo) => analisarConteudo(usuario, conteudo));

function encontrarMelhorConteudo(resultados) {
  return resultados.reduce((melhor, atual) =>
    atual.compatibilidade > melhor.compatibilidade ? atual : melhor
  );
}

function exibirPerfil(usuario) {
  console.log(`\nNome: ${usuario.nome}`);
  console.log(`Idade: ${usuario.idade}`);
  console.log(`Gêneros favoritos: ${usuario.generosFavoritos.join(', ')}`);
}

function exibirCatalogo(itens) {
  console.log('\n===== Catálogo completo =====');
  itens.forEach((conteudo) => console.log(`- ${conteudo.exibirResumo()}`));
  const duracaoTotal = itens.reduce((total, item) => total + item.duracaoMinutos, 0);
  console.log(`Duração total por episódio/filme: ${duracaoTotal} min`);
}

function exibirResultado(resultado) {
  const comuns = resultado.generosEmComum.join(', ') || 'Nenhum';
  const faltantes = resultado.generosNaoExplorados.join(', ') || 'Nenhum';
  console.log(`\nTítulo: ${resultado.conteudo.titulo}`);
  console.log(`Tipo: ${resultado.conteudo.tipo}`);
  console.log(`Compatibilidade: ${resultado.compatibilidade}%`);
  console.log(`Gêneros em comum: ${comuns}`);
  console.log(`Gêneros não explorados: ${faltantes}`);
  console.log(`Classificação: ${resultado.classificacao}`);
  console.log(`Você curte todos os gêneros: ${resultado.curteTodosOsGeneros ? 'Sim' : 'Não'}`);
}

function exibirCompatibilidades(resultados) {
  console.log('\n===== Compatibilidade =====');
  resultados.forEach(exibirResultado);
  const altaAfinidade = resultados.filter((item) => item.compatibilidade >= 80);
  console.log(`\nConteúdos com alta afinidade: ${altaAfinidade.length}`);
}

function criarContadorDeRecomendacoes() {
  let total = 0;
  return () => ++total;
}

function exibirRecomendacao(usuario, resultado, contar) {
  console.log('\n===== Recomendação principal =====');
  console.log(`${resultado.conteudo.titulo} (${resultado.conteudo.tipo})`);
  console.log(`Compatibilidade: ${resultado.compatibilidade}%`);

  const proximoGenero = resultado.generosNaoExplorados[0];
  if (proximoGenero) {
    const generoConhecido = resultado.generosEmComum[0] || usuario.generosFavoritos[0];
    console.log(`\nRecomendação personalizada para ${usuario.nome}:`);
    console.log(
      `Você já curte ${generoConhecido} — que tal experimentar ${proximoGenero}?`
    );
  } else {
    console.log(`\n${usuario.nome}, este título combina totalmente com seus gostos!`);
  }
  console.log(`“${resultado.conteudo.titulo}” pode ser um ótimo próximo título.`);
  console.log(`Recomendação consultada ${contar()} vez(es) nesta sessão.`);
}

function buscarCatalogoSimulado() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(catalogo), 500);
  });
}

function finalizarOnboarding(nomeUsuario, callback) {
  console.log('\nOnboarding finalizado.');
  callback(nomeUsuario);
}

const exibirMensagemFinal = (nome) =>
  console.log(`${nome}, aproveite sua maratona! Bom streaming.`);

function exibirMenu(usuario, itens) {
  const resultados = calcularCompatibilidades(usuario, itens);
  const contarRecomendacao = criarContadorDeRecomendacoes();
  let opcao;

  do {
    console.log('\n===== CineMatch JS =====');
    console.log('1 - Ver meu perfil');
    console.log('2 - Ver catálogo completo');
    console.log('3 - Calcular compatibilidade com todos os conteúdos');
    console.log('4 - Ver o conteúdo mais recomendado');
    console.log('5 - Buscar conteúdo pelo título');
    console.log('6 - Sair');
    opcao = prompt('Escolha uma opção: ').trim();

    switch (opcao) {
      case '1':
        exibirPerfil(usuario);
        break;
      case '2':
        exibirCatalogo(itens);
        break;
      case '3':
        exibirCompatibilidades(resultados);
        break;
      case '4':
        exibirRecomendacao(
          usuario,
          encontrarMelhorConteudo(resultados),
          contarRecomendacao
        );
        break;
      case '5': {
        const titulo = prompt('Digite o título (ou parte dele): ').trim();
        const encontrado = itens.find((item) =>
          normalizar(item.titulo).includes(normalizar(titulo))
        );
        console.log(encontrado ? encontrado.exibirResumo() : 'Conteúdo não encontrado.');
        break;
      }
      case '6':
        finalizarOnboarding(usuario.nome, exibirMensagemFinal);
        break;
      default:
        console.log('Opção inválida, tente novamente.');
    }
  } while (opcao !== '6');
}

async function iniciarSistema() {
  console.log('Bem-vindo(a) ao CineMatch JS!\n');
  const usuario = criarPerfil();
  console.log('\nCarregando catálogo...');
  const catalogoCarregado = await buscarCatalogoSimulado();
  console.log('Catálogo carregado com sucesso!');
  exibirMenu(usuario, catalogoCarregado);
}

if (require.main === module) {
  iniciarSistema().catch((erro) => {
    console.error('Não foi possível iniciar o CineMatch:', erro.message);
    process.exitCode = 1;
  });
}

module.exports = {
  Conteudo,
  Serie,
  analisarConteudo,
  calcularCompatibilidades,
  classificarCompatibilidade,
  encontrarMelhorConteudo,
  criarContadorDeRecomendacoes,
  normalizar,
};
