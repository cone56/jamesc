const visitorCount = document.querySelector<HTMLElement>("#visitor-count")!;
const protocol = location.protocol === "https:" ? "wss:" : "ws:";
const socket = new WebSocket(`${protocol}//${location.host}/ws`);

socket.addEventListener("message", (event) => {
  const update = JSON.parse(event.data) as { count: number };
  visitorCount.textContent = String(update.count);
});

socket.addEventListener("close", () => {
  visitorCount.textContent = "-";
});
