//módulo do Node.js que fornece uma interface para ler dados.
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function realizaOperação(M, notas) {
  notasOrdenadas = [...notas];
  notasOrdenadas.sort((a, b) => b - a);

  let resposta = notas.reduce(
    (acumulador, valor, indice) =>
      notas[indice] === notasOrdenadas[indice] ? acumulador + 1 : acumulador,
    0
  );
  console.log(resposta);
}

//Função para leitura e tratamento dos dados.
rl.question("Digite o número de casos de teste: ", (numCasosTeste) => {
  let casosTeste = parseInt(numCasosTeste);
  function processarProximoCaso() {
    if (casosTeste > 0) {
      rl.question("\nDigite a quantidade de alunos: ", (alunos) => {
        let M = parseInt(alunos);
        rl.question(
          `Digite as notas dos ${M} alunos, (De 1 a 1000):\n(exemplo de input: ${"100 ".repeat(
            M
          )}):\n`,
          (P) => {
            let notas = P.trim().split(" ").map(Number);
            //Valida Input das Notas,se está entre 1 e 1000 e se possui todas as notas necessarias.
            numValido = notas.reduce(
              (acc, value) =>
                value < 0 || value > 1000 ? (acc = true) : (acc = false),
              0
            );
            if (notas.length !== M || numValido) {
              console.log(
                "  Input de notas errado.\n  Começe o caso de teste novamente."
              );
              processarProximoCaso();
              return;
            }
            realizaOperação(M, notas);
            casosTeste -= 1;
            processarProximoCaso();
          }
        );
      });
    } else rl.close();
  }
  processarProximoCaso();
});
