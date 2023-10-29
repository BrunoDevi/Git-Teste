let listaNumerosSorteados = [];
let  numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function mensagemInicial(){
  exibirTexto('h1', 'Bem vindo ao jogo do número secreto!');
  exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

function gerarNumeroAleatorio(){
  let numeroAleatorioEscolhido = parseInt(Math.random() * numeroLimite + 1);
  if(listaNumerosSorteados.length == numeroLimite){
    listaNumerosSorteados = [];
  }
  console.log(listaNumerosSorteados);
  if(listaNumerosSorteados.includes(numeroAleatorioEscolhido)){
    return gerarNumeroAleatorio();
  }else{
    listaNumerosSorteados.push(numeroAleatorioEscolhido);
    return numeroAleatorioEscolhido;
  }
} 

function verificarChute(){
  let chute = document.querySelector('input').value;
  console.log(numeroSecreto);

  if(chute == numeroSecreto){  
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    exibirTexto('p', `Você acertou o Numero Secreto com (${tentativas}) ${palavraTentativa}.`);
    document.getElementById('reiniciar').removeAttribute('disabled');
    limparCampo();
  }else{
    if(chute > numeroSecreto){
      exibirTexto('p', `Errado! o numero secreto é menor que ${chute}.`);
    }else{
      exibirTexto('p', `Errado! o numero secreto é maior que ${chute}.`);
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  limparCampo();
  mensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}