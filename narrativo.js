/**
 * Jogo Narrativo de Labirinto - Node.js
 * @author Juan Rozas
 * 
 * Jogo de labirinto narrativo no terminal com sistema de portas,
 * monstros e dificuldades variáveis.
 */

// Importação de pacotes
const prompt = require('prompt-sync')();
const colors = require('colors');

// ===================== CONFIGURAÇÃO DO JOGO =====================

// Variáveis globais
let nomeJogador = '';
let faseAtual = 1;
let vidas = 2;
let dificuldadeAtual = '';
let monstrosLocalizacoes = [];
let portasInfo = [];

// Configurações de dificuldade
const dificuldades = {
    facil: {
        nome: 'Fácil',
        totalPortas: 5,
        monstrosTotal: 2,
        portasSeguras: 3,
        descricao: '2 monstros em 5 portas'
    },
    intermediario: {
        nome: 'Intermediário',
        totalPortas: 5,
        monstrosTotal: 3,
        portasSeguras: 2,
        descricao: '3 monstros em 5 portas'
    },
    dificil: {
        nome: 'Difícil',
        totalPortas: 5,
        monstrosTotal: 4,
        portasSeguras: 1,
        descricao: '4 monstros em 5 portas'
    }
};

// Mensagens de suspense para cada fase
const mensagensPhases = [
    'Você entra no labirinto... A escuridão envolve você.',
    'Você escuta correntes se arrastando pelas paredes...',
    'O labirinto parece mais sombrio a cada passo...',
    'Você sente uma presença atrás de você...',
    'O ar fica mais pesado. Você está perto do fim.'
];

// ===================== FUNÇÕES PRINCIPAIS =====================

/**
 * Mostra o menu inicial e aguarda escolha do jogador
 */
function menu() {
    console.clear();
    console.log(colors.cyan('╔════════════════════════════════════╗'));
    console.log(colors.cyan('║   LABIRINTO NARRATIVO - Node.js   ║'));
    console.log(colors.cyan('╚════════════════════════════════════╝\n'));
    
    console.log(colors.yellow('1 - Jogar'));
    console.log(colors.yellow('2 - Regras'));
    console.log(colors.yellow('3 - Sair\n'));
    
    let opcao = prompt('Escolha uma opção: ');
    
    // Validação de entrada
    while (opcao !== '1' && opcao !== '2' && opcao !== '3') {
        console.log(colors.red('Dígito incorreto'));
        opcao = prompt('Escolha uma opção: ');
    }
    
    if (opcao === '1') {
        escolherDificuldade();
    } else if (opcao === '2') {
        mostrarRegras();
    } else if (opcao === '3') {
        console.clear();
        console.log(colors.green('Obrigado por jogar!'));
        process.exit(0);
    }
}

/**
 * Mostra as regras do jogo
 */
function mostrarRegras() {
    console.clear();
    console.log(colors.cyan('╔════════════════════════════════════╗'));
    console.log(colors.cyan('║            REGRAS DO JOGO          ║'));
    console.log(colors.cyan('╚════════════════════════════════════╝\n'));
    
    console.log(colors.yellow('📖 OBJETIVO DO JOGO:'));
    console.log('Traverse as 5 fases do labirinto escolhendo portas seguras.\n');
    
    console.log(colors.yellow('❤️  SISTEMA DE VIDAS:'));
    console.log('Você começa com 2 vidas. Se encontrar um monstro, perde 1 vida.\n');
    
    console.log(colors.yellow('🚪 FUNCIONAMENTO DAS PORTAS:'));
    console.log('Você escolherá uma porta a cada fase. Algumas têm monstros escondidos.\n');
    
    console.log(colors.yellow('📊 DIFICULDADES:'));
    console.log('  • FÁCIL: 2 monstros em 5 portas');
    console.log('  • INTERMEDIÁRIO: 3 monstros em 5 portas');
    console.log('  • DIFÍCIL: 4 monstros em 5 portas\n');
    
    console.log(colors.yellow('⚔️  MONSTROS:'));
    console.log('Se encontrar um monstro, volta para a Fase 1!\n');
    
    prompt(colors.yellow('Pressione ENTER para voltar ao menu...'));
    menu();
}

/**
 * Permite o jogador escolher a dificuldade
 */
