const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
 origin:"https://acaiteria-juazeiro.vercel.app"}));
app.use(express.json());

let clientes = [];

app.get('/api/cliente/:telefone', (req, res) => {
  const cliente = clientes.find(c => c.telefone === req.params.telefone);
  if(cliente) return res.json(cliente);
  return res.json({telefone: req.params.telefone, pontos: 0});
});

app.post('/api/cliente', (req, res) => {
  const {telefone, pontos} = req.body;
  let cliente = clientes.find(c => c.telefone === telefone);
  if(cliente){
    cliente.pontos = pontos;
  }else{
    clientes.push({telefone, pontos});
  }
  res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Servidor rodando na porta ' + PORT));
