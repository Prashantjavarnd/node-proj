var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser"); 
var methodOverride = require("method-override");

var port = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({ extended: "true" })); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" })); 
app.use(methodOverride());

var Student = require("./models/student");

mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function()  {
    console.log("Connected to the database!");
  })
  .catch(function(err)  {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.listen(port);
console.log("App listening on port : " + port);


app.get("/api/students", function (req, res) {
  Student.find(function (err, students) {
    if (err) res.send(err);
    res.json(students); 
  });
});


app.post("/api/students", function (req, res) {
  Student.create(
    {
      name: req.body.name,
      contact: req.body.contact,
      rollno: req.body.rollno,
    },
    function (err, student) {
      if (err) res.send(err);

      Student.find(function (err, students) {
        if (err) res.send(err);
        res.json(students);
      });

      res.send(student);
    }
  );
});


app.get("/api/students/:student_id", function (req, res) {
  var id = req.params.student_id;
  Student.findById(id, function (err, student) {
    if (err) res.send(err);

    res.json(student);
    console.log(student);
  });
});

app.put("/api/students/:student_id", function (req, res) {
  let id = req.params.student_id;
  var data = {
    name: req.body.name,
    contact: req.body.contact,
    rollno: req.body.rollno,
  };

 
  Student.findByIdAndUpdate(id, data, function (err, student) {
    if (err) throw err;

    res.send("Successfully! Student updated - " + student.name);
  });
});
