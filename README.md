# CineMatch JS

O CineMatch JS é um protótipo interativo de recomendação de streaming executado no terminal. Ele coleta nome, idade e gêneros favoritos, compara esse perfil com um catálogo fictício e recomenda o filme ou série com maior compatibilidade.

## Funcionalidades

- perfil interativo com validação de dados;
- catálogo de filmes e séries;
- percentual e classificação de compatibilidade;
- gêneros em comum e ainda não explorados;
- recomendação principal e personalizada;
- pesquisa de conteúdo pelo título ou gênero;
- menu interativo que permanece aberto até a opção de saída.

## Como executar

É necessário ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm start
```

Também é possível iniciar com `node cinematch.js`. Responda às três perguntas iniciais e escolha as ações pelo menu.

## Estrutura

```text
cinematch-js/
├── cinematch.js
├── package.json
├── README.md
└── planejamento/
    └── tarefas-kanban.md
```

## Conceitos praticados

O código utiliza strings, números, booleanos, objetos, arrays, `const` e `let`; funções tradicionais e arrow functions; operadores; `if/else`; `switch`; laços `while` e `do-while`; e os métodos de array `map`, `filter`, `find`, `every` e `reduce`.

Na parte de orientação a objetos, `Conteudo` possui construtor, atributos e método que usa `this`. A classe `Serie` herda de `Conteudo` por meio de `extends` e `super`. O projeto também demonstra callback na finalização, closure no contador de recomendações e uma `Promise` consumida com `async/await` para simular o carregamento remoto do catálogo.

### `var`, `let` e `const`

O projeto prioriza `const` para referências que não serão reatribuídas e `let` quando o valor precisa mudar. `var` não foi usado porque possui escopo de função e pode causar comportamentos menos previsíveis que o escopo de bloco de `let` e `const`.

## Internet e arquitetura cliente-servidor

A internet conecta dispositivos que trocam dados por protocolos como TCP/IP e HTTP. Em uma arquitetura cliente-servidor, o cliente solicita um recurso e o servidor processa a solicitação e devolve uma resposta. Neste protótipo, o terminal funciona como cliente e `buscarCatalogoSimulado()` representa uma requisição a um servidor: a função devolve uma Promise após um pequeno atraso, sem depender de uma API real.

## Ferramentas e extensões recomendadas

- Node.js e npm;
- VS Code;
- extensões **ESLint** (análise do código) e **Prettier** (formatação);
- Git e, opcionalmente, GitHub Desktop para branches, commits e push.

## Organização e versionamento

O planejamento está em [planejamento/tarefas-kanban.md](planejamento/tarefas-kanban.md). Para reproduzir o GitHub Flow simplificado sugerido no enunciado, podem ser usadas as branches `main`, `develop`, `feat/perfil-interativo` e `docs/readme`, com commits pequenos e descritivos.

Exemplos de commits: `feat: cria estrutura inicial`, `feat: adiciona perfil interativo`, `feat: implementa compatibilidade`, `feat: adiciona classes e herança` e `docs: detalha execução e conceitos`.

## Roteiro sugerido para o vídeo (até 5 minutos)

1. Apresente o objetivo e demonstre o onboarding, o catálogo, a análise e a recomendação.
2. Mostre que a execução exige Node.js, `npm install` e `npm start`.
3. Apresente o Kanban e explique como as tarefas foram movidas.
4. Mostre as branches e explique o objetivo de cada uma.
5. Comente uma melhoria futura, como carregar um catálogo por API ou salvar perfis.

## Autoria e links da entrega

- Pessoa estudante/squad: **Jonathan Euzébio Boza**
- Repositório público: [github.com/JonathanBoza/cinematch-js](https://github.com/JonathanBoza/cinematch-js)
- Quadro Kanban: [planejamento/tarefas-kanban.md](https://github.com/JonathanBoza/cinematch-js/blob/main/planejamento/tarefas-kanban.md)
- Vídeo público ou não listado: **pendente de publicação**
