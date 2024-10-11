const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});