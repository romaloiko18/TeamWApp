require('dotenv').config();
require('./db');
const bodyParser = require('body-parser');
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const ProjectRoute = require('./routes/project');
const TicketRoute = require('./routes/titcket');
const PokemonRoute = require('./routes/pokemon');
const BattleRoute = require('./routes/battle');
const AttackRoute = require('./routes/attack');

const http = require('http');
const { Server } = require('socket.io');
const battleService = require('./services/battle');

const compression = require('compression');
const cors = require('cors');
const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/auth', AuthRoute);
app.use('/project', ProjectRoute);
app.use('/ticket', TicketRoute);
app.use('/profile', UserRoute);
app.use('/pokemon', PokemonRoute);
app.use('/battle', BattleRoute);
app.use('/attack', AttackRoute);

app.get('/app', (req, res) => {
  res.json({ success: true, message: 'Success' });
});

io.on('connection', (socket) => {});

server.listen(PORT, () => console.log('Server is running', PORT));
