// Banco de dados em formato de Array de Objetos
const catalogoMolduras = [
  {
    id: "branca",
    preco: 45,
    nome: "Moldura Clássica Branca",
    img: "img/moldura-branca.jpg",
    descricao: "Acabamento liso e elegante. Ideal para ambientes claros.",
  },
  {
    id: "prata",
    preco: 60,
    nome: "Moldura Prata Metálica",
    img: "img/moldura-prata.jpg",
    descricao:
      "Toque de sofisticação, perfeita para espelhos e fotografias a preto e branco.",
  },
  {
    id: "carvalho",
    preco: 55,
    nome: "Moldura Madeira Carvalho",
    img: "img/moldura-rustica.jpg",
    descricao:
      "Traz o aconchego e a textura orgânica da madeira natural para o ambiente.",
  },
  {
    id: "preta",
    preco: 50,
    nome: "Moldura Preta Lisa",
    img: "img/moldura-preta.jpg",
    descricao:
      "O traço moderno e discreto que destaca a obra sem roubar a atenção.",
  },
  {
    id: "dourada",
    preco: 75,
    nome: "Moldura Dourada Clássica",
    img: "img/moldura-dourada.jpg",
    descricao:
      "Elegância pura com detalhes subtis. Ideal para telas e decorações nobres.",
  },
  {
    id: "filete",
    preco: 80,
    nome: "Moldura Filete Flutuante",
    img: "img/moldura-filete.jpg",
    descricao:
      "Design contemporâneo que cria a ilusão de que a tela está a flutuar.",
  },
];

let valorFinalCalculado = 0;
let nomeMolduraEscolhida = "";

// Renderiza a vitrine e adiciona o evento de clique em cada card
function renderizarVitrine() {
  const grid = document.querySelector(".vitrine-grid");
  grid.innerHTML = "";

  catalogoMolduras.forEach((moldura) => {
    const cardHTML = `
            <div class="card-produto" onclick="abrirModal('${moldura.id}')">
                <img src="${moldura.img}" alt="${moldura.nome}">
                <h3>${moldura.nome}</h3>
                <p class="descricao-produto">${moldura.descricao}</p>
                <span class="preco-tag">R$ ${moldura.preco.toFixed(2).replace(".", ",")} / metro</span>
            </div>
        `;
    grid.innerHTML += cardHTML;
  });
}

// Preenche o select do simulador guardando o ID de cada moldura
function renderizarOpcoesSimulador() {
  const select = document.getElementById("tipoMoldura");
  select.innerHTML =
    '<option value="" disabled selected>Escolha um modelo...</option>';

  catalogoMolduras.forEach((moldura) => {
    // Corrigido o espaçamento e o hífen separador para o select ler corretamente depois
    const optionHTML = `<option value="${moldura.preco}" data-id="${moldura.id}">${moldura.nome} - R$ ${moldura.preco.toFixed(2).replace(".", ",")}/m</option>`;
    select.innerHTML += optionHTML;
  });
}

// Abre o modal com os dados da moldura clicada
function abrirModal(id) {
  const moldura = catalogoMolduras.find((item) => item.id === id);
  if (!moldura) return;

  document.getElementById("modalImg").src = moldura.img;
  document.getElementById("modalImg").alt = moldura.nome;
  document.getElementById("modalTitulo").innerText = moldura.nome;
  document.getElementById("modalDescricao").innerText = moldura.descricao;
  document.getElementById("modalPreco").innerText =
    `R$ ${moldura.preco.toFixed(2).replace(".", ",")} / metro`;

  // Configura o botão para selecionar esta moldura no simulador
  document.getElementById("btnProsseguir").onclick = () =>
    selecionarParaSimulador(moldura.id);

  document.getElementById("modalMoldura").style.display = "flex";
}

// Fecha o modal
function fecharModal() {
  document.getElementById("modalMoldura").style.display = "none";
}

// Fecha o modal caso o utilizador clique no fundo escuro fora do cartão
function fecharModalFora(event) {
  if (event.target.id === "modalMoldura") {
    fecharModal();
  }
}

// Fecha o modal, vai até o simulador e seleciona o modelo automaticamente
function selecionarParaSimulador(id) {
  fecharModal();

  const select = document.getElementById("tipoMoldura");
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].getAttribute("data-id") === id) {
      select.selectedIndex = i;
      break;
    }
  }

  // Rola suavemente até o simulador e foca no campo de largura
  const secaoSimulador = document.getElementById("simulador");
  secaoSimulador.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    document.getElementById("largura").focus();
  }, 500);
}

// Lógica do Orçamento
function calcularOrcamento() {
  const largura = parseFloat(document.getElementById("largura").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const selectMoldura = document.getElementById("tipoMoldura");

  if (selectMoldura.selectedIndex === 0) {
    alert("Por favor, selecione um modelo de moldura.");
    return;
  }

  const precoMetro = parseFloat(selectMoldura.value);

  // Extrai o nome da moldura de forma limpa (removendo o preço do texto do option)
  const textoOpcao = selectMoldura.options[selectMoldura.selectedIndex].text;
  nomeMolduraEscolhida = textoOpcao.split(" - ")[0];

  if (!largura || !altura || largura <= 0 || altura <= 0) {
    alert("Por favor, insira valores válidos para largura e altura.");
    return;
  }

  const perimetroMetros = ((largura + altura) * 2) / 100;
  valorFinalCalculado = perimetroMetros * precoMetro;

  document.getElementById("textoValor").innerText =
    `R$ ${valorFinalCalculado.toFixed(2).replace(".", ",")}`;
  document.getElementById("resultado").style.display = "block";
}

function enviarWhatsApp() {
  const largura = document.getElementById("largura").value;
  const altura = document.getElementById("altura").value;
  const numeroWhatsApp = "5548996014108";

  const mensagem = `Olá Juliana! Gostaria de um orçamento para a ${nomeMolduraEscolhida} nas medidas ${largura}x${altura}cm. Valor estimado no site: R$ ${valorFinalCalculado.toFixed(2).replace(".", ",")}.`;

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`,
    "_blank",
  );
}

// Executa a renderização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarVitrine();
  renderizarOpcoesSimulador();
});
