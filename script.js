const pontoEl = document.getElementById("pontuacao");
const partescor = document.querySelectorAll(".cores");
const container = document.querySelector(".container");
const startbtn = document.querySelector("#play");
const pontoresult = document.querySelector("#resultadoponto");
const wrapperEl = document.querySelector(".wrapper");

const objcor = {
    cor1: { current: "#006400", new: "#00ff00" },
    cor2: { current: "#800008", new: "#ff0000" },
    cor3: { current: "#0808b8", new: "#0000ff" },
    cor4: { current: "#808000", new: "#ffff00" },
};

let coraleatoria = [];
let ehGeracaocaminho = false;
let pontuacao = 0;
let contaclique = 0;

function Escolhacoraleatoria(objcor) {
    const corchaeve = Object.keys(objcor);
    return corchaeve[Math.floor(Math.random() * corchaeve.length)];
}

async function delay(time) {
    return await new Promise((resolve) => setTimeout(resolve, time));
}

async function geracaminho() {
    coraleatoria.push(Escolhacoraleatoria(objcor));
    pontuacao = coraleatoria.length;
    ehGeracaocaminho = true;
    await mostracaminho(coraleatoria);
}

async function mostracaminho(partescor) {
    pontoEl.innerText = pontuacao;
    for (let cor of partescor) {
        const corAgora = document.querySelector(`.${cor}`);
        await delay(150);
        corAgora.style.backgroundColor = objcor[cor].new;
        await delay(200);
        corAgora.style.backgroundColor = objcor[cor].current;
        await delay(200);
    }
    ehGeracaocaminho = false;
}

function fimdejogo() {
    pontoresult.innerHTML = `<span>Sua pontuação foi: </span> ${pontuacao}`;
    pontoresult.classList.remove("hide");
    container.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startbtn.innerText = "Jogar Novamente";
    startbtn.classList.remove("hide");
}

function resetajogo() {
    pontuacao = 0;
    contaclique = 0;
    coraleatoria = [];
    ehGeracaocaminho = false;
    wrapperEl.classList.remove("hide");
    container.classList.add("hide");
    geracaminho();
}

async function correcebeclique(e) {
    if (ehGeracaocaminho) {
        return false;
    }
    if (e.target.classList.contains(coraleatoria[contaclique])) {
        e.target.style.backgroundColor = objcor[coraleatoria[contaclique]].new;
        await delay(50);
        e.target.style.backgroundColor = objcor[coraleatoria[contaclique]].current;
        contaclique++;
        if (contaclique === pontuacao) {
            contaclique = 0;
            geracaminho();
        }
    } else {
        fimdejogo();
    }
}

startbtn.addEventListener("click", resetajogo);
partescor.forEach((cor) => cor.addEventListener("click", correcebeclique));



