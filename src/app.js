const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection');

const parser = require('body-parser');
const app = express();
const session = require('express-session');

// importing routes
const agendaRoute = require('./routes/agenda');
const vestidoRoutes = require('./routes/vestido');
const gravataRoutes = require('./routes/gravata');
const bolsaRoutes = require('./routes/bolsa');
const coleteRoutes = require('./routes/colete');
const sapatoRoutes = require('./routes/sapato');
const camisaRoutes = require('./routes/camisa');
const calcaRoutes = require('./routes/calca');
const paletoRoutes = require('./routes/paleto');
const locacaoRoutes = require('./routes/locacao');
const eventoRoute = require('./routes/evento');
const itenLocacoRoute = require('./routes/itensLocacao');
const buscaPecasRoute = require('./routes/buscaPecas');
const conjuntoRoute = require('./routes/conjunto');
const pesquisaRoute = require('./routes/pesquisa');



// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// database
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'viva_maria_db'
}, 'single'));

app.use(parser.json());


app.use(express.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// routes
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'viva_maria_db'
  });
  if (username && password) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/agenda');
      } else {
        response.send(
          "<h1>Usuário ou senha não conferem</h1>"
        );
      }
      response.end();
    });
  } else {
    response.send('<h1>Please enter Username and Password!</h1>');
    response.end();
  }

});




app.use('/evento', eventoRoute);
app.use('/', agendaRoute);
app.use('/agenda', agendaRoute);
app.use('/vestidos', vestidoRoutes);
app.use('/gravatas', gravataRoutes);
app.use('/bolsas', bolsaRoutes);
app.use('/coletes', coleteRoutes);
app.use('/sapatos', sapatoRoutes);
app.use('/camisas', camisaRoutes);
app.use('/calcas', calcaRoutes);
app.use('/paletos', paletoRoutes);
app.use('/locacoes', locacaoRoutes);
app.use('/itenLocacao', itenLocacoRoute);
app.use('/buscar-pecas', buscaPecasRoute);
app.use('/conjuntos', conjuntoRoute);
app.use('/pesquisa',pesquisaRoute);


// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});