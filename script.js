const key = "7735f535500f7ecb5506fe68a0145dc5";

function criarCard(dados) {

    const container = document.getElementById("container-cards");

    const card = document.createElement("div");
    card.classList.add("caixa-media");

    card.innerHTML = `
        <h2 class="cidade">Tempo em ${dados.name}</h2>
        <p class="temp">${Math.floor(dados.main.temp)}°C</p>

        <div class="caixa-menor">
            <img class="img-previsao" src="https://openweathermap.org/img/wn/${dados.weather[0].icon}.png">
            <p class="texto-previsao">${dados.weather[0].description}</p>
        </div>

        <p class="umidade">Umidade: ${dados.main.humidity}%</p>
    `;

    container.appendChild(card);

    salvarLocalStorage();
}

async function buscarCidade(cidade) {
    const dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    ).then(res => res.json());

    if (dados.cod === "404") {
        alert("Cidade não encontrada!");
        return;
    }

    criarCard(dados);
}

function cliqueiNoBotao(){
    const cidade = document.querySelector(".input-cidade").value;

    if (!cidade) {
        alert("Digite uma cidade!");
        return;
    }

    buscarCidade(cidade);
}

function resetarCards(){
    const container = document.getElementById("container-cards");
    container.innerHTML = "";
    localStorage.removeItem("cidades");
}

function salvarLocalStorage(){
    const container = document.getElementById("container-cards");
    localStorage.setItem("cidades", container.innerHTML);
}

function carregarLocalStorage(){
    const container = document.getElementById("container-cards");
    const dadosSalvos = localStorage.getItem("cidades");

    if (dadosSalvos) {
        container.innerHTML = dadosSalvos;
    }
}

carregarLocalStorage();