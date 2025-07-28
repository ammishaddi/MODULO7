const express = require('express')
const app = express()
const PORT = 4000

app.get('/', (req, res) => {
    res.send("Parte 4 Servidor Express")
})

app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
})


