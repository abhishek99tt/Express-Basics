const express = require('express');
const path = require('path');
const members = require('./Members')
const exphbs = require('express-handlebars');
const { engine } = exphbs;
// import { engine } from 'express-handlebars';
const logger = require('./middleware/logger');
const app = express();

// app.get('/', (req,res) => {
//     // res.send('<h1>Hello Express!</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// Init middleware
// app.use(logger);

// // Gets all the members
// app.get('/api/members', (req, res) =>  res.json(members))

// // Get a single member
// app.get('/api/members/:id', (req, res) => {
//     const found = members.some(member => member.id == req.params.id);
//     if(found){
//         res.json(members.filter(member => member.id == req.params.id))
//     } else {
//         res.status(400).json({ msg: `Member with id ${req.params.id} not found`})
//     }
// })

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {
        title: "Members App",
        members
    });
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log('Server started...'));