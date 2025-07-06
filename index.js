const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const cron = require("node-cron");
const pusher = new Pusher({
  appId: "2017926",
  key: "496ae61302c5907c39d0",
  secret: "42c9745271bc61613533",
  cluster: "ap2",
  useTLS: true
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📨 API endpoint to receive a message and send it via Pusher

app.post('/message', (req, res) => {
  const { message } = req.body;
  pusher.trigger('chat-channel', 'new-message', {
    message,
  });

  res.sendStatus(200);
});

cron.schedule("*/10 * * * * *", function() {
    console.log("running a task every 10 second");
    pusher.trigger('chat-channel', 'new-message', {
    message: `Cron job executed at ${new Date().toISOString()}`,
  });
});

// 🚀 Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
