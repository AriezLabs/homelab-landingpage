const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express()
const port = 80

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve node modules as static files
app.use(express.static(path.join(__dirname + '/node_modules')))


////////////
// ROUTES //
////////////


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/style.css'));
})

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname + '/favicon.ico'));
})

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/main.js'));
})

app.get('/du', (req, res) => {
  exec("df -lh | grep disk1s1", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      s = stdout.split(" ")
      res.send({
        disk:  s[0],
        total: s[2],
        used:  s[5],
        free:  s[7],
        perc:  s[11],
      });
  });
})





app.post("/say", (req, res) => {
  const allowed_voices = ["Alex", "Anna", "Daniel", "Yuri"]

  const to_say = req.body.words
  const voice = req.body.voice

  if (!to_say.includes("'") && allowed_voices.includes(voice))
    exec(`say -v ${voice} '${to_say}'`);

  else
    exec(`say -v alex please enter valid input`);

  res.redirect('/')
})






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

