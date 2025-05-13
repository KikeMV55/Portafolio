const menuBtn = document.querySelector(".header .menu-btn");
const menu = document.querySelector(".header .menu");

function toggleMenu(){
	menuBtn.classList.toggle("active");
	menu.classList.toggle("open");
}

menuBtn.addEventListener("click", toggleMenu);

// ------------------- Comentarios con eliminación -------------------
const form = document.querySelector(".comentarios form");
const nombreInput = form.querySelector("input");
const comentarioInput = form.querySelector("textarea");

let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

// Crear contenedor visual para los comentarios
let listaComentarios = document.createElement('div');
listaComentarios.classList.add('lista-comentarios');
form.parentElement.appendChild(listaComentarios);

// Función para mostrar comentarios
function mostrarComentarios() {
	listaComentarios.innerHTML = ""; // Limpiar la lista

	comentarios.forEach((comentario, index) => {
		let div = document.createElement("div");
		div.classList.add("comentario");

		// Obtener la fecha actual
		const fecha = new Date();
		const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;

		div.innerHTML = `
			<div class="comentario-header">
				<p><strong>${comentario.nombre}</strong> <span class="fecha">(${fechaFormateada})</span></p>
			</div>
			<p class="texto-comentario">${comentario.texto}</p>
			<button class="eliminar-btn" data-index="${index}">Eliminar</button>
		`;
		listaComentarios.appendChild(div);
	});
}

// Función para guardar un nuevo comentario
form.addEventListener("submit", function(event) {
	event.preventDefault();

	const nuevoComentario = {
		nombre: nombreInput.value.trim(),
		texto: comentarioInput.value.trim()
	};

	if (!nuevoComentario.nombre || !nuevoComentario.texto) return;

	comentarios.push(nuevoComentario);
	localStorage.setItem("comentarios", JSON.stringify(comentarios));

	nombreInput.value = "";
	comentarioInput.value = "";

	mostrarComentarios();
});

// Función para eliminar un comentario
listaComentarios.addEventListener("click", function(event) {
	if (event.target.classList.contains("eliminar-btn")) {
		const index = event.target.getAttribute("data-index");
		comentarios.splice(index, 1);
		localStorage.setItem("comentarios", JSON.stringify(comentarios));
		mostrarComentarios();
	}
});

// Mostrar los comentarios guardados al cargar
mostrarComentarios();
