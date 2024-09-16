const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/userRouter'));

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
