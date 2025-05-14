document.addEventListener("DOMContentLoaded", function () {
  // Modal para imágenes de boletines
  const boletinesImages = document.querySelectorAll(".boletines-grid img");
  const modal = document.createElement("div");
  const modalImg = document.createElement("img");
  const modalClose = document.createElement("span");
  const modalDownload = document.createElement("a"); // Cambiado de <button> a <a>

  modal.id = "modal";
  modalClose.id = "modal-close";
  modalClose.innerHTML = "&times;";
  modalDownload.id = "modal-download";
  modalDownload.textContent = "Descargar";

  modal.appendChild(modalImg);
  modal.appendChild(modalClose);
  modal.appendChild(modalDownload);
  document.body.appendChild(modal);

  boletinesImages.forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      const filename = img.src.split("/").pop();
      modalDownload.setAttribute("href", img.src);
      modalDownload.setAttribute("download", filename);
      modal.classList.add("active");
    });
  });

  // Cerrar modal al hacer clic en la "X"
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Cerrar modal al hacer clic fuera de la imagen
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Menú lateral
  const menuBtn = document.getElementById("menu-btn");
  const menuContainer = document.querySelector(".menu-container");

  menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("active");
  });

  // Chat con menú anidado y efectos
  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const typingIndicator = document.getElementById("typing-indicator");

  // Menús del chat
  const menus = {
    main: {
      message: "Hola, soy tu asistente personal, ¿en qué puedo ayudarte? Elige una opción:<br>1) Normatividad<br>2) Información del SDACP<br>3) Gestión del Conocimiento
	  ",
      options: {
        1: "normatividad",
        2: "sdacp",
        3: "conocimiento"
      }
    },
    normatividad: {
      message: "Normatividad del SDACP:<br>a) Decreto 480 de 2018<br>b) Elecciones Atípicas<br>c) Otros<br>r) Regresar",
      options: {
        a: "decreto480",
        b: "atipicas",
        c: "otros",
        r: "main"
      }
    },
	
	decreto480: {
      message: "Decreto 480 de 2018:<br>a) ¿Qué es el Decreto 480 de 2018?<br>b) ¿Cuál es la estructura del Decreto 480?<br>c) ¿Por qué es importante conocer este Decreto?<br>d) ¿Dónde puedo consultar este Decreto?<br>r) Regresar",
	  options: {
        a: "El Decreto 480 de 2018 es el principal reglamento del SDACP. Si bien en la actualidad existen artículos vigentes del Decreto 627 de 2007, como que hablan sobre los principios y políticas del Sistema, es en el Decreto 480 donde se encuentran las normas de juego fundamentales. Así mismo, el Decreto 336 de 2022, introdujo modificaciones importates al Decreto 480, incorporando nuevas disposiciones como el apoyo a la movilidad y la inclusión de los sectores de Hip-Hop y Circo en la Circunscripción local.",
        b: "El Decreto 480 de 2018 está organizado en 11 capítulos, cada uno compuesto por varios artículos que desarrollan sus disposiciones. Por ejemplo, el Capítulo IV, titulado -Del Consejo de Cultura para Asuntos Locales y de los Consejos Locales de Arte, Cultura y Patrimonio-, establece las funciones y la conformación del Consejo de Cultura de Asuntos Locales (CCAL) y de los Consejos Locales de Arte, Cultura y Patrimonio (CLACP).",
        c: "Conocer el Decreto 480 de 2018 es fundamental porque establece las normas esenciales que rigen el Sistema Distrital de Arte, Cultura y Patrimonio (SDACP), estructurando su funcionamiento y las relaciones entre los distintos actores involucrados. Adicionalmente, este año estamos en proceso de construcción de un Decreto Único Reglamentario, por lo que conocer la normatividad asociada al Sistema es vital si quieres que tus aportes en la construcción de este nuevo Decreto lleguen al siguiente nivel.",
		d: "Puedes consultarlo en el siguiente enlace: https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=80504",
        r: "main"
      }
    },
	
    sdacp: {
      message: "Información del SDACP:<br>a) Qué es el SDACP<br>b) Consejos<br>c) Consejeros<br>r) Regresar",
      options: {
        a: "El SDACP es el Sistema Distrital de Arte, Cultura y Patrimonio de Bogotá.",
        b: "Puedes convertirte en consejero participando en las elecciones que se realizan cada 4 años.",
        c: "Los consejeros tienen el rol de representar a la comunidad y velar por el desarrollo cultural.",
        r: "main"
      }
    },
    conocimiento: {
      message: "Gestión del Conocimiento:<br>a) Micrositio<br>b) Tableros de Seguimiento<br>c) Otros<br>r) Regresar",
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

  // Alternar visibilidad del chat al hacer clic en el botón de toggle
  chatToggle.addEventListener("click", function () {
    // Alterna la clase 'active' para mostrar el chat
    chatWindow.classList.toggle("active");
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