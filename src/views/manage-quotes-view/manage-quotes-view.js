import "./manage-quotes-view.js"
import apiUrl from "../../api-url.js";

const quotesContainer = (() => {
    const div = document.createElement("div");
    div.classList.add("quotes-container");
    return div;
})();

const addQuoteButton = (() => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Add Quote";
    btn.onclick = addQuote;
    return btn;
})();

async function deleteQuote(id) {
    await fetch(`${apiUrl}?id=${id}`, {
        method: 'DELETE',
    });
    getQuotes();
}

async function updateQuote(id) {
    const text = prompt("Enter changed quote: ");
    if (text) {
        const updatedQuote = {id, text};
        await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedQuote)
        });
        getQuotes();
    }
}

async function addQuote() {
    const text = prompt("Enter quote: ");
    const id = new Date().getTime();
    if(text) {
        const newQuote = {id, text};
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });
        getQuotes();
    }
}

async function getQuotes() {
  const response = await fetch(apiUrl);
  const quotes = await response.json();
  quotesContainer.textContent = "";
  quotes.forEach(quote => {
    const quoteDiv = document.createElement("div");
    quoteDiv.classList.add("quote-item");

    const quoteText = document.createElement("span");
    quoteText.textContent = quote.text;
    quoteDiv.appendChild(quoteText);

    const deleteQuoteButton = document.createElement("button");
    deleteQuoteButton.type = "button";
    deleteQuoteButton.textContent = "Delete";
    deleteQuoteButton.onclick = () => deleteQuote(quote.id);
    quoteDiv.appendChild(deleteQuoteButton);

    const updateQuoteButton = document.createElement("button");
    updateQuoteButton.type = "button";
    updateQuoteButton.textContent = "Change";
    updateQuoteButton.onclick = () => updateQuote(quote.id);
    quoteDiv.appendChild(updateQuoteButton);

    quotesContainer.appendChild(quoteDiv);
  })
}



// // Function to fetch and display all quotes


// // Function to add a new quote
// document.getElementById('addQuoteBtn').addEventListener('click', async () => {
//   const quoteText = document.getElementById('quoteText').value;
//   if (quoteText) {
//     const newQuote = {
//       id: Date.now(), // Create a unique ID based on timestamp
//       text: quoteText
//     };
//     await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newQuote)
//     });
//     document.getElementById('quoteText').value = ''; // Clear the input
//     getQuotes(); // Refresh the quotes list
//   } else {
//     alert("Please enter a quote!");
//   }
// });



// // Load the quotes when the page loads
// window.onload = getQuotes;


const randomQuoteView = (() => {
    const viewDiv = document.createElement("div");
    viewDiv.classList.add("manage-view-div");
    viewDiv.appendChild(addQuoteButton);
    viewDiv.appendChild(quotesContainer);
    getQuotes();

    return viewDiv;
})();

export default randomQuoteView;