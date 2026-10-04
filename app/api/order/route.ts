import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Telegram: альбом — до 10 файлів, підпис — до 1024 символів
const MAX_FILES = 10;
const MAX_PROBLEM_LENGTH = 700;

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані в .env.local");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const form = await request.formData();
  const problem = String(form.get("problem") ?? "").trim().slice(0, MAX_PROBLEM_LENGTH);
  const phone = String(form.get("phone") ?? "").trim().slice(0, 32);
  const files = form
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);

  if (!problem || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const text = [
    "🔧 <b>Nowe zgłoszenie</b>",
    "",
    `<b>Opis:</b> ${escapeHtml(problem)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    files.length ? `<b>Pliki:</b> ${files.length}` : "<b>Pliki:</b> brak",
  ].join("\n");

  const api = `https://api.telegram.org/bot${token}`;
  const mediaType = (f: File) => (f.type.startsWith("video/") ? "video" : "photo");
  let response: Response;

  if (files.length === 0) {
    response = await fetch(`${api}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } else if (files.length === 1) {
    // альбом потребує мінімум 2 файли, тому один файл шлемо окремим методом
    const file = files[0];
    const type = mediaType(file);
    const body = new FormData();
    body.append("chat_id", chatId);
    body.append("caption", text);
    body.append("parse_mode", "HTML");
    body.append(type, file, file.name);
    response = await fetch(`${api}/${type === "video" ? "sendVideo" : "sendPhoto"}`, {
      method: "POST",
      body,
    });
  } else {
    const body = new FormData();
    body.append("chat_id", chatId);
    body.append(
      "media",
      JSON.stringify(
        files.map((file, i) => ({
          type: mediaType(file),
          media: `attach://file${i}`,
          ...(i === 0 ? { caption: text, parse_mode: "HTML" } : {}),
        }))
      )
    );
    files.forEach((file, i) => body.append(`file${i}`, file, file.name));
    response = await fetch(`${api}/sendMediaGroup`, { method: "POST", body });
  }

  if (!response.ok) {
    console.error("Telegram API:", response.status, await response.text());
    return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
