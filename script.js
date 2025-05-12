// Menú desplegable
document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

// Chat básico con preguntas predeterminadas
const preguntasFrecuentes = {
  "Hola": "Hola! Mi nombre es Radarcito y estoy aquí para ayudarte. Dime en qué puedo ayudarte?",
  "¿qué es el sdacp?": "Es el Sistema Distrital de Arte, Cultura y Patrimonio de Bogotá.",
  "¿cómo ser consejero?": "Debes inscribirte a través de las convocatorias abiertas por la SCRD.",
  "contacto": "Puedes escribirnos a sistemaparticipacion@scrd.gov.co."
};

document.getElementById("chat-toggle").addEventListener("click", () => {
  document.getElementById("chat-window").classList.toggle("hidden");
});

document.getElementById("chat-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const input = e.target.value.toLowerCase();
    const response = preguntasFrecuentes[input] || "Lo siento, no entiendo tu pregunta aún.";
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML += `<div><strong>Tú:</strong> ${input}</div>`;
    chatMessages.innerHTML += `<div><strong>Radar:</strong> ${response}</div>`;
    e.target.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});