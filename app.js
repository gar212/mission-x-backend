const express = require('express');
const app = express();
const PORT = 5000;

// const database = null; // Database goes here

app.get("/", (req,res) => res.send('Hello from backend'))

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 