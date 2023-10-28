import express from "express";
import cors from "cors";
import webPush from "web-push";

const app = express();

app.set("port", 3001);

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.get("/vapid-keys", (_, res) => {
  const vapidKeys = webPush.generateVAPIDKeys();

  res.send({
    ...vapidKeys,
  });
});

app.post("/subscribe", (req, res) => {
  const { subscription, payload } = req.body;

  const options = {
    TTL: 24 * 60 * 60,
  };

  webPush
    .sendNotification(subscription, payload, options)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(app.get("port"), () => {
  console.log(`Express start on 3001`);
});
