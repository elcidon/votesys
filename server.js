const express = require("express");
const app = express();
const connectDB = require("./config/db");

// TODO CONECTAR COM O BANCO
connectDB();

// TODO INICAR MIDDLEWARES
app.use(express.json({ extended: false }));

app.get("/", (req, res) => console.info("App rodando!"));
app.use("/api/polls", require("./routes/api/polls"));

const PORT = process.env.port || 5555;

app.listen(PORT, () => console.info(`Server iniciou na porta ${PORT}`));
