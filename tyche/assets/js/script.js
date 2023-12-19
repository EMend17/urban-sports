/*****************************************************************
	Archivo principal de sitio
	Este programa se encarga de manejar la interacción a rasgos generales
    del inicio del sitio.
	
    Fecha: 
	Version:  
	Autores:
			-Cuevas Solorza Eduardo
            -Méndez Hipólito Emilio
            -Romero Cisneros Victor Gustavo 

*****************************************************************/

// Function to load header content
function loadHeader() {
  fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
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
 * Desplaza la ventana hacia la sección de inicio de sesión
 * @param None
 * @returns {void}
 */
function scrollToSectionLogIn() {
  document.getElementById("sectionLogIn").scrollIntoView({
    behavior: "smooth",
  });
}


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
  
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
  
    // Simulate successful login (you should replace this with your actual validation logic)
    if (email === "eduardo009cs@gmail.com" && password === "admin1234") {
        // Redirect to dashboard.html after successful login
        window.location.href = "dashboard_inicio.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
  });
  
  
/**
 * Función que se ejecuta al cargar la ventana para cargar el encabezado y el pie de página y desplazar la ventana al inicio.
 * @param None
 * @returns {void}
 */
window.onload = function () {
  // Desplazar la ventana al inicio
  window.scrollTo(0, 0);

  // Cargar el pie de página
  loadFooter();
};
