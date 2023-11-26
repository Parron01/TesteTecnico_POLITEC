//módulo do Node.js que fornece uma interface para ler dados.
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function criaPilha(n, pilha) {
  for (let i = n; i > 0; i--) pilha.push(i);
  return pilha;
}

function jogaCartasFora(n) {
  let pilha = [];
  let descartadas = [];
  let remanescente;

  pilha = criaPilha(n, pilha);

  while (pilha.length > 1) {
    descartadas.push(pilha.pop());
    let aux = pilha.pop();
    pilha.unshift(aux);
  }
  remanescente = pilha[0];
  descartadas = descartadas.join(`, `);

  console.log(descartadas);
  console.log(remanescente);
}

//Função para leitura e tratamento dos dados.
rl.question("Digite o número de casos de teste: ", (numCasosTeste) => {
  let casosTeste = parseInt(numCasosTeste);
  function processarProximoCaso() {
    if (casosTeste > 0) {
      rl.question(
        "\nDigite o tamanho N da pilha para o próximo caso. [n <=50]: \n",
        (valorN) => {
          valorN = parseInt(valorN);
          //Valida valor de N
          if (valorN < 0 || valorN > 50) {
            console.log("Valor de N inválido.");
            processarProximoCaso();
            return;
          }

          jogaCartasFora(valorN);
          casosTeste -= 1;
          processarProximoCaso();
        }
      );
    } else rl.close();
  }
  processarProximoCaso();
});
