const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Dados de pacotes de viagem (pode ser substituído por um banco de dados no futuro)
const pacotes = require('./data/pacotes.json');

// Configuração do EJS
app.set('view engine', 'ejs');

// Diretórios estáticos (CSS, JS)
app.use(express.static('public'));

// Middleware de sessão
app.use(session({
  secret: 'senha-secreta',
  resave: false,
  saveUninitialized: true,
}));

// Middleware para parse de dados de formulários
app.use(express.urlencoded({ extended: true }));

// Verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
  if (!req.session.usuarioAutenticado) {
    return res.redirect('/login');
  }
  next();
}

// Rota da página inicial
app.get('/', (req, res) => {
  res.render('index', { pacotes });
});

// Rota da página de detalhes do pacote
app.get('/pacote/:id', isAuthenticated, (req, res) => {
  const pacote = pacotes.find(p => p.id === parseInt(req.params.id));
  if (!pacote) {
    return res.status(404).send('Pacote não encontrado');
  }
  res.render('detalhe', { pacote });
});

// Rota de login
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Usuário" required />
      <input type="password" name="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
  `);
});

// Autenticação (usuário fixo)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'usuario' && password === 'senha123') {
    req.session.usuarioAutenticado = true;
    res.redirect('/');
  } else {
    res.send('Usuário ou senha inválidos!');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
