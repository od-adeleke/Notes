require('dotenv').config()

const express = require('express')
const expressLayouts = require("express-ejs-layouts")
const methodOverride = require('method-override')
const connectDB = require('./server/config/db')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
 
const app = express()
const port = process.env.PORT || 3000
 
// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
  // Date.now() - Days * 24 * 60 * 60 * 1000
}));

// initialise passport
app.use(passport.initialize())
app.use(passport.session())

// middleware
// these helps users to pass data through forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method')) // helps user to update notes

// static files
// to access img, css and js files in the public folder
app.use(express.static('public'))

// database
connectDB()

// template engine
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// routes
app.use('/', require('./server/routes/auth'))
app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/dashboard'))

// 404
app.get('*', (req, res) => {
  const locals = {
    title: '404 | Page Not Found'
  }
  // res.status(404).send('404 Page Not Found')
  res.render('../views/pages/404', locals)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})