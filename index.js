const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function (req, res) {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get('/api/:date', function (req, res) {
  const { date } = req.params;
  const currentDate = /^[0-9]*$/g.test(date)
    ? new Date(parseInt(date))
    : new Date(date);
  if (currentDate.toString() === 'Invalid Date') {
    res.json({ error: currentDate.toString() });
  }
  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
