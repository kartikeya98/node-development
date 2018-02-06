const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
fs.appendFile('server.log',log + '\n',(err) => {
if(err) {
  console.log('unable to connect to the server');
}

});
next();

})
app.use((req,res,next) => {

res.render('maintain.hbs')
})

hbs.registerHelper('getCurrentYear',() => {
return new Date().getFullYear();
})
hbs.registerHelper('screamit',(text) => {

  return text.toUpperCase()
})
app.get('/',(req,res) => {

res.render('home.hbs',{
  pageTitle:'home page',
  welcomeMessage:'welcome to aur page'
})
})
app.get('/about',(req,res) => {

  res.render('about.hbs',{
    pageTitle: "about page",
    welcomeMessage:'welcome to aur page'

  })
});
app.get('/bad',(req,res) => {

res.send('errormessage');

})

app.listen(3000,() => {

  console.log('server 3000 is up and running');
});
