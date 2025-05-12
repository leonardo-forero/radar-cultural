document.addEventListener("DOMContentLoaded", function () {
  // Menú lateral
  const menuBtn = document.getElementById("menu-btn");
  const menuContainer = document.querySelector(".menu-container");

  menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("active");
  });

// Chat con menú anidado y efectos
document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const typingIndicator = document.getElementById("typing-indicator");

  // Menús del chat
  const menus = {
    main: {
      message: "Hola, ¿en qué puedo ayudarte? Elige una opción:<br>1) Gestión Documental<br>2) Acerca del SDACP<br>3) Normatividad",
      options: {
        1: "gestion",
        2: "sdacp",
        3: "normatividad"
      }
    },
    gestion: {
      message: "Gestión Documental:<br>a) Cómo subir documentos<br>b) Cómo buscar documentos<br>c) Requisitos para carga documental<br>r) Regresar",
      options: {
        a: "Puedes subir documentos a través del sistema de gestión documental de la SCRD.",
        b: "Puedes buscar documentos usando el buscador de nuestro sistema.",
        c: "Los requisitos para carga documental incluyen...",
        r: "main"
      }
    },
    sdacp: {
      message: "Acerca del SDACP:<br>a) Qué es el SDACP<br>b) Cómo ser consejero<br>c) Funciones de los consejeros<br>r) Regresar",
      options: {
        a: "El SDACP es el Sistema Distrital de Arte, Cultura y Patrimonio de Bogotá.",
        b: "Puedes convertirte en consejero participando en las elecciones que se realizan cada 4 años.",
        c: "Los consejeros tienen el rol de representar a la comunidad y velar por el desarrollo cultural.",
        r: "main"
      }
    },
    normatividad: {
      message: "Normatividad:<br>a) Decreto 480 de 2018<br>b) Decreto 624 de 2019<br>c) Ley 397 de 1997<br>r) Regresar",
      options: {
        a: "El Decreto 480 de 2018 regula...",
        b: "El Decreto 624 de 2019 establece...",
        c: "La Ley 397 de 1997 es la Ley General de Cultura en Colombia.",
        r: "main"
      }
    }
  };

  // Estado del menú actual
  let currentMenu = "main";

  // Reproducir sonido
  function playNotificationSound() {
    const audio = new Audio("notification.mp3");
    audio.play();
  }

  // Mostrar y ocultar indicador de escritura
  function showTypingIndicator() {
    typingIndicator.classList.remove("hidden");
    typingIndicator.classList.add("typing-active");
  }

  function hideTypingIndicator() {
    typingIndicator.classList.add("hidden");
    typingIndicator.classList.remove("typing-active");
  }

  // Muestra el mensaje del menú actual
  function showMenu() {
    chatMessages.innerHTML += `<div><strong>Radar:</strong> ${menus[currentMenu].message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    playNotificationSound();
  }

  // Inicializa el chat con el menú principal
  showMenu();

  chatToggle.addEventListener("click", function () {
    chatWindow.classList.toggle("hidden");
  });

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const input = chatInput.value.trim().toLowerCase();
      const option = menus[currentMenu].options[input];

      // Mostrar mensaje del usuario
      chatMessages.innerHTML += `<div><strong>Tú:</strong> ${input}</div>`;

      if (option) {
        // Mostrar indicador de escritura
        showTypingIndicator();

        // Simular escritura
        setTimeout(() => {
          if (menus[option]) {
            currentMenu = option;
            showMenu();
          } else {
            chatMessages.innerHTML += `<div><strong>Radar:</strong> ${option}</div>`;
            playNotificationSound();
          }

          // Ocultar indicador de escritura
          hideTypingIndicator();
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      } else {
        chatMessages.innerHTML += `<div><strong>Radar:</strong> Opción no válida. Por favor elige una de las opciones disponibles.</div>`;
        playNotificationSound();
        showMenu();
      }

      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
});