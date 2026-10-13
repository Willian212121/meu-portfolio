
/* ========================================
   WILLIAN ROSA | PORTFÓLIO
   Funcionalidades do site
======================================== */

document.documentElement.classList.add("js");

// ELEMENTOS DO SITE

const html = document.documentElement;
const botaoMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu-principal");
const linksMenu = document.querySelectorAll("#menu-principal a");
const botaoTema = document.querySelector("#tema-toggle");
const anoAtual = document.querySelector("#ano-atual");

// ANO AUTOMÁTICO NO RODAPÉ

if (anoAtual) {
    anoAtual.textContent = `© ${new Date().getFullYear()} Willian Rosa`;
}

// MENU PARA CELULAR

function fecharMenu() {
    if (!botaoMenu || !menu) return;

    menu.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.textContent = "☰";
}

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.textContent = aberto ? "✕" : "☰";
    });

    linksMenu.forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            fecharMenu();
        }
    });
}

// TEMA CLARO E ESCURO

function aplicarTema(tema) {
    const temaValido = tema === "light" ? "light" : "dark";

    html.setAttribute("data-theme", temaValido);

    if (botaoTema) {
        botaoTema.textContent = temaValido === "dark" ? "☼" : "☾";

        botaoTema.setAttribute(
            "aria-label",
            temaValido === "dark"
                ? "Ativar tema claro"
                : "Ativar tema escuro"
        );

        botaoTema.setAttribute(
            "title",
            temaValido === "dark"
                ? "Ativar tema claro"
                : "Ativar tema escuro"
        );
    }
}

// Recupera a preferência salva, se existir.
let temaSalvo = "dark";

try {
    temaSalvo = localStorage.getItem("tema-portfolio") || "dark";
} catch (erro) {
    // O site continua funcionando se o armazenamento estiver bloqueado.
}

aplicarTema(temaSalvo);

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        const temaAtual = html.getAttribute("data-theme");
        const novoTema = temaAtual === "dark" ? "light" : "dark";

        aplicarTema(novoTema);

        try {
            localStorage.setItem("tema-portfolio", novoTema);
        } catch (erro) {
            // A troca de tema funciona mesmo sem salvar a preferência.
        }
    });
}

// ANIMAÇÕES AO ROLAR A PÁGINA

const elementosAnimados = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        (entradas, observadorAtual) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observadorAtual.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    elementosAnimados.forEach((elemento, indice) => {
        elemento.style.transitionDelay = `${(indice % 3) * 80}ms`;
        observador.observe(elemento);
    });
} else {
    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("visivel");
    });
}

// DESTAQUE DO LINK DA SEÇÃO ATUAL

const secoes = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && linksMenu.length > 0) {
    const observadorSecoes = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const idSecao = entrada.target.id;

                    linksMenu.forEach((link) => {
                        const ativo = link.getAttribute("href") === `#${idSecao}`;

                        if (ativo) {
                            link.classList.add("ativo");
                        } else {
                            link.classList.remove("ativo");
                        }
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    secoes.forEach((secao) => {
        observadorSecoes.observe(secao);
    });
}

