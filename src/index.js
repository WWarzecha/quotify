import "./styles.css";
import navBar from "./nav.js";
import randomQuoteView from "./views/random-quote-view/random-quote-view.js";
import manageQuotesView from "./views/manage-quotes-view/manage-quotes-view.js";
import '../node_modules/modern-normalize/modern-normalize.css';

const bodyParser = require("body-parser");

const body = document.querySelector("body");
const viewContainer = document.createElement("div");
viewContainer.classList.add("view-container");

const switchView = (view) => {
    viewContainer.textContent = "";
    viewContainer.appendChild(view)
};

body.appendChild(navBar);

body.appendChild(viewContainer);
const navRandomButton = document.querySelector(".nav-button.random")
navRandomButton.onclick = () => switchView(randomQuoteView);
const navManageButton = document.querySelector(".nav-button.manage")
navManageButton.onclick = () => switchView(manageQuotesView);

window.onload = () => switchView(randomQuoteView);
