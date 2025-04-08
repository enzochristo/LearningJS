// usar await quando eu tenho uma promise, então vou usar em todas as funções que forem assíncronas, uma vez que o await irá me responder quando o await for aceito.

/*
axios
.get("https://catfact.ninja/fact")
.then((response) => console.log(response.data.fact));
*/

import axios from "axios";

 
const get_token  = ()  => {
  return axios
  .post('https://servidor-exercicios-js.vercel.app/token', {username: 'enzosc1'}, {headers:{'Content-Type':"application/json","Accept":"application/json"}})
  .then((response) =>  response.data.accessToken); 
}

export {get_token}

const get_exercise =  ( token ) => {
  return axios
  .get('https://servidor-exercicios-js.vercel.app/exercicio', {headers: {'Content-Type':"application/json", "Accept":"application/json", "Authorization":`Bearer ${token}`}})
  .then((response) => response.data)
}

const get_values = (dicionario, nome) => {
  for(let key in dicionario){
    if (key == nome){
      const valores_listados = Object.values(dicionario[nome].entrada); // dessa forma ele ja me retorna os valores em uma lista
      return valores_listados;
    }
  }
  // const valores_espalhados = (...valores_listados)
}

const send_request = (name, answer, token) => { 

  const url = `https://servidor-exercicios-js.vercel.app/exercicio/${name}`
  fetch(url,
    {method:"POST",
      headers: {'Content-Type':"application/json", "Accept":"application/json", "Authorization":`Bearer ${token}`},
      body:JSON.stringify({ resposta: answer })
      
    }
  ).then((response) => response.json())
  .then((resp) => console.log(`${name}:`,resp.sucesso));
}

const soma = function(a,b) {
  console.log(a+b)
  return a+b;
}

const tamanho_string  = (string) => {
  console.log(string.lenght)
  return string.length;
}

const nome_do_usuario = (email) => {
 let lista =  email.split("@");
 return lista[0]
}

const jaca_wars = (v,theta) => {
  let g = 9.8
  let rad = (Math.PI/180)* theta
  let d = v**2 *Math.sin(2*rad)/g;

  if (Math.abs(100-d)<=2){
    return 0;
  }
  else if (d>100){
    return 1;
  }
  else{
    return -1;
  }

}

const eh_bissexto = (ano) => {
  return (ano % 4 === 0) && ((ano % 100 !== 0) || (ano % 400 === 0));
}

const volume_pizza = (z,a)=>{
  const Ab = Math.PI*z**2;
  return Math.round(Ab*a);
}

const mru = (s0,v,t) =>{
  return s0 + v*t
}

const inverte_string = (string) => {
  let s = ""
  
  for (let i = string.length - 1; i>=0; i--){
    s += string[i];
  } 
  return s;
}

const soma_valores = (objeto) => {
   let soma = 0;
  for(let val of Object.values(objeto)){
    soma+=val;
  }
  return soma;
}


const eh_primo = (numero)=>{
  let contador = 2;
  if (numero<=1){
    return false;
  }
  while (numero > contador){
    if (numero%contador==0){
      return false;
    }
    contador++;
  }
  return true;
}


const n_esimo_primo =  (numero)=>{  
  const continuar = true;
  let contador = 0;
  let nesimo = 0;

  while(nesimo < numero){
    if (eh_primo(contador)){
      nesimo +=1;
    }
    contador++;
  }
  return contador-1;
}




function maior_prefixo_comum(lista){
  let maiorPrefixo = " ";

  for (let i = 0; i < lista.length; i++) {
    const palavra = lista[i];
  
    for (let j = 1; j <= palavra.length; j++) {
      const prefixo = palavra.slice(0, j);
      let contador = 0;
  
      for (let k = 0; k < lista.length; k++) {
        if (lista[k].startsWith(prefixo)) {
          contador++;
        }
      }
  
      if (contador >= 2 && prefixo.length > maiorPrefixo.length) {
        maiorPrefixo = prefixo;
      }
    }
  }
  
  return maiorPrefixo;
  
  
}


