const express = require('express');
const app = express();
const port = process.env.port || 5000;

// const database = null; // Database goes here

app.get("/", (req,res) => res.send('Hello from backend'))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});