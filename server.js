const http = require('http');
const url = require('url');
const fs = require('fs');
const cors = require('cors');
const path = './database.json';

function readQuotesFromFile() {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

function writeQuotesToFile(quotes) {
  fs.writeFileSync(path, JSON.stringify(quotes, null, 2), 'utf8');
}

const server = http.createServer((req, res) => {
    cors()(req, res, () => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;
  
    res.setHeader('Content-Type', 'application/json');
  
    if (pathname === '/quotes' && req.method === 'GET') {
      const quotes = readQuotesFromFile();
      res.statusCode = 200;
      res.end(JSON.stringify(quotes));
    } 
    else if(pathname === '/quotes/random' && req.method === 'GET'){
      const quotes = readQuotesFromFile();
      const random_index = Math.floor(Math.random() * Object.keys(quotes).length);
      console.log(random_index, Math.random(), Object.keys(quotes).length);
      let randomQuote = quotes[random_index];
  
      res.statusCode = 200;
      res.end(JSON.stringify(randomQuote));
    }
    else if (pathname === '/quotes' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
  
      req.on('end', () => {
        const newQuote = JSON.parse(body);
        const quotes = readQuotesFromFile();
        quotes.push(newQuote);
        writeQuotesToFile(quotes);
  
        res.statusCode = 201;
        res.end(JSON.stringify({ message: 'Quote added', quote: newQuote }));
      });
    } else if (pathname === '/quotes' && req.method === 'DELETE') {
      // Handle DELETE request: Remove a quote (based on its index in the array)
      const { id } = parsedUrl.query;
      if (!id) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'ID is required to delete a quote' }));
        return;
      }
  
      const quotes = readQuotesFromFile();
      const updatedQuotes = quotes.filter(quote => quote.id !== parseInt(id));
      writeQuotesToFile(updatedQuotes);
  
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Quote deleted' }));
    } else if (pathname === '/quotes' && req.method === 'PUT') {
      // Handle PUT request: Update a quote (based on its ID)
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
  
      req.on('end', () => {
        const updatedQuote = JSON.parse(body);
        const { id } = updatedQuote;
        if (!id) {
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'ID is required to update a quote' }));
          return;
        }
  
        const quotes = readQuotesFromFile();
        const index = quotes.findIndex(quote => quote.id === id);
  
        if (index === -1) {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: 'Quote not found' }));
          return;
        }
  
        quotes[index] = updatedQuote;
        writeQuotesToFile(quotes);
  
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Quote updated', quote: updatedQuote }));
      });
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  });
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