function escolherDificuldade() {
    console.clear();
    console.log(colors.cyan('╔════════════════════════════════════╗'));
    console.log(colors.cyan('║        ESCOLHA A DIFICULDADE       ║'));
    console.log(colors.cyan('╚════════════════════════════════════╝\n'));
    
    console.log(colors.green('1 - Fácil (2 monstros em 5 portas)'));
    console.log(colors.yellow('2 - Intermediário (3 monstros em 5 portas)'));
    console.log(colors.red('3 - Difícil (4 monstros em 5 portas)\n'));
    
    let opcao = prompt('Escolha a dificuldade: ');
    
    while (opcao !== '1' && opcao !== '2' && opcao !== '3') {
        console.log(colors.red('Dígito incorreto'));
        opcao = prompt('Escolha a dificuldade: ');
    }
    
    if (opcao === '1') {
        dificuldadeAtual = 'facil';
    } else if (opcao === '2') {
        dificuldadeAtual = 'intermediario';
    } else if (opcao === '3') {
        dificuldadeAtual = 'dificil';
    }
    
    pedirNomeJogador();
}

/**
 * Solicita o nome do jogador
 */
function pedirNomeJogador() {
    console.clear();
    console.log(colors.cyan('╔════════════════════════════════════╗'));
    console.log(colors.cyan('║        QUAL É SEU NOME?            ║'));
    console.log(colors.cyan('╚════════════════════════════════════╝\n'));
    
    nomeJogador = prompt('Digite seu nome: ');
    
    // Validação: aceita apenas string/texto
    while (nomeJogador.trim() === '' || /^\d+$/.test(nomeJogador)) {
        console.log(colors.red('Nome inválido! Digite um nome válido.'));
        nomeJogador = prompt('Digite seu nome: ');
    }
    
    iniciarJogo();
}

/**
 * Inicia o jogo, gerando monstros aleatórios e começando a fase 1
 */
function iniciarJogo() {
    // Reset de variáveis
    faseAtual = 1;
    vidas = 2;
    monstrosLocalizacoes = [];
    portasInfo = [];
    
    // Gerar monstros aleatórios
    gerarMonstros();
    
    // Iniciar o jogo na fase 1
    jogarFase();
}

/**
 * Gera as localizações aleatórias dos monstros
 */
function gerarMonstros() {
    const config = dificuldades[dificuldadeAtual];
    monstrosLocalizacoes = [];
    
    // Criar array com 5 posições (portas)
    for (let i = 0; i < config.totalPortas; i++) {
        monstrosLocalizacoes[i] = false; // Inicialmente, sem monstros
    }
    
    // Distribuir monstros aleatoriamente
    let monstrosCriados = 0;
    while (monstrosCriados < config.monstrosTotal) {
        let indexAleatorio = Math.floor(Math.random() * config.totalPortas);
        
        // Verifica se já não tem monstro nesta porta
        if (!monstrosLocalizacoes[indexAleatorio]) {
            monstrosLocalizacoes[indexAleatorio] = true;
            monstrosCriados++;
        }
    }
}

/**
 * Mostra as portas disponíveis
 */
function mostrarPortas() {
    const config = dificuldades[dificuldadeAtual];
    console.log(colors.blue('\n🚪 ESCOLHA UMA PORTA:\n'));
    
    for (let i = 0; i < config.totalPortas; i++) {
        console.log(colors.blue((i + 1) + ' - Porta'));
    }
}

/**
 * Executa a lógica de uma fase
 */
function jogarFase() {
    console.clear();
    
    // Verificar se o jogador já completou todas as fases
    if (faseAtual > 5) {
        mostrarVitoriaDificuldade();
        return;
    }
    
    const config = dificuldades[dificuldadeAtual];
    
    console.log(colors.cyan('╔════════════════════════════════════╗'));
    console.log(colors.cyan('║   FASE ' + faseAtual + ' - ' + config.nome.toUpperCase() + '    ║'));
    console.log(colors.cyan('╚════════════════════════════════════╝\n'));
    
    console.log(colors.yellow('👤 Jogador: ' + nomeJogador));
    console.log(colors.red('❤️  Vidas: ' + vidas));
    console.log(colors.yellow('📍 Fase: ' + faseAtual + '/5'));
    console.log(colors.yellow('⚔️  Monstros nesta fase: ' + config.monstrosTotal + '\n'));
    
    // Mensagem de suspense da fase
    mostrarMensagemFase();
    
    // Mostrar portas
    mostrarPortas();
    
    // Obter escolha do jogador
    let escolha = prompt('\nEscolha uma porta (1-' + config.totalPortas + '): ');
    
    // Validar escolha
    while (!Number.isInteger(parseInt(escolha)) || parseInt(escolha) < 1 || parseInt(escolha) > config.totalPortas) {
        console.log(colors.red('Dígito incorreto'));
        escolha = prompt('Escolha uma porta (1-' + config.totalPortas + '): ');
    }
    
    // Verificar escolha
    verificarEscolha(parseInt(escolha));
}

