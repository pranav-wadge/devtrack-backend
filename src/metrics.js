import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

export default function registerMetrics(app) {
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });
}
