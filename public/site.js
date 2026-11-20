const $ = id => document.getElementById(id);
$("yr").textContent = new Date().getFullYear();
for (const button of document.querySelectorAll("[data-print]")) button.addEventListener("click", () => window.print());

// Without JavaScript all three stages remain readable.
const steps = document.querySelectorAll("[data-step]");
function showStep(step) {
  for (const button of steps) {
    const active = button.dataset.step === step;
    button.setAttribute("aria-pressed", String(active));
    $(button.getAttribute("aria-controls")).hidden = !active;
  }
}
for (const button of steps) button.addEventListener("click", () => showStep(button.dataset.step));
showStep("finding");
document.querySelector(".demo-steps").hidden = false;

const log = $("log");
const form = $("form");
const input = $("input");
const send = $("send");
const chips = $("chips");
const history = [];
let busy = false;

function esc(s) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
function inline(s) {
  // Replace tokens in one pass so linkified email addresses aren't processed twice.
  return esc(s).replace(/\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)|([\w.+-]+@[\w-]+\.[\w.]+)/g,
    (_, bold, label, url, email) => bold ? `<strong>${bold}</strong>` : label ? `<a href="${url}" target="_blank" rel="noopener">${label}</a>` : `<a href="mailto:${email}">${email}</a>`);
}
function md(text) {
  const out = []; let list = null;
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*[-*•]\s+(.*)/);
    if (m) { if (!list) list = []; list.push("<li>" + inline(m[1]) + "</li>"); continue; }
    if (list) { out.push("<ul>" + list.join("") + "</ul>"); list = null; }
    if (line.trim()) out.push("<p>" + inline(line) + "</p>");
  }
  if (list) out.push("<ul>" + list.join("") + "</ul>");
  return out.join("");
}
function add(role, text) {
  const el = document.createElement("div");
  el.className = "msg " + (role === "user" ? "user" : "bot");
  el.innerHTML = role === "user" ? "<p>" + esc(text) + "</p>" : md(text);
  log.appendChild(el); log.scrollTop = log.scrollHeight;
  return el;
}
async function ask(question) {
  const q = question.trim();
  if (!q || busy) return;
  busy = true; send.disabled = true; input.disabled = true; chips.hidden = true;
  // The sample isn't part of this visitor's conversation or the model context.
  document.querySelectorAll(".example-msg, #example-label").forEach(el => el.remove());
  log.setAttribute("aria-busy", "true");
  add("user", q);
  const userMessage = { role: "user", content: q };
  const messages = [...history, userMessage];
  input.value = ""; input.style.height = "";
  const el = add("bot", ""); el.classList.add("typing");
  let answer = "";
  let succeeded = false;
  try {
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages }) });
    if (!res.ok || !res.body) {
      answer = (await res.text()) || "The assistant couldn’t answer. Please try again.";
    } else {
      const reader = res.body.getReader(); const dec = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) { answer += dec.decode(); break; }
        answer += dec.decode(value, { stream: true });
        el.innerHTML = md(answer); log.scrollTop = log.scrollHeight;
      }
      succeeded = Boolean(answer.trim());
      if (!succeeded) answer = "The assistant returned an empty answer. Please try again.";
    }
  } catch {
    answer = "The assistant couldn’t complete that request. Please try again, or email Michael directly.";
  } finally {
    el.classList.remove("typing"); el.innerHTML = md(answer);
    if (succeeded) {
      history.push(userMessage, { role: "assistant", content: answer });
      // Keep only recent complete exchanges, matching the server's history limit.
      if (history.length > 12) history.splice(0, history.length - 12);
    } else {
      input.value = q; chips.hidden = history.length > 0;
    }
    busy = false; send.disabled = false; input.disabled = false;
    log.setAttribute("aria-busy", "false");
    log.scrollTop = log.scrollHeight;
    input.focus();
  }
}
form.addEventListener("submit", e => { e.preventDefault(); ask(input.value); });
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(input.value); }
});
input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 240) + "px"; });
chips.addEventListener("click", e => {
  const button = e.target.closest(".chip");
  if (!button || busy) return;
  ask(button.dataset.question);
});
for (const link of document.querySelectorAll(".case-question")) {
  link.addEventListener("click", () => { if (!busy) { input.value = link.dataset.question; input.focus({ preventScroll: true }); } });
}
