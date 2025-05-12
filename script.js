document.addEventListener("DOMContentLoaded", function () {
  // Menú lateral
  const menuBtn = document.getElementById("menu-btn");
  const menuContainer = document.querySelector(".menu-container");

  menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("active");
  });

  // Chat básico con preguntas predeterminadas
  const preguntasFrecuentes = {
    "hola": "Hola! Estoy aquí para ayudarte. Dime en qué puedo ayudarte?",
    "¿qué es el sdacp?": "Es el Sistema Distrital de Arte, Cultura y Patrimonio de Bogotá.",
    "¿cómo ser consejero?": "Debes inscribirte a través de las convocatorias abiertas por la SCRD.",
    "contacto": "Puedes escribirnos a sistemaparticipacion@scrd.gov.co."
  };

  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  chatToggle.addEventListener("click", function () {
    chatWindow.classList.toggle("hidden");
  });

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const input = chatInput.value.toLowerCase().trim();
      const response = preguntasFrecuentes[input] || "Lo siento, no entiendo tu pregunta.";
      chatMessages.innerHTML += `<div><strong>Tú:</strong> ${input}</div>`;
      chatMessages.innerHTML += `<div><strong>Radar:</strong> ${response}</div>`;
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
});