//-------------------EVENTOS---------------------

function ResetFotoEvento(){
  localStorage.removeItem("FotoEvento");
}

//CRIAR EVENTOS
function registarEvento() {

  // Obtém os valores dos campos do formulário
  let nome = document.getElementById("NomeEvento").value;
  let artista = document.getElementById("ArtistaEvento").value;
  let tipo = document.getElementById("TipoEvento").value;
  let colaboradores = document.getElementById("ColaboradoresEvento").value;
  let data = document.getElementById("DuracaoEvento").value;
  let horario = document.getElementById("HorarioEvento").value;
  let local = document.getElementById("LocalEvento").value;
  let materiais = document.getElementById("MateriaisEvento").value;
  let descricao = document.getElementById("DescricaoEvento").value;
  let comentario = document.getElementById("ComentarioArtistaEvento").value;
  let breve = document.getElementById("BreveDescricaoEvento").value;

  // Cria um objeto com as informações do evento
  const evento = {
    nome: nome,
    artista: artista,
    tipo: tipo,
    colaboradores: colaboradores,
    data: data,
    horario: horario,
    local: local,
    materiais: materiais,
    descricao: descricao,
    comentario: comentario,
    breve: breve,
    url: localStorage.getItem("FotoEvento")
  };

  let eventos;

  if (localStorage.getItem("eventos")) {
    // Se o array já existir no localStorage, recupera-o
    eventos = JSON.parse(localStorage.getItem("eventos"));
  } else {
    // Se o array não existir no localStorage, inicializa-o com um array vazio
    eventos = [];
  }

  // Adiciona o objeto "evento" ao array "eventos"
  eventos.push(evento);

  // Armazena o array "eventos" no localStorage
  localStorage.setItem("eventos", JSON.stringify(eventos));

  alert("O registo foi feito com sucesso!");
  document.getElementById("formEventos").reset();
  localStorage.removeItem("FotoEvento");
  ResetFotoEvento();
}

function CarregarEvento() {
  let tabela = document.getElementById("tbbodyEvento");

// Obtém o array de funcionários armazenado no localStorage
  let eventosLocalStorage = JSON.parse(localStorage.getItem("eventos"));

  // Loop através do array de funcionários e adiciona-os à tabela
  eventosLocalStorage.forEach(function(evento, index) {
    // Cria uma nova linha na tabela
    let novaLinha = tabela.insertRow(-1);

    // Preenche as células da linha com as informações do funcionário
    novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
    novaLinha.insertCell(1).innerHTML = evento.nome;
    novaLinha.insertCell(2).innerHTML = evento.artista;
    novaLinha.insertCell(3).innerHTML = evento.data;
    novaLinha.insertCell(4).innerHTML = evento.local;
    
    // Cria uma célula para o estado do evento com o estilo correspondente
    let estadoCell = novaLinha.insertCell(5);
    let estadoSpan = document.createElement("span");
    estadoSpan.style.fontSize = "14px";
    estadoSpan.style.display = "flex";
    estadoSpan.style.flexDirection = "column";
    estadoSpan.style.alignItems = "center";

    // Define o texto e a classe de estilo com base no estado do evento
    switch (evento.estado) {
      case "Aprovado":
        estadoSpan.textContent = "Aprovado";
        estadoSpan.classList.add("badge", "badge-pill", "badge-success");
        break;
      case "Reprovado":
        estadoSpan.textContent = "Reprovado";
        estadoSpan.classList.add("badge", "badge-pill", "badge-danger");
        break;
      default:
        estadoSpan.textContent = "Pendente";
        estadoSpan.classList.add("badge", "badge-pill", "badge-secondary");
    }

    // Adiciona o elemento de estado à célula da tabela
    estadoCell.appendChild(estadoSpan);

    let botoes = novaLinha.insertCell(6);
    botoes.style.display = "flex";
    botoes.style.gap = "5px";

    
      let botaoEditarEvento = document.createElement("button");
      botaoEditarEvento.classList.add("btn-edit");
      botaoEditarEvento.style.borderRadius = "50%";
      botaoEditarEvento.innerHTML = "<i class='fas fa-edit'></i>";
      botoes.appendChild(botaoEditarEvento);

    botaoEditarEvento.addEventListener("click", function() {
      window.location.href = `Gerir_Evento.html?index=${index}`;
    });

      let botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn-remove");
      botaoRemover.style.borderRadius = "50%";
      botaoRemover.innerHTML = "<i class='fas fa-trash'></i>";
      botoes.appendChild(botaoRemover);

    botaoRemover.addEventListener("click", function() {

      // Remove o funcionário do array
      eventosLocalStorage.splice(index, 1);

      tabela.deleteRow(novaLinha.rowIndex - 1);
      // Atualiza o localStorage com o novo array de funcionários
      localStorage.setItem("eventos", JSON.stringify(eventosLocalStorage));
    });
});
};

