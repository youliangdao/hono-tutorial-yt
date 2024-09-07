import { Hono } from "hono";
import posts from "./blogs/blogs";
import auth from "./auth/auth";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

app.use(
  "/auth/*",
  basicAuth({
    username: "hono",
    password: "hono",
  })
);

app.route("/posts", posts);
app.route("/auth", auth);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
