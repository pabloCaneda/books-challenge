const express = require('express');
const mainRouter = require('./routes/main');
const methodOverride = require('method-override');
const session = require("express-session");
const checkUsser = require("./validations/checkSession")

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "galletitas" }));
app.use(checkUsser)

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(methodOverride('_method'));

app.use('/', mainRouter);



app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