function CarregarGerirEvento() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let index = urlParams.get('index');

  const eventosLocalStorage = JSON.parse(localStorage.getItem('eventos'));
  const evento = eventosLocalStorage[index];

  document.getElementById('EditarNomeEvento').value = evento.nome;
  document.getElementById('EditarArtista').value = evento.artista;
  document.getElementById('EditarTipoEvento').value = evento.tipo;
  document.getElementById('EditarDuracaoEvento').value = evento.data;
  document.getElementById('EditarHorarioEvento').value = evento.horario;
  document.getElementById('EditarLocalEvento').value = evento.local;
  document.getElementById('EditarMateriaisNecessarios').value = evento.materiais;
  document.getElementById('EditarDescEventoAtividades').value = evento.descricao;
  document.getElementById('EditarComtArtista').value = evento.comentario;
  document.getElementById('EditarBreveDescricaoEvento').value = evento.breve;
  document.getElementById('EditarColaboradoresNecessarios').value = evento.colaboradores;
  document.getElementById('EditarGestorTerreno').value = evento.gestorTerreno;
  document.getElementById('EditarRisco').value = evento.risco;
  document.getElementById('EditarEstado').value = evento.estado;
  document.getElementById('EditarCustoEvento').value = evento.custo;

  // Calcular a soma das doações para este evento
  let doacoesLocalStorage = JSON.parse(localStorage.getItem('doacoes')) || [];
  const totalDoacoes = doacoesLocalStorage
      .filter(doacao => doacao.evento_doacao === evento.nome)
      .reduce((total, doacao) => total + parseFloat(doacao.valor_doacao.replace(',', '.')), 0)
      .toFixed(2); // Arredonda para duas casas decimais

  document.getElementById('EditarValorDoacoes').value = totalDoacoes;

  let btnEditar = document.getElementById("guardarAltEvento");

  btnEditar.addEventListener("click", function() {
      evento.nome = document.getElementById('EditarNomeEvento').value;
      evento.artista = document.getElementById('EditarArtista').value;
      evento.tipo = document.getElementById('EditarTipoEvento').value;
      evento.data = document.getElementById('EditarDuracaoEvento').value;
      evento.horario = document.getElementById('EditarHorarioEvento').value;
      evento.local = document.getElementById('EditarLocalEvento').value;
      evento.materiais = document.getElementById('EditarMateriaisNecessarios').value;
      evento.descricao = document.getElementById('EditarDescEventoAtividades').value;
      evento.comentario = document.getElementById('EditarComtArtista').value;
      evento.breve = document.getElementById('EditarBreveDescricaoEvento').value;
      evento.colaboradores = document.getElementById('EditarColaboradoresNecessarios').value;
      evento.gestorTerreno = document.getElementById('EditarGestorTerreno').value;
      evento.risco = document.getElementById('EditarRisco').value;
      evento.estado = document.getElementById('EditarEstado').value;
      evento.custo = document.getElementById('EditarCustoEvento').value;

      localStorage.setItem('eventos', JSON.stringify(eventosLocalStorage));
      alert("Os dados do evento foram alterados com sucesso!");
      window.location.href = `Listar_Evento.html`;
  });
}

