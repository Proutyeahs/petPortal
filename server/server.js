const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const speciesRouter = require('./routes/species.router')
const petRouter = require('./routes/pet.router')
const foodRouter = require('./routes/food.router')
const noteRouter = require('./routes/note.router')
const allfoodRouter = require('./routes/allfood.router')
const allspeciesRouter = require('./routes/allspecies.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/species', speciesRouter)
app.use('/api/pet', petRouter)
app.use('/api/food', foodRouter)
app.use('/api/note', noteRouter)
app.use('/api/allfood', allfoodRouter)
app.use('/api/allspecies', allspeciesRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
