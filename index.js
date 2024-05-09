const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());
//arrey de armazenagem de livros
let livros = []
//rota para obter os livros
app.get('/livros', (req, res) => { 
    res.json(livros); 
});
//Obter um livro pelo número do seu código
app.post('/livros/:codigo', (req, res) => { 
    const {codigo} = req.params
    const livro = livros.find(v => v.codigo === codigo)
    if (livro){
        res.json(livro)
    } 
    else {
        res.status(404).send('Livro não encontrado')
    }
});
//Cadastrar novo livro
app.post('/livros', (req, res)=> {
    const {codigo, nome, autor, genero} = req.body
    const livro = {codigo, nome, autor, genero}
    livros.push(livro)
    res.status(201).send('Livro cadastrado com sucesso')
})
// Atualizar informações de um livro pelo código
app.put('/livros/:codigo/', (req, res)=> {
    const {codigo} = req.params
    const {nome, autor, genero} = req.body
    const livro = livros.find(v => v.codigo === codigo)
    if (livro){
        livro.nome = nome || livro.nome
        livro.autor = autor || livro.autor
        livro.genero = genero || livro.genero
        res.status(200).send('Livro atualizado com sucesso')
    }
    else {
        res.status(404).send('Livro não encontrado')
    }
})
//Rota para excluir lvrio
app.delete('/livros/:codigo', (req, res) => { 
    const { codigo } = req.params
    const livroIndex = livros.findIndex(v => v.codigo === codigo)
    if (livroIndex !== -1) { 
    livros.splice(livroIndex, 1)
    res.json({ message: 'Livro excluído com sucesso.' })
    } 
    else { 
    res.status(404).json({ message: 'Livro não encontrado.' })
    } 
})
//Iniciar o servidor
const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})