//-------------------LOCAIS---------------------

function ResetFotoLocal(){
  localStorage.removeItem("FotoLocal")
}

//CRIAR LOCAIS
function registarLocal() {

  // Obtém os valores dos campos do formulário
  let nome = document.getElementById("NameLocal").value;
  let lugares = document.getElementById("LotMaxLocal").value;
  let morada = document.getElementById("MoradaLocal").value;
  let localidade = document.getElementById("LocalidadeLocal").value;
  let tipo = document.getElementById("TipoLocal").value;
  let desc_sala = document.getElementById("DescricaoLocal").value;


  // Cria um objeto com as informações do funcionário
  const local = {
    nome: nome,
    lugares: lugares,
    morada:morada,
    localidade:localidade,
    tipo:tipo,
    desc_sala:desc_sala,
    url:localStorage.getItem("FotoLocal")
  };

  if (localStorage.getItem("locais")) {
    // Se o array já existir no localStorage, recupera-o
    locais = JSON.parse(localStorage.getItem("locais"));
  } else {
    // Se o array não existir no localStorage, inicializa-o com um array vazio
    locais = [];
  }

  // Adiciona o objeto "local" ao array "locais"
  locais.push(local);

  // Armazena o array "locais" no localStorage
  localStorage.setItem("locais", JSON.stringify(locais));

  alert("O registo foi feito com sucesso!");
  document.getElementById("formLocal").reset();
  localStorage.removeItem("FotoLocal");
  ResetFotoLocal();
};

function CarregarLocais() {
  let tabela = document.getElementById("tbbodyLocal");

// Obtém o array de funcionários armazenado no localStorage
  let locaisLocalStorage = JSON.parse(localStorage.getItem("locais"));

  // Loop através do array de funcionários e adiciona-os à tabela
  locaisLocalStorage.forEach(function(local, index) {
    // Cria uma nova linha na tabela
    let novaLinha = tabela.insertRow(-1);

    // Preenche as células da linha com as informações do funcionário
    novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
    novaLinha.insertCell(1).innerHTML = local.nome;
    novaLinha.insertCell(2).innerHTML = local.morada + " - " + local.localidade;
    novaLinha.insertCell(3).innerHTML = local.lugares;
    novaLinha.insertCell(4).innerHTML = local.tipo;

    let botoes = novaLinha.insertCell(5);
    botoes.style.display = "flex";
    botoes.style.gap = "5px";

    
      let botaoEditarLocal = document.createElement("button");
      botaoEditarLocal.classList.add("btn-edit");
      botaoEditarLocal.style.borderRadius = "50%";
      botaoEditarLocal.innerHTML = "<i class='fas fa-edit'></i>";
      botoes.appendChild(botaoEditarLocal);

    botaoEditarLocal.addEventListener("click", function() {
      window.location.href = `Editar_Locais.html?index=${index}`;
    });

      let botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn-remove");
      botaoRemover.style.borderRadius = "50%";
      botaoRemover.innerHTML = "<i class='fas fa-trash'></i>";
      botoes.appendChild(botaoRemover);

    botaoRemover.addEventListener("click", function() {

      // Remove o funcionário do array
      locaisLocalStorage.splice(index, 1);

      tabela.deleteRow(novaLinha.rowIndex - 1);
      // Atualiza o localStorage com o novo array de funcionários
      localStorage.setItem("locais", JSON.stringify(locaisLocalStorage));
    });
});
};

