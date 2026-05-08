/**
 * jogo_labirinto_narrativo.js
 * @author Juan Rozas
*/


const prompt = require('prompt-sync')()
require('colors')

let nomeJogador = ''
let quantidadeMonstros = 0
let dificuldadeAtual = ''

function menu() {
    let opcao

    do {
        console.clear()

        console.log(`
================================================================
 _        _    ____ ___ ____  ___ _   _ _____ ___
| |      / \\  | __ )_ _|  _ \\|_ _| \\ | |_   _/ _ \\
| |     / _ \\ |  _ \\| || |_) || ||  \\| | | || | | |
| |___ / ___ \\| |_) | ||  _ < | || |\\  | | || |_| |
|_____/_/   \\_\\____/___|_| \\_\\___|_| \\_| |_| \\___/

    _    _     ____  _   _    _
   / \\  | |   |  _ \\| | | |  / \\
  / _ \\ | |   | |_) | |_| | / _ \\
 / ___ \\| |___|  __/|  _  |/ ___ \\
/_/   \\_\\_____|_|   |_| |_/_/   \\_\\
================================================================
`.blue)
        console.log('1 - Jogar'.green)
        console.log('2 - Regras'.yellow)
        console.log('3 - Sair'.red)

        opcao = Number(prompt('Escolha uma opção: '))

        if (isNaN(opcao) || opcao < 1 || opcao > 3) {
            console.log('Dígito incorreto'.red)
        }

        switch (opcao) {
            case 1:
                escolherDificuldade()
                break

            case 2:
                mostrarRegras()
                break

            case 3:
                console.log('Saindo do jogo...'.red)
                break
        }

    } while (opcao !== 3)
}

function mostrarRegras() {
    console.clear()

    console.log('=== REGRAS DO JOGO ==='.yellow)
    console.log()
    console.log('Você está preso em um labirinto misterioso.')
    console.log('Existem 5 portas em cada fase.')
    console.log('Algumas portas possuem monstros.')
    console.log('Seu objetivo é sobreviver até a fase 5.')
    console.log()
    console.log('Dificuldades:'.cyan)
    console.log('Fácil -> 2 monstros')
    console.log('Intermediário -> 3 monstros')
    console.log('Difícil -> 4 monstros')
    console.log()
    console.log('Você possui apenas 2 vidas.'.red)
    console.log('Se encontrar um monstro, volta para a fase 1.'.red)
    console.log()

    prompt('Pressione ENTER para voltar ao menu...')
}

function escolherDificuldade() {
    let dificuldade

    do {
        console.clear()

        console.log('=== ESCOLHA A DIFICULDADE ==='.blue)
        console.log('1 - Fácil'.green)
        console.log('2 - Intermediário'.yellow)
        console.log('3 - Difícil'.red)

        dificuldade = Number(prompt('Escolha uma dificuldade: '))

        if (isNaN(dificuldade) || dificuldade < 1 || dificuldade > 3) {
            console.log('Dígito incorreto'.red)
        }

    } while (isNaN(dificuldade) || dificuldade < 1 || dificuldade > 3)

    switch (dificuldade) {
        case 1:
            quantidadeMonstros = 2
            dificuldadeAtual = 'Fácil'
            break

        case 2:
            quantidadeMonstros = 3
            dificuldadeAtual = 'Intermediário'
            break

        case 3:
            quantidadeMonstros = 4
            dificuldadeAtual = 'Difícil'
            break
    }

    nomeJogador = prompt('Digite seu nome: ')

    iniciarJogo()
}

function gerarMonstros() {
    let monstros = []

    while (monstros.length < quantidadeMonstros) {
        let porta = Math.floor(Math.random() * 5) + 1

        if (!monstros.includes(porta)) {
            monstros.push(porta)
        }
    }

    return monstros
}

function mostrarMensagemFase(fase) {

    switch (fase) {
        case 1:
            console.log('\nO labirinto parece silencioso...'.yellow)
            break

        case 2:
            console.log('\nVocê escuta correntes se arrastando...'.yellow)
            break

        case 3:
            console.log('\nVocê sente uma presença atrás de você...'.yellow)
            break

        case 4:
            console.log('\nAs paredes começam a tremer...'.yellow)
            break

        case 5:
            console.log('\nVocê está próximo da saída...'.yellow)
            break
    }
}

function mostrarPortas() {

    console.log('\n1 - Porta')
    console.log('2 - Porta')
    console.log('3 - Porta')
    console.log('4 - Porta')
    console.log('5 - Porta')
}

function iniciarJogo() {

    let vidas = 2
    let fase = 1
    let caminhoJogador = []

    let monstrosPorFase = []

    for (let i = 0; i < 5; i++) {
        monstrosPorFase.push(gerarMonstros())
    }

    while (vidas > 0 && fase <= 5) {

        console.clear()

        console.log(`Jogador: ${nomeJogador}`.cyan)
        console.log(`Dificuldade: ${dificuldadeAtual}`.cyan)
        console.log(`Fase Atual: ${fase}`.green)
        console.log(`Vidas: ${vidas}`.red)
        console.log(`Existem ${quantidadeMonstros} monstros escondidos...`.yellow)

        mostrarMensagemFase(fase)

        mostrarPortas()

        let escolha

        do {
            escolha = Number(prompt('\nEscolha uma porta: '))

            if (isNaN(escolha) || escolha < 1 || escolha > 5) {
                console.log('Dígito incorreto'.red)
            }

        } while (isNaN(escolha) || escolha < 1 || escolha > 5)

        let monstrosDaFase = monstrosPorFase[fase - 1]

        if (monstrosDaFase.includes(escolha)) {

            vidas--

            console.log('\nVocê encontrou um monstro!'.red)
            console.log('Você perdeu uma vida.'.red)

            if (vidas > 0) {
                console.log(`Ainda restam ${vidas} vida(s).`.yellow)
                console.log('Voltando para a fase 1...'.yellow)

                fase = 1
                caminhoJogador = []
            }

        } else {

            caminhoJogador.push(escolha)

            console.log(`
========================================
        PARABENS! VOCE AVANCOU!
        VOCE PASSOU DE FASE!
========================================
`.green)

            fase++
            
            console.log(`Você está na FASE ${fase}!`.cyan)
        }

        if (vidas <= 0) {
            console.log('\nVocê é fraco ainda não possui o QI adequado, tente novamente.'.red)
        }

        if (fase > 5) {

            console.log('\nVocê concluiu esta dificuldade!'.green)

            switch (dificuldadeAtual) {

                case 'Fácil':
                    console.log('Mas será capaz de sobreviver ao modo Intermediário?'.yellow)
                    break

                case 'Intermediário':
                    console.log('O verdadeiro desafio começa agora no modo Difícil...'.yellow)
                    break

                case 'Difícil':
                    console.log('Você zerou o game.'.green)
                    console.log('Você é um(a) verdadeiro(a) Alpha.'.green)
                    break
            }
        }

        if (vidas > 0 && fase <= 5) {
            prompt('\nPressione ENTER para continuar...')
        }
    }

    prompt('\nPressione ENTER para voltar ao menu...')
}

menu()
