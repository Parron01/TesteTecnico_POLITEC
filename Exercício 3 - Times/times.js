//módulo do Node.js que fornece uma interface para ler dados.
const readline = require("readline");
const { normalizePath } = require("vite");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Função Construtora PRINCIPAL
function FormacaoTimes() {
  this.jogadores = [];
  this.times = [];

  this.listarTimes = async () => {
    const numTimes = await this.lerDados();
    this.criarTimes(numTimes);
    rl.close();
  };

  this.inicializaTime = (numeroDeTimes) => {
    const times = Array.from({ length: numeroDeTimes }, () => ({
      nome: "",
      membros: [],
    }));
    for (let i = 0; i < times.length; i++) {
      times[i].nome = `Time ${i + 1}`;
    }
    return times;
  };

  this.selecionaJogadores = (jogadoresOrdenados, times, numeroDeTimes) => {
    for (let i = 0; i < jogadoresOrdenados.length; i++) {
      const jogador = jogadoresOrdenados[i];
      const timeAtual = times[i % numeroDeTimes];

      timeAtual.membros.push(jogador.nome);
    }
    return times;
  };

  this.validaAlunosTimes = (alunos, times) => {
    if (!(times <= alunos)) {
      return false;
    } else if (alunos < 2 || alunos > 10000 || times < 2 || times > 1000) {
      return false;
    }
    return true;
  };

  this.validaJogador = (habilidade) => habilidade >= 0 && habilidade <= 1000000;

  this.criaJogador = (nome, habilidade) => ({
    nome: nome,
    habilidade: habilidade,
  });

  this.lerJogadores = () => {
    return new Promise((resolve) => {
      rl.question(
        "Digite o Nome do jogador e o Nivel de Habilidade:\nExemplo de input = (Joao 3000):\n",
        (dados) => {
          dados = dados.split(" ");
          const nome = dados[0].toLowerCase();
          const habilidade = Number(dados[1]);
          if (this.validaJogador(habilidade)) {
            let aux = this.criaJogador(nome, habilidade);
            this.jogadores.push(aux);
            resolve();
          }
        }
      );
    });
  };

  this.lerDados = async () => {
    return new Promise((resolve) => {
      rl.question(
        "Digite a quantidade de alunos e o número de times respectivamente:\nExemplo de input = (500 30): \n",
        (dados) => {
          dados = dados.split(" ");
          const alunos = Number(dados[0]);
          const times = Number(dados[1]);
          if (!this.validaAlunosTimes(alunos, times)) {
            console.log("Dados inválidos. Tente novamente.");
            this.lerDados();
            return;
          }

          const loopAsync = async () => {
            for (let i = 0; i < alunos; i++) {
              await this.lerJogadores();
            }
            resolve(times);
          };
          loopAsync();
        }
      );
    });
  };
  this.criarTimes = (numeroDeTimes) => {
    // Ordena os jogadores por habilidade e, em caso de empate, por nome
    const jogadoresOrdenados = this.jogadores.sort((a, b) => {
      if (a.habilidade !== b.habilidade) return b.habilidade - a.habilidade;
    });

    let times = this.inicializaTime(numeroDeTimes);
    times = this.selecionaJogadores(jogadoresOrdenados, times, numeroDeTimes);

    // Ordena os membros por nome
    times.forEach((time) => {
      time.membros.sort((a, b) => a.localeCompare(b));
    });
    //Impressao dos resultados finais
    times.forEach((time) => {
      console.log(`\n${time.nome}:`);
      time.membros.forEach((membro) => {
        console.log(`  ${membro}`);
      });
    });
    console.log(); //apenas para pular uma linha no final da impressao
  };
} //FIM FUNÇÃO CONSTRUTORA

//Criação do objeto que será executado no escopo principal do codigo
const formarTimes = new FormacaoTimes();
formarTimes.listarTimes();