function CarregarEditarLocal() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let index = urlParams.get('index');

  const locaisLocalStorage = JSON.parse(localStorage.getItem('locais'));
  const local = locaisLocalStorage[index];

  document.getElementById('EditNameLocal').value = local.nome;
  document.getElementById('EditLotMaxLocal').value = local.lugares;
  document.getElementById('EditMoradaLocal').value = local.morada;
  document.getElementById('EditLocalidadeLocal').value = local.localidade;
  document.getElementById('EditTipoLocal').value = local.tipo;
  document.getElementById('EditDescricaoLocal').value = local.desc_sala;
  
  let btnEditar = document.getElementById("guardarAltLocal");

  btnEditar.addEventListener("click", function() {

    local.nome = document.getElementById('EditNameLocal').value;
    local.lugares = document.getElementById('EditLotMaxLocal').value;
    local.morada = document.getElementById('EditMoradaLocal').value;
    local.localidade = document.getElementById('EditLocalidadeLocal').value;
    local.tipo = document.getElementById('EditTipoLocal').value;
    local.desc_sala = document.getElementById('EditDescricaoLocal').value;    

    // Save the updated locais data to localStorage
    localStorage.setItem('locais', JSON.stringify(locaisLocalStorage));
    alert("Os dados do local foram alterados com sucesso!");
    // Redirect back to the locais list page
    window.location.href = `Listar_Locais.html`;
  });
};
//----------------MATERIAIS----------------------

//CRIAR MATERIAIS
function registarMaterial() {

  // Obtém os valores dos campos do formulário
  let nome = document.getElementById("NomeMaterial").value;
  let custo = document.getElementById("CustoMaterial").value;
  let aluguer = document.getElementById("AluguerMaterial").value;
  let descricao = document.getElementById("DescricaoMaterial").value;
  let tipo = document.getElementById("TipoMaterial").value;
  let artigos = document.getElementById("NumeroArtigosMaterial").value;


  // Cria um objeto com as informações do funcionário
  const material = {
    nome: nome,
    custo: custo,
    aluguer: aluguer,
    descricao: descricao,
    tipo: tipo,
    artigos: artigos
  };

  if (localStorage.getItem("materiais")) {
    // Se o array já existir no localStorage, recupera-o
    materiais = JSON.parse(localStorage.getItem("materiais"));
  } else {
    // Se o array não existir no localStorage, inicializa-o com um array vazio
    materiais = [];
  }

  // Adiciona o objeto "local" ao array "locais"
  materiais.push(material);

  // Armazena o array "locais" no localStorage
  localStorage.setItem("materiais", JSON.stringify(materiais));

  alert("O registo foi feito com sucesso!");
  document.getElementById("formMaterial").reset();
};

function CarregarMateriais() {
  let tabela = document.getElementById("tbbodyMaterial");

// Obtém o array de materiais armazenado no localStorage
  let materiaisLocalStorage = JSON.parse(localStorage.getItem("materiais"));

  // Loop através do array de materiais e adiciona-os à tabela
  materiaisLocalStorage.forEach(function(material, index) {
    // Cria uma nova linha na tabela
    let novaLinha = tabela.insertRow(-1);

    // Preenche as células da linha com as informações do material
    novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
    novaLinha.insertCell(1).innerHTML = material.nome;
    novaLinha.insertCell(2).innerHTML = material.custo;
    novaLinha.insertCell(3).innerHTML = material.aluguer;
    novaLinha.insertCell(4).innerHTML = material.tipo;

    let botoes = novaLinha.insertCell(5);
    botoes.style.display = "flex";
    botoes.style.gap = "5px";

    
      let botaoEditarMaterial = document.createElement("button");
      botaoEditarMaterial.classList.add("btn-edit");
      botaoEditarMaterial.style.borderRadius = "50%";
      botaoEditarMaterial.innerHTML = "<i class='fas fa-edit'></i>";
      botoes.appendChild(botaoEditarMaterial);

    botaoEditarMaterial.addEventListener("click", function() {
      window.location.href = `Editar_Materiais.html?index=${index}`;
    });

      let botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn-remove");
      botaoRemover.style.borderRadius = "50%";
      botaoRemover.innerHTML = "<i class='fas fa-trash'></i>";
      botoes.appendChild(botaoRemover);

    botaoRemover.addEventListener("click", function() {

      // Remove o material do array
      materiaisLocalStorage.splice(index, 1);

      tabela.deleteRow(novaLinha.rowIndex - 1);
      // Atualiza o localStorage com o novo array de materiais
      localStorage.setItem("materiais", JSON.stringify(materiaisLocalStorage));
    });
});
};

