const express = require('express');
const app = express();
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

// ### middleware ###
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));

// ### required routes ###
const user = require('./routes/user');
const newChar = require('./routes/newChar');
const auth = require('./routes/auth');
const enemy = require('./routes/enemies');
const ships = require('./routes/ships');
const spaceEnvs = require('./routes/spaceEnvs');
const characters = require('./routes/characters');
const events = require('./routes/events');
const actions = require('./routes/actions');

// ### used routes ###
// no auth check?
app.use('/api/user', user);
app.use('/api/newChar', newChar);
app.use('/api/game',actions);
app.use('/api/auth', auth);
app.use('/api/enemies', enemy);
app.use('/api/ships', ships);
// should these be restricted to admins?
app.use('/api/spaceEnvs', spaceEnvs);
app.use('/api/characters', characters);
app.use('/api/events', events);

// ### catchers ###
app.use(errorHandler());

module.exports = app;