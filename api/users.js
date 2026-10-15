import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res
      .status(500)
      .json({ error: "DATABASE_URL is not set. Add it in Vercel settings." });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === "GET") {
      const users = await sql`
        SELECT id, name FROM users ORDER BY id DESC LIMIT 100
      `;
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

      if (!name) {
        return res.status(400).json({ error: "Name is required." });
      }
      if (name.length > 100) {
        return res.status(400).json({ error: "Name is too long (max 100)." });
      }

      // ${name} is sent as a parameter, which protects against SQL injection
      await sql`INSERT INTO users (name) VALUES (${name})`;
      return res.status(201).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
}
