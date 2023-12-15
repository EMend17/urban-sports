/*****************************************************************
	Archivo principal de sitio
	Este programa se encarga de manejar la interacción de la
  sección de Dashboards, del sitio y la navegación general del sitio

    Fecha: 
	Version:  
	Autores:
			-Cuevas Solorza Eduardo
            -Méndez Hipólito Emilio
            -Romero Cisneros Victor Gustavo 

*****************************************************************/

/**
 * Configura el botón de alternancia para mostrar u ocultar la barra lateral.
 * @param None
 * @returns {void}
 */
function setupButton() {
  // Obtener el elemento del botón de toggle
  const toggler = document.getElementById("toggle-button");
  // Agregar un evento de clic al botón de alternancia
  toggler.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("collapsed");
  });
}

/**
 * Función que se encargará de cargar los elementos del footer
 * @param None
 * @returns None
 */
function loadFooter() {
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });
}

/**
 * Caga el encabezado de la página y configura la funcionalidad
 * de navegación una vez cargado.
 * @param None
 * @returns {void}
 */
function loadHeader() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById("header-container").innerHTML =
          xhr.responseText;
        // Una vez cargada la barra de navegación, configurar la funcionalidad del botón
        setupButton();
      } else {
        console.error("Error al cargar el contenido del encabezado.");
      }
    }
  };

  // Abrir y enviar la solicitud para obtener el encabezado desde un archivo externo
  xhr.open("GET", "./components/headerDashboard.html", true);
  xhr.send();
}

/**
 * Carga el contenido de la barra de navegación 
 * @returns {void}
 */
function loadNavbar() {
  // Crear una nueva solicitud XMLHttpRequest
  var xhttp = new XMLHttpRequest();

  // Definir el evento de cambio de estado
  xhttp.onreadystatechange = function() {
      // Verificar si la solicitud se ha completado y la respuesta está lista
      if (this.readyState == 4 && this.status == 200) {
          // Insertar el contenido de la barra de navegación en el contenedor especificado
          document.getElementById("navbar-container").innerHTML = this.responseText;
      }
  };

  // Abrir y enviar la solicitud para obtener la barra de navegación desde un archivo externo
  xhttp.open("GET", "./components/navbarDashboard.html", true);
  xhttp.send();
}



/**
 * Función que se ejecuta al cargar la ventana para cargar el encabezado, el pie de página y la navbar.
 * @param None
 * @returns {void}
 */
window.onload = function () {
  // Cargar el encabezado
  loadHeader();

  // Cargar el pie de página
  loadFooter();

  // Cargar la barra de navegación
  loadNavbar();
};








/*



/**
 * Carga la barra de navegación y configura su funcionalidad una vez cargada.
 * @param None
 * @returns {void}

function loadNavbar() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Insertar el contenido de la barra de navegación en el contenedor correspondiente
        document.getElementById("navbar-container").innerHTML =
          xhr.responseText;

        // Una vez cargada la barra lateral, configurar su funcionalidad
        setupNavbarFunctionality();
      } else {
        console.error(
          "Error al cargar el contenido de la barra de navegación."
        );
      }
    }
  };

  // Abrir y enviar la solicitud para obtener la barra de navegación desde un archivo externo
  xhr.open("GET", "./components/navbarDashboard.html", true);
  xhr.send();
}

// Function to handle sidebar item clicks and load iframes
function setupNavbarFunctionality() {
  var navbarItems = document.querySelectorAll("#navbar-container li a");
  navbarItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior

      var level = parseInt(item.getAttribute("data-level"));

      if (level === 1) {
        // Get data attributes for title, text, and iframe source
        var pageTitle = this.getAttribute("data-page-title");
        var textContent = this.getAttribute("data-text-content");
        var iframeSrc = this.getAttribute("data-iframe-src");

        console.log("pageTitle:", pageTitle);
        console.log("textContent:", textContent);
        console.log("iframeSrc:", iframeSrc);
        // Update title, text content, and iframe source
        document.getElementById("pageTitle").innerText = pageTitle;
        document.getElementById("textContent").innerText = textContent;
        document.getElementById("iframeContent").src = iframeSrc;
      }
    });
  });
}


*/ 