function CarregarEditarMaterial() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let index = urlParams.get('index');

  const materiaisLocalStorage = JSON.parse(localStorage.getItem('materiais'));
  const material = materiaisLocalStorage[index];

  document.getElementById('EditarNomeMaterial').value = material.nome;
  document.getElementById('EditarCustoMaterial').value = material.custo;
  document.getElementById('EditarAluguerMaterial').value = material.aluguer;
  document.getElementById('EditarDescricaoMaterial').value = material.descricao;
  document.getElementById('EditarTipoMaterial').value = material.tipo;
  document.getElementById('EditarNumeroArtigosMaterial').value = material.artigos;
  
  let btnEditar = document.getElementById("guardarAltMaterial");

  btnEditar.addEventListener("click", function() {

    material.nome = document.getElementById('EditarNomeMaterial').value;
    material.custo = document.getElementById('EditarCustoMaterial').value;
    material.aluguer = document.getElementById('EditarAluguerMaterial').value;
    material.descricao = document.getElementById('EditarDescricaoMaterial').value;
    material.tipo = document.getElementById('EditarTipoMaterial').value;
    material.artigos = document.getElementById('EditarNumeroArtigosMaterial').value;

    // Save the updated materiais data to localStorage
    localStorage.setItem('materiais', JSON.stringify(materiaisLocalStorage));
    alert("Os dados do material foram alterados com sucesso!");
    // Redirect back to the gerir materiais page
    window.location.href = `Gerir_Materiais.html`;
  });
};

//---------------COLABORADORES-------------------

function ResetFotoFunc(){
  localStorage.removeItem("FotoFunc")
}

// CRIAR COLABORADOR
function registarFunc() {

  // Obtém os valores dos campos do formulário
  let nome = document.getElementById("FirstNameFunc").value;
  let apelido = document.getElementById("LastNameFunc").value;
  let telefone = document.getElementById("TelefoneFunc").value;
  let email = document.getElementById("EmailFunc").value;
  let dataNasc = document.getElementById("DataNascFunc").value;
  let genero = document.getElementById("GeneroFunc").value;
  let tipo = document.getElementById("TipoColabFunc").value;


  // Cria um objeto com as informações do funcionário
  const funcionario = {
    nome: nome,
    apelido: apelido,
    telefone: telefone,
    email: email,
    dataNasc: dataNasc,
    genero: genero,
    tipo: tipo,
    url:localStorage.getItem("FotoFunc")
  };

  if (localStorage.getItem("funcionarios")) {
    // Se o array já existir no localStorage, recupera-o
    funcionarios = JSON.parse(localStorage.getItem("funcionarios"));
  } else {
    // Se o array não existir no localStorage, inicializa-o com um array vazio
    funcionarios = [];
  }

  // Adiciona o objeto "funcionario" ao array "funcionarios"
  funcionarios.push(funcionario);

  // Armazena o array "funcionarios" no localStorage
  localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

  alert("O registo foi feito com sucesso!");
  document.getElementById("formFuncionarios").reset();
  localStorage.removeItem("FotoFunc");
  ResetFotoFunc();
};

