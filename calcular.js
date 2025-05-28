let velocidades = [];
let horasEntrada = [];
let horasSaida = [];
let valoresTotais = [];

function radar() {
  const placaV = document.getElementById("placa").value;
  const horaEntrada = document.getElementById("horaI").value;
  const horaSaida = document.getElementById("horaS").value;
  let message = "";

  if (!placa || !horaEntrada || !horaSaida) {
    resultado.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  const valor = 20;
  const distancia = 120;
  let desconto = 0;

  const entradaDecimal = horaParaDecimal(horaEntrada);
  const saidaDecimal = horaParaDecimal(horaSaida);

  let tempo = saidaDecimal - entradaDecimal;
  if (tempo < 0) {
    resultado.textContent =
      "Horário de saída não pode ser menor que o de entrada.";
    return;
  }

  let velocidade = distancia / tempo;

  if (velocidade <= 60) {
    desconto = 0.85;
  } else if (velocidade > 60 && velocidade <= 100) {
    desconto = 0.9;
  } else {
    desconto = 1;
  }

  let valorTotal = valor * desconto;

  velocidades.push(velocidade);
  horasEntrada.push(horaEntrada);
  horasSaida.push(horaSaida);
  valoresTotais.push(valorTotal);

  document.getElementById(
    "resultado"
  ).textContent = `Velocidade: ${velocidade.toFixed(
    2
  )} km/h | Valor cobrado: R$ ${valorTotal.toFixed(2)}`;
}

function encerrar() {
  if (velocidades.length === 0) {
    document.getElementById("resultado").textContent =
      "Nenhum dado registrado.";
    return;
  }

  const menorVelocidade = Math.min(...velocidades);
  const maiorVelocidade = Math.max(...velocidades);
  const somaVelocidades = velocidades.reduce((acc, val) => acc + val, 0);
  const mediaVelocidade = somaVelocidades / velocidades.length;

  const totalValores = valoresTotais.reduce((acc, val) => acc + val, 0);

  const inicioProcesso = horasEntrada[0];
  const finalProcesso = horasSaida[horasSaida.length - 1];

  document.getElementById("resultado").innerHTML = `
          <strong>Resumo do Processamento:</strong><br>
          ✅ Menor velocidade registrada: ${menorVelocidade.toFixed(2)} km/h<br>
          ✅ Maior velocidade registrada: ${maiorVelocidade.toFixed(2)} km/h<br>
          ✅ Média das velocidades: ${mediaVelocidade.toFixed(2)} km/h<br>
          💰 Total arrecadado: R$ ${totalValores.toFixed(2)}<br>
          🕐 Início do processamento: ${inicioProcesso}<br>
          🕓 Final do processamento: ${finalProcesso}`;
  velocidades = [];
  horasEntrada = [];
  horasSaida = [];
  valoresTotais = [];
}

function horaParaDecimal(horaStr) {
  const [h, m] = horaStr.split(":").map(Number);
  return h + m / 60;
}
