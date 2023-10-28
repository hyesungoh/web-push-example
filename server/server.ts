import express from "express";
import cors from "cors";
import webPush from "web-push";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.set("port", 3001);
app.set("etag", false);
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const vapidKeys = webPush.generateVAPIDKeys();
webPush.setVapidDetails(
  "mailto:haesungoh414@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


app.get("/vapid-public-key", (_, res) => {
  res.send(vapidKeys.publicKey);
});

app.post("/subscribe", (req, res) => {
  const { subscription } = req.body;

  const payload = JSON.stringify({
    title: "Push Notification",
    body: "Push Notification from Express Server",
  });

  webPush
    .sendNotification(subscription, payload)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.listen(app.get("port"), () => {
  console.log(`Express start on 3001`);
});
