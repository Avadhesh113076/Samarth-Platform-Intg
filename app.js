var http = require('http');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var projectRoutes = require('./sectionproject/projectRouter');
var educationRouter = require('./sectionEducation/educationrouter');
var skillRoutes = require('./sectionskill/skillrouter');
var profilerouter = require('./profileserver/profilerouter');
var workRouter=require('./workexperiance/workrouter');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var server = http.createServer(app);
server.listen(8081);

mongoose.connect('mongodb://localhost:27017/sectionproject');

console.log("Server started...");

app.get("/", function(req, res) {
  res.json({
    'section': 'project'
  });
});

app.use("/project", function(req, res, next) {
	res.set('Access-Control-Allow-Origin','*');
	next();
} ,projectRoutes);

app.use('/education',educationRouter);

app.use("/skill", skillRoutes);

app.use("/profile",profilerouter);

app.use("/work", workRouter);

module.exports = app;


