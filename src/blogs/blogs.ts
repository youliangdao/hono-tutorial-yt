import { Hono } from "hono";

const app = new Hono();

let blogPosts = [
  {
    id: "1",
    title: "Blog1",
    content: "Blog1 Posts",
  },
  {
    id: "2",
    title: "Blog2",
    content: "Blog2 Posts",
  },
  {
    id: "3",
    title: "Blog3",
    content: "Blog3 Posts",
  },
];

app.get("/", (c) => c.json({ posts: blogPosts }));

app.get("/:id", (c) => {
  const post = blogPosts.find((p) => p.id === c.req.param("id"));
  if (!post) {
    return c.json({ message: "Post not found" }, 404);
  }
  return c.json(post);
});

app.post("/", async (c) => {
  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  const newPost = {
    id: String(blogPosts.length + 1),
    title,
    content,
  };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

app.put("/:id", async (c) => {
  const post = blogPosts.find((p) => p.id === c.req.param("id"));
  if (!post) {
    return c.json({ message: "Post not found" }, 404);
  }
  const { title, content } = await c.req.json();
  post.title = title;
  post.content = content;
  return c.json(post);
});

app.delete("/:id", (c) => {
  blogPosts = blogPosts.filter((p) => p.id !== c.req.param("id"));
  return c.json({ message: "Post deleted" });
});

export default app;