function CarregarFunc() {
  let tabela = document.getElementById("tbbodyFunc");

// Obtém o array de funcionários armazenado no localStorage
  let funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios"));

  // Loop através do array de funcionários e adiciona-os à tabela
  funcionariosLocalStorage.forEach(function(funcionario, index) {
    // Cria uma nova linha na tabela
    let novaLinha = tabela.insertRow(-1);

    // Preenche as células da linha com as informações do funcionário
    novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
    novaLinha.insertCell(1).innerHTML = funcionario.nome + " " + funcionario.apelido;
    novaLinha.insertCell(2).innerHTML = funcionario.telefone;
    novaLinha.insertCell(3).innerHTML = funcionario.email;
    novaLinha.insertCell(4).innerHTML = funcionario.dataNasc;
    novaLinha.insertCell(5).innerHTML = funcionario.genero;
    novaLinha.insertCell(6).innerHTML = funcionario.tipo;

    let botoes = novaLinha.insertCell(7);
    botoes.style.display = "flex";
    botoes.style.gap = "5px";

    
      let botaoEditar = document.createElement("button");
      botaoEditar.classList.add("btn-edit");
      botaoEditar.style.borderRadius = "50%";
      botaoEditar.innerHTML = "<i class='fas fa-edit'></i>";
      botoes.appendChild(botaoEditar);

    botaoEditar.addEventListener("click", function() {
      window.location.href = `Editar_Colaboradores.html?index=${index}`;
    });

      let botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn-remove");
      botaoRemover.style.borderRadius = "50%";
      botaoRemover.innerHTML = "<i class='fas fa-trash'></i>";
      botoes.appendChild(botaoRemover);

    botaoRemover.addEventListener("click", function() {

      // Remove o funcionário do array
      funcionariosLocalStorage.splice(index, 1);

      tabela.deleteRow(novaLinha.rowIndex - 1);
      // Atualiza o localStorage com o novo array de funcionários
      localStorage.setItem("funcionarios", JSON.stringify(funcionariosLocalStorage));
    });
});
};

function CarregarEditarFunc() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let index = urlParams.get('index');

  const funcionariosLocalStorage = JSON.parse(localStorage.getItem('funcionarios'));
  const funcionario = funcionariosLocalStorage[index];

  document.getElementById('EditFirstNameFunc').value = funcionario.nome;
  document.getElementById('EditLastNameFunc').value = funcionario.apelido;
  document.getElementById('EditTelefoneFunc').value = funcionario.telefone;
  document.getElementById('EditEmailFunc').value = funcionario.email;
  document.getElementById('EditDataNascFunc').value = funcionario.dataNasc;
  document.getElementById('EditGeneroFunc').value = funcionario.genero;
  document.getElementById('EditTipoColabFunc').value = funcionario.tipo;
  
  let btnEditarFunc = document.getElementById("guardarAlt");

  btnEditarFunc.addEventListener("click", function() {

    funcionario.nome = document.getElementById('EditFirstNameFunc').value;
    funcionario.apelido = document.getElementById('EditLastNameFunc').value;
    funcionario.telefone = document.getElementById('EditTelefoneFunc').value;
    funcionario.email = document.getElementById('EditEmailFunc').value;
    funcionario.dataNasc = document.getElementById('EditDataNascFunc').value;
    funcionario.genero = document.getElementById('EditGeneroFunc').value;
    funcionario.tipo = document.getElementById('EditTipoColabFunc').value;
    
    

    // Save the updated employee data to localStorage
    localStorage.setItem('funcionarios', JSON.stringify(funcionariosLocalStorage));
    alert("Os dados do funcionario foram alterados com sucesso!");
    // Redirect back to the employee list page
    window.location.href = `Listar_Colaboradores.html`;
  });
};

//----------------------------------------------DASHBOARD-------------------------------------------------

//CAIXAS DASHBOARD

function contarPropostas(){
  let data = JSON.parse(localStorage.getItem("propostas"))

  let propostas = document.querySelector('#caixaPropostas');
  propostas.innerHTML = data.length;
}

/*function contarDoacoes(){
let data = JSON.parse(localStorage.getItem("doacoes"))

let doacoes = document.querySelector('#caixaDoacoes');
doacoes.in*/

