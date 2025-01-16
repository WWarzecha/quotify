import "./random-quote-view.css"
import apiUrl from "../../api-url.js";

const quoteContainer = (() => {
    const div = document.createElement("div");
    div.classList.add("quote-container");
    return div;
})();

const fetchRandomQuote = async () => {
    const response = await fetch(apiUrl + '/random')
    const quoteData = await response.json();
    const quoteText = "\"" + quoteData.text + "\"";
    quoteContainer.textContent = quoteText;
};

const getAnotherRandomQuoteButton = (() => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("random-quote-button");
    btn.textContent = "Get Another!"
    btn.onclick = fetchRandomQuote;
    return btn;
})();

const randomQuoteView = (() => {
    const viewDiv = document.createElement("div");
    viewDiv.classList.add("random-view-div");
    viewDiv.appendChild(quoteContainer);
    viewDiv.appendChild(getAnotherRandomQuoteButton);
    fetchRandomQuote();
    return viewDiv;
})();

export default randomQuoteView;