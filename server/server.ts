import express from "express";

const app = express();

app.set("port", 3001);
const server = app.listen(app.get("port"), () => {
  console.log(`Express start on 3001`);
});