function somaDoacoes() {
  let doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];
  let total = 0;

  doacoes.forEach(function(doacao) {
      total += parseFloat(doacao.valor_doacao.replace(',', '.')); // Converte a string do valor para um número e adiciona ao total
  });

  let totalFormatado = total.toFixed(2).replace('.', ',') + '€'; // Formata o total com duas casas decimais e adiciona o símbolo do euro

  let caixaDoacoes = document.querySelector('#caixaDoacoes');
  caixaDoacoes.innerHTML = totalFormatado;
}


function contarColaboradores(){
let data = JSON.parse(localStorage.getItem("funcionarios"))

let funcionarios = document.querySelector('#caixaColaboradores');
funcionarios.innerHTML = data.length;
}

function contarMateriais(){
let data = JSON.parse(localStorage.getItem("materiais"))

let materiais = document.querySelector('#caixaMateriais');
materiais.innerHTML = data.length;
}

function contarLocais(){
let data = JSON.parse(localStorage.getItem("locais"))

let locais = document.querySelector('#caixaLocais');
locais.innerHTML = data.length;
}

function contarEventos(){
let data = JSON.parse(localStorage.getItem("eventos"))

let eventos = document.querySelector('#caixaEventos');
eventos.innerHTML = data.length;
}

function CarregarDashboard(){
contarPropostas();
somaDoacoes();
contarColaboradores();
contarMateriais();
contarLocais();
contarEventos();
}

//REGISTAR EVENTO - ASSOCIAR LOCAL, COLABORADORES, MATERIAIS
function CarregarSelects() {

  //----------------------LOCAIS---------------------------
    // Seleciona o elemento do select de locais
    let selectLocal = document.querySelector('#LocalEvento');
    console.log('Select de locais:', selectLocal);
  
    // Verifica se o elemento foi encontrado
    if (selectLocal) {
        // Busca os dados de locais do localStorage
        let dataLocal = JSON.parse(localStorage.getItem("locais"));
        let htmlLocal = '<option selected value="">Local</option>';
  
        // Cria as opções do select com base nos dados de locais
        dataLocal.forEach(function(local) {
            htmlLocal += `<option value="${local.nome}">${local.nome}</option>`;
        });
  
        // Define o HTML gerado no select de locais
        selectLocal.innerHTML = htmlLocal;
    } else {
        console.log('Elemento #LocalEvento não encontrado.');
    }
  
  //----------------------COLABORADORES---------------------------
    // Seleciona o elemento do select de funcionários
    let selectFunc = document.querySelector('#ColaboradoresEvento');
    console.log('Select de funcionários:', selectFunc);

    // Verifica se o elemento foi encontrado
    if (selectFunc) {
      // Busca os dados de funcionários do localStorage
      let dataFunc = JSON.parse(localStorage.getItem("funcionarios"));
      let htmlFunc = '';

      // Cria as opções do select com base nos dados de funcionários
      dataFunc.forEach(function(funcionario) {
          htmlFunc += `<option value="${funcionario.nome}">${funcionario.nome}</option>`;
      });

      // Define o HTML gerado no select de colaboradores
      selectFunc.innerHTML = htmlFunc;
    } else {
      console.log('Elemento #ColaboradoresEvento não encontrado.');
    }
  
  //----------------------MATERIAIS---------------------------
    // Seleciona o elemento do select de materiais
    let selectMat = document.querySelector('#MateriaisEvento');
    console.log('Select de materiais:', selectMat);

    // Verifica se o elemento foi encontrado
    if (selectMat) {
      // Busca os dados de materiais do localStorage
        let dataMat = JSON.parse(localStorage.getItem("materiais"));
        let htmlMat = '';

        // Cria as opções do select com base nos dados de materiais
        dataMat.forEach(function(material) {
            htmlMat += `<option value="${material.nome}">${material.nome}</option>`;
        });

        // Define o HTML gerado no select de materiais
        selectMat.innerHTML = htmlMat;
    } else {
      console.log('Elemento #MateriaisEvento não encontrado.');
    }
  }

  
