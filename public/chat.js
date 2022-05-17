const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");
const input = document.getElementById("send_message");
const usernameDiv = document.getElementById("username_div");

usernameDiv.innerHTML = `Ola ${username}, você esta no chat do quarto ${room}`;

// emit - emitir alguma informarção
// on - para ficar escutando alguma informação

socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => createMessage(message));
  }
);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const message = e.target.value;

    const data = {
      room,
      message,
      username,
    };

    socket.emit("message", data);

    e.target.value = "";
  }
});

socket.on("message", (data) => {
  createMessage(data);
});

const createMessage = (data) => {
  const messagesSection = document.getElementById("messages");
  const { username, text, createdAt } = data;

  messagesSection.innerHTML += `
      <div>
          <label><strong>${username}</strong><span>${text} - ${dayjs(
    createdAt
  ).format("HH:mm DD/MM")}</span></label>
      </div>
    `;
};
