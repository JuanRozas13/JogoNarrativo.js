# Explicação Completa do Código — Jogo Labirinto Alpha

# Importações

```js
const prompt = require('prompt-sync')()
```

## Explicação

* `require()` importa bibliotecas do Node.js.
* `prompt-sync` permite receber dados digitados pelo usuário no terminal.
* Os `()` no final executam a função da biblioteca.
* A variável `prompt` será usada para capturar entradas.

---

```js
require('colors')
```

## Explicação

* Importa a biblioteca `colors`.
* Permite usar cores no terminal.

Exemplo:

```js
console.log('Texto vermelho'.red)
```

---

# Variáveis Globais

```js
let nomeJogador = ''
```

## Explicação

* Guarda o nome do jogador.
* Começa vazia.
* `let` foi usado porque o valor pode mudar.

---

```js
let quantidadeMonstros = 0
```

## Explicação

* Guarda quantos monstros existirão.
* O valor muda conforme a dificuldade.

---

```js
let dificuldadeAtual = ''
```

## Explicação

* Guarda o nome da dificuldade escolhida.
* Exemplo:

  * Fácil
  * Intermediário
  * Difícil

---

# Função menu()

```js
function menu() {
```

## Explicação

* Cria a função principal do jogo.
* Responsável pelo menu inicial.

---

```js
let opcao
```

## Explicação

* Variável que guarda a opção digitada pelo jogador.

---

```js
do {
```

## Explicação

* Inicia um `do while`.
* O menu ficará repetindo até o jogador sair.

---

```js
console.clear()
```

## Explicação

* Limpa o terminal.
* Deixa a interface mais organizada.

---

```js
console.log('=== LABIRINTO ALPHA ==='.blue)
```

## Explicação

* Mostra o título do jogo.
* `.blue` deixa azul usando `colors`.

---

```js
console.log('1 - Jogar'.green)
console.log('2 - Regras'.yellow)
console.log('3 - Sair'.red)
```

## Explicação

* Mostra as opções do menu.
* Cada opção possui uma cor diferente.

---

```js
opcao = Number(prompt('Escolha uma opção: '))
```

## Explicação

* Mostra mensagem no terminal.
* Recebe o valor digitado.
* `Number()` converte string para número.

---

```js
if (isNaN(opcao) || opcao < 1 || opcao > 3)
```

## Explicação

Valida se:

* não é número
* menor que 1
* maior que 3

`||` significa OU lógico.

---

```js
console.log('Dígito incorreto'.red)
```

## Explicação

* Mostra erro ao usuário.

---

```js
switch (opcao)
```

## Explicação

* Analisa qual opção foi escolhida.

---

```js
case 1:
```

## Explicação

* Se jogador escolher jogar.

---

```js
escolherDificuldade()
```

## Explicação

* Chama função da dificuldade.

---

```js
break
```

## Explicação

* Encerra o case.
* Evita executar outros cases.

---

```js
case 2:
```

## Explicação

* Opção de regras.

---

```js
mostrarRegras()
```

## Explicação

* Chama função das regras.

---

```js
case 3:
```

## Explicação

* Opção sair.

---

```js
console.log('Saindo do jogo...'.red)
```

## Explicação

* Mostra mensagem de encerramento.

---

```js
} while (opcao !== 3)
```

## Explicação

* O menu continua até a opção ser 3.
* `!==` significa diferente.

---

# Função mostrarRegras()

```js
function mostrarRegras() {
```

## Explicação

* Função responsável por mostrar regras.

---

```js
console.clear()
```

## Explicação

* Limpa terminal.

---

```js
console.log('=== REGRAS DO JOGO ==='.yellow)
```

## Explicação

* Título das regras.

---

```js
console.log('Você está preso em um labirinto misterioso.')
```

## Explicação

* Texto narrativo.

---

```js
prompt('Pressione ENTER para voltar ao menu...')
```

## Explicação

* Espera usuário apertar ENTER.

---

# Função escolherDificuldade()

```js
function escolherDificuldade() {
```

## Explicação

* Responsável por escolher dificuldade.

---

```js
let dificuldade
```

## Explicação

* Guarda opção escolhida.

---

```js
do {
```

## Explicação

* Repete até jogador digitar corretamente.

---

```js
dificuldade = Number(prompt('Escolha uma dificuldade: '))
```

## Explicação

* Captura dificuldade.

---

```js
switch (dificuldade)
```

## Explicação

* Verifica qual dificuldade foi escolhida.

---

```js
case 1:
quantidadeMonstros = 2
```

## Explicação

* Fácil possui 2 monstros.

---