/**
 * Mostra a mensagem de suspense para a fase atual
 */
function mostrarMensagemFase() {
    console.log(colors.magenta('\n✨ ' + mensagensPhases[faseAtual - 1] + '\n'));
}

/**
 * Verifica se a escolha do jogador contém um monstro
 */
function verificarEscolha(escolha) {
    const portalSelecionada = escolha - 1; // Convertendo para índice do array
    
    if (monstrosLocalizacoes[portalSelecionada]) {
        // Encontrou um monstro!
        console.clear();
        console.log(colors.red('\n╔════════════════════════════════════╗'));
        console.log(colors.red('║     VOCÊ ENCONTROU UM MONSTRO!     ║'));
        console.log(colors.red('╚════════════════════════════════════╝\n'));
        
        console.log(colors.red('👹 Você encontrou um monstro!'));
        console.log(colors.red('💔 Você perdeu uma vida.'));
        console.log(colors.red('🔄 Voltando para a Fase 1...\n'));
        
        vidas--;
        
        // Verificar se o jogador perdeu o jogo
        if (vidas <= 0) {
            mostrarDerrota();
            return;
        }
        
        prompt(colors.yellow('Pressione ENTER para continuar...'));
        
        // Resetar para fase 1
        faseAtual = 1;
        gerarMonstros(); // Gerar novos monstros
        jogarFase();
    } else {
        // Porta segura!
        console.clear();
        console.log(colors.green('\n╔════════════════════════════════════╗'));
        console.log(colors.green('║   PARABÉNS, VOCÊ PASSOU DE FASE!  ║'));
        console.log(colors.green('╚════════════════════════════════════╝\n'));
        
        faseAtual++;
        
        if (faseAtual <= 5) {
            console.log(colors.green('✅ Porta segura encontrada!'));
            console.log(colors.green('🎉 Você avançou para a próxima fase!\n'));
            prompt(colors.yellow('Pressione ENTER para continuar...'));
            jogarFase();
        } else {
            mostrarVitoriaDificuldade();
        }
    }
}

/**
 * Mostra a mensagem de vitória da dificuldade
 */
function mostrarVitoriaDificuldade() {
    console.clear();
    console.log(colors.green('\n╔════════════════════════════════════╗'));
    console.log(colors.green('║     🎉 VOCÊ CONSEGUIU! 🎉          ║'));
    console.log(colors.green('╚════════════════════════════════════╝\n'));
    
    if (dificuldadeAtual === 'facil') {
        console.log(colors.green('Você conseguiu sobreviver ao modo FÁCIL!'));
        console.log(colors.yellow('Mas será capaz de vencer o modo INTERMEDIÁRIO?\n'));
    } else if (dificuldadeAtual === 'intermediario') {
        console.log(colors.green('Você conseguiu sobreviver ao modo INTERMEDIÁRIO!'));
        console.log(colors.yellow('Mas será capaz de vencer o modo DIFÍCIL?\n'));
    } else if (dificuldadeAtual === 'dificil') {
        console.log(colors.green('╔════════════════════════════════════╗'));
        console.log(colors.green('║     VOCÊ ZEROU O GAME! 🏆          ║'));
        console.log(colors.green('║  Você é um(a) verdadeiro(a) ALPHA! ║'));
        console.log(colors.green('╚════════════════════════════════════╝\n'));
    }
    
    prompt(colors.yellow('Pressione ENTER para voltar ao menu...'));
    menu();
}

/**
 * Mostra a mensagem de derrota
 */
function mostrarDerrota() {
    console.clear();
    console.log(colors.red('\n╔════════════════════════════════════╗'));
    console.log(colors.red('║          VOCÊ PERDEU! 💀           ║'));
    console.log(colors.red('╚════════════════════════════════════╝\n'));
    
    console.log(colors.red('Suas vidas acabaram no labirinto...'));
    console.log(colors.yellow('Mas você pode tentar novamente!\n'));
    
    prompt(colors.yellow('Pressione ENTER para voltar ao menu...'));
    menu();
}

// ===================== INICIALIZAR O JOGO =====================

menu();