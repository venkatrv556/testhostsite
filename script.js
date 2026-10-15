const form = document.getElementById("user-form");
const nameInput = document.getElementById("name");
const list = document.getElementById("user-list");
const message = document.getElementById("message");
const submitButton = form.querySelector("button");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + (type || "");
}

async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Could not load data");
    const users = await res.json();

    list.innerHTML = "";

    if (users.length === 0) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "No names saved yet.";
      list.appendChild(li);
      return;
    }

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name; // textContent keeps it safe from HTML injection
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = "";
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Could not load names. Is the API running?";
    list.appendChild(li);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  if (!name) return;

  submitButton.disabled = true;
  showMessage("");

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong");

    nameInput.value = "";
    showMessage("Saved!", "ok");
    await loadUsers();
  } catch (err) {
    showMessage(err.message, "error");
  } finally {
    submitButton.disabled = false;
  }
});

loadUsers();