const soma_segundo = (lista)=>{
  let maior = Math.max(...lista);
  let menor = Math.min(...lista);
  lista.splice(lista.indexOf(maior),1);
  lista.splice(lista.indexOf(menor),1);
  let segundo_maior = Math.max(...lista);
  let segundo_menor = Math.min(...lista) ;

  return segundo_maior + segundo_menor;

}


const conta_palindromos = (lista) => {
  let contador = 0;
  for (let elemento of lista){
    let palindromo ="";
    for (let i=elemento.toString().length -1 ; i>=0;i--){
       palindromo += elemento.toString()[i];

    }
    if (elemento.toString() === palindromo){
      contador++;

    }
  }
  return contador;
}


const soma_strings = (lista)=>{
  let v_inicial = 0;
  let soma = lista.map(str => parseInt(str))
  .reduce(
    (acumulador,valor_Atual) => acumulador+valor_Atual, v_inicial,
  );
  return soma;
}

const get_number = async (url) => {
  let token = await get_token();
  let result  = await axios.get(url,
    {
      headers: {'Content-Type':"application/json", "Accept":"application/json", "Authorization":`Bearer ${token}`}
    }
  );
  let numb;
  if (result.ok){
    numb = await result.json();
  }

  else{
    const erro = await result.text();
    console.error(erro);
  }
  return numb;

}

// Como tem uma promise, preciso fazer com que ele espere o resultado da promise. ENTÃO:
// Tanto quem está fazendo uso da promise quanto quem está chamando a promise, tem que usar algo que espere ela concluir,
// Caso contrario, será apenas uma promise em espera e não o valor de interesse. 
// Aqui estou esperando a promise ser resolvida e ao fazer isso(passará pelo then) e assim irá printar.
// get_number('http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/djjdm').then((res) => console.log(`Aqui está o valor:${res}`)); 

const soma_requisicoes = async (lista)=>{
  let valor_inicial = 0;
  let l_valores = await Promise.all(lista.map((url) => get_number(url)));
  l_valores.reduce(
    (acc,v_atual) => acc+v_atual,valor_inicial,
  );

  return soma;
     
  }


  


  // console.log(soma_requisicoes([
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/djjdm',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/knowh',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/lhbij',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/jogdr',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/dgkpq',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/wnbwd',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/itldu',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/nfnxo',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/feccn',
  //   'http://servidor-exercicios-js.vercel.app/exercicio/soma-com-requisicoes/tvkwn'
  // ]))


  const caca_tesouro = async (url) => {
    let token = await get_token();
    const resp = await axios.get(url,{
      headers: {'Content-Type':"application/json", "Accept":"application/json", "Authorization":`Bearer ${token}`}
    }
    );
    const caca = resp.json();
    return caca;
    
  }

  caca_tesouro("http://servidor-exercicios-js.vercel.app/exercicio/caca-ao-tesouro/exooq").then((resp)=> console.log(resp));







const main =  async (params) => {

  const token = await get_token()
  const exercises = await get_exercise(token)

  for (let nome of Object.keys(exercises)){

    const values = await get_values(exercises,nome);

    const funcao = function_names[nome];
    if (funcao){
      const resposta = funcao(...values);
      send_request(nome, resposta, token); 
    }
  
    console.log(...values)
  }
  
  }
  
  

  // console.log(token)
  // console.log(exercises)



main()


const function_names = {
  "soma":soma,
  "tamanho-string":tamanho_string,
  "nome-do-usuario":nome_do_usuario,
  "jaca-wars":jaca_wars,
  "ano-bissexto":eh_bissexto,
  "volume-da-pizza":volume_pizza,
  "mru":mru,
  "inverte-string":inverte_string,
  "soma-valores":soma_valores,
  "n-esimo-primo":n_esimo_primo,
  "maior-prefixo-comum":maior_prefixo_comum,
  "soma-segundo-maior-e-menor-numeros":soma_segundo,
  "conta-palindromos": conta_palindromos,
  "soma-de-strings-de-ints":soma_strings,
  "soma-com-requisicoes":soma_requisicoes,
  "caca-ao-tesouro":caca_tesouro
}