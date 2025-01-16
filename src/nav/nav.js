import logoImg from "../img/quotify-high-resolution-logo-transparent.svg";
import "./nav-styles.css";

const logo = (() => {
    const logo = document.createElement("img");
    logo.classList.add("logo-img");
    logo.alt = "Quotify logo";
    logo.src = logoImg;
    return logo;
})();

const createButton = ((text) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.classList.add("nav-button");
    btn.classList.add(text.toLowerCase());
    return btn;
});

const buttonsContainer = (() => {
    const div = document.createElement("div");
    div.classList.add("buttons-container");
    const randomQuoteBtn = createButton("Random");
    const manageBtn = createButton("Manage");
    div.appendChild(randomQuoteBtn);
    div.appendChild(manageBtn);
    return div;
})();

const navBar = (() => {
    const nav = document.createElement("nav");
    nav.appendChild(logo);
    nav.appendChild(buttonsContainer);
    return nav;
})();



export default navBar;