//GERIR EVENTO - ASSOCIAR LOCAL, COLABORADORES, MATERIAIS
function CarregarSelectsGerir() {

  //----------------------LOCAIS---------------------------
    // Seleciona o elemento do select de locais
    let selectLocal = document.querySelector('#EditarLocalEvento');
    console.log('Select de locais:', selectLocal);
  
    // Verifica se o elemento foi encontrado
    if (selectLocal) {
        // Busca os dados de locais do localStorage
        let dataLocal = JSON.parse(localStorage.getItem("locais"));
        let htmlLocal = '<option selected value="">Local</option>';
  
        // Cria as opções do select com base nos dados de locais
        dataLocal.forEach(function(local) {
            htmlLocal += `<option value="${local.nome}">${local.nome}</option>`;
        });
  
        // Define o HTML gerado no select de locais
        selectLocal.innerHTML = htmlLocal;
    } else {
        console.log('Elemento #EditarLocalEvento não encontrado.');
    }
  
  //----------------------COLABORADORES---------------------------
    // Seleciona o elemento do select de funcionários
    let selectFunc = document.querySelector('#EditarColaboradoresNecessarios');
    console.log('Select de funcionários:', selectFunc);

    // Verifica se o elemento foi encontrado
    if (selectFunc) {
      // Busca os dados de funcionários do localStorage
      let dataFunc = JSON.parse(localStorage.getItem("funcionarios"));
      let htmlFunc = '';

      // Cria as opções do select com base nos dados de funcionários
      dataFunc.forEach(function(funcionario) {
          htmlFunc += `<option value="${funcionario.nome}">${funcionario.nome}</option>`;
      });

      // Define o HTML gerado no select de colaboradores
      selectFunc.innerHTML = htmlFunc;
    } else {
      console.log('Elemento #EditarColaboradoresNecessarios não encontrado.');
    }
 //----------------------GESTOR TERRENO---------------------------
    // Seleciona o elemento do select de funcionários
    let selectGestor = document.querySelector('#EditarGestorTerreno');
    console.log('Select de funcionários:', selectGestor);
  
    // Verifica se o elemento foi encontrado
    if (selectGestor) {
        // Busca os dados de funcionários do localStorage
        let dataGestor = JSON.parse(localStorage.getItem("funcionarios"));
        let htmlGestor = '<option selected disabled value="">Gestor no Terreno</option>';
  
        // Cria as opções do select com base nos dados de funcionários
        dataGestor.forEach(function(funcionario) {
            htmlGestor += `<option value="${funcionario.nome}">${funcionario.nome}</option>`;
        });
  
        // Define o HTML gerado no select de funcionários
        selectGestor.innerHTML = htmlGestor;
    } else {
        console.log('Elemento #EditarGestorTerreno não encontrado.');
    }
  //----------------------MATERIAIS---------------------------
    // Seleciona o elemento do select de materiais
    let selectMat = document.querySelector('#EditarMateriaisNecessarios');
    console.log('Select de materiais necessários:', selectMat);

    // Verifica se o elemento foi encontrado
    if (selectMat) {
      // Busca os dados de materiais do localStorage
      let dataMat = JSON.parse(localStorage.getItem("materiais"));
      let htmlMat = '';

      // Cria as opções do select com base nos dados de materiais
      dataMat.forEach(function(material) {
          htmlMat += `<option value="${material.nome}">${material.nome}</option>`;
      });

      // Define o HTML gerado no select de materiais
      selectMat.innerHTML = htmlMat;
    } else {
      console.log('Elemento #EditarMateriaisNecessarios não encontrado.');
    }
  }

//-------------------------------------------------------------------------------------------------------------------------------------------

function logout(){
  //sessionStorage.removeItem("users");
  localStorage.removeItem("users");
}