```js
dificuldadeAtual = 'Fácil'
```

## Explicação

* Guarda nome da dificuldade.

---

```js
nomeJogador = prompt('Digite seu nome: ')
```

## Explicação

* Recebe nome do jogador.

---

```js
iniciarJogo()
```

## Explicação

* Inicia partida.

---

# Função gerarMonstros()

```js
function gerarMonstros() {
```

## Explicação

* Cria monstros aleatórios.

---

```js
let monstros = []
```

## Explicação

* Array que guardará portas com monstros.

---

```js
while (monstros.length < quantidadeMonstros)
```

## Explicação

* Continua até gerar quantidade correta.

---

```js
let porta = Math.floor(Math.random() * 5) + 1
```

## Explicação

* `Math.random()` gera número decimal.
* Multiplica por 5.
* `Math.floor()` remove casas decimais.
* `+1` faz ficar entre 1 e 5.

---

```js
if (!monstros.includes(porta))
```

## Explicação

* Verifica se porta ainda não existe no array.
* `!` significa NÃO.

---

```js
monstros.push(porta)
```

## Explicação

* Adiciona porta ao array.

---

```js
return monstros
```

## Explicação

* Retorna array de monstros.

---

# Função mostrarMensagemFase()

```js
function mostrarMensagemFase(fase)
```

## Explicação

* Recebe fase atual.
* Mostra narrativa correspondente.

---

```js
switch (fase)
```

## Explicação

* Analisa qual fase atual.

---

```js
case 1:
```

## Explicação

* Mensagem específica fase 1.

---

# Função mostrarPortas()

```js
function mostrarPortas() {
```

## Explicação

* Mostra portas disponíveis.

---

```js
console.log('1 - Porta')
```

## Explicação

* Exibe porta no terminal.

---

# Função iniciarJogo()

```js
function iniciarJogo() {
```

## Explicação

* Função principal da gameplay.

---

```js
let vidas = 2
```

## Explicação

* Jogador começa com 2 vidas.

---

```js
let fase = 1
```

## Explicação

* Jogo começa fase 1.

---

```js
let caminhoJogador = []
```

## Explicação

* Guarda portas corretas escolhidas.

---

```js
let monstrosPorFase = []
```

## Explicação

* Guarda monstros de cada fase.

---

```js
for (let i = 0; i < 5; i++)
```

## Explicação

* Repete 5 vezes.
* Uma para cada fase.

---

```js
monstrosPorFase.push(gerarMonstros())
```

## Explicação

* Gera monstros.
* Guarda no array.

---

```js
while (vidas > 0 && fase <= 5)
```

## Explicação

* Continua enquanto:

  * tiver vidas
  * fase menor ou igual a 5

`&&` significa E lógico.

---

```js
console.log(`Jogador: ${nomeJogador}`)
```

## Explicação

* Mostra nome do jogador.
* `${}` insere variável dentro da string.

---

```js
mostrarMensagemFase(fase)
```

## Explicação

* Mostra narrativa da fase.

---

```js
mostrarPortas()
```

## Explicação

* Mostra portas.

---

```js
let escolha
```

## Explicação

* Guarda porta escolhida.

---

```js
do {
```

## Explicação

* Repete até jogador digitar corretamente.

---

```js
escolha = Number(prompt('Escolha uma porta: '))
```

## Explicação

* Recebe escolha.

---

```js
let monstrosDaFase = monstrosPorFase[fase - 1]
```

## Explicação

* Pega monstros da fase atual.
* Arrays começam no índice 0.
* Por isso usamos `fase - 1`.

---

```js
if (monstrosDaFase.includes(escolha))
```

## Explicação

* Verifica se jogador escolheu monstro.

---

```js
vidas--
```

## Explicação

* Remove 1 vida.

---

```js
fase = 1
```

## Explicação

* Reinicia para fase 1.

---

```js
caminhoJogador = []
```

## Explicação

* Limpa progresso.

---

```js
caminhoJogador.push(escolha)
```

## Explicação

* Guarda porta correta escolhida.

---

```js
fase++
```

## Explicação

* Avança fase.

---

```js
if (vidas <= 0)
```

## Explicação

* Verifica Game Over.

---

```js
if (fase > 5)
```

## Explicação

* Verifica vitória.

---

```js
switch (dificuldadeAtual)
```

## Explicação

* Mostra mensagem conforme dificuldade concluída.

---

```js
prompt('Pressione ENTER para voltar ao menu...')
```

## Explicação

* Espera jogador antes de voltar menu.

---

# Execução Final

```js
menu()
```

## Explicação

* Inicia o jogo.
* Chama função principal.
