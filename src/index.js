const bodyParser = require("body-parser");

const apiUrl = 'http://localhost:3000/quotes'; // The server URL

// Function to fetch and display all quotes
async function getQuotes() {
  const response = await fetch(apiUrl);
  const quotes = await response.json();
  const quoteListDiv = document.getElementById('quoteList');
  quoteListDiv.innerHTML = ''; // Clear the list before adding new items
  quotes.forEach(quote => {
    const quoteItem = document.createElement('div');
    quoteItem.classList.add('quote-item');
    quoteItem.innerHTML = `
      <span>${quote.text}</span>
      <button onclick="deleteQuote(${quote.id})">Delete</button>
      <button onclick="updateQuote(${quote.id})">Update</button>
    `;
    quoteListDiv.appendChild(quoteItem);
  });
}

// Function to add a new quote
document.getElementById('addQuoteBtn').addEventListener('click', async () => {
  const quoteText = document.getElementById('quoteText').value;
  if (quoteText) {
    const newQuote = {
      id: Date.now(), // Create a unique ID based on timestamp
      text: quoteText
    };
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    });
    document.getElementById('quoteText').value = ''; // Clear the input
    getQuotes(); // Refresh the quotes list
  } else {
    alert("Please enter a quote!");
  }
});

// Function to delete a quote
async function deleteQuote(id) {
  await fetch(`${apiUrl}?id=${id}`, {
    method: 'DELETE',
  });
  getQuotes(); // Refresh the quotes list
}

// Function to update a quote
async function updateQuote(id) {
  const newText = prompt("Enter the new quote text:");
  if (newText) {
    const updatedQuote = { id, text: newText };
    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedQuote)
    });
    getQuotes(); // Refresh the quotes list
  }
}

// Load the quotes when the page loads
window.onload = getQuotes;

