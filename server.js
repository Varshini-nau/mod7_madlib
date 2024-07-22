const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

// Middleware to handle form data
server.use(express.urlencoded({ extended: true }));

// Morgan logger setup for request logging
server.use(logger('dev'));

// Serve static files from the 'public' directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route to handle Mad Lib form submissions
server.post('/submit', (req, res) => {
    const { noun, verb, adjective, adverb, noun2 } = req.body; // Expecting five fields
    if (!noun || !verb || !adjective || !adverb || !noun2) { // Validate all required fields are provided
        res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out ALL fields</p>
          <a href="/ITC505/lab-7/index.html">Go Back to Form</a>  <!-- Updated link to point directly to the form -->
        `);
        return;
    }
    // Construct the Mad Lib using the submitted form data
    const madLib = `Today I saw a ${noun}, which was really ${adjective}. It ${verb} ${adverb} past a ${noun2}!`;
    res.send(`
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>  <!-- Updated link to point directly to the form -->
    `);
});

// Determine the port to listen on
// Determine the port to listen on
let port = 8080;
if (process.argv[2] === 'local') {
    port = 8080; // Change from 8080 to 8081 or another free port
}

// Start the server
server.listen(port, () => {
    console.log(`Server ready on localhost:${port}`);
});

