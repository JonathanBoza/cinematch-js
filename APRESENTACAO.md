# Roteiro de apresentação - CineMatch JS

**Autor:** Jonathan Euzébio Boza  
**Duração máxima:** 5 minutos

## 1. Apresentação

> Olá, meu nome é Jonathan Euzébio Boza. Este é o CineMatch JS, meu mini-projeto do Módulo 1, Semana 6.

## 2. Objetivo

> O objetivo do CineMatch é recomendar filmes e séries conforme os gêneros favoritos da pessoa usuária. O programa coleta nome, idade e gêneros pelo terminal e calcula a compatibilidade com cada conteúdo.

## 3. Estrutura do projeto

Mostrar os arquivos no VS Code e explicar:

> O `cinematch.js` contém o programa principal. O `package.json` contém a configuração e a dependência prompt-sync. O README explica o projeto e como executar. A pasta `planejamento` contém o quadro Kanban.

## 4. Execução

Mostrar o terminal:

```bash
chcp 65001
npm install
npm start
```

> Para executar, é necessário ter o Node.js instalado. No Windows, o comando `chcp 65001` configura o terminal para usar UTF-8, ajudando a exibir e digitar corretamente caracteres como acentos e cedilha. O `npm install` instala as dependências e o `npm start` inicia o sistema.

Se as dependências já estiverem instaladas, durante a gravação basta executar:

```bash
chcp 65001
npm start
```

Usar estes dados na demonstração:

```text
Nome: Jonathan
Idade: 30
Gêneros: Comédia, Ação
```

> O sistema utiliza a biblioteca prompt-sync para receber os dados digitados. Essas informações ficam armazenadas em um objeto com nome, idade e gêneros favoritos.

## 5. Demonstrar o menu

### Opção 1 - Perfil

> A primeira opção mostra o perfil informado pela pessoa usuária.

### Opção 2 - Catálogo

> A segunda opção mostra o catálogo completo de filmes e séries.

### Opção 3 - Compatibilidade

> A terceira opção compara os gêneros favoritos com os gêneros de cada conteúdo. O resultado é classificado como baixa, média ou alta afinidade.

### Opção 4 - Recomendação

> A quarta opção encontra o conteúdo com maior compatibilidade e apresenta uma recomendação personalizada.

### Opção 5 - Pesquisa

Pesquisar por:

```text
comedia
```

> A quinta opção permite pesquisar por título ou gênero. Pesquisando comédia, o sistema encontra o filme Risadas de Sábado.

### Opção 6 - Encerramento

> A sexta opção encerra o programa e demonstra o uso de callback na mensagem final.

## 6. Conceitos utilizados

Mostrar rapidamente algumas partes do código:

> O projeto utiliza funções, arrow functions, arrays, objetos, condicionais, repetições e os métodos map, filter, find, every e reduce. Também utiliza classes, construtor, herança, this, callback, closure, Promise e async/await.

Não é necessário explicar cada linha do código.

## 7. Kanban e GitHub

Mostrar o arquivo `planejamento/tarefas-kanban.md`:

> Eu organizei as tarefas nas colunas Backlog, A Fazer, Em Andamento e Concluído.

Mostrar as branches no GitHub:

> Eu criei as branches main, develop, feat/perfil-interativo e docs/readme. A main contém a versão final, a develop foi usada para integração, a feat para funcionalidade e a docs para documentação.

## 8. Melhorias futuras

> Como melhoria futura, o sistema poderia carregar o catálogo de uma API real, salvar os perfis e manter um histórico de recomendações.

## 9. Encerramento

> Esse foi o CineMatch JS. Obrigado pela atenção.

## Checklist da gravação

- [ ] Mostrar o rosto e gravar em um local iluminado.
- [ ] Confirmar que o áudio está claro.
- [ ] Demonstrar as opções de 1 a 6.
- [ ] Mostrar o Kanban, as branches e os commits.
- [ ] Manter o vídeo com no máximo 5 minutos.
- [ ] Publicar no YouTube como não listado ou no Google Drive.
- [ ] Liberar o acesso para qualquer pessoa com o link.
- [ ] Colocar o link do vídeo no README.
- [ ] Enviar os três links no AVA.
