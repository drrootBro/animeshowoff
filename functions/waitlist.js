// AnimeShowoff waitlist — Cloudflare Pages Function
// Route: POST /waitlist   (this file lives at functions/waitlist.js)
// Binding required: D1 database bound as env.DB (variable name must be exactly "DB").
// Table: see schema.sql (waitlist: email UNIQUE, tier, created_at).
// Behaviour: validates the email, inserts with INSERT OR IGNORE so a duplicate
// signup returns { ok: true, duplicate: true } instead of an error.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    return json({ ok: false, error: "Waitlist is not configured yet. Please try again later." }, 500);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const email = String(data.email || "").trim().toLowerCase();
  const tier = data.tier ? String(data.tier).slice(0, 32) : null;

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  try {
    const result = await env.DB
      .prepare("INSERT OR IGNORE INTO waitlist (email, tier) VALUES (?1, ?2)")
      .bind(email, tier)
      .run();
    const inserted = result.meta && result.meta.changes > 0;
    return json({ ok: true, duplicate: !inserted });
  } catch (e) {
    return json({ ok: false, error: "Something went wrong — please try again." }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }
  return onRequestPost(context);
}
